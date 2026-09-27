/**
 * About page content registry.
 *
 * The template calls `getAboutContent()` instead of importing a single
 * language file. English (src/i18n/about/en.ts) is the single source:
 * every other locale is a translation of the same AboutContent shape and a
 * missing locale falls back to English — the page can never render empty.
 */
import { DEFAULT_LOCALE, type Locale } from '../config';
import { aboutEn } from './en';
import { aboutEs } from './es';
import { aboutZhHant } from './zh-hant';
import { aboutFr } from './fr';
import { aboutAr } from './ar';
import { aboutPt } from './pt';
import { aboutIt } from './it';
import { aboutDe } from './de';
import { aboutRu } from './ru';
import { aboutJa } from './ja';
import { aboutKo } from './ko';
import type { AboutContent } from './types';

const dictionaries: Partial<Record<Locale, AboutContent>> = {
  en: aboutEn,
  es: aboutEs,
  'zh-hant': aboutZhHant,
  fr: aboutFr,
  ar: aboutAr,
  pt: aboutPt,
  it: aboutIt,
  de: aboutDe,
  ru: aboutRu,
  ja: aboutJa,
  ko: aboutKo,
};

export function getAboutContent(locale: Locale = DEFAULT_LOCALE): AboutContent {
  return dictionaries[locale] ?? aboutEn;
}

export type { AboutContent } from './types';
