import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import Container from "@/components/container";
import PostBody from "@/components/post-body";
import MoreItems from "@/components/more-items";
import Header from "@/components/header";
import ArticleHeader from "@/components/article-header";
import { Separator } from "@/components/ui/separator";
import {
  getAllPortfolioItemsWithSlug,
  getPortfolioItemAndMorePortfolioItems,
} from "@/lib/api";

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
    title: `${post.title} | cbetz.com`,
    openGraph: { images: [post.coverImage.url] },
  };
}

export default async function PortfolioItemPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  const { isEnabled: preview } = await draftMode();
  const { post, morePosts } = await getPortfolioItemAndMorePortfolioItems(
    slug,
    preview
  );

  if (!post) notFound();

  return (
    <Container>
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
