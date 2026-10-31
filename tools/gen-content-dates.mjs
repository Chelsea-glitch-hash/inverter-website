#!/usr/bin/env node
/**
 * Generate src/data/content-dates.json — the real last-modified date of every
 * page family, read from git history.
 *
 * WHY THIS EXISTS
 * ---------------
 * The XML sitemap had no <lastmod> at all (verified on the live
 * sitemap-0.xml, 2026-10-30). Google's sitemap documentation only acts on
 * `lastmod` — it ignores `priority` and `changefreq` — and treats it as a
 * binary "did this URL change since I last saw it?" flag. Without it, a newly
 * published article and a page untouched since launch look identical to the
 * crawler, so nothing gets prioritised for recrawl.
 *
 * The date must be REAL. Stamping every URL with the build time is worse than
 * emitting nothing: Google detects the bogus signal and stops trusting the
 * field entirely. Freshness has to be earned per page.
 *
 * DISCRIMINATION MATTERS
 * ----------------------
 * A date is only useful if it distinguishes pages. Folding site-wide chrome
 * (BaseLayout, config.ts) into every family would collapse all of them onto
 * one date, so chrome is deliberately EXCLUDED. Each family is dated from the
 * files that drive its own rendered content.
 *
 * WHY A GENERATED JSON FILE
 * -------------------------
 * src/data/products.ts and friends are TypeScript. astro.config.mjs cannot
 * import them (Node resolves the .ts specifier as a missing module — verified),
 * and pulling a bundler into the config would be brittle. A committed JSON
 * artefact keeps the config a plain ESM file and gives the build a fixed input
 * that does not depend on git being present or unshallow at build time.
 *
 * WHEN TO RUN
 * -----------
 * After any content change, before committing:
 *   node tools/gen-content-dates.mjs
 * It reads git history, so uncommitted edits are not dated — run it after the
 * commit that contains the change (or re-run and amend).
 */
import { execFileSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';
import { build } from 'esbuild';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'src', 'data', 'content-dates.json');
const OUT_NON_CANONICAL = path.join(ROOT, 'src', 'data', 'non-canonical-paths.json');

