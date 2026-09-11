/**
 * About page image registry.
 *
 * Images are not translatable text, so they live outside the i18n
 * dictionaries and are resolved by a stable slot name. This keeps the page
 * layout complete and buildable even before the photography is supplied, and
 * means "adding a photo" is a file drop - never a code change.
 *
 * Drop files into src/assets/about/ named after the slot:
 *
 *   factory-hero.jpg       -> About hero (factory exterior 1)
 *   factory-quality.jpg    -> R&D / Manufacturing / Quality (factory exterior 2)
 *   factory-global.jpg     -> Global supply band (factory exterior 3)
 *   product-line-01.jpg    -> Production-floor gallery 1 (manufacturing)
 *   product-line-02.jpg    -> Production-floor gallery 2 (production)
 *   product-line-03.jpg    -> Production-floor gallery 3 (testing)
 *   product-line-04.jpg    -> Production-floor gallery 4 (assembly / QC)
 *
 * These four are factory-floor / test-site photos used to show manufacturing
 * capability. They are NOT product photos and must never be presented as a
 * product series.
 *
 * Accepted extensions: .jpg .jpeg .png .webp .avif
 * Unused slots render a labelled placeholder instead of a fake image.
 */
import type { ImageMetadata } from 'astro';

export const ABOUT_IMAGE_SLOTS = [
  'factory-hero',
  'factory-quality',
  'factory-global',
  'product-line-01',
  'product-line-02',
  'product-line-03',
  'product-line-04',
] as const;

export type AboutImageSlot = (typeof ABOUT_IMAGE_SLOTS)[number];

const modules = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/about/*.{jpg,jpeg,png,webp,avif}',
  { eager: true }
);

const slotSet = new Set<string>(ABOUT_IMAGE_SLOTS);

export const aboutImages: Partial<Record<AboutImageSlot, ImageMetadata>> = {};

for (const [path, mod] of Object.entries(modules)) {
  const stem = path.split('/').pop()?.replace(/\.[^.]+$/, '').toLowerCase() ?? '';
  if (slotSet.has(stem)) {
    aboutImages[stem as AboutImageSlot] = mod.default;
  }
}

/**
 * Container aspect ratio derived from the real photo, so factory images are
 * never stretched and never aggressively cropped. Returns literal class
 * strings on purpose - Tailwind cannot generate dynamically built names.
 */
export function frameFor(image: ImageMetadata | undefined, fallback: string): string {
  if (!image || !image.width || !image.height) return fallback;
  const ratio = image.width / image.height;
  if (ratio >= 1.6) return 'aspect-[16/9]';
  if (ratio >= 1.2) return 'aspect-[3/2]';
  return 'aspect-[4/5]';
}
