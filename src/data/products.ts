/**
 * ============================================================================
 *  PRODUCT CATALOG — SINGLE SOURCE OF TRUTH
 * ============================================================================
 *
 * Every product page, product card, category page, power page, related-products
 * row and SEO tag on this site is generated from the PRODUCTS array below.
 *
 * To add a product:
 *   1. Append one object to PRODUCTS.
 *   2. Drop the photos into public/images/products/<category>/<slug>/.
 *   3. Reference them in that object's `images` array.
 *
 * That is all — no .astro file is ever created or edited by hand. Appending an
 * object automatically produces:
 *   - /products/{category}/{slug}/                  product detail page
 *   - /products/{category}/{power}w/                power page (created if new)
 *   - the card on /products/, /products/{category}/ and the power page
 *   - Related Products rows on other products (relevance-ranked)
 *   - <title>, meta description, canonical URL and Product JSON-LD
 *   - an entry in sitemap-0.xml
 *   - Home → Products → Category → {Power}W → Product breadcrumb
 *
 * Only `id`, `slug`, `name`, `category`, `productType`, `series`, `ratedPower`
 * and `images` are required. Everything else is optional and its section is
 * simply not rendered when the data is absent. Nothing is ever derived by
 * guessing a specification: derived copy may only recombine fields that exist
 * in the object itself.
 *
 * Ground rules for this file:
 *   - Only real, supplied data belongs here. Never invent values.
 *   - Unknown values stay "TBC"; unknown fields are simply omitted.
 *   - Fields that do not apply are omitted (or `null` for `series`), never
 *     filled with placeholder text.
 *   - Rated power is stored exactly once, as the numeric `ratedPower` field.
 *     The "Rated Power" row in the specification table is derived from it, so
 *     no display string for it belongs in `specifications`.
 *   - Optional-but-not-yet-available extras (certifications, applications,
 *     datasheet, faq) are omitted until real data arrives, so the site never
 *     asserts a certification or parameter that has not been supplied.
 *
 * Array order = the order products are listed in on /products/.
 *
 * Integrity (duplicate id / duplicate URL / non-numeric power / unknown
 * category) is checked at build time by assertCatalogIntegrity() in
 * src/lib/products.ts, so a bad row fails the build with the offending product
 * named instead of silently producing a broken link.
 * ============================================================================
 */
import type { CategorySlug } from '../lib/categories';

/** Category slugs are defined in src/lib/categories.ts and double as URL segments. */
export type ProductCategory = CategorySlug;

/**
 * Specification values, keyed by field.
 *
 * The key is stable; the human-readable label, group heading and display order
 * live in SPEC_FIELDS (src/lib/products.ts) so a label never has to be repeated
 * per product. Omit a key when the source material does not provide it.
 */
export interface ProductSpecifications {
  /*
   * NOTE: there is deliberately no `ratedPower` key here. The rated power lives
   * once, as the numeric `ratedPower` field on the product itself (it drives the
   * power-rating page URL), and the "Rated Power" row in the specification table
   * is derived from it — see toSpecRows() in src/lib/products.ts. Never re-add a
   * display string for it, or the two values can drift apart.
   */
  acOutput?: string;
  outputSockets?: string;
  dcInputVoltage?: string;
  display?: string;
  /** Only for USB-equipped models. */
  usb?: string;
  cooling?: string;
  /** Keeps "TBC" when the source material lists it as TBC. */
  dimensions?: string;
  netWeight?: string;
}

/** Shipping / carton data. Omit any key the source material does not provide. */
export interface ProductPackaging {
  packageDimensions?: string;
  grossWeight?: string;
  cartonQuantity?: string;
  cartonDimensions?: string;
  cartonWeight?: string;
  cartonInformation?: string;
}

/** Per-product lead-in copy for the inquiry CTA band. */
export interface ProductInquiry {
  /** Lead-in question shown as the CTA heading. */
  headline: string;
  /** Supporting sentence. */
  text?: string;
  /** Defaults to the site-wide "Request a Quote" label when omitted. */
  buttonText?: string;
}

export interface ProductSeo {
  title: string;
  description: string;
}

export interface Product {
  /** Product ID, e.g. "INV-001". Used in inquiry payloads and structured data. */
  id: string;
  /** URL segment: /products/{category}/{slug}/ — do not change after launch. */
  slug: string;
  name: string;
  /**
   * Card / hero lead-in sentence. Optional — when omitted the catalog composes
   * one from real fields (rated power + product type). Never put a
   * specification here that is not also in `specifications`.
   */
  shortDescription?: string;
  /** Overview paragraphs, rendered in order. Optional — the section hides when empty. */
  overview?: string[];

