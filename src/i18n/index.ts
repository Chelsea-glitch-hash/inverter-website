/**
 * Translation layer entry point.
 *
 * English is the single content source: every locale implements the full
 * Dictionary shape and missing locales/keys can never reach the render layer,
 * because getDict() always resolves to a complete dictionary (English at
 * worst). Product, About and Blog content use per-item partial translations
 * with English fallback - see product-content.ts, about/ and blog/.
 */
import { DEFAULT_LOCALE, type Locale } from './config';
import { en, type Dictionary } from './ui/en';
import { es } from './ui/es';
import { zhHant } from './ui/zh-hant';
import { fr } from './ui/fr';
import { ar } from './ui/ar';
import { pt } from './ui/pt';
import { it } from './ui/it';
import { de } from './ui/de';
import { ru } from './ui/ru';
import { ja } from './ui/ja';
import { ko } from './ui/ko';

const DICTS: Record<Locale, Dictionary> = {
  en,
  es,
  'zh-hant': zhHant,
  fr,
  ar,
  pt,
  it,
  de,
  ru,
  ja,
  ko,
};

/** Complete UI dictionary for a locale. Never returns undefined keys. */
export function getDict(locale: Locale = DEFAULT_LOCALE): Dictionary {
  return DICTS[locale] ?? en;
}

/** Fill "{token}" placeholders with values. Missing tokens pass through. */
export function fill(
  template: string,
  vars: Record<string, string | number>
): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in vars ? String(vars[key]) : match
  );
}

/** Locale-aware date formatting for displayed dates. */
export function formatDate(date: Date, locale: Locale): string {
  const tag = locale === 'zh-hant' ? 'zh-Hant' : locale;
  try {
    return date.toLocaleDateString(tag, { year: 'numeric', month: 'long', day: 'numeric' });
  } catch {
    return date.toISOString().slice(0, 10);
  }
}

export type { Dictionary };
