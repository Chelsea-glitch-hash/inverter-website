# inverter-website

B2B Inverter Manufacturer Website

English-language B2B website for an inverter manufacturer: company site +
product catalog + SEO content + inquiry lead generation + marketing
attribution. Static-first architecture on Astro, deployed to Cloudflare Pages.

## Tech stack

| Layer | Technology |
|---|---|
| Frontend | Astro (SSG, zero-JS by default) |
| Styling | Tailwind CSS v4 |
| Content | Astro Content Collections (Markdown/MDX) |
| Hosting | Cloudflare Pages (auto-deploy from GitHub `main`) |
| Dynamic functions | Cloudflare Pages Functions (`/api/inquiry`, `/api/newsletter`) |
| Anti-spam | Cloudflare Turnstile + honeypot |
| Transactional email | Resend (inquiry notifications only) |
| Analytics | GA4 (Consent Mode v2) + Google Search Console |

## Quick start

```bash
npm install
npm run dev      # local dev server
npm run build    # static build to dist/
npm run preview  # preview the production build
```

Note: `/api/*` functions run on Cloudflare Pages — test locally with
`npx wrangler pages dev` or deploy a preview branch.

## Project structure

```
src/
├── config.ts              # single source of truth: company, contact, analytics keys
├── content/
│   ├── products/          # one MDX file per product (structured frontmatter)
│   └── blog/              # SEO articles
├── components/            # reusable UI components
├── layouts/BaseLayout.astro
├── lib/                   # analytics + UTM attribution helpers
├── scripts/tracking.ts    # global event tracking (GA4)
└── pages/                 # routes (products use dynamic [category]/[product])
functions/api/             # Cloudflare Pages Functions (inquiry, newsletter)
public/
├── downloads/             # product PDFs (stable URLs)
└── _headers               # caching + security headers
```

## Adding a new product

1. Add images to `src/assets/products/`
2. Create `src/content/products/<category>/<sku>.mdx` with structured frontmatter
3. Optional: add the datasheet PDF to `public/downloads/` and set `datasheet:`
4. Commit to `main` — the site, sitemap and listings update automatically

## Configuration checklist before launch

- [ ] `src/config.ts`: company name, domain, contact email, WhatsApp
- [ ] `astro.config.mjs`: `site` = production domain
- [ ] `public/robots.txt`: sitemap URL = production domain
- [ ] Cloudflare Pages env vars: `RESEND_API_KEY`, `INQUIRY_TO_EMAIL`,
      `INQUIRY_FROM_EMAIL`, `TURNSTILE_SECRET_KEY`
- [ ] `TURNSTILE.siteKey` in `src/config.ts` (public widget key)
- [ ] `ANALYTICS.ga4MeasurementId` in `src/config.ts`
- [ ] Replace placeholder product images and factory photos
- [ ] Privacy policy reviewed by a legal professional

## Deployment

GitHub `main` → Cloudflare Pages (build: `npm run build`, output: `dist`).
Bind a custom domain in the Cloudflare dashboard; HTTPS is automatic.

## Git conventions

Conventional commits (`feat:`, `fix:`, `chore:`, `docs:`), tag milestones as
`v0.1.0`, `v0.2.0`, … Never commit secrets — `.env` files are gitignored.
