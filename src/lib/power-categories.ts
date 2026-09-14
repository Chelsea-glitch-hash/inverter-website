/**
 * Power-rating sub-categories.
 *
 * Front-end navigation is organised by customer search intent (rated power),
 * NOT by the manufacturer's internal series names. Series (P-Series,
 * 1159-Series) stay in product metadata only.
 *
 * These categories are DERIVED from the product data table: a rated power that
 * exists in src/data/products.ts gets a page, one that does not exist does not.
 * Adding a 6000W product is enough to publish /products/off-grid-inverters/6000w/.
 *
 * URLs: /products/off-grid-inverters/{power}w/
 * Changing a product's `ratedPower` therefore changes its power page URL —
 * treat published power ratings as stable.
 */
import { PRODUCTS, type Product, type ProductSpecifications } from '../data/products';
import { formatPower } from './products';

export interface PowerCategory {
  /** URL segment, e.g. "1800w" */
  slug: string;
  /** Numeric rated power in W — matches product `ratedPower` */
  power: number;
  /** Link / card label */
  name: string;
  /** Section heading on the power page */
  heading: string;
  /** Short intro used on cards and as the page subtitle */
  description: string;
  /** SEO */
  seoTitle: string;
  seoDescription: string;
}

/** Parent category that power sub-categories belong to. */
export const POWER_CATEGORY_PARENT = 'off-grid-inverters';

/**
 * Optional editorial copy per power rating.
 *
 * Marketing framing only — no product facts. Anything factual (DC input
 * voltage, AC output, display, socket count, USB) is composed from the models
 * themselves by describeSpecs() below, so it lives in exactly one place:
 * src/data/products.ts.
 *
 * The entries that used to sit here restated spec facts — "48V / 60V / 72V DC
 * input", "LCD display", "three AC output sockets" — which made them a second
 * copy of the product data that could silently contradict it. They were
 * removed; every power page now gets its facts from the catalog.
 *
 * Add an entry here when you want a hand-written sentence in front of the
 * generated text, e.g. `1800: { lead: 'Widely specified for telecom sites.' }`.
 */
const POWER_COPY: Record<number, { lead?: string }> = {};

/** Distinct, non-empty values of one specification field across a set of models. */
function distinctSpecs(models: Product[], key: keyof ProductSpecifications): string[] {
  return [
    ...new Set(
      models
        .map((model) => model.specifications[key])
        .filter((value): value is string => Boolean(value))
    ),
  ];
}

/**
 * The product facts a power page is allowed to state, read from the models
 * themselves. Values are listed only when the models at that rating actually
 * declare them, and differing values are joined rather than picked from —
 * nothing here can invent a parameter the data does not contain.
 */
function describeSpecs(models: Product[]): string[] {
  const facts: string[] = [];

  const dcInput = distinctSpecs(models, 'dcInputVoltage');
  if (dcInput.length > 0) facts.push(`DC input ${dcInput.join(' / ')}`);

  const acOutput = distinctSpecs(models, 'acOutput');
  if (acOutput.length > 0) facts.push(`AC output ${acOutput.join(' / ')}`);

  const display = distinctSpecs(models, 'display');
  if (display.length > 0) facts.push(display.join(' / '));

  const sockets = distinctSpecs(models, 'outputSockets');
  if (sockets.length > 0) {
    const unit = sockets.length === 1 && sockets[0] === '1' ? 'output socket' : 'output sockets';
    facts.push(`${sockets.join(' or ')} ${unit}`);
  }

  if (models.some((model) => model.specifications.usb)) facts.push('USB-equipped option');

  return facts;
}

/**
 * Copy for a power rating assembled from its own product data: how many models
 * there are, what type they are, the series when every model shares one, and
 * the specifications they declare.
 *
 * This is what a brand-new power rating such as 6000W gets — a real page with
 * honest copy and no invented parameter. It can be framed with an entry in
 * POWER_COPY above, which is never required.
 */
function generateCopy(
  power: number,
  models: Product[]
): Omit<PowerCategory, 'slug' | 'power' | 'name' | 'heading'> {
  const label = formatPower(power);
  const plural = models.length > 1 ? 's' : '';
  const types = [...new Set(models.map((model) => model.productType))].join(' / ');

  const series = [...new Set(models.map((model) => model.series))].filter(
    (value): value is string => Boolean(value)
  );
  const sharedSeries = series.length === 1 && models.every((model) => model.series === series[0]);

  const specs = describeSpecs(models);
  const dcInput = distinctSpecs(models, 'dcInputVoltage');

  const specSentence = specs.length > 0 ? ` Key specs: ${specs.join('; ')}.` : '';
  const seriesNote = sharedSeries ? ` (${series[0]})` : '';

  return {
    description: `${models.length} ${label} off-grid inverter${plural} available — ${types}${seriesNote}.${specSentence} Contact us for configurations, pricing and bulk supply.`,
    seoTitle: `${label} Off-Grid Inverter${plural}${sharedSeries ? ` — ${series[0]}` : ''}`,
    seoDescription: `${label} off-grid inverter${plural}: ${types}.${
      dcInput.length > 0 ? ` DC input ${dcInput.join(' / ')}.` : ''
    } Contact us for pricing and bulk supply.`,
  };
}

function buildPowerCategories(parentCategory: string): PowerCategory[] {
  const models = PRODUCTS.filter((product) => product.category === parentCategory);
  const powers = [...new Set(models.map((product) => product.ratedPower))].sort((a, b) => a - b);

  return powers.map((power) => {
    const label = formatPower(power);
    const inPower = models.filter((product) => product.ratedPower === power);
    const generated = generateCopy(power, inPower);
    const lead = POWER_COPY[power]?.lead;

    return {
      slug: `${power}w`,
      power,
      name: `${label} Off-Grid Inverters`,
      heading: `${label} Off-Grid Inverters`,
      ...generated,
      // The optional editorial line is prepended, never substituted, so the
      // page always keeps the data-derived facts.
      ...(lead ? { description: `${lead} ${generated.description}` } : {}),
    };
  });
}

const CACHE = new Map<string, PowerCategory[]>();

/** Power sub-categories that belong to a given parent category. */
export function getPowerCategories(parentCategory: string): PowerCategory[] {
  if (!CACHE.has(parentCategory)) CACHE.set(parentCategory, buildPowerCategories(parentCategory));
  return CACHE.get(parentCategory)!;
}

export function getPowerCategory(parentCategory: string, slug: string): PowerCategory | undefined {
  return getPowerCategories(parentCategory).find((power) => power.slug === slug);
}

/**
 * Resolve the power sub-category a product belongs to.
 * Returns undefined for categories without power-level navigation, or when a
 * product's rated power has no page (products then keep the two-level
 * breadcrumb instead of linking to a 404).
 */
export function getPowerCategoryForProduct(
  product: Pick<Product, 'category' | 'ratedPower'>
): PowerCategory | undefined {
  return getPowerCategories(product.category).find((power) => power.power === product.ratedPower);
}

/** Path helper keeps the URL shape in one place. */
export function powerCategoryPath(parentCategory: string, slug: string): string {
  return `/products/${parentCategory}/${slug}/`;
}
