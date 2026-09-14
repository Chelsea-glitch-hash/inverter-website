/**
 * Resolves a product image reference from frontmatter to something renderable.
 *
 * Two channels are supported so images can be staged before/without the
 * Astro asset pipeline:
 *   1. Optimised assets: a bare file name inside src/assets/products/
 *      (processed by astro:assets at build time).
 *   2. Public files: a path under public/, e.g.
 *      "images/products/off-grid-inverters/1800w-p-series/01.jpg" or
 *      "/images/products/off-grid-inverters/1800w-p-series/01.jpg".
 *
 * Returns undefined when the reference cannot be resolved — callers render a
 * placeholder instead of a broken <img>.
 */
import type { ImageMetadata } from 'astro';

const imageModules = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/products/*.{svg,png,jpg,jpeg,webp,avif}',
  { eager: true }
);

export type ResolvedProductImage =
  | { kind: 'asset'; src: ImageMetadata }
  | { kind: 'public'; src: string };

const ABSOLUTE_URL = /^(https?:)?\/\//;

export function resolveProductImage(file: string): ResolvedProductImage | undefined {
  if (!file) return undefined;

  // External or already-absolute URL
  if (ABSOLUTE_URL.test(file) || file.startsWith('/')) {
    return { kind: 'public', src: file };
  }

  // Path relative to public/, e.g. "images/products/..."
  if (file.startsWith('images/')) {
    return { kind: 'public', src: `/${file}` };
  }

  const mod = imageModules[`/src/assets/products/${file}`];
  return mod ? { kind: 'asset', src: mod.default } : undefined;
}

/** Resolve a list, keeping only entries that can actually be rendered. */
export function resolveProductImages(files: string[]): ResolvedProductImage[] {
  return files
    .map((file) => resolveProductImage(file))
    .filter((img): img is ResolvedProductImage => Boolean(img));
}
