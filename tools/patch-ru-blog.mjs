#!/usr/bin/env node
/* Patch a single blog article's Russian translation into src/i18n/blog/ru.ts.
 * Only invoked when `npm run i18n:update` repeatedly fails on the same locale.
 * Reads AI_API_* from .env, calls the OpenAI-compatible API, and inserts the
 * entry keeping the file's existing 2-space-indent, GENERATED header style.
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const FILE = path.join(ROOT, 'src', 'i18n', 'blog', 'ru.ts');

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
const mdx = fs.readFileSync(path.join(ROOT, 'src', 'content', 'blog', 'paralleling-off-grid-inverters.mdx'), 'utf8');
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
  'You are a professional B2B website translator for a solar inverter manufacturer. Translate English website content into Russian.',
  'Rules:',
  '- Professional, natural industry phrasing. Never word-by-word.',
  '- NEVER invent facts. Translate exactly what is given, add nothing.',
  '- Keep numbers, units, voltages, wattages, model names, product ids (INV-xxx), certification names and markdown syntax (headings ##/###, tables, lists, links, FAQ props) unchanged.',
  '- Keep internal site links like /products/off-grid-inverters/ as they are.',
  '- Keep the exact structure of the body: headings, tables, lists, the FAQ component props (title + faq array of question/answer pairs).',
  '- Preferred terms: солнечный инвертор, автономный инвертор (off-grid), параллельное включение, чистая синусоида, номинальная мощность.',
  '- Reply with ONLY a valid JSON object with keys title (string), description (string), tags (array of 3 strings), body (string), no markdown fences, no commentary.',
].join('\n');
const user = JSON.stringify({ target_language: 'Russian', items: english });

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

/* ---- write into ru.ts ---- */
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

const entry = `  "paralleling-off-grid-inverters": ${ser({
  title: out.title,
  description: out.description,
  tags: out.tags,
  bodyHtml: out.body,
}, 1)},\n`;
const raw = fs.readFileSync(FILE, 'utf8').replace(/\r\n/g, '\n');
const insertAt = raw.lastIndexOf('};');
if (insertAt === -1) throw new Error('cannot find closing "};" in ru.ts');
const next = raw.slice(0, insertAt) + entry + raw.slice(insertAt);
fs.writeFileSync(FILE, next, 'utf8');
console.log('patched ru.ts');
