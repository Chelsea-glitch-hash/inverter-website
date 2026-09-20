/**
 * AI-facing projection of the product catalog.
 *
 * ============================================================================
 *  This is a DERIVED VIEW, not a second product database.
 * ============================================================================
 *
 * Every value below is read from src/data/products.ts — the single source of
 * truth — through the same helpers the rest of the site uses (SPEC_FIELDS,
 * formatPower, productPath, getPowerRatings). Change a product there and this
 * projection follows on the next build; there is nothing to keep in sync.
 *
 * It exists for two reasons:
 *   1. the model must only ever see a SMALL, FACTUAL subset of the catalog
 *      (never `seo`, `overview`, `packaging`, `inquiry` or images);
 *   2. the chat UI needs 3–5 short bullets per model that are guaranteed to be
 *      real values rather than model-written prose.
 *
 * Nothing here invents a specification. A field the source data marks "TBC" is
 * kept out of the customer-facing bullets and listed in `unknowns` instead, so
 * the model is explicitly told to defer that question to the sales team rather
 * than guess a number.
 *
 * SERVER-SIDE ONLY — imported by the Pages Functions and the rules engine.
 * It must never be imported by a browser-bundled script (that would ship the
 * whole catalog to the client).
 */
import { PRODUCTS, type Product } from '../data/products';
import { SPEC_FIELDS, formatPower, getPowerRatings, productPath } from './products';
import type { ChatProductCard } from './chat-types';

/** The only category the sales chat is allowed to talk about. */
export const CHAT_CATEGORY = 'off-grid-inverters';

export interface AiSpec {
  label: string;
  value: string;
}

/** A slim, factual view of one product. */
export interface AiProduct {
  sku: string;
  name: string;
  url: string;
  ratedPower: number;
  powerLabel: string;
  productType: string;
  series: string | null;
  usb: boolean;
  /** 3–5 factual bullets, safe to show verbatim to a customer. */
  bullets: string[];
  /** All declared specifications (labels from SPEC_FIELDS). */
  specs: AiSpec[];
  /** Fields the source data cannot confirm — the model must defer these. */
  unknowns: string[];
}

const TBC_RE = /^tbc$/i;

/** True when a specification field carries a usable value. */
function isKnown(value: string | undefined): value is string {
  return typeof value === 'string' && value.trim() !== '' && !TBC_RE.test(value.trim());
}

/**
 * USB availability as a boolean.
 * `specifications.usb` is only ever populated on USB-equipped models, but we
 * still refuse to read a literal "No" as "yes".
 */
function productHasUsb(product: Product): boolean {
  const value = product.specifications.usb;
  if (!isKnown(value)) return false;
  return !/^no$/i.test(value.trim());
}

/**
 * Short factual bullets for the chat product card.
 *
 * Order is fixed (power → USB → waveform → DC input → display → sockets) so the
 * most decision-relevant facts survive the 5-bullet cap. Every string is either
 * a value copied out of the catalog or a label derived from one.
 */
function buildBullets(product: Product, powerLabel: string, usb: boolean): string[] {
  const specs = product.specifications;
  const bullets: string[] = [`${powerLabel} rated power`];

  if (usb) bullets.push('USB-equipped');
  if (/pure sine wave/i.test(product.productType)) bullets.push('Pure sine wave output');
  if (isKnown(specs.dcInputVoltage)) bullets.push(`DC input ${specs.dcInputVoltage}`);
  if (isKnown(specs.display)) bullets.push(specs.display);

  if (isKnown(specs.outputSockets)) {
    const count = specs.outputSockets.trim();
    bullets.push(`${count} AC output socket${count === '1' ? '' : 's'}`);
  }

  return bullets.slice(0, 5);
}

function toAiProduct(product: Product): AiProduct {
  const specs: AiSpec[] = [];
  const unknowns: string[] = [];

  for (const field of SPEC_FIELDS) {
    const value = product.specifications[field.key];
    if (typeof value !== 'string' || value.trim() === '') continue;
    if (isKnown(value)) {
      specs.push({ label: field.label, value });
    } else {
      // Present but unconfirmed ("TBC") — surface the label so the assistant
      // says "our sales team will confirm" instead of inventing a value.
      unknowns.push(field.label);
    }
  }

  const powerLabel = formatPower(product.ratedPower);
  const usb = productHasUsb(product);

  return {
    sku: product.id,
    name: product.name,
    url: productPath(product),
    ratedPower: product.ratedPower,
    powerLabel,
    productType: product.productType,
    series: product.series,
    usb,
    bullets: buildBullets(product, powerLabel, usb),
    specs,
    unknowns,
  };
}

