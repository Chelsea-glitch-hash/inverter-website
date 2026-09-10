/**
 * Site-wide configuration - single source of truth.
 *
 * TODO(launch): Replace every placeholder below with real values.
 * Public-facing values only. Secrets live in Cloudflare Pages
 * environment variables (see .env.example).
 */

export const SITE = {
  /** TODO: real company name, e.g. "Huayihai Technology Co., Ltd." */
  name: 'Your Company Name',
  /** TODO: short brand name used in header/logo, e.g. "Huayihai" */
  shortName: 'BrandCo',
  tagline: 'B2B Inverter Manufacturer',
  /** TODO: must match astro.config.mjs `site` */
  url: 'https://www.your-domain.com',
  /** Default SEO title suffix */
  titleSuffix: ' | Your Company Name',
};

export const COMPANY = {
  legalName: 'Your Company Co., Ltd.',
  foundedYear: 2010,
  factoryAreaSqm: 12000,
  annualCapacityUnits: 200000,
  employees: 300,
  rdEngineers: 40,
  exportCountries: 60,
  oemClients: 120,
  address: 'TODO: full factory address, City, Province, China',
};

export const CONTACT = {
  /** TODO: sales inbox shown on the website */
  email: 'sales@your-domain.com',
  /**
   * International format, digits only - no "+", spaces or dashes.
   * Used verbatim to build wa.me links: https://wa.me/<whatsapp>
   */
  whatsapp: '8618923094074',
  phone: '+86-000-0000-0000',
};

/** Analytics configuration */
export const ANALYTICS = {
  /**
   * TODO: GA4 Measurement ID, e.g. "G-XXXXXXXXXX".
   * Leave empty to disable GA4 entirely (e.g. during development).
   */
  ga4MeasurementId: '',
};

/** Chat widget configuration. Phase 1 = front-end UI only (no AI backend). */
export const CHAT = {
  /** Master switch - set false to hide the widget site-wide. */
  enabled: true,
};

/** Cloudflare Turnstile site key (public, client-side widget). */
export const TURNSTILE = {
  /** TODO: from Cloudflare dashboard -> Turnstile -> Widgets */
  siteKey: '0x4AAAAAAEow16pcFLjiXJag',
};

export const SOCIAL = {
  linkedin: '',
  youtube: '',
};
