# About page images

Drop the company photographs into this folder using the file names below.
They are picked up automatically at build time — no code change is needed.

| File name              | Used in                          | Requested asset            |
| ---------------------- | -------------------------------- | -------------------------- |
| `factory-hero.jpg`     | Section 1 — Hero                 | Factory exterior photo 1   |
| `factory-quality.jpg`  | Section 4 — R&D / Mfg / Quality  | Factory exterior photo 2   |
| `factory-global.jpg`   | Section 7 — Global supply band   | Factory exterior photo 3   |
| `product-line-01.jpg`  | Section 4 — Production floor: SMT line        | Production line photo 1    |
| `product-line-02.jpg`  | Section 4 — Production floor: automated line  | Production line photo 2    |
| `product-line-03.jpg`  | Section 4 — Production floor: testing         | Production line photo 3    |
| `product-line-04.jpg`  | Section 4 — Production floor: assembly / QC   | Production line photo 4    |

Accepted extensions: `.jpg` `.jpeg` `.png` `.webp` `.avif`

Notes:

- Landscape originals (roughly 3:2 to 16:9) work best for the hero and the
  wide global-supply band; production-floor images are shown in a 4:3 frame.
- The `product-line-*` photos are manufacturing / testing site images used to
  show factory capability. They are NOT product photos — do not use them to
  represent a product series. The Product Portfolio section is text-only.
- Images are never stretched. The container ratio is derived from the real
  file dimensions, so a photo keeps its proportions.
- Slots without a file render a labelled placeholder instead of a fake or
  stock image.
- Registry and slot names: `src/lib/about-images.ts`.
