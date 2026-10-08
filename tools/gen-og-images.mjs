/**
 * Generate the Open Graph / social share images and the schema.org logo.
 *
 * Outputs (all committed under public/, so they serve from stable URLs):
 *   public/images/og/default.jpg    1200x630  site-wide fallback
 *   public/images/og/products.jpg   1200x630  product + catalog pages
 *   public/images/og/logo.png        512x512  schema.org Organization.logo
 *
 * Run:  node tools/gen-og-images.mjs
 *
 * Design notes
 *   - The brand logo is a dark navy mark on transparency, so the cards use a
 *     white background for contrast (brand-600 / brand-800 accents only).
 *   - Text is rendered by librsvg through sharp; the font stack falls back to
 *     whatever sans-serif the host provides. Verify the output visually after
 *     changing any copy — text is not re-flowed automatically.
 */

import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT_DIR = join(ROOT, 'public', 'images', 'og');
const LOGO_SRC = join(ROOT, 'src', 'assets', 'brand', 'logo.png');

const BRAND_600 = '#245299';
const BRAND_800 = '#17355f';
const ACCENT_500 = '#d99a1e';
const SLATE_900 = '#0f172a';
const SLATE_500 = '#475569';
const RULE = '#e2e8f0';

const W = 1200;
const H = 630;
const FONT = 'Arial, Helvetica, sans-serif';

/**
 * Build one 1200x630 card. `headline` is an array of lines rendered as a
 * block; keep each line under ~28 characters so it fits the 1032px text column.
 * The logo is composited separately (see writeCard) — this SVG only reserves
 * space for it at (84, 84)–(174, 174).
 */
function cardSvg({ headline, subline, footer }) {
  const headlineLines = headline
    .map(
      (line, i) =>
        `<text x="84" y="${360 + i * 68}" font-family="${FONT}" font-size="56" font-weight="bold" fill="${SLATE_900}">${line}</text>`
    )
    .join('\n  ');

  const accentY = 360 + headline.length * 68 - 34;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="#ffffff"/>
  <rect x="0" y="0" width="14" height="${H}" fill="${BRAND_600}"/>

  <text x="200" y="140" font-family="${FONT}" font-size="34" font-weight="bold" fill="${BRAND_800}">Zhongze Huasong</text>
  <text x="200" y="174" font-family="${FONT}" font-size="21" fill="${SLATE_500}">Shenzhen Zhongze Huasong Trading Co., Ltd.</text>

  <rect x="84" y="222" width="1032" height="1" fill="${RULE}"/>

  ${headlineLines}

  <rect x="84" y="${accentY}" width="132" height="7" fill="${ACCENT_500}"/>

  <text x="84" y="${accentY + 62}" font-family="${FONT}" font-size="22" fill="${SLATE_500}">${subline}</text>

  <rect x="84" y="${H - 92}" width="1032" height="1" fill="${RULE}"/>
  <text x="84" y="${H - 46}" font-family="${FONT}" font-size="24" font-weight="bold" fill="${BRAND_600}">${footer}</text>
  <text x="1116" y="${H - 46}" text-anchor="end" font-family="${FONT}" font-size="22" fill="${SLATE_500}">Established 2010</text>
</svg>`;
}

async function writeCard(file, config) {
  const logo = await sharp(LOGO_SRC).trim({ threshold: 10 }).resize(90, 90, {
    fit: 'contain',
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  });
  await sharp(Buffer.from(cardSvg(config)))
    .composite([{ input: await logo.png().toBuffer(), left: 84, top: 84 }])
    .jpeg({ quality: 90, chromaSubsampling: '4:4:4', mozjpeg: true })
    .toFile(join(OUT_DIR, file));
  console.log(`  wrote ${file}`);
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  await writeCard('default.jpg', {
    headline: ['Inverter Manufacturer', 'for Global B2B Partners'],
    subline: 'Off-grid · Off-grid solar · Hybrid · Grid-tie — OEM / ODM · ISO 9001 · 60+ export countries',
    footer: 'www.zzpine.com',
  });

  await writeCard('products.jpg', {
    headline: ['Off-Grid Inverter Catalog', '900 W to 11 kW'],
    subline: 'Pure sine wave · Built-in MPPT models · Multi-voltage input · OEM / ODM branding',
    footer: 'www.zzpine.com/products/',
  });

  /* schema.org logo: dark mark on transparency would disappear in some
     rich-result renderers, so flatten it onto white with a small margin. */
  const mark = await sharp(LOGO_SRC).trim({ threshold: 10 }).resize(432, 432, {
    fit: 'contain',
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  });
  await sharp({
    create: { width: 512, height: 512, channels: 4, background: '#ffffff' },
  })
    .composite([{ input: await mark.png().toBuffer(), gravity: 'center' }])
    .png({ compressionLevel: 9 })
    .toFile(join(OUT_DIR, 'logo.png'));
  console.log('  wrote logo.png');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
