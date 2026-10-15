/**
 * RSS 2.0 feed for the technical blog.
 *
 * Hand-rolled instead of pulling in @astrojs/rss: the feed is ~15 lines of XML,
 * and a zero-dependency endpoint keeps the lockfile untouched.
 *
 * English only on purpose. The MDX articles are the single source of truth and
 * only their titles/descriptions are translated (src/i18n/blog-content.ts) —
 * the article bodies themselves are English. Offering per-locale feeds would
 * mean shipping localized <item> titles that link to English bodies, which is
 * worse for a reader than one honest English feed.
 *
 * Cloudflare Pages serves this as a static file at /rss.xml, matching the
 * <link rel="alternate"> declared in SEO.astro.
 */
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE } from '../config';

/**
 * XML text escaping for both element text and attribute values. Also strips the
 * control characters that are illegal in XML 1.0 — MDX descriptions are
 * authored by hand and a stray tab/form feed would otherwise make the feed
 * unparseable for strict readers.
 */
function escapeXml(value: string): string {
  return value
    // eslint-disable-next-line no-control-regex
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export const GET: APIRoute = async () => {
  const posts = (await getCollection('blog')).sort(
    (a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime()
  );

  const feedUrl = new URL('/rss.xml', SITE.url).href;
  const blogUrl = new URL('/blog/', SITE.url).href;

  /**
   * `lastBuildDate` is derived from the newest post rather than `new Date()`,
   * so a build that only touches unrelated code does not advertise the feed as
   * freshly updated. Readers use this to decide whether to re-fetch.
   */
  const lastBuildDate = posts[0]?.data.publishDate ?? new Date(0);

  const items = posts
    .map((post) => {
      const url = new URL(`/blog/${post.id}/`, SITE.url).href;
      const tags = post.data.tags.map((tag) => `      <category>${escapeXml(tag)}</category>`).join('\n');
      return `    <item>
      <title>${escapeXml(post.data.title)}</title>
      <link>${escapeXml(url)}</link>
      <guid isPermaLink="true">${escapeXml(url)}</guid>
      <description>${escapeXml(post.data.description)}</description>
      <pubDate>${post.data.publishDate.toUTCString()}</pubDate>
      <author>${escapeXml(SITE.url)}</author>
      <source url="${escapeXml(feedUrl)}">${escapeXml(SITE.name)}</source>
${tags}
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(`${SITE.name} — Technical Guides`)}</title>
    <link>${escapeXml(blogUrl)}</link>
    <description>${escapeXml(
      `Off-grid and hybrid solar inverter guides: system sizing, battery banks, installation and OEM/ODM manufacturing. Published by ${SITE.name}.`
    )}</description>
    <language>en</language>
    <lastBuildDate>${lastBuildDate.toUTCString()}</lastBuildDate>
    <atom:link href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      // Also asserted in public/_headers; repeated here so the response is
      // correct under `astro preview` and any host that ignores _headers.
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
