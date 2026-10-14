/**
 * Blog translation body renderer.
 *
 * The AI translation pipeline produces `bodyHtml` as MDX-style SOURCE text:
 * an `import FAQ from '../../components/FAQ.astro';` line, Markdown body
 * (headings, tables, lists), and an optional `<FAQ ... />` JSX block at the
 * end. The article template injects this with `set:html`, which cannot render
 * Markdown or execute components — so translated pages previously showed raw
 * syntax as plain text.
 *
 * This module converts such a body into REAL HTML in two steps:
 *   1. strip the `import FAQ ...;` line;
 *   2. extract the `<FAQ ... />` block and parse its `title` + `faq` array
 *      (string literals are JSON-compatible, parsed with JSON.parse — never
 *      eval), render it as the same `<details>` markup + FAQPage JSON-LD the
 *      FAQ.astro component produces;
 *   3. render the remaining Markdown (GFM: tables, lists, blockquotes, links)
 *      to HTML via remark/rehype.
 *
 * Used by:
 *   - tools/migrate-blog-html.mjs  (one-off migration of the existing files)
 *   - scripts/i18n-sync.mjs        (every future translation write)
 */

import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';

/**
 * Render one article's translated body (MDX-style source) to styled HTML.
 * @param {string} mdxText  translated bodyHtml as stored by i18n:update
 * @returns {string} rendered HTML (headings, tables, lists, FAQ details)
 */
export async function renderTranslatedBody(mdxText) {
  if (!mdxText) return '';

  let text = mdxText.replace(/\r\n/g, '\n');

  // 1. strip the `import FAQ ...;` line(s)
  text = text
    .replace(/^\s*import\s+FAQ\s+from\s+['"][^'"]+['"]\s*;\s*\n?/, '')
    .trim();

  // 2. extract the `<FAQ ... />` block
  const faqBlock = extractFaqBlock(text);
  if (faqBlock) text = text.slice(0, faqBlock.start) + text.slice(faqBlock.end).trim();

  // 3. render remaining Markdown to HTML
  const mdHtml = await renderMarkdown(text);

  // 4. append the FAQ markup if present
  const faqHtml = faqBlock ? renderFaq(faqBlock.title, faqBlock.faq) : '';

  return `${mdHtml}\n${faqHtml}`.trim();
}

/**
 * Render Markdown (GFM) to HTML.
 * @param {string} md
 * @returns {Promise<string>}
 */
export async function renderMarkdown(md) {
  if (!md) return '';
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(md);
  return String(file);
}

/** Parse a JSX string-literal value: it is a normal JSON string. */
function parseJsxString(raw) {
  const v = raw.trim();
  if (v.startsWith('"') || v.startsWith("'")) {
    try {
      return JSON.parse(v.replace(/^'|'$/g, '"'));
    } catch {
      return v.slice(1, -1);
    }
  }
  return v;
}

/**
 * Find a `<FAQ ... />` self-closing block in the body and extract
 * `title="..."` (or title={"..."}) and `faq={[ { question: "...", answer: "..." }, ... ]}`.
 * Values are string literals; parsed with JSON.parse — never eval.
 * @returns {{title: string, faq: {question: string, answer: string}[], start: number, end: number} | null}
 */
function extractFaqBlock(text) {
  const open = text.indexOf('<FAQ');
  if (open === -1) return null;
  const close = text.indexOf('/>', open);
  if (close === -1) return null;

  const block = text.slice(open, close + 2);

  // title="..." or title={'...'} / title={"..."}
  const titleMatch = block.match(/title\s*=\s*(?:\{?\s*)?(["'][^"']*["'])\s*\}?/);
  const title = titleMatch ? parseJsxString(titleMatch[1]) : 'Frequently Asked Questions';

  // faq={[ ... ]} — capture the array literal inside the braces
  const faqArrOpen = block.indexOf('faq={[');
  const faq = [];
  if (faqArrOpen !== -1) {
    const arrStart = faqArrOpen + 'faq={['.length;
    // find the matching closing bracket of the array literal, ignoring
    // brackets that appear inside string literals (translated answers may
    // legitimately contain "]", "}" etc.)
    // arrStart sits just AFTER the opening "[", so the initial depth is 1:
    // the matching closing "]" brings it back to 0 and ends the scan.
    let depth = 1;
    let arrEnd = -1;
    for (let i = arrStart; i < block.length; i++) {
      const ch = block[i];
      if (ch === '"' || ch === "'") {
        // skip the whole string literal
        const quote = ch;
        i++;
        while (i < block.length) {
          if (block[i] === '\\') { i++; }
          else if (block[i] === quote) { break; }
          i++;
        }
        continue;
      }
      if (ch === '[') depth++;
      else if (ch === ']') {
        depth--;
        if (depth === 0) {
          arrEnd = i;
          break;
        }
      }
    }
    if (arrEnd !== -1) {
      const arrSrc = block.slice(arrStart, arrEnd);
      // extract each { question: "...", answer: "..." } object
      const objRe = /\{\s*question\s*:\s*(["'][^"']*["'])\s*,\s*answer\s*:\s*(["'][^"']*["'])\s*\}/g;
      let m;
      while ((m = objRe.exec(arrSrc)) !== null) {
        faq.push({ question: parseJsxString(m[1]), answer: parseJsxString(m[2]) });
      }
    }
  }

  return { title, faq, start: open, end: close + 2 };
}

/**
 * Render a FAQ block to the same markup + JSON-LD the FAQ.astro component
 * produces (tailwind classes are global, so styling applies when injected).
 */
function renderFaq(title, faq) {
  if (!faq.length) return '';
  const items = faq
    .map(
      (f) =>
        `<details class="group px-5 py-4">` +
        `<summary class="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium text-slate-900 marker:hidden [&::-webkit-details-marker]:hidden">` +
        `${f.question}` +
        `<svg class="h-5 w-5 shrink-0 text-slate-400 transition-transform group-open:rotate-180" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" /></svg>` +
        `</summary>` +
        `<p class="mt-3 text-sm leading-relaxed text-slate-600">${f.answer}</p>` +
        `</details>`
    )
    .join('');

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };

  return (
    `<section aria-label="${title}">` +
    `<h2 class="mb-6 text-2xl font-semibold text-slate-900">${title}</h2>` +
    `<div class="divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white">${items}</div>` +
    `</section>` +
    `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`
  );
}
