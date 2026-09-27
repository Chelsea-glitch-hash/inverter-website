#!/usr/bin/env node
/**
 * i18n sync — keeps the 10 non-English translation tables in step with the
 * English single source of truth.
 *
 * ============================================================================
 *  THE CONTRACT
 * ============================================================================
 *
 *  English content is the ONLY thing you edit:
 *
 *    src/data/products.ts        product facts + translatable product copy
 *    src/content/blog/*.mdx      news articles
 *    src/i18n/ui/en.ts           ALL site chrome + page copy (home, header,
 *                                footer, CTA, breadcrumb, forms, chat UI,
 *                                factory, quality, contact, specs labels...)
 *    src/i18n/about/en.ts        About page copy
 *    src/lib/categories.ts       category name/heading/description (EN part)
 *
 *    Edit English  ->  npm run i18n:check   (what drifted?)
 *                   ->  npm run i18n:update (regenerate translations)
 *                   ->  astro build         (all 11 languages rebuilt)
 *
 *  Two sync layers make this work:
 *
 *  1. BUILD-TIME FALLBACK: products/blog/categories fall back to English
 *     per field at build. NEW products and NEW articles appear in all 11
 *     languages with zero action.
 *
 *  2. THIS SCRIPT: fields that DO exist in a translation table would go
 *     STALE when the English text is edited (a snapshot cannot follow an
 *     edit). `check` detects that drift via SHA-256 hashes recorded in
 *     src/i18n/manifest.json (per language, per field); `update`
 *     regenerates only the drifted fields through an OpenAI-compatible chat
 *     API (same AI_API_* vars the chat feature uses) and rewrites the
 *     translation tables in place.
 *
 *  Domains fully automated (checked + regenerated):
 *    products    item-scoped fields (name/productType/shortDescription/
 *                overview/features/seo/inquiry)
 *    blog        title/description/tags/bodyHtml per article
 *    ui          every string leaf of the UI dictionary. The per-locale
 *                powerPage.copy grammar function (pluralization code) is
 *                carried over unchanged — it is language infrastructure,
 *                not content.
 *    about       every string leaf of the About dictionary
 *    categories  name/heading/description per category slug
 *
 *  NOT in the translation layer (by design):
 *    - Product technical specs, images, ids, slugs, numbers — they come from
 *      src/data/products.ts and are never sent to the AI.
 *    - Privacy policy: intentionally English-only in every locale (legal
 *      document pending professional review — see src/templates/PrivacyPage.astro).
 *
 *  Translation tables under src/i18n/{products,blog,ui,about,categories}/
 *  (non-en) are GENERATED files — hand edits survive until the English
 *  version of that field changes.
 *
 *  Usage:
 *    npm run i18n:check                     # drift report, exit 1 on drift
 *    npm run i18n:update [-- --only=es,fr]  # regenerate stale + missing
 *    npm run i18n:update -- --dry-run       # show the plan, call nothing
 */

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const require = createRequire(path.join(ROOT, 'noop.js'));

const LANGS = ['es', 'zh-hant', 'fr', 'ar', 'pt', 'it', 'de', 'ru', 'ja', 'ko'];
const MANIFEST = path.join(ROOT, 'src', 'i18n', 'manifest.json');

const PRODUCT_FIELDS = ['name', 'productType', 'shortDescription', 'overview', 'features', 'seo', 'inquiry'];
const BLOG_FIELDS = ['title', 'description', 'tags', 'body'];

/** Domains whose English source is a nested object tree (UI dictionaries). */
const TREE_DOMAINS = ['ui', 'about', 'categories'];

/** Max string leaves sent to the model in ONE request. */
const CHUNK_SIZE = 40;

const LANGUAGE_NAMES = {
  es: 'Spanish (international)',
  'zh-hant': 'Traditional Chinese',
  fr: 'French',
  ar: 'Modern Standard Arabic',
  pt: 'Brazilian Portuguese',
  it: 'Italian',
  de: 'German',
  ru: 'Russian',
  ja: 'Japanese',
  ko: 'Korean',
};