  category: ProductCategory;
  /** e.g. "Pure Sine Wave Off-Grid Inverter". */
  productType: string;
  /**
   * Manufacturer series (e.g. "P-Series", "1159-Series") — metadata only.
   * Series are never used as front-end categories. `null` when there is none.
   */
  series: string | null;
  /** Highlights the model on the homepage. At most four are shown. */
  featured?: boolean;
  /** Numeric rated power in W — drives the power-rating category pages. */
  ratedPower: number;

  specifications: ProductSpecifications;
  /** Optional — the Packaging Information section hides when absent. */
  packaging?: ProductPackaging;
  /** Optional — the Key Features section hides when empty. */
  features?: string[];

  /**
   * Image references. Either an optimised asset file name from
   * src/assets/products/, or a public path such as
   * "images/products/off-grid-inverters/<slug>/01.webp".
   * An empty array is valid — the gallery and cards render a placeholder.
   */
  images: string[];

  /** Optional — falls back to the site-wide CTA band copy when omitted. */
  inquiry?: ProductInquiry;
  /**
   * Optional. With no SEO copy supplied, the page title and meta description
   * are composed from the product's own real fields (name, rated power,
   * product type) — see resolveSeo() in src/lib/products.ts.
   */
  seo?: ProductSeo;

  /* --- Optional extras, only used when the data exists --- */
  topology?: string;
  applications?: string[];
  certifications?: string[];
  datasheet?: string;
  faq?: { question: string; answer: string }[];
  /**
   * Manual related-product override, by product ID.
   * Leave unset to let the relevance ranking in src/lib/products.ts decide.
   */
  relatedProducts?: string[];
}

