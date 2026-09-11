/**
 * About page content registry.
 *
 * The template calls `getAboutContent()` instead of importing a single
 * language file. Adding a language later means:
 *   1. add the locale to LOCALES in src/i18n/config.ts
 *   2. add src/i18n/about/<locale>.ts exporting the same AboutContent shape
 *   3. register it in the `dictionaries` map below
 * No page markup changes and no duplicated template.
 *
 * Unknown or missing locales fall back to English, so the site can never
 * render an empty page.
 */
import { DEFAULT_LOCALE, type Locale } from '../config';
import { aboutEn } from './en';
import type { AboutContent } from './types';

const dictionaries: Partial<Record<Locale, AboutContent>> = {
  en: aboutEn,
};

export function getAboutContent(locale: Locale = DEFAULT_LOCALE): AboutContent {
  return dictionaries[locale] ?? aboutEn;
}

export type { AboutContent } from './types';