/** Compact term base so regenerated wording stays consistent. */
const GLOSSARY = {
  es: 'inversor solar, inversor off-grid (aislado), onda senoidal pura, potencia nominal, Solicitar presupuesto, OEM/ODM',
  'zh-hant': '太陽能逆變器、離網型逆變器、純正弦波、額定功率、索取報價、OEM/ODM 代工',
  fr: 'onduleur solaire, onduleur hors-réseau (off-grid), onde sinusoïdale pure, puissance nominale, Demander un devis, OEM/ODM',
  ar: 'العاكس الشمسي، العاكس خارج الشبكة (off-grid)، موجة جيبية نقية، القدرة المقننة، اطلب عرض سعر، OEM/ODM',
  pt: 'inversor solar, inversor off-grid, onda senoidal pura, potência nominal, Solicitar orçamento, OEM/ODM',
  it: 'inverter solare, inverter off-grid, onda sinusoidale pura, potenza nominale, Richiedi un preventivo, OEM/ODM',
  de: 'Solar-Wechselrichter, Off-Grid-Wechselrichter, reine Sinuswelle, Nennleistung, Angebot anfordern, OEM/ODM',
  ru: 'солнечный инвертор, автономный инвертор (off-grid), чистая синусоида, номинальная мощность, Запросить коммерческое предложение, OEM/ODM',
  ja: '太陽光インバーター、オフグリッドインバーター、正弦波出力、定格出力、お見積り依頼、OEM/ODM',
  ko: '태양광 인버터, 오프그리드 인버터, 순수 정현파 출력, 정격 출력, 견적 요청, OEM/ODM',
};

const p = (...seg) => path.join(ROOT, ...seg);

/* ------------------------------------------------------------------ *
 * .env + AI config
 * ------------------------------------------------------------------ */

function loadDotEnv() {
  const file = p('.env');
  if (!fs.existsSync(file)) return;
  for (const line of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && process.env[m[1]] === undefined) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
}

function aiConfig() {
  return {
    apiKey: process.env.AI_API_KEY || '',
    apiBase: (process.env.AI_API_BASE || '').replace(/\/+$/, ''),
    model: process.env.AI_MODEL || '',
  };
}

async function callAi(cfg, system, user, timeoutMs = 180000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(`${cfg.apiBase}/chat/completions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${cfg.apiKey}` },
      body: JSON.stringify({
        model: cfg.model,
        temperature: 0.2,
        messages: [
          { role: 'system', content: system },
          { role: 'user', content: user },
        ],
      }),
      signal: controller.signal,
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const body = await res.json();
    return body?.choices?.[0]?.message?.content ?? '';
  } finally {
    clearTimeout(timer);
  }
}

/** Pull the first JSON object out of a model reply (tolerates fences/prose). */
function extractJson(text) {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  const candidate = fenced ? fenced[1] : text;
  const start = candidate.indexOf('{');
  const end = candidate.lastIndexOf('}');
  if (start === -1 || end <= start) throw new Error('no JSON object in model reply');
  return JSON.parse(candidate.slice(start, end + 1));
}

/* ------------------------------------------------------------------ *
 * TS module loading + serialization
 * ------------------------------------------------------------------ */

function loadTs(entry) {
  const esbuild = require('esbuild');
  const out = esbuild.buildSync({
    entryPoints: [entry],
    bundle: true,
    format: 'cjs',
    platform: 'node',
    write: false,
    logLevel: 'silent',
  });
  const module = { exports: {} };
  new Function('module', 'exports', 'require', out.outputFiles[0].text)(
    module,
    module.exports,
    require
  );
  return module.exports;
}

const firstExport = (mod) => Object.values(mod)[0];

const IDENT_OK = /^[A-Za-z_$][\w$]*$/;

/** Serialize a JS value as a formatted TypeScript object literal.
 *  Functions are embedded as their own source (contextual typing from the
 *  annotated English type keeps them valid). */
function ser(v, indent = 0) {
  const pad = '  '.repeat(indent);
  const padIn = '  '.repeat(indent + 1);
  if (v === undefined || v === null) return 'undefined';
  if (typeof v === 'function') return v.toString();
  if (typeof v === 'string') return JSON.stringify(v);
  if (typeof v === 'number' || typeof v === 'boolean') return String(v);
  if (Array.isArray(v)) {
    if (v.length === 0) return '[]';
    return `[\n${v.map((x) => `${padIn}${ser(x, indent + 1)},`).join('\n')}\n${pad}]`;
  }
  const keys = Object.keys(v);
  if (keys.length === 0) return '{}';
  const body = keys
    .map((k) => `${padIn}${IDENT_OK.test(k) ? k : JSON.stringify(k)}: ${ser(v[k], indent + 1)},`)
    .join('\n');
  return `{\n${body}\n${pad}}`;
}

/** Export identifier prefix matching the hand-authored files:
 *  es -> esProducts/esBlog, zh-hant -> zhHantProducts/zhHantBlog. */
const camel = (locale) => locale.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
const pascal = (locale) => {
  const c = camel(locale);
  return c.charAt(0).toUpperCase() + c.slice(1);
};

const GENERATED_HEADER = `// GENERATED FILE — do not edit by hand.
// Regenerated by \`npm run i18n:update\` from the English single source of
// truth. Hand edits to a field are overwritten when the English version of
// that field changes; fields that are absent fall back to English at build
// time (see src/i18n/product-content.ts / blog-content.ts / category-content.ts).
`;

/* ------------------------------------------------------------------ *
 * English sources
 * ------------------------------------------------------------------ */

