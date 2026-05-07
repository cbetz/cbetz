import { draftMode } from "next/headers";
import { getPortfolioItemAndMorePortfolioItems } from "@/lib/api";
import { richTextToMarkdown } from "@/lib/markdown";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://cbetz.com";

type Params = Promise<{ slug: string }>;

export async function GET(_req: Request, { params }: { params: Params }) {
  const { slug } = await params;
  const { isEnabled: preview } = await draftMode();
  const { post } = await getPortfolioItemAndMorePortfolioItems(slug, preview);
  if (!post) return new Response("Not found", { status: 404 });

  const body = renderItem({
    title: post.title,
    date: post.date,
    excerpt: post.excerpt,
    tags: post.tags ?? [],
    link: post.link,
    url: `${SITE_URL}/portfolio/${post.slug}`,
    content: richTextToMarkdown(post.content.json),
  });

  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}

function renderItem(p: {
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  link: string | null;
  url: string;
  content: string;
}): string {
  return [
    "---",
    `title: ${JSON.stringify(p.title)}`,
    `date: ${p.date}`,
    p.tags.length > 0 ? `tags: [${p.tags.map((t) => JSON.stringify(t)).join(", ")}]` : null,
    p.link ? `external: ${p.link}` : null,
    `url: ${p.url}`,
    "---",
    "",
    `# ${p.title}`,
    "",
    `_${p.excerpt}_`,
    "",
    p.content,
  ]
    .filter((line) => line !== null)
    .join("\n");
}
