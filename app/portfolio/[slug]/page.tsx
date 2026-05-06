import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import Container from "@/components/container";
import PostBody from "@/components/post-body";
import MoreStories from "@/components/more-stories";
import Header from "@/components/header";
import PostHeader from "@/components/post-header";
import SectionSeparator from "@/components/section-separator";
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
      <article>
        <PostHeader
          title={post.title}
          coverImage={post.coverImage}
          date={post.date}
          author={post.author}
        />
        <PostBody content={post.content} />
      </article>
      <SectionSeparator />
      {morePosts && morePosts.length > 0 && <MoreStories posts={morePosts} />}
    </Container>
  );
}
