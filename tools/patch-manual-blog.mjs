#!/usr/bin/env node
/* Manually-written blog translations writer.
 *
 * Used ONLY when the AI API is unavailable (e.g. provider balance exhausted)
 * and `npm run i18n:update` cannot run. Reads hand-translated entries from
 * tools/manual-blog-data-*.json (Markdown-formatted body), renders each body
 * to styled HTML via scripts/blog-md-render.mjs (the same renderer the
 * automatic pipeline uses), and inserts the entry into the matching
 * src/i18n/blog/{lang}.ts keeping the file's 2-space-indent, GENERATED style.
 *
 * After this script, run `npm run i18n:update` once so the manifest registers
 * the new entries (it records the English hash for entries present in the
 * tables but missing from the manifest, even when the AI calls fail), then
 * `npm run i18n:check` to confirm.
 *
 * Usage: node tools/patch-manual-blog.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { renderTranslatedBody } from '../scripts/blog-md-render.mjs';

const ROOT = process.cwd();

const DATA_FILES = [
  'tools/manual-blog-data-es.json',
  'tools/manual-blog-data-zhhant.json',
  'tools/manual-blog-data-fr.json',
  'tools/manblog/ar.json',
  'tools/manblog/pt.json',
  'tools/manblog/it.json',
  'tools/manblog/de.json',
  'tools/manblog/ru.json',
  'tools/manblog/ja.json',
  'tools/manblog/ko.json',
];

const entries = DATA_FILES.flatMap((f) =>
  JSON.parse(fs.readFileSync(path.join(ROOT, f), 'utf8'))
);

/* Same serializer style as tools/patch-ru-blog.mjs / i18n-sync.mjs */
const ser = (v, indent = 0) => {
  const pad = '  '.repeat(indent);
  const padIn = '  '.repeat(indent + 1);
  if (typeof v === 'string') return JSON.stringify(v);
  if (Array.isArray(v)) {
    if (v.length === 0) return '[]';
    return `[\n${v.map((x) => `${padIn}${ser(x, indent + 1)},`).join('\n')}\n${pad}]`;
  }
  const keys = Object.keys(v);
  return `{\n${keys.map((k) => `${padIn}${/^[A-Za-z_$][\w$]*$/.test(k) ? k : JSON.stringify(k)}: ${ser(v[k], indent + 1)},`).join('\n')}\n${pad}}`;
};

for (const entry of entries) {
  const { lang, slug, title, description, tags, body } = entry;
  const FILE = path.join(ROOT, 'src', 'i18n', 'blog', `${lang}.ts`);
  if (!fs.existsSync(FILE)) {
    console.error(`SKIP ${lang}: ${FILE} does not exist`);
    continue;
  }
  if (!title || !description || !Array.isArray(tags) || !body) {
    console.error(`SKIP ${lang}: incomplete entry fields`);
    continue;
  }

  const bodyHtml = await renderTranslatedBody(body);
  // Safety checks: the rendered HTML must not contain raw Markdown artifacts.
  for (const bad of ['import FAQ', '## ', '|--', '<FAQ']) {
    if (bodyHtml.includes(bad)) {
      console.error(`ABORT ${lang}: rendered bodyHtml contains raw artifact "${bad}"`);
      process.exit(1);
    }
  }
  if (!/<h2>/.test(bodyHtml) || !/<table>/.test(bodyHtml) || !/<details/.test(bodyHtml)) {
    console.error(`ABORT ${lang}: rendered bodyHtml missing h2/table/details`);
    process.exit(1);
  }

  const raw = fs.readFileSync(FILE, 'utf8').replace(/\r\n/g, '\n');
  if (raw.includes(`"${slug}"`)) {
    console.log(`SKIP ${lang}: "${slug}" already present`);
    continue;
  }

  const block = `  "${slug}": ${ser({ title, description, tags, bodyHtml }, 1)},\n`;
  const insertAt = raw.lastIndexOf('};');
  if (insertAt === -1) {
    console.error(`ABORT ${lang}: cannot find closing "};"`);
    process.exit(1);
  }
  const next = raw.slice(0, insertAt) + block + raw.slice(insertAt);
  fs.writeFileSync(FILE, next, 'utf8');
  console.log(`patched ${lang}.ts (${bodyHtml.length} chars of HTML)`);
}
console.log('done');
