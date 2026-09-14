/**
 * Product catalog queries.
 *
 * ALL product data lives in src/data/products.ts — this module is the only
 * place that reads it, and every page/component goes through here. Nothing in
 * the UI layer hardcodes a product, a spec label or a URL shape.
 *
 *   src/data/products.ts  →  lib/products.ts  →  cards / lists / detail pages
 *
 * Adding a product to the data file is therefore enough to make it appear in
 * the catalog, on its category page, on its power page, in related-products
 * rows and in the sitemap.
 */
import {
  PRODUCTS,
  type Product,
  type ProductCategory,
  type ProductPackaging,
  type ProductSeo,
  type ProductSpecifications,
} from '../data/products';
import { CATEGORIES, CATEGORY_SLUGS, type Category } from './categories';

export type { Category, Product, ProductCategory, ProductPackaging, ProductSeo, ProductSpecifications };

/* ------------------------------------------------------------------ *
 * Presentation of structured fields
 * ------------------------------------------------------------------ */

/** "1800W" — the label is always derived, never stored twice. */
export function formatPower(watts: number): string {
  return `${watts}W`;
}

/** Canonical URL of a product detail page. */
export function productPath(product: Pick<Product, 'category' | 'slug'>): string {
  return `/products/${product.category}/${product.slug}/`;
}

export interface SpecRow {
  group?: string;
  label: string;
  value: string;
}

/**
 * Specification fields rendered from `product.specifications`.
 *
 * Keeping the labels here (instead of repeating them on all 12 products) means
 * a wording change is a one-line edit, and a typo in a label is impossible.
 * Only fields present on the product are rendered.
 *
 * "Rated Power" is not listed here on purpose: the power level is stored once,
 * as the numeric `ratedPower` field, and the row is derived from it by
 * toSpecRows() below. There is no second copy to drift out of sync.
 */
export const SPEC_FIELDS: { key: keyof ProductSpecifications; label: string; group: string }[] = [
  { key: 'acOutput', label: 'AC Output', group: 'AC Output' },
  { key: 'outputSockets', label: 'Output Sockets', group: 'AC Output' },
  { key: 'dcInputVoltage', label: 'DC Input Voltage', group: 'DC Input' },
  { key: 'display', label: 'Display', group: 'Display & Cooling' },
  { key: 'usb', label: 'USB', group: 'Interface' },
  { key: 'cooling', label: 'Cooling', group: 'Display & Cooling' },
  { key: 'dimensions', label: 'Dimensions', group: 'Physical' },
  { key: 'netWeight', label: 'Net Weight', group: 'Physical' },
];

export const PACKAGING_FIELDS: { key: keyof ProductPackaging; label: string }[] = [
  { key: 'packageDimensions', label: 'Package Dimensions' },
  { key: 'grossWeight', label: 'Gross Weight' },
  { key: 'cartonQuantity', label: 'Carton Quantity' },
  { key: 'cartonDimensions', label: 'Carton Dimensions' },
  { key: 'cartonWeight', label: 'Carton Weight' },
  { key: 'cartonInformation', label: 'Carton Information' },
];

/**
 * Specification rows for a product.
 *
 * The first row is always the rated power, derived from the numeric
 * `ratedPower` field (the only place the power level is stored). The remaining
 * rows come from `specifications`, and only fields present are rendered.
 */
export function toSpecRows(product: Product): SpecRow[] {
  const specs = product.specifications;

  const rows: SpecRow[] = [
    { group: 'AC Output', label: 'Rated Power', value: formatPower(product.ratedPower) },
  ];

  for (const field of SPEC_FIELDS) {
    const value = specs[field.key];
    if (value === undefined || value === null || value === '') continue;
    rows.push({ group: field.group, label: field.label, value });
  }

  return rows;
}