/** The catalog. Order here is the order used on the /products/ listing. */
export const PRODUCTS: Product[] = [
  {
    id: "INV-001",
    slug: "900w-pure-sine-wave",
    name: "900W Pure Sine Wave Off-Grid Inverter",
    shortDescription: "A compact 900W pure sine wave off-grid inverter with digital display, a single AC output socket and intelligent temperature-controlled cooling.",

    overview: [
      "The 900W Pure Sine Wave Off-Grid Inverter is a compact power conversion solution designed for off-grid applications requiring stable AC power from a DC power source. It features a digital display, a single AC outlet and intelligent temperature-controlled cooling for practical and reliable operation.",
      "With multiple DC input voltage options and flexible AC output configurations, the inverter can be adapted to different application requirements and market needs.",
    ],

    category: "off-grid-inverters",
    productType: "Pure Sine Wave Off-Grid Inverter",
    series: null,
    featured: true,
    ratedPower: 900,

    specifications: {
      acOutput: "220V / 110V optional",
      outputSockets: "1",
      dcInputVoltage: "12V / 24V / 48V / 60V / 72V",
      display: "Digital Display",
      cooling: "Intelligent Temperature-Controlled Fan",
      dimensions: "23 × 10.8 × 6.5 cm",
      netWeight: "0.95 kg",
    },
    packaging: {
      packageDimensions: "31 × 15.5 × 7.5 cm",
      grossWeight: "1.33 kg",
      cartonQuantity: "16 units",
      cartonDimensions: "64 × 33 × 35 cm",
      cartonWeight: "22 kg",
    },

    features: [
      "900W rated power",
      "Pure sine wave output",
      "Multiple DC input voltage options",
      "Digital display for operating information",
      "Single AC output socket",
      "Intelligent temperature-controlled fan",
      "Aluminum alloy housing for heat dissipation",
      "AC 220V / 110V output options available",
    ],

    // Real photos go to public/images/products/off-grid-inverters/<slug>/
    // then reference them here, e.g. "images/products/off-grid-inverters/<slug>/01.webp"
    images: [],

    inquiry: {
      headline: "Looking for a compact off-grid inverter for your market?",
      text: "Contact us for product details, available configurations and quotation.",
    },

    seo: {
      title: "900W Pure Sine Wave Off-Grid Inverter",
      description: "900W pure sine wave off-grid inverter with digital display, one AC output socket and 12V / 24V / 48V / 60V / 72V DC input options. 220V or 110V AC output available. Contact us for configurations and quotation.",
    },
  },
  {
    id: "INV-002",
    slug: "1800w-p-series",
    name: "1800W P-Series Pure Sine Wave Off-Grid Inverter",
    shortDescription: "A 1800W P-Series pure sine wave off-grid inverter with LCD smart display, four AC output sockets and intelligent temperature-controlled cooling.",

    overview: [
      "The 1800W P-Series Pure Sine Wave Off-Grid Inverter provides higher power output in a compact form factor for a wide range of off-grid power applications. It features an LCD smart display, four AC output sockets and intelligent temperature-controlled cooling.",
      "Multiple DC input voltage options and flexible output configurations make this inverter suitable for different market and application requirements.",
    ],

    category: "off-grid-inverters",
    productType: "Pure Sine Wave Off-Grid Inverter",
    series: "P-Series",
    featured: true,
    ratedPower: 1800,

    specifications: {
      acOutput: "220V / 110V optional",
      outputSockets: "4",
      dcInputVoltage: "12V / 24V / 48V / 60V / 72V",
      display: "LCD Smart Display",
      cooling: "Intelligent Temperature-Controlled Fan",
      dimensions: "26 × 18.5 × 11.5 cm",
      netWeight: "2.8 kg",
    },
    packaging: {
      packageDimensions: "36.5 × 25 × 18 cm",
      grossWeight: "3.6 kg",
      cartonQuantity: "4 units",
      cartonDimensions: "53 × 38 × 40.5 cm",
      cartonWeight: "15.5 kg",
    },

    features: [
      "1800W rated power",
      "Pure sine wave output",
      "P-Series design",
      "Multiple DC input voltage options",
      "LCD smart display",
      "Four AC output sockets",
      "Intelligent temperature-controlled fan",
      "Flexible output voltage options",
    ],

    // Real photos go to public/images/products/off-grid-inverters/<slug>/
    // then reference them here, e.g. "images/products/off-grid-inverters/<slug>/01.webp"
    images: [],

    inquiry: {
      headline: "Need a higher-power off-grid inverter for your application?",
      text: "Contact us to discuss specifications, configurations and bulk supply requirements.",
    },

    seo: {
      title: "1800W P-Series Pure Sine Wave Off-Grid Inverter",
      description: "1800W P-Series pure sine wave off-grid inverter with LCD smart display, four AC output sockets and 12V / 24V / 48V / 60V / 72V DC input options. 220V or 110V AC output. Bulk supply and configuration details on request.",
    },
  },
  {
    id: "INV-003",
    slug: "2500w-p-series",
    name: "2500W P-Series Pure Sine Wave Off-Grid Inverter",
    shortDescription: "A 2500W P-Series pure sine wave off-grid inverter with LCD smart display, four AC output sockets and intelligent temperature-controlled cooling.",

    overview: [
      "The 2500W P-Series Pure Sine Wave Off-Grid Inverter is designed for off-grid applications requiring increased power capacity and flexible DC input options. The inverter features an LCD smart display, four AC output sockets and intelligent temperature-controlled cooling.",
      "Its practical configuration supports a variety of off-grid power applications and different market requirements.",
    ],

    category: "off-grid-inverters",
    productType: "Pure Sine Wave Off-Grid Inverter",
    series: "P-Series",
    ratedPower: 2500,

    specifications: {
      acOutput: "220V / 110V optional",
      outputSockets: "4",
      dcInputVoltage: "12V / 24V / 48V / 60V / 72V",
      display: "LCD Smart Display",
      cooling: "Intelligent Temperature-Controlled Fan",
      dimensions: "30 × 18.5 × 11.5 cm",
      netWeight: "3.4 kg",
    },
    packaging: {
      packageDimensions: "42 × 25.5 × 18 cm",
      grossWeight: "4.0 kg",
      cartonQuantity: "4 units",
      cartonDimensions: "53 × 44 × 41 cm",
      cartonWeight: "17.1 kg",
    },

    features: [
      "2500W rated power",
      "Pure sine wave output",
      "P-Series design",
      "Multiple DC input voltage options",
      "LCD smart display",
      "Four AC output sockets",
      "Intelligent temperature-controlled fan",
      "Flexible output voltage options",
    ],

    // Real photos go to public/images/products/off-grid-inverters/<slug>/
    // then reference them here, e.g. "images/products/off-grid-inverters/<slug>/01.webp"
    images: [],

    inquiry: {
      headline: "Looking for a 2500W off-grid inverter for your market?",
      text: "Contact us for configuration details, bulk pricing and supply information.",
    },

    seo: {
      title: "2500W P-Series Pure Sine Wave Off-Grid Inverter",
      description: "2500W P-Series pure sine wave off-grid inverter with LCD smart display, four AC output sockets and 12V / 24V / 48V / 60V / 72V DC input options. 220V or 110V AC output. Bulk pricing and configuration details on request.",
    },
  },
  {
    id: "INV-004",
    slug: "3000w-p-series",
    name: "3000W P-Series Pure Sine Wave Off-Grid Inverter",
    shortDescription: "A 3000W P-Series pure sine wave off-grid inverter with LCD smart display, four AC output sockets and intelligent temperature-controlled cooling.",

    overview: [
      "The 3000W P-Series Pure Sine Wave Off-Grid Inverter is designed for off-grid applications requiring higher output power. It combines a pure sine wave output with an LCD smart display, four AC output sockets and intelligent temperature-controlled cooling.",
      "The inverter is available with multiple DC input voltage options and can be configured according to different market requirements.",
    ],

    category: "off-grid-inverters",
    productType: "Pure Sine Wave Off-Grid Inverter",
    series: "P-Series",
    ratedPower: 3000,

    specifications: {
      acOutput: "220V / 110V optional",
      outputSockets: "4",
      dcInputVoltage: "12V / 24V / 48V / 60V / 72V",
      display: "LCD Smart Display",
      cooling: "Intelligent Temperature-Controlled Fan",
      dimensions: "35.5 × 18.5 × 11.5 cm",
      netWeight: "4.2 kg",
    },
    packaging: {
      packageDimensions: "48.5 × 25.5 × 18 cm",
      grossWeight: "5.2 kg",
      cartonQuantity: "2 or 4 units",
      cartonInformation: "Available in different packing configurations",
    },

    features: [
      "3000W rated power",
      "Pure sine wave output",
      "P-Series design",
      "Multiple DC input voltage options",
      "LCD smart display",
      "Four AC output sockets",
      "Intelligent temperature-controlled fan",
      "Flexible output voltage options",
    ],

    // Real photos go to public/images/products/off-grid-inverters/<slug>/
    // then reference them here, e.g. "images/products/off-grid-inverters/<slug>/01.webp"
    images: [],

    inquiry: {
      headline: "Need a 3000W off-grid inverter for your next project or product line?",
      text: "Contact us to discuss available configurations and bulk supply options.",
    },

    seo: {
      title: "3000W P-Series Pure Sine Wave Off-Grid Inverter",
      description: "3000W P-Series pure sine wave off-grid inverter with LCD smart display, four AC output sockets and 12V / 24V / 48V / 60V / 72V DC input options. 220V or 110V AC output. Bulk supply on request.",
    },
  },
  {
    id: "INV-005",
    slug: "4000w-1159-series",
    name: "4000W 1159-Series Pure Sine Wave Off-Grid Inverter",
    shortDescription: "A 4000W 1159-Series pure sine wave off-grid inverter with LCD smart display, four AC output sockets and intelligent temperature-controlled cooling.",

    overview: [
      "The 4000W 1159-Series Pure Sine Wave Off-Grid Inverter is designed for off-grid applications requiring higher power output. It features an LCD smart display, four AC output sockets and intelligent temperature-controlled cooling.",
      "With multiple DC input voltage options and flexible AC output configurations, it can be adapted to different application and market requirements.",
    ],

    category: "off-grid-inverters",
    productType: "Pure Sine Wave Off-Grid Inverter",
    series: "1159-Series",
    ratedPower: 4000,

    specifications: {
      acOutput: "220V / 110V optional",
      outputSockets: "4",
      dcInputVoltage: "12V / 24V / 48V / 60V / 72V",
      display: "LCD Smart Display",
      cooling: "Intelligent Temperature-Controlled Fan",
      dimensions: "42.5 × 18.5 × 11.5 cm",
      netWeight: "4.9 kg",
    },
    packaging: {
      packageDimensions: "55 × 25.5 × 18 cm",
      grossWeight: "6.0 kg",
      cartonQuantity: "2 or 4 units",
      cartonInformation: "Available in different packing configurations",
    },

    features: [
      "4000W rated power",
      "Pure sine wave output",
      "1159-Series design",
      "Multiple DC input voltage options",
      "LCD smart display",
      "Four AC output sockets",
      "Intelligent temperature-controlled fan",
      "Flexible AC output options",
    ],

    // Real photos go to public/images/products/off-grid-inverters/<slug>/
    // then reference them here, e.g. "images/products/off-grid-inverters/<slug>/01.webp"
    images: [],

    inquiry: {
      headline: "Looking for a high-power off-grid inverter for your market?",
      text: "Contact us for detailed specifications, configuration options and quotation.",
    },

    seo: {
      title: "4000W 1159-Series Pure Sine Wave Off-Grid Inverter",
      description: "4000W pure sine wave off-grid inverter with LCD smart display, four AC output sockets and 12V / 24V / 48V / 60V / 72V DC input options. 220V or 110V AC output. Configuration options and quotation on request.",
    },
  },
  {
    id: "INV-006",
    slug: "5000w-1159-series",
    name: "5000W 1159-Series Pure Sine Wave Off-Grid Inverter",
    shortDescription: "A 5000W 1159-Series pure sine wave off-grid inverter with LCD smart display, two AC output sockets and intelligent temperature-controlled cooling.",

    overview: [
      "The 5000W 1159-Series Pure Sine Wave Off-Grid Inverter is a high-power solution for off-grid applications requiring greater AC power output. It features an LCD smart display, two AC output sockets and intelligent temperature-controlled cooling.",
      "The inverter supports multiple DC input voltage options and can be configured for different market requirements.",
    ],

    category: "off-grid-inverters",
    productType: "Pure Sine Wave Off-Grid Inverter",
    series: "1159-Series",
    featured: true,
    ratedPower: 5000,

    specifications: {
      acOutput: "220V / 110V optional",
      outputSockets: "2",
      dcInputVoltage: "24V / 48V / 60V / 72V",
      display: "LCD Smart Display",
      cooling: "Intelligent Temperature-Controlled Fan",
      dimensions: "40.6 × 20.8 × 9.7 cm",
      netWeight: "6.3 kg",
    },
    packaging: {
      packageDimensions: "53 × 28.6 × 18 cm",
      grossWeight: "7.06 kg",
      cartonQuantity: "3 units",
      cartonDimensions: "54.5 × 30 × 56 cm",
      cartonWeight: "22.5 kg",
    },

    features: [
      "5000W rated power",
      "Pure sine wave output",
      "1159-Series design",
      "Multiple DC input voltage options",
      "LCD smart display",
      "Two AC output sockets",
      "Intelligent temperature-controlled fan",
      "Compact aluminum housing",
    ],

    // Real photos go to public/images/products/off-grid-inverters/<slug>/
    // then reference them here, e.g. "images/products/off-grid-inverters/<slug>/01.webp"
    images: [],

    inquiry: {
      headline: "Need a 5000W off-grid inverter for higher-power applications?",
      text: "Contact us to discuss product configuration, bulk orders and supply requirements.",
    },

    seo: {
      title: "5000W 1159-Series Pure Sine Wave Off-Grid Inverter",
      description: "5000W pure sine wave off-grid inverter with LCD smart display, two AC output sockets and 24V / 48V / 60V / 72V DC input options. 220V or 110V AC output. Bulk orders and configuration details on request.",
    },
  },
  {
    id: "INV-007",
    slug: "1800w-p-series-usb",
    name: "1800W P-Series Pure Sine Wave Off-Grid Inverter with USB",
    shortDescription: "A 1800W P-Series pure sine wave off-grid inverter with USB, LCD smart display, two AC output sockets and intelligent temperature-controlled cooling.",

    overview: [
      "The 1800W P-Series Pure Sine Wave Off-Grid Inverter with USB combines pure sine wave AC output with a practical USB-equipped configuration for off-grid power applications.",
      "It features an LCD smart display, two AC output sockets and intelligent temperature-controlled cooling. Multiple DC input voltage options provide flexibility for different applications and markets.",
    ],

    category: "off-grid-inverters",
    productType: "Pure Sine Wave Off-Grid Inverter",
    series: "P-Series",
    ratedPower: 1800,

    specifications: {
      acOutput: "220V / 110V optional",
      outputSockets: "2",
      dcInputVoltage: "12V / 24V / 48V / 60V / 72V",
      display: "LCD Smart Display",
      usb: "Yes",
      cooling: "Intelligent Temperature-Controlled Fan",
      dimensions: "TBC",
      netWeight: "3.0 kg",
    },
    packaging: {
      packageDimensions: "36.5 × 25 × 18 cm",
      grossWeight: "3.8 kg",
      cartonQuantity: "4 units",
      cartonDimensions: "53 × 38 × 40.5 cm",
      cartonWeight: "16.5 kg",
    },

    features: [
      "1800W rated power",
      "Pure sine wave output",
      "P-Series design",
      "USB-equipped configuration",
      "Multiple DC input voltage options",
      "LCD smart display",
      "Two AC output sockets",
      "Intelligent temperature-controlled fan",
    ],

    // Real photos go to public/images/products/off-grid-inverters/<slug>/
    // then reference them here, e.g. "images/products/off-grid-inverters/<slug>/01.webp"
    images: [],

    inquiry: {
      headline: "Looking for an off-grid inverter with USB functionality?",
      text: "Contact us for product details, available configurations and bulk supply information.",
    },

    seo: {
      title: "1800W P-Series Pure Sine Wave Off-Grid Inverter with USB",
      description: "1800W P-Series pure sine wave off-grid inverter with USB, LCD smart display, two AC output sockets and 12V / 24V / 48V / 60V / 72V DC input options. 220V or 110V AC output. Bulk supply on request.",
    },
  },
  {
    id: "INV-008",
    slug: "2500w-p-series-usb",
    name: "2500W P-Series Pure Sine Wave Off-Grid Inverter with USB",
    shortDescription: "A 2500W P-Series pure sine wave off-grid inverter with USB, LCD smart display, two AC output sockets and intelligent temperature-controlled cooling.",

    overview: [
      "The 2500W P-Series Pure Sine Wave Off-Grid Inverter with USB provides higher power output together with a practical USB-equipped configuration for off-grid applications.",
      "It features an LCD smart display, two AC output sockets and intelligent temperature-controlled cooling. Multiple DC input voltage options support flexible application requirements.",
    ],

    category: "off-grid-inverters",
    productType: "Pure Sine Wave Off-Grid Inverter",
    series: "P-Series",
    ratedPower: 2500,

    specifications: {
      acOutput: "220V / 110V optional",
      outputSockets: "2",
      dcInputVoltage: "12V / 24V / 48V / 60V / 72V",
      display: "LCD Smart Display",
      usb: "Yes",
      cooling: "Intelligent Temperature-Controlled Fan",
      dimensions: "TBC",
      netWeight: "3.54 kg",
    },
    packaging: {
      packageDimensions: "42 × 25.5 × 18 cm",
      grossWeight: "4.3 kg",
      cartonQuantity: "4 units",
      cartonDimensions: "53 × 44 × 41 cm",
      cartonWeight: "18.3 kg",
    },

    features: [
      "2500W rated power",
      "Pure sine wave output",
      "P-Series design",
      "USB-equipped configuration",
      "Multiple DC input voltage options",
      "LCD smart display",
      "Two AC output sockets",
      "Intelligent temperature-controlled fan",
    ],

    // Real photos go to public/images/products/off-grid-inverters/<slug>/
    // then reference them here, e.g. "images/products/off-grid-inverters/<slug>/01.webp"
    images: [],

    inquiry: {
      headline: "Need a higher-power off-grid inverter with USB functionality?",
      text: "Contact us for specifications, configuration options and quotation.",
    },

    seo: {
      title: "2500W P-Series Pure Sine Wave Off-Grid Inverter with USB",
      description: "2500W P-Series pure sine wave off-grid inverter with USB, LCD smart display, two AC output sockets and 12V / 24V / 48V / 60V / 72V DC input options. 220V or 110V AC output. Quotation on request.",
    },
  },
  {
    id: "INV-009",
    slug: "3000w-p-series-usb",
    name: "3000W P-Series Pure Sine Wave Off-Grid Inverter with USB",
    shortDescription: "A 3000W P-Series pure sine wave off-grid inverter with USB, LCD smart display, two AC output sockets and intelligent temperature-controlled cooling.",

    overview: [
      "The 3000W P-Series Pure Sine Wave Off-Grid Inverter with USB is designed for off-grid applications requiring higher power output and convenient USB functionality.",
      "It features an LCD smart display, two AC output sockets and intelligent temperature-controlled cooling, with multiple DC input voltage options for different application requirements.",
    ],

    category: "off-grid-inverters",
    productType: "Pure Sine Wave Off-Grid Inverter",
    series: "P-Series",
    featured: true,
    ratedPower: 3000,

    specifications: {
      acOutput: "220V / 110V optional",
      outputSockets: "2",
      dcInputVoltage: "12V / 24V / 48V / 60V / 72V",
      display: "LCD Smart Display",
      usb: "Yes",
      cooling: "Intelligent Temperature-Controlled Fan",
      dimensions: "TBC",
      netWeight: "4.25 kg",
    },
    packaging: {
      packageDimensions: "48.5 × 25.5 × 18 cm",
      grossWeight: "5.3 kg",
      cartonQuantity: "2 or 4 units",
      cartonInformation: "Available in different packing configurations",
    },

    features: [
      "3000W rated power",
      "Pure sine wave output",
      "P-Series design",
      "USB-equipped configuration",
      "Multiple DC input voltage options",
      "LCD smart display",
      "Two AC output sockets",
      "Intelligent temperature-controlled fan",
    ],

    // Real photos go to public/images/products/off-grid-inverters/<slug>/
    // then reference them here, e.g. "images/products/off-grid-inverters/<slug>/01.webp"
    images: [],

    inquiry: {
      headline: "Looking for a 3000W off-grid inverter with USB functionality?",
      text: "Contact us to discuss product specifications, configurations and bulk supply.",
    },

    seo: {
      title: "3000W P-Series Pure Sine Wave Off-Grid Inverter with USB",
      description: "3000W P-Series pure sine wave off-grid inverter with USB, LCD smart display, two AC output sockets and 12V / 24V / 48V / 60V / 72V DC input options. 220V or 110V AC output. Bulk supply on request.",
    },
  },
  {
    id: "INV-010",
    slug: "1900w-multi-voltage",
    name: "1900W Multi-Voltage Pure Sine Wave Off-Grid Inverter",
    shortDescription: "A 1900W multi-voltage pure sine wave off-grid inverter with 48V / 60V / 72V DC input, voltage selector switch, LCD display and three AC output sockets.",

    overview: [
      "The 1900W Multi-Voltage Pure Sine Wave Off-Grid Inverter is designed for applications requiring compatibility with multiple DC input voltage levels. It supports 48V, 60V and 72V input configurations and features a voltage selector switch for practical operation.",
      "The inverter includes an LCD display, three AC output sockets and intelligent temperature-controlled cooling.",
    ],

    category: "off-grid-inverters",
    productType: "Pure Sine Wave Off-Grid Inverter",
    series: null,
    ratedPower: 1900,

    specifications: {
      acOutput: "220V optional",
      outputSockets: "3",
      dcInputVoltage: "48V / 60V / 72V",
      display: "LCD Display",
      cooling: "Intelligent Temperature-Controlled Fan",
      dimensions: "25 × 16.2 × 8 cm",
      netWeight: "Approx. 2.2 kg",
    },
    packaging: {
      packageDimensions: "38 × 20.5 × 17 cm",
      grossWeight: "Approx. 2.65 kg",
    },

    features: [
      "1900W rated power",
      "Pure sine wave output",
      "48V / 60V / 72V DC input options",
      "DC voltage selector switch",
      "LCD display",
      "Three AC output sockets",
      "Intelligent temperature-controlled fan",
      "Flexible AC socket options",
    ],

    // Real photos go to public/images/products/off-grid-inverters/<slug>/
    // then reference them here, e.g. "images/products/off-grid-inverters/<slug>/01.webp"
    images: [],

    inquiry: {
      headline: "Need a multi-voltage off-grid inverter for your market?",
      text: "Contact us to discuss voltage configurations, socket options and bulk supply.",
    },

    seo: {
      title: "1900W Multi-Voltage Pure Sine Wave Off-Grid Inverter",
      description: "1900W multi-voltage pure sine wave off-grid inverter supporting 48V / 60V / 72V DC input with voltage selector switch, LCD display and three AC output sockets. 220V AC output. Bulk supply on request.",
    },
  },
  {
    id: "INV-011",
    slug: "2300w-multi-voltage",
    name: "2300W Multi-Voltage Pure Sine Wave Off-Grid Inverter",
    shortDescription: "A 2300W multi-voltage pure sine wave off-grid inverter with 48V / 60V / 72V DC input, voltage selector switch, LCD display and three AC output sockets.",

    overview: [
      "The 2300W Multi-Voltage Pure Sine Wave Off-Grid Inverter is designed for off-grid applications requiring flexible DC input voltage options. It supports 48V, 60V and 72V configurations and features a voltage selector switch for practical operation.",
      "An LCD display, three AC output sockets and intelligent temperature-controlled cooling provide a practical configuration for a variety of off-grid applications.",
    ],

    category: "off-grid-inverters",
    productType: "Pure Sine Wave Off-Grid Inverter",
    series: null,
    ratedPower: 2300,

    specifications: {
      acOutput: "220V optional",
      outputSockets: "3",
      dcInputVoltage: "48V / 60V / 72V",
      display: "LCD Display",
      cooling: "Intelligent Temperature-Controlled Fan",
      dimensions: "25.5 × 17.8 × 9.6 cm",
      netWeight: "Approx. 2.67 kg",
    },
    packaging: {
      packageDimensions: "36.5 × 25 × 18 cm",
      grossWeight: "3.2 kg",
      cartonQuantity: "4 units",
      cartonDimensions: "53 × 38 × 40.5 cm",
      cartonWeight: "13.8 kg",
    },

    features: [
      "2300W rated power",
      "Pure sine wave output",
      "48V / 60V / 72V DC input options",
      "DC voltage selector switch",
      "LCD display",
      "Three AC output sockets",
      "Intelligent temperature-controlled fan",
      "Flexible AC socket options",
    ],

    // Real photos go to public/images/products/off-grid-inverters/<slug>/
    // then reference them here, e.g. "images/products/off-grid-inverters/<slug>/01.webp"
    images: [],

    inquiry: {
      headline: "Looking for flexible DC voltage options in an off-grid inverter?",
      text: "Contact us for configuration details, socket options and bulk quotation.",
    },

    seo: {
      title: "2300W Multi-Voltage Pure Sine Wave Off-Grid Inverter",
      description: "2300W multi-voltage pure sine wave off-grid inverter supporting 48V / 60V / 72V DC input with voltage selector switch, LCD display and three AC output sockets. 220V AC output. Bulk quotation on request.",
    },
  },
  {
    id: "INV-012",
    slug: "3200w-multi-voltage",
    name: "3200W Multi-Voltage Pure Sine Wave Off-Grid Inverter",
    shortDescription: "A 3200W multi-voltage pure sine wave off-grid inverter with 48V / 60V / 72V DC input, voltage selector switch, LCD display and three AC output sockets.",

    overview: [
      "The 3200W Multi-Voltage Pure Sine Wave Off-Grid Inverter is designed for higher-power off-grid applications requiring flexible DC input voltage options. It supports 48V, 60V and 72V configurations and features a voltage selector switch.",
      "The inverter combines an LCD display, three AC output sockets and intelligent temperature-controlled cooling in a practical configuration for different market requirements.",
    ],

    category: "off-grid-inverters",
    productType: "Pure Sine Wave Off-Grid Inverter",
    series: null,
    ratedPower: 3200,

    specifications: {
      acOutput: "220V optional",
      outputSockets: "3",
      dcInputVoltage: "48V / 60V / 72V",
      display: "LCD Display",
      cooling: "Intelligent Temperature-Controlled Fan",
      dimensions: "28.5 × 17.8 × 9.6 cm",
      netWeight: "Approx. 3.2 kg",
    },
    packaging: {
      packageDimensions: "42.5 × 25 × 18 cm",
      grossWeight: "3.8 kg",
      cartonQuantity: "4 units",
      cartonDimensions: "53 × 44 × 41 cm",
      cartonWeight: "16.3 kg",
    },

    features: [
      "3200W rated power",
      "Pure sine wave output",
      "48V / 60V / 72V DC input options",
      "DC voltage selector switch",
      "LCD display",
      "Three AC output sockets",
      "Intelligent temperature-controlled fan",
      "Flexible AC socket options",
    ],

    // Real photos go to public/images/products/off-grid-inverters/<slug>/
    // then reference them here, e.g. "images/products/off-grid-inverters/<slug>/01.webp"
    images: [],

    inquiry: {
      headline: "Need a higher-power multi-voltage off-grid inverter?",
      text: "Contact us to discuss available configurations, socket options and bulk supply requirements.",
    },

    seo: {
      title: "3200W Multi-Voltage Pure Sine Wave Off-Grid Inverter",
      description: "3200W multi-voltage pure sine wave off-grid inverter supporting 48V / 60V / 72V DC input with voltage selector switch, LCD display and three AC output sockets. 220V AC output. Bulk supply on request.",
    },
  },
];
