import {
  getAllPortfolioItemsWithSlug,
  getAllPostsWithSlug,
} from "@/lib/api";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://cbetz.com";

export async function GET() {
  const [posts, items] = await Promise.all([
    getAllPostsWithSlug(),
    getAllPortfolioItemsWithSlug(),
  ]);

  const postLines =
    posts && posts.length > 0
      ? posts.map(
          (p) =>
            `- [${p.title}](${SITE_URL}/blog/${p.slug}): ${p.excerpt}`
        )
      : ["_No posts yet._"];

  const itemLines =
    items && items.length > 0
      ? items.map(
          (it) =>
            `- [${it.title}](${SITE_URL}/portfolio/${it.slug}): ${it.excerpt}`
        )
      : ["_No portfolio items yet._"];

  const body = [
    "# Chris Betz",
    "",
    "> Head of Engineering at Altitude. Building real-world AI systems for healthcare.",
    "",
    "Personal site of Chris Betz (also known as Christopher Betz). Currently Head of Engineering at [Altitude](https://joinaltitude.com), where I build real-world AI systems for healthcare. Based in New York. This site is a portfolio of selected work and a blog.",
    "",
    "## Pages",
    "",
    `- [Home](${SITE_URL}/): Hero, selected work, and recent writing`,
    `- [Portfolio](${SITE_URL}/portfolio): Selected work`,
    `- [Writing](${SITE_URL}/blog): Notes, essays, and posts`,
    "",
    "## Writing",
    "",
    ...postLines,
    "",
    "## Portfolio",
    "",
    ...itemLines,
    "",
    "## Elsewhere",
    "",
    "- [LinkedIn](https://www.linkedin.com/in/christopherbetz)",
    "- [GitHub](https://github.com/cbetz)",
    "- [X / Twitter](https://twitter.com/thechrisbetz)",
    "- [YouTube](https://www.youtube.com/c/ChrisBetz)",
    "",
    "## Feeds",
    "",
    `- [RSS](${SITE_URL}/feed.xml)`,
    `- [Sitemap](${SITE_URL}/sitemap.xml)`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
