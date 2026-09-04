import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Product categories must match the slugs used in URLs:
 * /products/{category}/{product-slug}/
 */
export const PRODUCT_CATEGORIES = [
  'hybrid-inverters',
  'grid-tie-inverters',
  'off-grid-inverters',
  'accessories',
] as const;

const products = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/products' }),
  schema: z.object({
    /* --- Basic information --- */
    sku: z.string(),
    name: z.string(),
    shortDescription: z.string(),
    category: z.enum(PRODUCT_CATEGORIES),
    topology: z.string().optional(),
    phase: z.enum(['single', 'three']).optional(),
    featured: z.boolean().default(false),

    /* --- Numeric, filterable / sortable fields (keep structured!) --- */
    ratedPower: z.number().optional(),
    ratedPowerUnit: z.string().default('W'),
    batteryVoltage: z.number().optional(),
    batteryVoltageUnit: z.string().default('V'),
    maxDcInput: z.number().optional(),
    efficiencyPercent: z.number().optional(),

    /* --- Technical specifications --- */
    specs: z
      .array(
        z.object({
          group: z.string().optional(),
          label: z.string(),
          value: z.string(),
        })
      )
      .default([]),

    /* --- Features / Applications --- */
    features: z.array(z.string()).default([]),
    applications: z.array(z.string()).default([]),

    /* --- Certifications --- */
    certifications: z.array(z.string()).default([]),

    /* --- Downloads --- */
    datasheet: z.string().optional(),

    /* --- Media --- */
    images: z.array(z.string()).default([]),

    /* --- FAQ --- */
    faq: z
      .array(z.object({ question: z.string(), answer: z.string() }))
      .default([]),

    /* --- SEO --- */
    seoTitle: z.string().optional(),
    seoDescription: z.string(),
    publishDate: z.coerce.date().default(() => new Date()),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    author: z.string().default('Your Company Name'),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { products, blog };
