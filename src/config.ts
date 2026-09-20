/**
 * Site-wide configuration - single source of truth.
 *
 * Public-facing values only. Secrets live in Cloudflare Pages environment
 * variables (see .env.example) and must never be added to this file: anything
 * here is compiled into the browser bundle.
 *
 * Still placeholders, awaiting real values from the client (do NOT invent):
 *   - SITE.url        production domain (also astro.config.mjs `site`
 *                     and the canonical URLs / sitemap)
 *   - COMPANY.*       founding year, factory area, capacity, employee counts,
 *                     export countries, OEM client count, registered address
 *   - CONTACT.phone   the phone number published on the contact page
 *   - ANALYTICS.ga4MeasurementId  GA4 property id
 */

export const SITE = {
  name: 'Zhongze Huasong',
  shortName: 'Zhongze Huasong',
  tagline: 'B2B Inverter Manufacturer',
  /** TODO: must match astro.config.mjs `site`. */
  url: 'https://www.your-domain.com',
  /** Default SEO title suffix */
  titleSuffix: ' | Zhongze Huasong',
};

export const COMPANY = {
  legalName: 'Shenzhen Zhongze Huasong Trading Co., Ltd.',
  /** TODO: unverified — confirm before launch, these are shown as company facts. */
  foundedYear: 2010,
  factoryAreaSqm: 12000,
  annualCapacityUnits: 200000,
  employees: 300,
  rdEngineers: 40,
  exportCountries: 60,
  oemClients: 120,
  /** TODO: full registered address, City, Province, China */
  address: 'TODO: full factory address, City, Province, China',
};

export const CONTACT = {
  /** Sales inbox shown on the website. */
  email: 'chelsea@zzpine.com',
  /**
   * International format, digits only - no "+", spaces or dashes.
   * Used verbatim to build wa.me links: https://wa.me/<whatsapp>
   */
  whatsapp: '8618923094074',
  /** TODO: published phone number for the contact page. */
  phone: '+86-000-0000-0000',
};

/**
 * Human-readable form of a digits-only WhatsApp number, e.g.
 * "8618923094074" -> "+86 189 2309 4074".
 *
 * Only a presentation helper — the digits-only value above stays the single
 * source of truth. Country codes are matched longest-first from a short list;
 * a number whose code is not listed is returned as "+<digits>" rather than
 * guessed at and mis-grouped.
 */
const WHATSAPP_COUNTRY_CODES = [
  '880', '886', '852', '853', '855', '856',
  '1', '7', '20', '27', '30', '31', '32', '33', '34', '36', '39', '40',
  '41', '43', '44', '45', '46', '47', '48', '49', '51', '52', '53', '54',
  '55', '56', '57', '58', '60', '61', '62', '63', '64', '65', '66', '81',
  '82', '84', '86', '90', '91', '92', '93', '94', '95', '98', '212', '213',
  '216', '218', '220', '221', '222', '223', '224', '225', '226', '227',
  '228', '229', '230', '231', '232', '233', '234', '235', '236', '237',
  '238', '239', '240', '241', '242', '243', '244', '245', '246', '248',
  '249', '250', '251', '252', '253', '254', '255', '256', '257', '258',
  '260', '261', '262', '263', '264', '265', '266', '267', '268', '269',
  '297', '298', '299', '350', '351', '352', '353', '354', '355', '356',
  '357', '358', '359', '370', '371', '372', '373', '374', '375', '376',
  '377', '378', '379', '380', '381', '382', '383', '385', '386', '387',
  '389', '420', '421', '423', '500', '501', '502', '503', '504', '505',
  '506', '507', '509', '591', '592', '593', '594', '595', '596', '597',
  '598', '599', '670', '673', '674', '675', '676', '677', '678', '679',
  '680', '681', '682', '683', '685', '686', '687', '688', '689', '690',
  '691', '692', '850', '960', '961', '962', '963', '964', '965', '966',
  '967', '968', '970', '971', '972', '973', '974', '975', '976', '977',
  '992', '993', '994', '995', '996', '998',
];

export function whatsappDisplay(digits: string): string {
  const value = digits.replace(/\D/g, '');
  if (value === '') return '';

  const code =
    WHATSAPP_COUNTRY_CODES.filter((candidate) => value.startsWith(candidate)).sort(
      (a, b) => b.length - a.length
    )[0] ?? '';

  const national = code ? value.slice(code.length) : value;
  if (!code || national.length < 9 || national.length > 11) return `+${value}`;

  const groups = [national.slice(0, 3)];
  for (let i = 3; i < national.length; i += 4) groups.push(national.slice(i, i + 4));
  return `+${code} ${groups.join(' ')}`;
}

/** Analytics configuration */
export const ANALYTICS = {
  /**
   * TODO: GA4 Measurement ID, e.g. "G-XXXXXXXXXX".
   * Leave empty to disable GA4 entirely (e.g. during development).
   */
  ga4MeasurementId: '',
};

/**
 * Chat widget configuration — PUBLIC values only.
 *
 * The widget itself is front-end only; anything that must stay secret (the AI
 * provider key, the model id, the system prompt) lives in Cloudflare Pages
 * environment variables and is read by functions/api/chat.ts.
 */
export const CHAT = {
  /** Master switch - set false to hide the widget site-wide. */
  enabled: true,
  /** Show the unconsumed badge and the proactive teaser before the first open. */
  proactive: true,
  /** Render tappable quick-reply chips under assistant messages. */
  quickReplies: true,
  /**
   * Opening line, shown in the panel and used by the rules engine when it has
   * to re-ask which power the visitor needs.
   */
  greeting: 'Hi! What power are you looking for?',
  /** Short bubble next to the launcher while the panel is closed. */
  teaser: 'Hi! Looking for an off-grid inverter? I can help you find the right power.',
};

/** Cloudflare Turnstile site key (public, client-side widget). */
export const TURNSTILE = {
  siteKey: '0x4AAAAAAEow16pcFLjiXJag',
};

export const SOCIAL = {
  linkedin: '',
  youtube: '',
};