let cache: AiProduct[] | null = null;

/** The whole chat-visible catalog (off-grid models), in catalog order. */
export function getAiCatalog(): AiProduct[] {
  if (!cache) {
    cache = PRODUCTS.filter((product) => product.category === CHAT_CATEGORY).map(toAiProduct);
  }
  return cache;
}

/** Every rated power that actually exists, ascending. */
export function getChatPowers(): number[] {
  return getPowerRatings(CHAT_CATEGORY);
}

/**
 * Models available at one rated power, in SKU order.
 * This is the ONLY way a product reaches the conversation, which is what makes
 * "recommend a product that does not exist" structurally impossible.
 */
export function matchByPower(power: number): AiProduct[] {
  return getAiCatalog()
    .filter((product) => product.ratedPower === power)
    .sort((a, b) => a.sku.localeCompare(b.sku));
}

/** Resolve a SKU (e.g. one echoed back by the model) to a real product. */
export function matchBySku(sku: string): AiProduct | undefined {
  const wanted = sku.trim().toUpperCase();
  return getAiCatalog().find((product) => product.sku === wanted);
}

/**
 * Real power ratings closest to a requested one.
 *
 * Used only to answer "we don't build that exact rating — the closest are X and
 * Y", which keeps the site honest instead of quietly rounding a request onto a
 * product the customer did not ask for.
 *
 * The two nearest values are taken from OPPOSITE sides of the request wherever
 * possible (nearest below + nearest above), because a buyer who asks for 3500W
 * needs to see both the 3200W and the 4000W option — not two ratings that are
 * both under what they asked for.
 */
export function nearestPowers(power: number, count = 2): number[] {
  const below = getChatPowers()
    .filter((value) => value < power)
    .sort((a, b) => b - a);
  const above = getChatPowers()
    .filter((value) => value > power)
    .sort((a, b) => a - b);

  const picked: number[] = [];
  let takeBelow =
    below.length > 0 && (above.length === 0 || power - below[0] <= above[0] - power);

  while (picked.length < count && (below.length > 0 || above.length > 0)) {
    if (takeBelow && below.length > 0) picked.push(below.shift() as number);
    else if (!takeBelow && above.length > 0) picked.push(above.shift() as number);
    else if (below.length > 0) picked.push(below.shift() as number);
    else picked.push(above.shift() as number);
    takeBelow = !takeBelow;
  }

  return picked.sort((a, b) => a - b);
}

/** Whether a number is a power rating we actually build. */
export function isKnownPower(power: number): boolean {
  return getChatPowers().includes(power);
}

/**
 * Map to the slim, transport-safe card shape.
 *
 * Deliberately drops the full spec list: the widget only needs the bullets, and
 * keeping the payload small keeps the API response cheap.
 */
export function toProductCard(product: AiProduct): ChatProductCard {
  return {
    sku: product.sku,
    name: product.name,
    url: product.url,
    powerLabel: product.powerLabel,
    bullets: product.bullets,
  };
}

/**
 * Compact factual block for the model prompt.
 *
 * Everything the model is allowed to state about a candidate is in here. If a
 * fact is not in this string, the model has no legitimate way to produce it.
 */
export function describeForModel(product: AiProduct): string {
  const lines = [
    `SKU: ${product.sku}`,
    `Name: ${product.name}`,
    `Rated power: ${product.powerLabel}`,
    `Type: ${product.productType}`,
    `Series: ${product.series ?? 'none'}`,
    `USB: ${product.usb ? 'yes' : 'no'}`,
    `Specs: ${product.specs.map((s) => `${s.label}=${s.value}`).join('; ') || 'none declared'}`,
    `Not available: ${product.unknowns.join(', ') || 'nothing missing'}`,
    `URL: ${product.url}`,
  ];
  return lines.join('\n');
}
