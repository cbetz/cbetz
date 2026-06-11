import {
  getAllPortfolioItemsWithSlug,
  getAllPostsWithSlug,
} from "@/lib/api";
import { enrichPortfolioItem, sortProjects } from "@/lib/projects";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.cbetz.com";

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

  // Prefer the curated editorial copy (oneLiner, category, year) over raw
  // Contentful excerpts so the machine-readable surface carries the same
  // framing as the rendered site.
  const enriched = sortProjects((items ?? []).map(enrichPortfolioItem));
  const itemLines =
    enriched.length > 0
      ? enriched.map((it) => {
          const meta = [it.category, it.year, it.role]
            .filter(Boolean)
            .join(", ");
          const summary = it.oneLiner ?? it.excerpt;
          return `- [${it.title}](${SITE_URL}/portfolio/${it.slug}): ${summary}${
            meta ? ` (${meta})` : ""
          }`;
        })
      : ["_No portfolio items yet._"];

  const body = [
    "# Chris Betz",
    "",
    "> Head of Engineering at Altitude. Building real-world AI systems for healthcare.",
    "",
    "Personal site of Chris Betz (also known as Christopher Betz). Currently Head of Engineering at [Altitude](https://joinaltitude.com), which builds a clinical intelligence platform for chronic condition management. Two decades building healthcare software; previously CTO of aptihealth, CTO of New Ocean Health for nine years, and leader of 30+ engineers at Brightside Health. Based in Media, Pennsylvania (Philadelphia area). This site is a portfolio of selected work and a blog.",
    "",
    "Every blog post and portfolio item has a clean markdown variant at `<page-url>/raw.md` (e.g. `/blog/foo/raw.md`). The HTML version also advertises this via `<link rel=\"alternate\" type=\"text/markdown\">`.",
    "",
    "## Pages",
    "",
    `- [Home](${SITE_URL}/): Hero, selected work, and recent writing`,
    `- [Work](${SITE_URL}/portfolio): Selected work in healthcare AI, web, and mobile`,
    `- [Writing](${SITE_URL}/blog): Notes, essays, and posts`,
    `- [About](${SITE_URL}/about): Bio, career history, and contact`,
    `- [Now](${SITE_URL}/now): What I'm focused on right now`,
    `- [Resume](${SITE_URL}/resume): Printable resume / CV`,
    "",
    "## Writing",
    "",
    ...postLines,
    "",
    "## Work",
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
