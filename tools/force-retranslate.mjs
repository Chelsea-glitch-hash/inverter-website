#!/usr/bin/env node
/**
 * Force specific locale fields back through the translation pipeline.
 *
 * WHY THIS IS NEEDED
 * ------------------
 * i18n-sync.mjs decides what to translate from hash drift recorded in
 * src/i18n/manifest.json. When a translation batch FAILS the script still
 * writes the English strings into the locale file and records the English
 * hashes as if the work had succeeded. From that point the field looks
 * translated: the key exists and its hash matches the source, so both
 * `i18n:check` and `i18n:update --dry-run` report "in sync" while English text
 * is live on a non-English page.
 *
 * Deleting the manifest entry does NOT help — the checker treats a falsy
 * recorded hash as "nothing to compare" and stays silent. Writing a hash that
 * deliberately differs from the source is what makes the checker flag the
 * field as STALE, which is the one state the updater acts on.
 *
 * WHY A SCOPE IS MANDATORY
 * ------------------------
 * Plenty of fields are legitimately identical across locales: acronyms (OEM,
 * ISO, USB), brand names, units, URLs, model codes, standard designations.
 * Force-translating all of them would corrupt those values, so callers must
 * name the field prefixes to consider — and can name sub-paths to skip.
 *
 * Usage:
 *   # report what is untranslated inside a scope, change nothing
 *   node tools/force-retranslate.mjs --locale=it,ko --scope=home.summary,home.faq
 *
 *   # report AND poison the manifest hashes so `i18n:update` regenerates them
 *   node tools/force-retranslate.mjs --locale=it,ko --scope=home.summary,home.faq --apply
 *
 *   # ...while leaving standard designations and URLs in English
 *   node tools/force-retranslate.mjs --locale=it --scope=home.certifications.standards \
 *     --exclude=.code,.url,.publisher --apply
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { build } from 'esbuild';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const MANIFEST = path.join(ROOT, 'src', 'i18n', 'manifest.json');

const args = process.argv.slice(2);
const apply = args.includes('--apply');
const locales = (args.find((a) => a.startsWith('--locale='))?.slice(9) ?? '').split(',').filter(Boolean);
const scopes = (args.find((a) => a.startsWith('--scope='))?.slice(8) ?? '').split(',').filter(Boolean);
const excludes = (args.find((a) => a.startsWith('--exclude='))?.slice(10) ?? '').split(',').filter(Boolean);

if (locales.length === 0 || scopes.length === 0) {
  console.error(
    'Usage: node tools/force-retranslate.mjs --locale=it,ko --scope=home.summary,home.faq [--exclude=.code,.url] [--apply]'
  );
  process.exit(1);
}

/** Compile a TS dictionary and return its exported object. */
async function loadDict(locale) {
  const result = await build({
    entryPoints: [path.join(ROOT, 'src', 'i18n', 'ui', `${locale}.ts`)],
    bundle: true,
    format: 'esm',
    platform: 'node',
    write: false,
    logLevel: 'error',
  });
  const dataUrl =
    'data:text/javascript;base64,' +
    Buffer.from(result.outputFiles[0].text, 'utf8').toString('base64');
  const mod = await import(dataUrl);
  const key = locale === 'zh-hant' ? 'zhHant' : locale;
  return mod[key] ?? mod.default ?? Object.values(mod)[0];
}

/** Every leaf path in an object, dotted, array indices included. */
function leafPaths(obj, prefix = '', out = []) {
  for (const [k, v] of Object.entries(obj)) {
    const p = prefix ? `${prefix}.${k}` : k;
    if (v !== null && typeof v === 'object') leafPaths(v, p, out);
    else out.push(p);
  }
  return out;
}

function getPath(obj, dotted) {
  return dotted.split('.').reduce((acc, k) => (acc === undefined ? undefined : acc[k]), obj);
}

const en = await loadDict('en');
const enLeaves = leafPaths(en);
const inScope = (p) =>
  scopes.some((s) => p === s || p.startsWith(s + '.')) &&
  !excludes.some((x) => p.endsWith(x) || p.includes(x + '.'));

const manifest = JSON.parse(readFileSync(MANIFEST, 'utf8'));
let poisoned = 0;

for (const locale of locales) {
  const dict = await loadDict(locale);
  const identical = enLeaves.filter((p) => inScope(p) && getPath(dict, p) === getPath(en, p));

  console.log(`[${locale}] untranslated inside scope: ${identical.length}`);
  for (const p of identical) console.log(`   ${p}`);

  if (apply) {
    for (const p of identical) {
      /* Only poison fields the manifest actually tracks; an untracked path
         would be written as noise. */
      if (manifest.ui?.[p] && locale in manifest.ui[p]) {
        manifest.ui[p][locale] = 'force-retranslate';
        poisoned += 1;
      }
    }
  }
}

if (apply) {
  writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + '\n', 'utf8');
  console.log(`\nmanifest poisoned for ${poisoned} locale-field pair(s).`);
  console.log('Next: npm run i18n:update -- --only=' + locales.join(','));
} else {
  console.log('\n(dry report — pass --apply to poison the manifest hashes)');
}