const git = (args) =>
  execFileSync('git', args, { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();

/** Committer date of the most recent commit touching `file`, as ISO 8601. */
function lastCommitIso(file) {
  try {
    return git(['log', '-1', '--format=%cI', '--', file]) || null;
  } catch {
    return null;
  }
}

/** Newest ISO date among a list, ignoring nulls. ISO 8601 sorts lexically. */
function newest(dates) {
  const valid = dates.filter(Boolean).sort();
  return valid.length > 0 ? valid[valid.length - 1] : null;
}

/**
 * Compile a TypeScript module in memory and import it, so this script can read
 * the catalog rules straight from their single source of truth instead of
 * restating them. Uses the esbuild Node API rather than the CLI binary, which
 * cannot be spawned directly as a .cmd on Windows.
 */
async function buildAndImportTs(entry) {
  const result = await build({
    entryPoints: [path.join(ROOT, entry)],
    bundle: true,
    format: 'esm',
    platform: 'node',
    write: false,
    logLevel: 'error',
  });
  const code = result.outputFiles[0].text;
  const dataUrl = 'data:text/javascript;base64,' + Buffer.from(code, 'utf8').toString('base64');
  return import(dataUrl);
}

const dates = {};

/* ---------------------------------------------------------------------------
 * Static marketing pages: dated from their own template only. Site-wide chrome
 * is excluded on purpose so these dates do not collapse together.
 * ------------------------------------------------------------------------- */
const PAGE_SOURCES = {
  home: ['src/templates/HomePage.astro'],
  about: ['src/templates/AboutPage.astro', 'src/i18n/about'],
  factory: ['src/templates/FactoryPage.astro'],
  quality: ['src/templates/QualityPage.astro'],
  contact: ['src/templates/ContactPage.astro'],
  privacy: ['src/templates/PrivacyPage.astro'],
  oemOdm: ['src/templates/OemOdmPage.astro'],
  sizingCalculator: ['src/templates/SizingCalculatorPage.astro', 'src/lib/sizing.ts'],
  blogIndex: ['src/templates/BlogIndexPage.astro'],
};

for (const [kind, files] of Object.entries(PAGE_SOURCES)) {
  dates[kind] = newest(files.map(lastCommitIso));
}

/* ---------------------------------------------------------------------------
 * Catalog: the product data table is the content, so every catalog family is
 * dated from it plus its own template. A product edit therefore refreshes the
 * product, category and power pages while leaving the blog untouched.
 * ------------------------------------------------------------------------- */
const CATALOG_DATA = ['src/data/products.ts'];
for (const [kind, template] of Object.entries({
  productsIndex: 'src/templates/ProductsIndexPage.astro',
  category: 'src/templates/CategoryPage.astro',
  power: 'src/templates/PowerPage.astro',
  product: 'src/templates/ProductDetailPage.astro',
})) {
  dates[kind] = newest([...CATALOG_DATA, template].map(lastCommitIso));
}

/* ---------------------------------------------------------------------------
 * Blog index: its own template plus the per-locale translation tables it
 * renders from.
 * ------------------------------------------------------------------------- */
dates.blogIndex = newest([
  'src/templates/BlogIndexPage.astro',
  'src/i18n/blog-content.ts',
  'src/i18n/blog',
].map(lastCommitIso));

/* ---------------------------------------------------------------------------
 * Blog articles: each MDX dated on its own, so an article published in
 * September keeps a September date.
 *
 * Translation files are deliberately NOT folded in. They are aggregated per
 * LOCALE (src/i18n/blog/de.ts holds every article), so a new post's
 * translations bump all ten locale files at once — folding them in stamped all
 * 26 articles with the same date and destroyed the discrimination that makes
 * lastmod useful. The MDX is the source of truth for the article; the English
 * copy changing is what genuinely makes the page new.
 * ------------------------------------------------------------------------- */
dates.blog = {};
dates.blogFiles = {};

const articleFiles = git(['ls-files', 'src/content/blog'])
  .split('\n')
  .filter((f) => f.endsWith('.mdx'));

for (const file of articleFiles) {
  const slug = path.basename(file).replace(/\.mdx$/, '');
  dates.blogFiles[slug] = file;
  dates.blog[slug] = lastCommitIso(file) ?? dates.blogIndex;
}

/* ---------------------------------------------------------------------------
 * Fallback for any URL matching no family. Never a build timestamp — the
 * newest genuine content date is still a real, defensible value.
 * ------------------------------------------------------------------------- */
dates._generated = newest([
  ...Object.entries(dates)
    .filter(([k, v]) => typeof v === 'string' && k !== '_generated')
    .map(([, v]) => v),
  ...Object.values(dates.blog),
]);

writeFileSync(OUT, JSON.stringify(dates, null, 2) + '\n', 'utf8');

/* ---------------------------------------------------------------------------
 * Non-canonical power-page paths, for the sitemap filter in astro.config.mjs.
 *
 * The rule itself lives in src/lib/power-categories.ts (TypeScript, which the
 * config cannot import). Rather than restate the rule in two languages and let
 * them drift, this script derives the list from the single source of truth by
 * asking the product data — so there is exactly one place that decides what
 * "single-model power page" means. scripts/verify-sitemap.mjs re-derives it
 * independently and fails the build if the emitted sitemap disagrees.
 * ------------------------------------------------------------------------- */
const catalogModule = await buildAndImportTs('src/lib/power-categories.ts');
const nonCanonical = catalogModule.nonCanonicalPowerCategoryPaths();
writeFileSync(OUT_NON_CANONICAL, JSON.stringify(nonCanonical, null, 2) + '\n', 'utf8');

console.log(`non-canonical paths written: ${path.relative(ROOT, OUT_NON_CANONICAL)} (${nonCanonical.length})`);

const familyDates = Object.entries(dates).filter(([k, v]) => typeof v === 'string' && k !== '_generated');
const distinct = new Set(familyDates.map(([, v]) => v));

/* A null date means every file behind that family is uncommitted (or the paths
   are wrong), so git has nothing to report. That silently weakens exactly the
   newest pages, so it is surfaced loudly rather than written out as a gap. */
const undatedFamilies = Object.entries(dates).filter(
  ([k, v]) => v === null && k !== '_generated'
);
if (undatedFamilies.length > 0) {
  console.warn('');
  console.warn('WARNING — no git date for these page families:');
  for (const [kind] of undatedFamilies) {
    const sources = PAGE_SOURCES[kind] ?? ['(see catalog/other sources)'];
    console.warn(`  ${kind}  <-  ${sources.join(', ')}`);
  }
  console.warn('  Their sources are probably uncommitted, or the paths moved.');
  console.warn('  Commit them and re-run to get a real date.');
}

console.log(`content-dates.json written: ${path.relative(ROOT, OUT)}`);
console.log(`  page families:        ${familyDates.length}`);
console.log(`  blog articles:        ${Object.keys(dates.blog).length}`);
console.log(`  distinct family dates: ${distinct.size} (higher = better discrimination)`);
console.log(`  newest content date:  ${dates._generated}`);
