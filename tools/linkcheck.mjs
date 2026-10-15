// One-off audit helper: scan dist/ HTML for internal links/images that 404.
// Not part of the build. Usage: node tools/linkcheck.mjs
import { readdir, readFile, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
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

const pageSet = new Set(files.map((f) => '/' + path.relative(ROOT, f).replace(/\\/g, '/')));
const broken = new Map(); // target -> Set(source)

function existsTarget(t) {
  const clean = t.split('#')[0].split('?')[0];
  if (!clean.startsWith('/')) return true; // external / mailto / tel
  if (clean === '/') return pageSet.has('/index.html');
  // asset file
  const asset = path.join(ROOT, clean);
  if (existsSync(asset)) return true;
  // directory page
  if (pageSet.has(clean)) return true;
  if (pageSet.has(clean.replace(/\/$/, '') + '/index.html')) return true;
  if (pageSet.has(clean + 'index.html')) return true;
  return false;
}

const re = /(?:href|src)="(\/[^"#][^"]*)"/g;
for (const f of files) {
  const html = await readFile(f, 'utf8');
  let m;
  while ((m = re.exec(html))) {
    const t = m[1];
    if (t.startsWith('//')) continue;
    if (!existsTarget(t)) {
      const src = '/' + path.relative(ROOT, f).replace(/\\/g, '/');
      if (!broken.has(t)) broken.set(t, new Set());
      broken.get(t).add(src);
    }
  }
}

if (broken.size === 0) {
  console.log('OK: no broken internal links/images in dist/');
} else {
  console.log(`BROKEN targets: ${broken.size}`);
  for (const [t, srcs] of [...broken.entries()].sort()) {
    console.log(`  ${t}  <- ${[...srcs].slice(0, 3).join(', ')}${srcs.size > 3 ? ` (+${srcs.size - 3})` : ''}`);
  }
}
console.log(`Scanned ${files.length} HTML files.`);
