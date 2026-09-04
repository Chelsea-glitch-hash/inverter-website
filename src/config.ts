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
  /** TODO: international format, digits only, e.g. 8613800000000 */
  whatsapp: '',
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

/** Cloudflare Turnstile site key (public, client-side widget). */
export const TURNSTILE = {
  /** TODO: from Cloudflare dashboard -> Turnstile -> Widgets */
  siteKey: '',
};

export const SOCIAL = {
  linkedin: '',
  youtube: '',
};
