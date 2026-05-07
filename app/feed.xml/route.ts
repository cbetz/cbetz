import { getAllPostsForHome } from "@/lib/api";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://cbetz.com";
const SITE_TITLE = "Chris Betz";
const SITE_DESCRIPTION =
  "Notes, essays, and posts by Chris Betz — Head of Engineering at Altitude.";

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const posts = (await getAllPostsForHome(false)) ?? [];

  const items = posts
    .map((post) => {
      const url = `${SITE_URL}/blog/${post.slug}`;
      return [
        "    <item>",
        `      <title>${escapeXml(post.title)}</title>`,
        `      <link>${url}</link>`,
        `      <guid isPermaLink="true">${url}</guid>`,
        `      <pubDate>${new Date(post.date).toUTCString()}</pubDate>`,
        `      <description>${escapeXml(post.excerpt)}</description>`,
        `      <dc:creator>${escapeXml(post.author.name)}</dc:creator>`,
        "    </item>",
      ].join("\n");
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escapeXml(SITE_TITLE)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en-us</language>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
