import { fetchPublishedPosts } from "@/lib/posts";

const SITE_URL = "https://ai-hubben.eu";

export async function GET() {
  const posts = await fetchPublishedPosts();

  const items = posts
    .map((post) => {
      const pubDate = post.published_at
        ? new Date(post.published_at).toUTCString()
        : new Date(post.created_at).toUTCString();

      return `    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${SITE_URL}/nyheter/${post.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/nyheter/${post.slug}</guid>
      <pubDate>${pubDate}</pubDate>${post.excerpt ? `
      <description><![CDATA[${post.excerpt}]]></description>` : ""}
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>AI-hubben Nyheter</title>
    <link>${SITE_URL}/nyheter</link>
    <description>Senaste nyheterna från AI-hubben — Katrineholms kommuns AI-plattform</description>
    <language>sv</language>
    <atom:link href="${SITE_URL}/nyheter/rss.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
