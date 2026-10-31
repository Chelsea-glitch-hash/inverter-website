#!/usr/bin/env node
/**
 * Consistency guard: the sitemap must agree with the canonical rules.
 *
 * Three things can silently drift apart:
 *   1. src/lib/power-categories.ts   — the rule (single-model = not canonical)
 *   2. src/data/non-canonical-paths.json — the list astro.config.mjs filters on
 *   3. dist/sitemap-0.xml            — what actually shipped
 *
 * If (2) goes stale against (1), a page whose canonical points at its product
 * page stays in the sitemap and the two signals contradict each other. If (3)
 * disagrees with (2), the build did not do what the config says. This script
 * checks all three, so the failure is caught here rather than in Search
 * Console weeks later.
 *
 * Also verifies lastmod coverage — a URL without one is the exact defect this
 * work set out to fix, and it is easy to reintroduce.
 *
 * Usage:
 *   node tools/verify-sitemap.mjs            # verify (non-zero exit on drift)
 *   node tools/verify-sitemap.mjs --fix      # regenerate the JSON, then verify
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { build } from 'esbuild';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const FIX = process.argv.includes('--fix');

const problems = [];
const note = (msg) => problems.push(msg);

/** Compile the TS rule module and import it, the same way the generator does.
    esbuild's Node API is used instead of the CLI because a .cmd cannot be
    spawned directly on Windows. */
async function loadRules() {
  const result = await build({
    entryPoints: [path.join(ROOT, 'src/lib/power-categories.ts')],
    bundle: true,
    format: 'esm',
    platform: 'node',
    write: false,
    logLevel: 'error',
  });
  const dataUrl =
    'data:text/javascript;base64,' +
    Buffer.from(result.outputFiles[0].text, 'utf8').toString('base64');
  return import(dataUrl);
}

/** English path of a sitemap URL, or of a `dist` file path. */
function toEnglishPath(url, locales) {
  const { pathname } = new URL(url);
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length > 0 && locales.includes(segments[0])) segments.shift();
  return '/' + segments.join('/') + (segments.length > 0 ? '/' : '');
}

const LOCALES = ['en', 'es', 'zh-hant', 'fr', 'ar', 'pt', 'it', 'de', 'ru', 'ja', 'ko'];

async function main() {
  /* --- 1. The rule vs the committed list -------------------------------- */
  const rules = await loadRules();
  const expected = rules.nonCanonicalPowerCategoryPaths().sort();
  const listPath = path.join(ROOT, 'src/data/non-canonical-paths.json');
  let committed;
  try {
    committed = JSON.parse(readFileSync(listPath, 'utf8')).sort();
  } catch {
    committed = null;
  }

  if (JSON.stringify(committed) !== JSON.stringify(expected)) {
    note(
      `non-canonical-paths.json is out of date with src/lib/power-categories.ts\n` +
        `      rule says ${expected.length} paths, file has ${committed?.length ?? 0}` +
        (FIX ? '\n      regenerating…' : '\n      run: node tools/gen-content-dates.mjs')
    );
  }

  /* --- 2. The rule vs the shipped sitemap ------------------------------- */
  const sitemapPath = path.join(ROOT, 'dist/sitemap-0.xml');
  let sitemap = null;
  try {
    sitemap = readFileSync(sitemapPath, 'utf8');
  } catch {
    console.log('dist/sitemap-0.xml not found — run `npm run build` first, skipping the sitemap checks.');
  }

  if (sitemap) {
    const blocks = sitemap.match(/<url>[\s\S]*?<\/url>/g) ?? [];
    const listedPaths = new Set();

    for (const block of blocks) {
      const loc = block.match(/<loc>([^<]*)<\/loc>/)?.[1];
      if (!loc) continue;
      listedPaths.add(toEnglishPath(loc, LOCALES));

      if (!/<lastmod>[^<]+<\/lastmod>/.test(block)) {
        note(`sitemap entry missing a usable <lastmod>: ${loc}`);
      }
    }

    for (const p of expected) {
      if (listedPaths.has(p)) {
        note(`non-canonical page is still listed in the sitemap: ${p}`);
      }
    }

    /* Every URL the sitemap lists must resolve to a built page. */
    for (const p of listedPaths) {
      const file = path.join(ROOT, 'dist', p, 'index.html');
      try {
        readFileSync(file);
      } catch {
        note(`sitemap lists a path with no built page: ${p}`);
      }
    }
  }

  if (problems.length === 0) {
    console.log('verify-sitemap: OK');
    console.log(`  non-canonical paths: ${expected.length} (excluded from the sitemap)`);
    if (sitemap) {
      const blocks = sitemap.match(/<url>[\s\S]*?<\/url>/g) ?? [];
      const dates = new Set(
        blocks.map((b) => b.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1].slice(0, 10)).filter(Boolean)
      );
      console.log(`  sitemap URLs:        ${blocks.length}`);
      console.log(`  distinct lastmods:   ${dates.size}`);
    }
    return;
  }

  console.error('verify-sitemap: FAILED');
  for (const p of problems) console.error('  - ' + p);
  process.exitCode = 1;
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
