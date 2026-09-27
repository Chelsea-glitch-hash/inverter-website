/**
 * Product content translation layer.
 *
 * src/data/products.ts stays the ONLY source of product FACTS (specs,
 * packaging, power, images). This layer adds the TRANSLATABLE presentation
 * fields — name, type, short description, overview, features, inquiry CTA and
 * SEO — per locale, keyed by product id.
 *
 * Rules:
 *  - Every field is optional per locale; a missing field falls back to the
 *    English field on the product record itself. Adding INV-013 with English
 *    content only therefore works in every language out of the box.
 *  - Specification VALUES are language-neutral (numbers, units, model data)
 *    and stay in products.ts. Only a small, explicit map of recurring value
 *    wordings below is translated; anything unlisted passes through unchanged.
 */
import type { Product, SpecRow } from '../lib/products';
import { formatPower, SPEC_FIELDS, PACKAGING_FIELDS } from '../lib/products';
import { DEFAULT_LOCALE, type Locale } from './config';
import { getDict } from './index';

export interface ProductContent {
  name?: string;
  productType?: string;
  shortDescription?: string;
  overview?: string[];
  features?: string[];
  seo?: { title?: string; description?: string };
  inquiry?: { headline?: string; text?: string };
}

/** Translations for one locale, keyed by product id (INV-001, ...). */
export type ProductTranslations = Record<string, ProductContent>;

import { esProducts } from './products/es';
import { zhHantProducts } from './products/zh-hant';
import { frProducts } from './products/fr';
import { arProducts } from './products/ar';
import { ptProducts } from './products/pt';
import { itProducts } from './products/it';
import { deProducts } from './products/de';
import { ruProducts } from './products/ru';
import { jaProducts } from './products/ja';
import { koProducts } from './products/ko';

const REGISTRY: Partial<Record<Locale, ProductTranslations>> = {
  es: esProducts,
  'zh-hant': zhHantProducts,
  fr: frProducts,
  ar: arProducts,
  pt: ptProducts,
  it: itProducts,
  de: deProducts,
  ru: ruProducts,
  ja: jaProducts,
  ko: koProducts,
};

function table(locale: Locale): ProductTranslations {
  return REGISTRY[locale] ?? {};
}

/**
 * A copy of the product with every display field swapped for the locale's
 * translation (English field when a translation is missing). Specification
 * data, packaging values, images, slugs and ids are carried over untouched.
 */
export function localizedProduct(product: Product, locale: Locale): Product {
  if (locale === DEFAULT_LOCALE) return product;
  const t = table(locale)[product.id];
  if (!t) return product;

  return {
    ...product,
    name: t.name ?? product.name,
    productType: t.productType ?? product.productType,
    shortDescription: t.shortDescription ?? product.shortDescription,
    overview: t.overview ?? product.overview,
    features: t.features ?? product.features,
    seo:
      t.seo || product.seo
        ? {
            title: t.seo?.title ?? product.seo?.title ?? '',
            description: t.seo?.description ?? product.seo?.description ?? '',
          }
        : undefined,
    inquiry:
      t.inquiry || product.inquiry
        ? {
            headline: t.inquiry?.headline ?? product.inquiry?.headline ?? '',
            text: t.inquiry?.text ?? product.inquiry?.text,
            buttonText: product.inquiry?.buttonText,
          }
        : product.inquiry,
  };
}

/* ------------------------------------------------------------------ *
 * Specification tables — localized LABELS, language-neutral VALUES
 * ------------------------------------------------------------------ */

/** SPEC_FIELDS group names -> dict.specs.groups keys. */
const GROUP_KEYS: Record<string, string> = {
  'AC Output': 'acOutput',
  'DC Input': 'dcInput',
  'Display & Cooling': 'displayCooling',
  Interface: 'interface',
  Physical: 'physical',
};

function localizedValue(key: string, value: string, locale: Locale): string {
  if (locale === DEFAULT_LOCALE) return value;
  const dict = getDict(locale).specs;
  const map = (dict.values as unknown as Record<string, Record<string, string>>)[key];
  if (map && map[value] !== undefined) return map[value];

  // "Approx. 2.2 kg" -> localized "Approx." prefix, value unchanged.
  if (/^Approx\. /.test(value)) {
    const rest = value.slice('Approx. '.length);
    return `${dict.values.approx} ${rest}`;
  }
  // "16 units" / "2 or 4 units" -> localized unit word, numbers unchanged.
  const unitsSingle = value.match(/^(\d+) units?$/);
  if (unitsSingle) return getDict(locale).specs.values.units.replace('{n}', unitsSingle[1]);
  const unitsOr = value.match(/^(\d+) or (\d+) units$/);
  if (unitsOr) {
    return getDict(locale)
      .specs.values.unitsOr.replace('{a}', unitsOr[1])
      .replace('{b}', unitsOr[2]);
  }
  return value;
}

/** toSpecRows() with localized field labels and recurring value wordings. */
export function localizedSpecRows(product: Product, locale: Locale): SpecRow[] {
  const dict = getDict(locale).specs;
  const rows: SpecRow[] = [
    { group: dict.groups.acOutput, label: dict.ratedPower, value: formatPower(product.ratedPower) },
  ];

  for (const field of SPEC_FIELDS) {
    const value = product.specifications[field.key];
    if (value === undefined || value === null || value === '') continue;
    rows.push({
      group: (dict.groups as Record<string, string>)[GROUP_KEYS[field.group] ?? ''] ?? field.group,
      label: (dict as unknown as Record<string, string>)[field.key] ?? field.label,
      value: localizedValue(field.key, value, locale),
    });
  }

  return rows;
}

/** toPackagingRows() with localized labels. */
export function localizedPackagingRows(
  packaging: Product['packaging'],
  locale: Locale
): SpecRow[] {
  if (!packaging) return [];
  const dict = getDict(locale).specs;
  return PACKAGING_FIELDS.filter((field) => packaging[field.key] !== undefined).map((field) => ({
    label: (dict.packaging as Record<string, string>)[field.key] ?? field.label,
    value: localizedValue(field.key, packaging[field.key] as string, locale),
  }));
}
