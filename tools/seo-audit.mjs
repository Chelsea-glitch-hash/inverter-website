// One-off audit helper: duplicate <title>, meta description, h1 count, og:image, canonical.
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const ROOT = 'dist';
const files = [];
async function walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) await walk(p);
    else if (e.name.endsWith('.html')) files.push(p);
  }
}
await walk(ROOT);

const titles = new Map(), descs = new Map(), canon = new Map();
let noH1 = [], multiH1 = [], noCanonical = [], noOgImage = 0, noDesc = [], noindexCount = 0;
const grab = (html, re) => (html.match(re) || [])[1]?.trim() ?? '';

for (const f of files) {
  const html = await readFile(f, 'utf8');
  const rel = '/' + path.relative(ROOT, f).replace(/\\/g, '/');
  const title = grab(html, /<title>([\s\S]*?)<\/title>/i);
  const desc = (html.match(/<meta name="description" content="([^"]*)"/i) || [])[1] ?? '';
  const canonical = (html.match(/<link rel="canonical" href="([^"]*)"/i) || [])[1] ?? '';
  const h1 = (html.match(/<h1[\s>]/gi) || []).length;

  if (!title) noH1.push(rel + ' (no title)');
  if (!desc) noDesc.push(rel);
  if (!canonical) noCanonical.push(rel);
  if (!/og:image/.test(html)) noOgImage++;
  if (h1 === 0) noH1.push(rel);
  if (h1 > 1) multiH1.push(`${rel} (${h1})`);
  if (/name="robots" content="noindex/.test(html)) noindexCount++;

  const tk = title || '(empty)';
  (titles.get(tk) ?? titles.set(tk, []).get(tk)).push(rel);
  if (desc) (descs.get(desc) ?? descs.set(desc, []).get(desc)).push(rel);
  if (canonical) (canon.get(canonical) ?? canon.set(canonical, []).get(canonical)).push(rel);
}

const dup = (m, label) => {
  const d = [...m.entries()].filter(([, v]) => v.length > 1);
  console.log(`\n== duplicate ${label}: ${d.length} groups ==`);
  for (const [k, v] of d.slice(0, 12)) console.log(`  "${k.slice(0, 70)}" x${v.length} -> ${v.slice(0, 3).join(', ')}`);
};

console.log(`Scanned ${files.length} HTML files.`);
console.log(`noindex pages: ${noindexCount}`);
console.log(`pages missing canonical: ${noCanonical.length}`);
console.log(`pages missing og:image: ${noOgImage}`);
console.log(`pages missing meta description: ${noDesc.length}`);
console.log(`h1 issues: ${noH1.length + multiH1.length}`);
console.log('  no h1 (or no title):', noH1.slice(0, 10).join(', ') || 'none');
console.log('  multiple h1:', multiH1.slice(0, 10).join(', ') || 'none');
dup(titles, 'title');
dup(descs, 'meta description');
dup(canon, 'canonical');
