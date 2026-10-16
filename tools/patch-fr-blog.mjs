#!/usr/bin/env node
/* Patch a single blog article's French translation into src/i18n/blog/fr.ts.
 * Only invoked when `npm run i18n:update` repeatedly produces a truncated body
 * (missing FAQ) on the French locale.
 * Reads AI_API_* from .env, calls the OpenAI-compatible API, and replaces the
 * entry in the file keeping its existing 2-space-indent, GENERATED header style.
 *
 * The translated body is rendered to STYLED HTML via scripts/blog-md-render.mjs
 * before writing — never store raw Markdown in bodyHtml (the article template
 * injects bodyHtml with set:html, which would show Markdown syntax as plain
 * text).
 *
 * Usage: node tools/patch-fr-blog.mjs [<slug>]   (default: inverter-power-derating-temperature-altitude)
 */
import fs from 'node:fs';
import path from 'node:path';
import { renderTranslatedBody } from '../scripts/blog-md-render.mjs';

const ROOT = process.cwd();
const FILE = path.join(ROOT, 'src', 'i18n', 'blog', 'fr.ts');
const slug = process.argv[2] || 'inverter-power-derating-temperature-altitude';
const MDX = path.join(ROOT, 'src', 'content', 'blog', `${slug}.mdx`);

/* ---- load .env ---- */
for (const line of fs.readFileSync(path.join(ROOT, '.env'), 'utf8').split(/\r?\n/)) {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
  if (m && process.env[m[1]] === undefined) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
}
const cfg = {
  apiKey: process.env.AI_API_KEY,
  apiBase: (process.env.AI_API_BASE || '').replace(/\/+$/, ''),
  model: process.env.AI_MODEL,
};
if (!cfg.apiKey || !cfg.apiBase || !cfg.model) {
  console.error('missing AI_API_* in .env');
  process.exit(1);
}

/* ---- read English source (frontmatter + body) ---- */
const mdx = fs.readFileSync(MDX, 'utf8');
const fmMatch = mdx.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
const fm = {};
for (const line of fmMatch[1].split(/\r?\n/)) {
  const kv = line.match(/^(\w+):\s*(.*)$/);
  if (kv) fm[kv[1]] = kv[2].trim();
}
const unquote = (s) => (s ? s.replace(/^["']|["']$/g, '') : undefined);
let tags;
try { tags = JSON.parse(fm.tags.replace(/'/g, '"')); } catch { tags = fm.tags.split(',').map((t) => t.trim()); }
const english = {
  title: unquote(fm.title),
  description: unquote(fm.description),
  tags,
  body: fmMatch[2].trim(),
};

/* ---- call AI ---- */
const sys = [
  'You are a professional B2B website translator for a solar inverter manufacturer. Translate English website content into French.',
  'Rules:',
  '- Professional, natural industry phrasing. Never word-by-word.',
  '- NEVER invent facts. Translate exactly what is given, add nothing.',
  '- Keep numbers, units, voltages, wattages, model names, product ids (INV-xxx), certification names and markdown syntax (headings ##/###, tables, lists, links, FAQ props) unchanged.',
  '- Keep internal site links like /products/off-grid-inverters/ as they are.',
  '- Keep the exact structure of the body: headings, tables, lists, the FAQ component props (title + faq array of question/answer pairs).',
  '- Preferred terms: onduleur, onduleur solaire, onduleur hors réseau (off-grid), sinus pur, déclassement (derating), puissance nominale.',
  '- The article MUST end with the FAQ section — translate ALL four question/answer pairs and keep the FAQ title. Do not truncate the article.',
  '- Reply with ONLY a valid JSON object with keys title (string), description (string), tags (array of 3 strings), body (string), no markdown fences, no commentary.',
].join('\n');
const user = JSON.stringify({ target_language: 'French', items: english });

const res = await fetch(`${cfg.apiBase}/chat/completions`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${cfg.apiKey}` },
  body: JSON.stringify({
    model: cfg.model,
    temperature: 0.2,
    messages: [
      { role: 'system', content: sys },
      { role: 'user', content: user },
    ],
  }),
});
if (!res.ok) {
  console.error('HTTP', res.status);
  process.exit(1);
}
const reply = (await res.json())?.choices?.[0]?.message?.content ?? '';
const fenced = reply.match(/```(?:json)?\s*([\s\S]*?)```/);
const candidate = fenced ? fenced[1] : reply;
const start = candidate.indexOf('{');
const end = candidate.lastIndexOf('}');
const parsed = JSON.parse(candidate.slice(start, end + 1));
const out = parsed.translations ?? parsed;
for (const key of Object.keys(english)) {
  if (out[key] === undefined) throw new Error(`model omitted field "${key}"`);
  if (Array.isArray(english[key]) && (!Array.isArray(out[key]) || out[key].length !== english[key].length)) {
    throw new Error(`field "${key}" array mismatch`);
  }
  if (typeof english[key] === 'string' && typeof out[key] !== 'string') throw new Error(`field "${key}" not a string`);
}

/* ---- render the translated body (Markdown source) to styled HTML ---- */
out.body = await renderTranslatedBody(out.body);

/* ---- verify the FAQ survived rendering ---- */
if (!/<details/.test(out.body)) {
  throw new Error('rendered body has no FAQ <details> — model truncated the article; retry');
}

/* ---- replace the entry in fr.ts ---- */
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

const entry = `  "${slug}": ${ser({
  title: out.title,
  description: out.description,
  tags: out.tags,
  bodyHtml: out.body,
}, 1)},\n`;
let raw = fs.readFileSync(FILE, 'utf8').replace(/\r\n/g, '\n');

// Remove any existing entry for this slug so we replace rather than duplicate.
const slugKey = `  "${slug}": {`;
const keyStart = raw.indexOf(slugKey);
if (keyStart !== -1) {
  // find the matching closing brace at the same indentation: the next line
  // that starts with two spaces, closes the object and is followed by a comma
  // or newline — we scan brace depth from keyStart.
  let depth = 0;
  let endPos = -1;
  for (let i = keyStart; i < raw.length; i++) {
    const ch = raw[i];
    if (ch === '{') depth++;
    else if (ch === '}') {
      depth--;
      if (depth === 0) {
        endPos = i + 1;
        break;
      }
    }
  }
  if (endPos === -1) throw new Error('cannot find end of existing entry');
  // consume a trailing comma
  let after = endPos;
  while (after < raw.length && /[\s,]/.test(raw[after])) {
    if (raw[after] === ',') { after++; break; }
    after++;
  }
  raw = raw.slice(0, keyStart) + entry + raw.slice(after);
} else {
  const insertAt = raw.lastIndexOf('};');
  if (insertAt === -1) throw new Error('cannot find closing "};" in fr.ts');
  raw = raw.slice(0, insertAt) + entry + raw.slice(insertAt);
}
fs.writeFileSync(FILE, raw, 'utf8');
console.log('patched fr.ts (replaced entry)');