/** Packaging rows — an absent packaging block renders nothing at all. */
export function toPackagingRows(packaging?: ProductPackaging): SpecRow[] {
  if (!packaging) return [];
  return PACKAGING_FIELDS.filter((field) => packaging[field.key] !== undefined).map((field) => ({
    label: field.label,
    value: packaging[field.key] as string,
  }));
}

/* ------------------------------------------------------------------ *
 * Derived copy — recombines real fields only, never invents a spec
 * ------------------------------------------------------------------ */

/**
 * Card / hero lead-in sentence.
 *
 * Authors may supply `shortDescription`; when they do not, one is composed from
 * the rated power and product type that are already on the record. No new
 * technical claim is ever introduced here.
 */
export function resolveShortDescription(product: Product): string {
  const authored = product.shortDescription?.trim();
  if (authored) return authored;
  return `${formatPower(product.ratedPower)} ${product.productType}`;
}

/**
 * SEO title + meta description.
 *
 * Authored `product.seo` always wins. Without it the two tags are composed from
 * the product's own real fields (name, product type, id, rated power) so a
 * product added with minimal data still ships valid, non-duplicated metadata.
 */
export function resolveSeo(product: Product): ProductSeo {
  const power = formatPower(product.ratedPower);
  const nameHasType = product.name.toLowerCase().includes(product.productType.toLowerCase());
  // Don't repeat the SKU when the product name already carries it.
  const lead = product.name.includes(product.id) ? product.name : `${product.id} — ${product.name}`;

  return {
    title: product.seo?.title?.trim() || (nameHasType ? product.name : `${product.name} — ${product.productType}`),
    description:
      product.seo?.description?.trim() ||
      `${lead}: ${product.productType} with ${power} rated output. Contact us for specifications, pricing and OEM supply.`,
  };
}

/* ------------------------------------------------------------------ *
 * Queries
 * ------------------------------------------------------------------ */

/** The whole catalog, in the order it is authored in src/data/products.ts. */
export function getAllProducts(): Product[] {
  return PRODUCTS;
}

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((product) => product.id === id);
}

export function getProduct(category: string, slug: string): Product | undefined {
  return PRODUCTS.find((product) => product.category === category && product.slug === slug);
}

/** Products of one category, highest rated power first. */
export function getProductsByCategory(category: string): Product[] {
  return PRODUCTS.filter((product) => product.category === category).sort(
    (a, b) => b.ratedPower - a.ratedPower
  );
}

/** Every model available at one rated power — the power-category listing. */
export function getProductsByPower(category: string, ratedPower: number): Product[] {
  return PRODUCTS.filter(
    (product) => product.category === category && product.ratedPower === ratedPower
  ).sort((a, b) => a.id.localeCompare(b.id));
}

export function countProductsByCategory(category: string): number {
  return PRODUCTS.filter((product) => product.category === category).length;
}

/**
 * Categories that currently contain at least one product.
 *
 * The category pages, the header/footer navigation and the catalog listing are
 * built from this list rather than from the full CATEGORIES array, so a
 * category with no real models yet is never advertised as a product line:
 * no empty category page, nothing thin for a search engine to index, and no
 * link to a page that does not exist.
 *
 * The category definitions in src/lib/categories.ts stay intact — add one
 * product with that category and the page, the navigation entry and the
 * listing reappear on the next build, the same way a new power rating does.
 */
export function getCategoriesWithProducts(): Category[] {
  return CATEGORIES.filter((category) => countProductsByCategory(category.slug) > 0);
}

/** Distinct rated powers present in a category, ascending. */
export function getPowerRatings(category: string): number[] {
  return [
    ...new Set(
      PRODUCTS.filter((product) => product.category === category).map((product) => product.ratedPower)
    ),
  ].sort((a, b) => a - b);
}

/** Featured models (homepage); falls back to the top of the catalog. */
export function getFeaturedProducts(limit = 4): Product[] {
  const featured = PRODUCTS.filter((product) => product.featured);
  const pool = featured.length > 0 ? featured : PRODUCTS;
  return pool.slice(0, limit);
}

