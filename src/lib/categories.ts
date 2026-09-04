/**
 * Product category metadata.
 * Category slugs define the URL structure and must never change
 * after launch (301 redirects would be required).
 */

export interface Category {
  slug: string;
  name: string;
  heading: string;
  description: string;
  powerRange: string;
}

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
    heading: 'Off-Grid Power Inverters',
    description:
      'Pure sine wave inverters for standalone power systems — telecom base stations, rural electrification and backup power.',
    powerRange: '1–10 kW',
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
