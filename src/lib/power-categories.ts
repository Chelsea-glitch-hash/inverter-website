/**
 * Power-rating sub-categories.
 *
 * Front-end navigation is organised by customer search intent (rated power),
 * NOT by the manufacturer's internal series names. Series (P-Series,
 * 1159-Series, VM, SC-MAX …) stay in product metadata only.
 *
 * These categories are DERIVED from the product data table: a rated power that
 * exists in src/data/products.ts gets a page, one that does not exist does not.
 * Adding a 6000W product is enough to publish its power page.
 *
 * URLs: /products/{category}/{power}w/  — one power level is scoped to ONE
 * parent category, so 3000W in the standalone range and 3000W in the solar
 * range are two different pages with different models on them.
 *
 * Changing a product's `ratedPower` therefore changes its power page URL —
 * treat published power ratings as stable.
 */
import { PRODUCTS, type Product, type ProductSpecifications } from '../data/products';
import { getCategory, type Category } from './categories';
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

/**
 * Parent categories that get power-rating sub-pages.
 *
 * Every entry here needs a matching route folder under
 * src/pages/products/<parent>/[power].astro — the route is a STATIC segment on
 * purpose: Astro resolves a static segment before the dynamic [category] one,
 * which is what keeps /products/{category}/{power}w/ and
 * /products/{category}/{slug}/ as separate built pages. Adding a category here
 * without adding the route folder means its power pages are simply not emitted.
 */
export const POWER_CATEGORY_PARENTS = ['off-grid-inverters', 'off-grid-solar-inverters'] as const;

export type PowerCategoryParent = (typeof POWER_CATEGORY_PARENTS)[number];

/** Whether a category is published with power-rating sub-pages. */
export function hasPowerPages(category: string): category is PowerCategoryParent {
  return (POWER_CATEGORY_PARENTS as readonly string[]).includes(category);
}

/**
 * Optional editorial copy per power rating, scoped to the parent category.
 *
 * Keyed by parent category first so a 3000W lead written for the standalone
 * range can never leak onto the 3000W page of the solar range.
 *
 * Marketing framing only — no product facts. Anything factual (DC input
 * voltage, AC output, display, socket count, USB) is composed from the models
 * themselves by describeSpecs() below, so it lives in exactly one place:
 * src/data/products.ts.
 *
 * Add an entry when you want a hand-written sentence in front of the generated
 * text, e.g. `'off-grid-inverters': { 1800: { lead: 'Widely specified for telecom sites.' } }`.
 */
const POWER_COPY: Record<string, Record<number, { lead?: string }>> = {
  'off-grid-inverters': {},
  'off-grid-solar-inverters': {},
};

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

  const mppt = distinctSpecs(models, 'mpptRange');
  if (mppt.length > 0) facts.push(`MPPT ${mppt.join(' / ')}`);

  return facts;
}

/**
 * Copy for a power rating assembled from its own product data: how many models
 * there are, what type they are, the series when every model shares one, and
 * the specifications they declare.
 *
 * The category noun comes from the category metadata (src/lib/categories.ts),
 * never from a literal here — otherwise the solar range's power pages would
 * announce themselves as plain "off-grid inverters".
 *
 * This is what a brand-new power rating such as 6000W gets — a real page with
 * honest copy and no invented parameter. It can be framed with an entry in
 * POWER_COPY above, which is never required.
 */
function generateCopy(
  power: number,
  models: Product[],
  meta: Pick<Category, 'name' | 'singularName'>
): Omit<PowerCategory, 'slug' | 'power' | 'name' | 'heading'> {
  const label = formatPower(power);
  const types = [...new Set(models.map((model) => model.productType))].join(' / ');

  const series = [...new Set(models.map((model) => model.series))].filter(
    (value): value is string => Boolean(value)
  );
  const sharedSeries = series.length === 1 && models.every((model) => model.series === series[0]);

  const specs = describeSpecs(models);
  const dcInput = distinctSpecs(models, 'dcInputVoltage');

  /* Singular when the rating holds exactly one model, plural otherwise. */
  const noun = models.length > 1 ? meta.name : (meta.singularName ?? meta.name);
  const proseNoun = noun.toLowerCase();

  const specSentence = specs.length > 0 ? ` Key specs: ${specs.join('; ')}.` : '';
  const seriesNote = sharedSeries ? ` (${series[0]})` : '';

  return {
    description: `${models.length} ${label} ${proseNoun} available — ${types}${seriesNote}.${specSentence} Contact us for configurations, pricing and bulk supply.`,
    seoTitle: `${label} ${noun}${sharedSeries ? ` — ${series[0]}` : ''}`,
    seoDescription: `${label} ${proseNoun}: ${types}.${
      dcInput.length > 0 ? ` DC input ${dcInput.join(' / ')}.` : ''
    } Contact us for pricing and bulk supply.`,
  };
}

function buildPowerCategories(parentCategory: string): PowerCategory[] {
  const meta = getCategory(parentCategory);

  /* No metadata, no page: the category noun has to exist to write honest copy. */
  if (!meta) return [];

  const models = PRODUCTS.filter((product) => product.category === parentCategory);
  const powers = [...new Set(models.map((product) => product.ratedPower))].sort((a, b) => a - b);

  return powers.map((power) => {
    const label = formatPower(power);
    const inPower = models.filter((product) => product.ratedPower === power);
    const generated = generateCopy(power, inPower, meta);
    const lead = POWER_COPY[parentCategory]?.[power]?.lead;

    return {
      slug: `${power}w`,
      power,
      name: `${label} ${meta.name}`,
      heading: `${label} ${meta.name}`,
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