/**
 * Related products, ranked by relevance:
 *   1. same rated power      (e.g. the non-USB / USB variant of one output)
 *   2. same series           (P-Series, 1159-Series)
 *   3. nearest rated power within the same category
 *   4. everything else, featured first, then nearest power
 *
 * A product is never listed against itself and never listed twice, and the
 * ranking always fills up to `limit` while candidates remain.
 * Set `product.relatedProducts` (array of product IDs) to override entirely.
 */
export function getRelatedProducts(product: Product, limit = 4): Product[] {
  const manual = product.relatedProducts
    ?.map((id) => getProductById(id))
    .filter((item): item is Product => Boolean(item) && item!.id !== product.id);
  if (manual && manual.length > 0) return manual.slice(0, limit);

  const others = PRODUCTS.filter((item) => item.id !== product.id);
  const distance = (item: Product) => Math.abs(item.ratedPower - product.ratedPower);

  const picked: Product[] = [];
  const taken = new Set<string>([product.id]);

  const take = (candidates: Product[]) => {
    for (const candidate of candidates) {
      if (picked.length >= limit) return;
      if (taken.has(candidate.id)) continue;
      taken.add(candidate.id);
      picked.push(candidate);
    }
  };

  take(
    others.filter(
      (item) => item.category === product.category && item.ratedPower === product.ratedPower
    )
  );

  if (product.series) {
    take(others.filter((item) => item.series === product.series));
  }

  take(
    others
      .filter((item) => item.category === product.category)
      .sort((a, b) => distance(a) - distance(b))
  );

  take(
    [...others].sort(
      (a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || distance(a) - distance(b)
    )
  );

  return picked;
}

/** Options for the inquiry form's product selector. */
export function getProductOptions(): { sku: string; name: string }[] {
  return PRODUCTS.map((product) => ({ sku: product.id, name: product.name })).sort((a, b) =>
    a.sku.localeCompare(b.sku)
  );
}

/* ------------------------------------------------------------------ *
 * Integrity check — runs once when the catalog is first imported
 * ------------------------------------------------------------------ */

/**
 * Fail the build when the data table is internally inconsistent.
 *
 * Without this, a duplicate id or slug surfaces as an obscure Astro route
 * error, and a bad `category` silently emits a page whose category link 404s.
 * Failing here names the offending product and says what to fix.
 */
function assertCatalogIntegrity(): void {
  const seenIds = new Map<string, string>();
  const seenPaths = new Map<string, string>();

  for (const product of PRODUCTS) {
    const label = `${product.id} (slug "${product.slug}")`;

    if (seenIds.has(product.id)) {
      throw new Error(
        `[products.ts] Duplicate product id "${product.id}" — already used by ${seenIds.get(product.id)}. Product IDs must be unique.`
      );
    }
    seenIds.set(product.id, label);

    const path = productPath(product);
    if (seenPaths.has(path)) {
      throw new Error(
        `[products.ts] Duplicate product URL "${path}" from ${label} — already produced by ${seenPaths.get(path)}. Slug and category must be unique together.`
      );
    }
    seenPaths.set(path, label);

    if (!Number.isFinite(product.ratedPower) || product.ratedPower <= 0) {
      throw new Error(
        `[products.ts] ${label}: ratedPower must be a positive number (got ${product.ratedPower}). It drives the power-category page URL.`
      );
    }

    if (!(CATEGORY_SLUGS as readonly string[]).includes(product.category)) {
      throw new Error(
        `[products.ts] ${label}: unknown category "${product.category}". Expected one of: ${CATEGORY_SLUGS.join(', ')}.`
      );
    }

    if (!product.slug.trim() || product.slug !== product.slug.toLowerCase()) {
      throw new Error(
        `[products.ts] ${label}: slug must be a non-empty lowercase URL segment (no spaces, no capitals — URLs are permanent).`
      );
    }
  }
}

assertCatalogIntegrity();