function productFields(product) {
  const fields = {};
  for (const key of PRODUCT_FIELDS) {
    if (product[key] === undefined) continue;
    if (key === 'seo') {
      fields.seo = { title: product.seo?.title, description: product.seo?.description };
    } else if (key === 'inquiry') {
      // buttonText is English-only UI copy and is not translated.
      fields.inquiry = { headline: product.inquiry?.headline, text: product.inquiry?.text };
    } else {
      fields[key] = product[key];
    }
  }
  return fields;
}

function parseMdx(file) {
  const raw = fs.readFileSync(file, 'utf8');
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) throw new Error(`no frontmatter in ${file}`);
  const fm = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^(\w+):\s*(.*)$/);
    if (kv) fm[kv[1]] = kv[2].trim();
  }
  const unquote = (s) => (s ? s.replace(/^["']|["']$/g, '') : undefined);
  let tags;
  if (fm.tags) {
    try {
      tags = JSON.parse(fm.tags.replace(/'/g, '"'));
    } catch {
      tags = fm.tags.split(',').map((t) => t.trim());
    }
  }
  return {
    title: unquote(fm.title),
    description: unquote(fm.description),
    tags,
    body: (m[2] || '').trim(),
  };
}

function blogSources() {
  const dir = p('src', 'content', 'blog');
  const posts = {};
  for (const f of fs.readdirSync(dir).filter((f) => f.endsWith('.mdx'))) {
    posts[f.replace(/\.mdx$/, '')] = parseMdx(path.join(dir, f));
  }
  return posts;
}

/** English category tree keyed by slug — only the translatable copy. */
function categoryTree() {
  const { CATEGORIES } = loadTs(p('src', 'lib', 'categories.ts'));
  const tree = {};
  for (const cat of CATEGORIES) {
    tree[cat.slug] = { name: cat.name, heading: cat.heading, description: cat.description };
  }
  return tree;
}

const sha = (v) => crypto.createHash('sha256').update(typeof v === 'string' ? v : JSON.stringify(v)).digest('hex');

/* ------------------------------------------------------------------ *
 * Tree domains (ui / about / categories): flatten, merge, rebuild
 * ------------------------------------------------------------------ */

/** Collect every string leaf of a nested object as `dotted.path -> string`.
 *  Functions (grammar helpers) and non-string leaves are skipped. */
function flattenTree(node, prefix = '', out = {}) {
  if (typeof node === 'string') {
    if (prefix) out[prefix] = node;
    return out;
  }
  if (Array.isArray(node)) {
    node.forEach((v, i) => flattenTree(v, prefix ? `${prefix}.${i}` : String(i), out));
    return out;
  }
  if (node && typeof node === 'object') {
    for (const [k, v] of Object.entries(node)) flattenTree(v, prefix ? `${prefix}.${k}` : k, out);
    return out;
  }
  return out; // functions / numbers / booleans: not translatable content
}

const getPath = (obj, dotted) =>
  dotted.split('.').reduce((o, k) => (o == null ? undefined : o[k]), obj);

/** Rebuild a locale tree from the ENGLISH structure: translated values where
 *  available, the locale's existing value otherwise, English as the last
 *  resort (never an empty write). Grammar functions come from the locale
 *  file (they are per-locale code) with the English one as fallback. */
function rebuildTree(enNode, localeNode, translations, pathPrefix = '') {
  if (typeof enNode === 'function') {
    return localeNode && typeof localeNode === 'function' ? localeNode : enNode;
  }
  if (typeof enNode === 'string') {
    if (translations && Object.prototype.hasOwnProperty.call(translations, pathPrefix)) {
      return translations[pathPrefix];
    }
    if (typeof localeNode === 'string') return localeNode;
    return enNode;
  }
  if (Array.isArray(enNode)) {
    return enNode.map((v, i) =>
      rebuildTree(v, Array.isArray(localeNode) ? localeNode[i] : undefined, translations, `${pathPrefix}.${i}`)
    );
  }
  if (enNode && typeof enNode === 'object') {
    const out = {};
    for (const [k, v] of Object.entries(enNode)) {
      out[k] = rebuildTree(
        v,
        localeNode && typeof localeNode === 'object' ? localeNode[k] : undefined,
        translations,
        pathPrefix ? `${pathPrefix}.${k}` : k
      );
    }
    return out;
  }
  return enNode;
}

/* ------------------------------------------------------------------ *
 * Manifest
 * ------------------------------------------------------------------ */

function readManifest() {
  if (!fs.existsSync(MANIFEST)) return null;
  return JSON.parse(fs.readFileSync(MANIFEST, 'utf8'));
}

function writeManifest(data) {
  data._comment =
    'Tracks the SHA-256 of every English field that has been translated. npm run i18n:check compares these against the current English sources; npm run i18n:update refreshes them. GENERATED — do not edit by hand.';
  fs.writeFileSync(MANIFEST, JSON.stringify(data, null, 2) + '\n', 'utf8');
}

/** Build a baseline manifest from the CURRENT English + CURRENT tables.
 *  Hashes are tracked PER LANGUAGE so updating one locale never hides the
 *  drift that still exists in the other nine. */
function bootstrapManifest(enProducts, enBlog, tables, blogTrees, treeLeaves, localeTrees) {
  const manifest = { products: {}, blog: {}, ui: {}, about: {}, categories: {} };

  for (const domain of TREE_DOMAINS) {
    manifest[domain] = baselineTreeSection(treeLeaves[domain], localeTrees[domain]);
  }

  for (const product of enProducts) {
    const fields = productFields(product);
    const entry = {};
    for (const [key, value] of Object.entries(fields)) {
      const perLang = {};
      for (const lang of LANGS) {
        if (tables[lang]?.[product.id]?.[key] !== undefined) perLang[lang] = sha(value);
      }
      if (Object.keys(perLang).length) entry[key] = perLang;
    }
    if (Object.keys(entry).length) manifest.products[product.id] = entry;
  }
  for (const [id, post] of Object.entries(enBlog)) {
    const entry = {};
    const byKey = { title: post.title, description: post.description, tags: post.tags, body: post.body };
    for (const [key, value] of Object.entries(byKey)) {
      const tableKey = key === 'body' ? 'bodyHtml' : key;
      const perLang = {};
      for (const lang of LANGS) {
        if (blogTrees[lang]?.[id]?.[tableKey] !== undefined) perLang[lang] = sha(value);
      }
      if (Object.keys(perLang).length) entry[key] = perLang;
    }
    if (Object.keys(entry).length) manifest.blog[id] = entry;
  }
  writeManifest(manifest);
  return manifest;
}

/** Baseline section for one tree domain: record the English hash for every
 *  path that already has a value in the locale file. */
function baselineTreeSection(enLeaves, localeTrees) {
  const section = {};
  for (const [path, value] of Object.entries(enLeaves)) {
    const perLang = {};
    for (const lang of LANGS) {
      if (getPath(localeTrees[lang], path) !== undefined) perLang[lang] = sha(value);
    }
    if (Object.keys(perLang).length) section[path] = perLang;
  }
  return section;
}

/** Old manifests stored ui/about as {lang: fileHash} strings — migrate them
 *  to per-path/per-lang sections from the current state. */
function migrateTreeSections(manifest, treeLeaves, localeTrees) {
  let changed = false;
  for (const domain of TREE_DOMAINS) {
    const section = manifest[domain];
    const legacy =
      !section ||
      typeof section !== 'object' ||
      Object.keys(section).length === 0 ||
      Object.values(section).some((v) => typeof v !== 'object' || v === null || Array.isArray(v));
    if (legacy) {
      manifest[domain] = baselineTreeSection(treeLeaves[domain], localeTrees[domain]);
      changed = true;
    }
  }
  return changed;
}

/* ------------------------------------------------------------------ *
 * Drift detection
 * ------------------------------------------------------------------ */

function collectDrift(enProducts, enBlog, tables, blogTrees, treeLeaves, localeTrees, manifest) {
  const report = { products: {}, blog: {}, ui: {}, about: {}, categories: {}, clean: true };

  for (const product of enProducts) {
    const fields = productFields(product);
    const tracked = manifest.products[product.id] ?? {};
    for (const lang of LANGS) {
      const entry = tables[lang]?.[product.id];
      const bucket = (report.products[lang] ??= { missing: [], stale: [] });
      if (!entry) {
        bucket.missing.push(product.id);
        continue;
      }
      for (const [key, value] of Object.entries(fields)) {
        if (entry[key] === undefined) continue; // build-time fallback, always fresh
        const recorded = tracked[key];
        const trackedHash = typeof recorded === 'string' ? recorded : recorded?.[lang];
        if (trackedHash && trackedHash !== sha(value)) {
          bucket.stale.push({ id: product.id, field: key });
        }
      }
    }
  }

  for (const [id, post] of Object.entries(enBlog)) {
    const tracked = manifest.blog[id] ?? {};
    const englishByKey = { title: post.title, description: post.description, tags: post.tags, bodyHtml: post.body };
    for (const lang of LANGS) {
      const entry = blogTrees[lang]?.[id];
      const bucket = (report.blog[lang] ??= { missing: [], stale: [] });
      if (!entry) {
        bucket.missing.push(id);
        continue;
      }
      for (const [field, value] of Object.entries(englishByKey)) {
        if (entry[field] === undefined) continue;
        const trackedKey = field === 'bodyHtml' ? 'body' : field;
        const recorded = tracked[trackedKey];
        const trackedHash = typeof recorded === 'string' ? recorded : recorded?.[lang];
        if (trackedHash && trackedHash !== sha(value)) {
          bucket.stale.push({ id, field });
        }
      }
    }
  }

  for (const domain of TREE_DOMAINS) {
    for (const lang of LANGS) {
      const bucket = (report[domain][lang] ??= { missing: [], stale: [] });
      for (const [path, value] of Object.entries(treeLeaves[domain])) {
        const present = getPath(localeTrees[domain][lang], path) !== undefined;
        const recorded = manifest[domain]?.[path]?.[lang];
        if (!present) {
          bucket.missing.push(path);
        } else if (recorded && recorded !== sha(value)) {
          bucket.stale.push(path);
        }
      }
    }
  }

  const clean = (buckets) => Object.values(buckets).every((b) => !b.missing.length && !b.stale.length);
  report.clean =
    clean(report.products) && clean(report.blog) &&
    TREE_DOMAINS.every((d) => clean(report[d]));
  return report;
}

function printReport(report) {
  let drift = 0;
  for (const domain of ['products', 'blog']) {
    for (const lang of LANGS) {
      const bucket = report[domain][lang];
      if (!bucket) continue;
      if (bucket.missing.length) {
        drift += bucket.missing.length;
        console.log(`[${domain}] ${lang}: NEW (English fallback active) -> ${bucket.missing.join(', ')}`);
      }
      if (bucket.stale.length) {
        drift += bucket.stale.length;
        const shown = bucket.stale.slice(0, 8).map((s) => `${s.id}.${s.field}`).join(', ');
        const more = bucket.stale.length > 8 ? ` (+${bucket.stale.length - 8} more)` : '';
        console.log(`[${domain}] ${lang}: STALE (${bucket.stale.length}) -> ${shown}${more}`);
      }
    }
  }
  for (const domain of TREE_DOMAINS) {
    for (const lang of LANGS) {
      const bucket = report[domain][lang];
      if (!bucket) continue;
      if (bucket.missing.length) {
        drift += bucket.missing.length;
        const shown = bucket.missing.slice(0, 8).join(', ');
        const more = bucket.missing.length > 8 ? ` (+${bucket.missing.length - 8} more)` : '';
        console.log(`[${domain}] ${lang}: MISSING (${bucket.missing.length}) (English fallback active) -> ${shown}${more}`);
      }
      if (bucket.stale.length) {
        drift += bucket.stale.length;
        const shown = bucket.stale.slice(0, 8).join(', ');
        const more = bucket.stale.length > 8 ? ` (+${bucket.stale.length - 8} more)` : '';
        console.log(`[${domain}] ${lang}: STALE (${bucket.stale.length}) -> ${shown}${more}`);
      }
    }
  }
  if (!drift) console.log('All translations are in sync with the English source.');
  return drift;
}

/* ------------------------------------------------------------------ *
 * Translation prompts
 * ------------------------------------------------------------------ */

function systemPrompt(lang) {
  return [
    `You are a professional B2B website translator for a solar inverter manufacturer. Translate English website content into ${LANGUAGE_NAMES[lang]}.`,
    'Rules:',
    '- Professional, natural industry phrasing. Never word-by-word.',
    '- NEVER invent facts. Translate exactly what is given, add nothing.',
    '- Keep numbers, units, voltages (e.g. "12V / 24V / 48V / 60V / 72V"), wattages, model names (P-Series, 1159-Series), product ids (INV-xxx), and certification names (CE / LVD, EN 62109-1, ISO 9001, CE / EMC, RoHS) unchanged.',
    '- Keep {placeholder} tokens (e.g. {year}, {countries}, {count}, {power}, {n}, {brand}) exactly as they are.',
    '- Keep bracketed editorial markers like "[Factory image 1 to be provided]" in brackets, translated.',
    '- Each input key is a dotted path showing where the string appears (e.g. footer.rights, nav.products, specs.values.usb.Yes) — use it as context.',
    '- For keys under specs.values.* the KEY is a catalog value that stays in English; only the VALUE is translated.',
    '- Keep quoted UI phrases such as "Accept all" / "Necessary only" consistent with the cookie banner.',
    '- Reply with ONLY a valid JSON object mapping each input key to its translation, no markdown fences, no commentary.',
    `- Preferred industry terms: ${GLOSSARY[lang]}.`,
  ].join('\n');
}

/** Translate a map of {fieldKey: englishValue} -> {fieldKey: translated}. */
async function translateFields(cfg, lang, fields) {
  const user = JSON.stringify({ target_language: LANGUAGE_NAMES[lang], items: fields });
  const reply = await callAi(cfg, systemPrompt(lang), user);
  const parsed = extractJson(reply);
  const out = parsed.translations ?? parsed;
  for (const key of Object.keys(fields)) {
    if (out[key] === undefined) throw new Error(`model omitted field "${key}"`);
    if (Array.isArray(fields[key]) && !Array.isArray(out[key])) throw new Error(`field "${key}" should be an array`);
    if (Array.isArray(fields[key]) && out[key].length !== fields[key].length) {
      throw new Error(`field "${key}" array length ${out[key].length} != English ${fields[key].length}`);
    }
    if (typeof fields[key] === 'string' && typeof out[key] !== 'string') throw new Error(`field "${key}" should be a string`);
  }
  return out;
}

function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

/* ------------------------------------------------------------------ *
 * Generated-file writers
 * ------------------------------------------------------------------ */

function writeProductsFile(locale, table) {
  const file = p('src', 'i18n', 'products', `${locale}.ts`);
  const src = `${GENERATED_HEADER}
import type { ProductTranslations } from '../product-content';

export const ${camel(locale)}Products: ProductTranslations = ${ser(table)};
`;
  fs.writeFileSync(file, src, 'utf8');
  return file;
}

function writeBlogFile(locale, table) {
  const file = p('src', 'i18n', 'blog', `${locale}.ts`);
  const src = `${GENERATED_HEADER}
import type { BlogTable } from '../blog-content';

export const ${camel(locale)}Blog: BlogTable = ${ser(table)};
`;
  fs.writeFileSync(file, src, 'utf8');
  return file;
}

/** Per-locale writers for the tree domains. powerPage.copy (a pluralization
 *  grammar function) is carried over verbatim from the previous file. */
const TREE_WRITERS = {
  ui: (lang, tree) => {
    const file = p('src', 'i18n', 'ui', `${lang}.ts`);
    const src = `// GENERATED FILE — do not edit by hand.
// Regenerated by \`npm run i18n:update\` from src/i18n/ui/en.ts (the English
// single source of truth). The powerPage.copy grammar function is per-locale
// pluralization CODE — it is carried over unchanged, not AI-translated.

import type { Dictionary } from './en';

export const ${camel(lang)}: Dictionary = ${ser(tree)};
`;
    fs.writeFileSync(file, src, 'utf8');
    return file;
  },
  about: (lang, tree) => {
    const file = p('src', 'i18n', 'about', `${lang}.ts`);
    const src = `// GENERATED FILE — do not edit by hand.
// Regenerated by \`npm run i18n:update\` from src/i18n/about/en.ts (the English
// single source of truth).

import type { AboutContent } from './types';

export const about${pascal(lang)}: AboutContent = ${ser(tree)};
`;
    fs.writeFileSync(file, src, 'utf8');
    return file;
  },
  categories: (lang, tree) => {
    const file = p('src', 'i18n', 'categories', `${lang}.ts`);
    const src = `${GENERATED_HEADER}
import type { CategoryTranslations } from '../category-content';

export const ${camel(lang)}Categories: CategoryTranslations = ${ser(tree)};
`;
    fs.writeFileSync(file, src, 'utf8');
    return file;
  },
};

function loadTreeLocale(domain, lang) {
  const dirs = { ui: 'ui', about: 'about', categories: 'categories' };
  const file = p('src', 'i18n', dirs[domain], `${lang}.ts`);
  if (!fs.existsSync(file)) return {};
  const mod = loadTs(file);
  const wanted =
    domain === 'ui' ? camel(lang)
    : domain === 'about' ? `about${pascal(lang)}`
    : `${camel(lang)}Categories`;
  return mod[wanted] ?? firstExport(mod) ?? {};
}

function loadEnglishTrees() {
  const enMod = loadTs(p('src', 'i18n', 'ui', 'en.ts'));
  const aboutMod = loadTs(p('src', 'i18n', 'about', 'en.ts'));
  return {
    ui: enMod.en ?? firstExport(enMod),
    about: aboutMod.aboutEn ?? firstExport(aboutMod),
    categories: categoryTree(),
  };
}

/* ------------------------------------------------------------------ *
 * Modes
 * ------------------------------------------------------------------ */

async function main() {
  loadDotEnv();
  const mode = process.argv[2];
  const args = process.argv.slice(3);
  const only = args.find((a) => a.startsWith('--only='))?.slice(7)?.split(',') ?? LANGS;
  const dryRun = args.includes('--dry-run');
  for (const lang of only) if (!LANGS.includes(lang)) throw new Error(`unknown locale "${lang}"`);

  const enProducts = loadTs(p('src', 'data', 'products.ts')).PRODUCTS;
  const enBlog = blogSources();
  const enTrees = loadEnglishTrees();
  const treeLeaves = Object.fromEntries(TREE_DOMAINS.map((d) => [d, flattenTree(enTrees[d])]));

  const tables = {};
  const blogTrees = {};
  const localeTrees = Object.fromEntries(TREE_DOMAINS.map((d) => [d, {}]));
  for (const lang of LANGS) {
    tables[lang] = firstExport(loadTs(p('src', 'i18n', 'products', `${lang}.ts`)));
    blogTrees[lang] = firstExport(loadTs(p('src', 'i18n', 'blog', `${lang}.ts`)));
    for (const domain of TREE_DOMAINS) localeTrees[domain][lang] = loadTreeLocale(domain, lang);
  }

  let manifest = readManifest();
  if (!manifest) {
    manifest = bootstrapManifest(enProducts, enBlog, tables, blogTrees, treeLeaves, localeTrees);
    console.log('Baseline manifest written to src/i18n/manifest.json (current English <-> current translations).');
  } else if (migrateTreeSections(manifest, treeLeaves, localeTrees)) {
    writeManifest(manifest);
    console.log('Migrated manifest ui/about/categories sections to per-path, per-language tracking.');
  }

  const report = collectDrift(enProducts, enBlog, tables, blogTrees, treeLeaves, localeTrees, manifest);

  if (mode === 'check') {
    const drift = printReport(report);
    process.exit(drift ? 1 : 0);
  }

  if (mode !== 'update') {
    console.log('Usage: node scripts/i18n-sync.mjs <check|update> [--only=es,fr] [--dry-run]');
    process.exit(2);
  }

  const cfg = aiConfig();
  if (!dryRun && (!cfg.apiKey || !cfg.apiBase || !cfg.model)) {
    console.error(
      'i18n:update needs an AI provider. Set AI_API_KEY, AI_API_BASE (e.g. https://api.openai.com/v1) and AI_MODEL in the environment or in a root .env file — the same variables the AI chat feature uses.'
    );
    process.exit(1);
  }

  let failures = 0;
  let translated = 0;
  /** Fields whose translation was actually regenerated this run:
   *  `${lang}|p|${productId}|${field}`, `${lang}|b|${postId}|${field}` and
   *  `${lang}|t|${domain}|${path}`. Only these get a fresh manifest hash —
   *  every other locale keeps its old hash so remaining drift stays visible. */
  const refreshed = new Set();

  for (const lang of only) {
    /* ---- products ---- */
    const bucket = report.products[lang] ?? { missing: [], stale: [] };
    const byId = {};
    for (const { id, field } of bucket.stale) (byId[id] ??= new Set()).add(field);
    for (const id of bucket.missing) {
      byId[id] ??= new Set();
      const fields = productFields(enProducts.find((prod) => prod.id === id));
      for (const key of Object.keys(fields)) byId[id].add(key);
    }

    for (const id of Object.keys(byId)) {
      const product = enProducts.find((prod) => prod.id === id);
      const all = productFields(product);
      const wanted = {};
      for (const key of byId[id]) wanted[key] = all[key];
      console.log(`[products] ${lang} ${id}: translating { ${Object.keys(wanted).join(', ')} }${dryRun ? ' (dry-run)' : ''}`);
      if (dryRun) continue;
      try {
        const out = await translateFields(cfg, lang, wanted);
        tables[lang][id] = { ...(tables[lang][id] ?? {}), ...out };
        for (const key of Object.keys(out)) refreshed.add(`${lang}|p|${id}|${key}`);
        translated += Object.keys(out).length;
      } catch (err) {
        failures++;
        console.error(`  FAILED (${err.message}) — keeping the previous translation for ${id}.`);
      }
    }

    /* ---- blog ---- */
    const blogBucket = report.blog[lang] ?? { missing: [], stale: [] };
    const byPost = {};
    for (const { id, field } of blogBucket.stale) (byPost[id] ??= new Set()).add(field === 'bodyHtml' ? 'body' : field);
    for (const id of blogBucket.missing) for (const key of BLOG_FIELDS) byPost[id] ??= new Set(), byPost[id].add(key);

    for (const id of Object.keys(byPost)) {
      const post = enBlog[id];
      const wanted = {};
      for (const key of byPost[id]) wanted[key] = post[key];
      const label = Object.keys(wanted).join(', ');
      console.log(`[blog] ${lang} "${id}": translating { ${label} }${dryRun ? ' (dry-run)' : ''}`);
      if (dryRun) continue;
      try {
        const out = await translateFields(cfg, lang, wanted);
        const entry = { ...(blogTrees[lang][id] ?? {}) };
        if (out.title !== undefined) entry.title = out.title;
        if (out.description !== undefined) entry.description = out.description;
        if (out.tags !== undefined) entry.tags = out.tags;
        if (out.body !== undefined) entry.bodyHtml = out.body;
        blogTrees[lang][id] = entry;
        for (const key of Object.keys(out)) refreshed.add(`${lang}|b|${id}|${key}`);
        translated += Object.keys(out).length;
      } catch (err) {
        failures++;
        console.error(`  FAILED (${err.message}) — keeping the previous translation for "${id}".`);
      }
    }

    /* ---- tree domains: ui / about / categories ---- */
    for (const domain of TREE_DOMAINS) {
      const treeBucket = report[domain][lang] ?? { missing: [], stale: [] };
      const paths = [...treeBucket.missing, ...treeBucket.stale];
      if (!paths.length) continue;
      console.log(`[${domain}] ${lang}: ${paths.length} field(s) to regenerate${dryRun ? ' (dry-run)' : ''}`);
      if (dryRun) continue;

      const translations = {};
      let domainFailures = 0;
      for (const part of chunk(paths, CHUNK_SIZE)) {
        const wanted = Object.fromEntries(part.map((path) => [path, treeLeaves[domain][path]]));
        try {
          const out = await translateFields(cfg, lang, wanted);
          Object.assign(translations, out);
          for (const key of Object.keys(out)) refreshed.add(`${lang}|t|${domain}|${key}`);
          translated += Object.keys(out).length;
        } catch (err) {
          domainFailures++;
          failures++;
          console.error(`  FAILED (${err.message}) — keeping the previous translation for this batch.`);
        }
      }

      if (Object.keys(translations).length === 0) continue; // nothing succeeded: keep file untouched

      // English structure + this run's translations + previous locale values;
      // AI failures can never write an empty value over a translation.
      const merged = rebuildTree(enTrees[domain], localeTrees[domain][lang], translations);
      const file = TREE_WRITERS[domain](lang, merged);
      localeTrees[domain][lang] = merged;
      console.log(`  wrote ${path.relative(ROOT, file)}`);
      if (domainFailures) console.log(`  (${domainFailures} batch(es) failed — those fields keep their previous value.)`);
    }

    if (!dryRun) {
      const prodFile = writeProductsFile(lang, tables[lang]);
      const blogFile = writeBlogFile(lang, blogTrees[lang]);
      console.log(`  wrote ${path.relative(ROOT, prodFile)}, ${path.relative(ROOT, blogFile)}`);
    }
  }

  if (dryRun) {
    console.log(`Dry run: ${failures} issue(s) would need attention. No files written.`);
    process.exit(failures ? 1 : 0);
  }

  // Refresh the manifest — per language, but ONLY for fields actually
  // regenerated this run. Everything else keeps its previous hash so that
  // drift in the untouched locales stays visible to i18n:check.
  const fresh = { products: {}, blog: {}, ui: { ...manifest.ui }, about: { ...manifest.about }, categories: { ...manifest.categories } };

  for (const product of enProducts) {
    const fields = productFields(product);
    const entry = {};
    for (const [key, value] of Object.entries(fields)) {
      const perLang = {};
      for (const lang of LANGS) {
        if (tables[lang]?.[product.id]?.[key] === undefined) continue;
        const rk = `${lang}|p|${product.id}|${key}`;
        const oldHash = manifest.products[product.id]?.[key]?.[lang];
        perLang[lang] = refreshed.has(rk) || !oldHash ? sha(value) : oldHash;
      }
      if (Object.keys(perLang).length) entry[key] = perLang;
    }
    if (Object.keys(entry).length) fresh.products[product.id] = entry;
  }
  for (const [id, post] of Object.entries(enBlog)) {
    const entry = {};
    const byKey = { title: post.title, description: post.description, tags: post.tags, body: post.body };
    for (const [key, value] of Object.entries(byKey)) {
      const tableKey = key === 'body' ? 'bodyHtml' : key;
      const perLang = {};
      for (const lang of LANGS) {
        if (blogTrees[lang]?.[id]?.[tableKey] === undefined) continue;
        const rk = `${lang}|b|${id}|${key}`;
        const oldHash = manifest.blog[id]?.[key]?.[lang];
        perLang[lang] = refreshed.has(rk) || !oldHash ? sha(value) : oldHash;
      }
      if (Object.keys(perLang).length) entry[key] = perLang;
    }
    if (Object.keys(entry).length) fresh.blog[id] = entry;
  }
  for (const domain of TREE_DOMAINS) {
    const section = {};
    for (const [path, value] of Object.entries(treeLeaves[domain])) {
      const perLang = {};
      for (const lang of LANGS) {
        if (getPath(localeTrees[domain][lang], path) === undefined) continue;
        const rk = `${lang}|t|${domain}|${path}`;
        const oldHash = manifest[domain]?.[path]?.[lang];
        perLang[lang] = refreshed.has(rk) || !oldHash ? sha(value) : oldHash;
      }
      if (Object.keys(perLang).length) section[path] = perLang;
    }
    fresh[domain] = section;
  }
  writeManifest(fresh);

  console.log(`\nDone: ${translated} field(s) regenerated across ${only.length} locale(s), ${failures} failure(s).`);
  console.log('Next: npm run i18n:check to confirm, then astro build.');
  process.exit(failures ? 1 : 0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
