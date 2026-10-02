/**
 * Product category metadata.
 * Category slugs define the URL structure and must never change
 * after launch (301 redirects would be required).
 */

/** The single source of truth for category slugs (also typed as a union). */
export const CATEGORY_SLUGS = [
  'hybrid-inverters',
  'grid-tie-inverters',
  'off-grid-inverters',
  'off-grid-solar-inverters',
  'accessories',
] as const;

export type CategorySlug = (typeof CATEGORY_SLUGS)[number];

export interface Category {
  slug: CategorySlug;
  name: string;
  /**
   * Singular form used in generated copy, e.g. the power-page title
   * "1800W Off-Grid Inverter" when a rating holds exactly one model.
   * Falls back to `name` when it is not supplied.
   */
  singularName?: string;
  heading: string;
  description: string;
  powerRange: string;
}

/**
 * Category order here is the order the categories appear in the header,
 * the catalog listing and the sitemap.
 *
 * The off-grid range is deliberately split in two, following the standard
 * inverter taxonomy: the separating axis is whether the unit has a BUILT-IN
 * SOLAR CHARGE CONTROLLER (MPPT/PWM) — not "MPPT" itself, which is only one
 * implementation of that controller.
 *
 *   off-grid-inverters        standalone DC-to-AC inverters, no PV input
 *   off-grid-solar-inverters  PV input + battery charging + AC output
 *
 * A unit that can also export to the grid would be a hybrid inverter and
 * belongs in `hybrid-inverters` — do not move a model there without
 * grid-interaction data (see docs/product-taxonomy.md).
 */
export const CATEGORIES: Category[] = [
  {
    slug: 'hybrid-inverters',
    name: 'Hybrid Inverters',
    heading: 'Hybrid Solar Inverters',
    description:
      'Combine solar conversion, battery charging and grid interaction in a single unit. Ideal for residential and commercial energy storage systems.',
    powerRange: '3–12 kW',
  },
  {
    slug: 'grid-tie-inverters',
    name: 'Grid-Tie Inverters',
    heading: 'Grid-Tie Solar Inverters',
    description:
      'High-efficiency string inverters for on-grid PV systems, from residential rooftops to commercial and industrial solar plants.',
    powerRange: '3–50 kW',
  },
  {
    slug: 'off-grid-inverters',
    name: 'Off-Grid Inverters',
    singularName: 'Off-Grid Inverter',
    heading: 'Off-Grid Power Inverters',
    description:
      'Pure sine wave standalone inverters for battery-based off-grid systems. DC-to-AC conversion without a built-in solar charge controller — pair with an external charger or solar controller.',
    powerRange: '0.9–5 kW',
  },
  {
    slug: 'off-grid-solar-inverters',
    name: 'Off-Grid Solar Inverters',
    singularName: 'Off-Grid Solar Inverter',
    heading: 'Off-Grid Solar Inverters',
    description:
      'Off-grid solar inverters with a built-in MPPT charge controller, combining PV input, battery charging and pure sine wave AC output in one wall-mount unit.',
    powerRange: '1.5–11 kW',
  },
  {
    slug: 'accessories',
    name: 'Inverter Accessories',
    heading: 'Inverter Accessories',
    description:
      'Wi-Fi dongles, communication modules, cables and mounting kits that complete your inverter installation.',
    powerRange: '—',
  },
];

export function getCategory(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}
