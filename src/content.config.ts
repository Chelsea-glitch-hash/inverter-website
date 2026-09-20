import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Content collections.
 *
 * NOTE: products are NOT a collection. The product catalog is a plain typed
 * data table in src/data/products.ts (single source of truth) and is read
 * through src/lib/products.ts. Only editorial content (the blog) lives here.
 */
const blog = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    author: z.string().default('Zhongze Huasong'),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { blog };
