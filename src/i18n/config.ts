/**
 * Localization configuration - single source of truth for locales.
 *
 * English is the ONLY content source. Every other locale is generated from
 * the English content through the translation layer (src/i18n/) and falls
 * back to English whenever a translation is missing.
 *
 * URL architecture:
 *   - English keeps the existing unprefixed URLs (/, /products/, ...)
 *   - every other locale is served under /{code}/... (e.g. /es/products/)
 *   - see localizedPath() below and src/pages/[lang]/[...slug].astro
 */

export const LOCALES = [
  'en',
  'es',
  'zh-hant',
  'fr',
  'ar',
  'pt',
  'it',
  'de',
  'ru',
  'ja',
  'ko',
] as const;

export type Locale = (typeof LOCALES)[number];

/** Fallback locale: used whenever a translation is missing. */
export const DEFAULT_LOCALE: Locale = 'en';

export interface LocaleMeta {
  /** URL prefix. English is '' (unprefixed). */
  code: string;
  /** Native label shown in the language switcher. */
  label: string;
  /** Value for <html lang=""> and hreflang. */
  htmlLang: string;
  /** Text direction for <html dir="">. Arabic is the only RTL locale. */
  dir: 'ltr' | 'rtl';
  /** Open Graph locale tag. */
  ogLocale: string;
}

export const LOCALE_META: Record<Locale, LocaleMeta> = {
  en:      { code: 'en',      label: 'English',     htmlLang: 'en',      dir: 'ltr', ogLocale: 'en_US' },
  es:      { code: 'es',      label: 'Español',     htmlLang: 'es',      dir: 'ltr', ogLocale: 'es_ES' },
  'zh-hant': { code: 'zh-hant', label: '繁體中文',   htmlLang: 'zh-Hant', dir: 'ltr', ogLocale: 'zh_TW' },
  fr:      { code: 'fr',      label: 'Français',    htmlLang: 'fr',      dir: 'ltr', ogLocale: 'fr_FR' },
  ar:      { code: 'ar',      label: 'العربية',     htmlLang: 'ar',      dir: 'rtl', ogLocale: 'ar_AE' },
  pt:      { code: 'pt',      label: 'Português',   htmlLang: 'pt',      dir: 'ltr', ogLocale: 'pt_BR' },
  it:      { code: 'it',      label: 'Italiano',    htmlLang: 'it',      dir: 'ltr', ogLocale: 'it_IT' },
  de:      { code: 'de',      label: 'Deutsch',     htmlLang: 'de',      dir: 'ltr', ogLocale: 'de_DE' },
  ru:      { code: 'ru',      label: 'Русский',     htmlLang: 'ru',      dir: 'ltr', ogLocale: 'ru_RU' },
  ja:      { code: 'ja',      label: '日本語',       htmlLang: 'ja',      dir: 'ltr', ogLocale: 'ja_JP' },
  ko:      { code: 'ko',      label: '한국어',       htmlLang: 'ko',      dir: 'ltr', ogLocale: 'ko_KR' },
};

/** Locales served under a URL prefix (all except English). */
export const PREFACED_LOCALES: readonly Locale[] = LOCALES.filter((l) => l !== DEFAULT_LOCALE);

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export function meta(locale: Locale): LocaleMeta {
  return LOCALE_META[locale];
}

/**
 * "/es" prefix for a locale, or '' for English. Never has a trailing slash.
 */
export function localePrefix(locale: Locale): string {
  return locale === DEFAULT_LOCALE ? '' : `/${LOCALE_META[locale].code}`;
}

/**
 * URL of the same page in another locale.
 *
 * The English path is the canonical key: every localized page is the English
 * path behind a locale prefix, so switching language is a pure prefix swap.
 */
export function localizedPath(locale: Locale, enPath: string): string {
  const path = enPath === '/' ? '' : enPath.replace(/\/+$/, '');
  return `${localePrefix(locale)}${path}/`;
}

/**
 * Extract the English path from any site URL.
 * Returns the path unchanged for English URLs (no prefix).
 */
export function enPathFromUrl(pathname: string): string {
  for (const locale of PREFACED_LOCALES) {
    const prefix = `${LOCALE_META[locale].code}/`;
    if (pathname === `/${LOCALE_META[locale].code}` || pathname.startsWith(`/${prefix}`)) {
      const rest = pathname.slice(1 + prefix.length);
      return `/${rest}`;
    }
  }
  return pathname;
}

/** Detect the locale a (prefixed) URL belongs to. */
export function localeFromUrl(pathname: string): Locale {
  const segment = pathname.split('/').filter(Boolean)[0] ?? '';
  return isLocale(segment) ? segment : DEFAULT_LOCALE;
}

/** Relative language switcher targets for the current page. */
export function languageSwitcherTargets(currentUrlPathname: string): { locale: Locale; href: string }[] {
  const enPath = enPathFromUrl(currentUrlPathname);
  return LOCALES.map((locale) => ({ locale, href: localizedPath(locale, enPath) }));
}
