/**
 * Localization configuration - single source of truth for locales.
 *
 * The site ships English only. This registry exists so that additional
 * languages can be added later WITHOUT restructuring any page: add the locale
 * code here, add the matching content dictionary, and page templates pick it
 * up unchanged.
 *
 * English is always the default AND the fallback locale.
 *
 * Not yet implemented on purpose (see docs in the report):
 *  - no language switcher
 *  - no translated URL prefixes
 *  - no hreflang tags
 */

export const LOCALES = ['en'] as const;

export type Locale = (typeof LOCALES)[number];

/** Fallback locale: used whenever a translation is missing. */
export const DEFAULT_LOCALE: Locale = 'en';
