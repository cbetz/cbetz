import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import Container from "@/components/container";
import PostBody from "@/components/post-body";
import MoreItems from "@/components/more-items";
import Header from "@/components/header";
import ArticleHeader from "@/components/article-header";
import JsonLd from "@/components/json-ld";
import { Separator } from "@/components/ui/separator";
import {
  getAllPortfolioItemsWithSlug,
  getPortfolioItemAndMorePortfolioItems,
} from "@/lib/api";
import { withBlur } from "@/lib/blur";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://cbetz.com";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  const allItems = await getAllPortfolioItemsWithSlug();
  return allItems?.map(({ slug }) => ({ slug })) ?? [];
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const { isEnabled: preview } = await draftMode();
  const { post } = await getPortfolioItemAndMorePortfolioItems(slug, preview);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/portfolio/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: `/portfolio/${post.slug}`,
      publishedTime: post.date,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function PortfolioItemPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  const { isEnabled: preview } = await draftMode();
  const { post: rawPost, morePosts } =
    await getPortfolioItemAndMorePortfolioItems(slug, preview);

  if (!rawPost) notFound();
  const post = await withBlur(rawPost);

  const creativeWorkSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: post.title,
    description: post.excerpt,
    image: post.coverImage.url,
    dateCreated: post.date,
    url: post.link ?? `${SITE_URL}/portfolio/${post.slug}`,
    keywords: post.tags?.join(", "),
    creator: {
      "@type": "Person",
      name: post.author.name,
      url: SITE_URL,
    },
  };

  return (
    <Container>
      <JsonLd data={creativeWorkSchema} />
      <Header />
      <article className="max-w-2xl mx-auto">
        <ArticleHeader
          backHref="/portfolio"
          backLabel="All work"
          title={post.title}
          date={post.date}
          coverImage={post.coverImage}
          tags={post.tags}
          externalLink={post.link}
        />
        <PostBody content={post.content} />
      </article>
      <Separator className="my-20 max-w-2xl mx-auto" />
      <div className="max-w-2xl mx-auto">
        <MoreItems
          title="More work"
          items={morePosts ?? []}
          hrefPrefix="/portfolio"
        />
      </div>
    </Container>
  );
}
