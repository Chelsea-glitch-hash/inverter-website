/**
 * Blog / News translation layer.
 *
 * The English MDX articles in src/content/blog/ remain the SINGLE SOURCE:
 *   - English title/description/tags/body always come from the collection.
 *   - Other languages provide optional overrides here, keyed by post id.
 *   - A missing title/description/tag falls back to the English frontmatter;
 *     a missing body falls back to the English MDX content.
 *
 * `bodyHtml` mirrors the English article structure (h2/p/table/a) as
 * pre-rendered HTML so the localized article page can render it with
 * set:html. Internal links inside bodyHtml stay unprefixed English paths
 * only when they point at pages that exist in that locale (they all do).
 */
import { DEFAULT_LOCALE, type Locale } from './config';

export interface BlogTranslation {
  title?: string;
  description?: string;
  tags?: string[];
  bodyHtml?: string;
}

type BlogTable = Record<string, BlogTranslation>;

export type { BlogTable };

import { esBlog } from './blog/es';
import { zhHantBlog } from './blog/zh-hant';
import { frBlog } from './blog/fr';
import { arBlog } from './blog/ar';
import { ptBlog } from './blog/pt';
import { itBlog } from './blog/it';
import { deBlog } from './blog/de';
import { ruBlog } from './blog/ru';
import { jaBlog } from './blog/ja';
import { koBlog } from './blog/ko';

const TABLES: Partial<Record<Locale, BlogTable>> = {
  es: esBlog,
  'zh-hant': zhHantBlog,
  fr: frBlog,
  ar: arBlog,
  pt: ptBlog,
  it: itBlog,
  de: deBlog,
  ru: ruBlog,
  ja: jaBlog,
  ko: koBlog,
};

export function getBlogTranslation(postId: string, locale: Locale): BlogTranslation {
  if (locale === DEFAULT_LOCALE) return {};
  return TABLES[locale]?.[postId] ?? {};
}
