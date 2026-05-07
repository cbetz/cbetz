import { draftMode } from "next/headers";
import { getPostAndMorePosts } from "@/lib/api";
import { richTextToMarkdown } from "@/lib/markdown";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://cbetz.com";

type Params = Promise<{ slug: string }>;

export async function GET(_req: Request, { params }: { params: Params }) {
  const { slug } = await params;
  const { isEnabled: preview } = await draftMode();
  const { post } = await getPostAndMorePosts(slug, preview);
  if (!post) return new Response("Not found", { status: 404 });

  const body = renderPost({
    title: post.title,
    date: post.date,
    author: post.author.name,
    excerpt: post.excerpt,
    url: `${SITE_URL}/blog/${post.slug}`,
    content: richTextToMarkdown(post.content.json),
  });

  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}

function renderPost(p: {
  title: string;
  date: string;
  author: string;
  excerpt: string;
  url: string;
  content: string;
}): string {
  return [
    "---",
    `title: ${JSON.stringify(p.title)}`,
    `date: ${p.date}`,
    `author: ${JSON.stringify(p.author)}`,
    `url: ${p.url}`,
    "---",
    "",
    `# ${p.title}`,
    "",
    `_${p.excerpt}_`,
    "",
    p.content,
  ].join("\n");
}
