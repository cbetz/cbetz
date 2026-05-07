import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import Container from "@/components/container";
import PostBody from "@/components/post-body";
import MoreItems from "@/components/more-items";
import Header from "@/components/header";
import ArticleHeader from "@/components/article-header";
import { Separator } from "@/components/ui/separator";
import { getAllPostsWithSlug, getPostAndMorePosts } from "@/lib/api";
import { withBlur } from "@/lib/blur";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  const allPosts = await getAllPostsWithSlug();
  return allPosts?.map(({ slug }) => ({ slug })) ?? [];
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const { isEnabled: preview } = await draftMode();
  const { post } = await getPostAndMorePosts(slug, preview);
  if (!post) return {};
  return {
    title: `${post.title} | cbetz.com`,
    openGraph: { images: [post.coverImage.url] },
  };
}

export default async function Post({ params }: { params: Params }) {
  const { slug } = await params;
  const { isEnabled: preview } = await draftMode();
  const { post: rawPost, morePosts } = await getPostAndMorePosts(slug, preview);

  if (!rawPost) notFound();
  const post = await withBlur(rawPost);

  return (
    <Container>
      <Header />
      <article className="max-w-2xl mx-auto">
        <ArticleHeader
          backHref="/blog"
          backLabel="All writing"
          title={post.title}
          date={post.date}
          coverImage={post.coverImage}
        />
        <PostBody content={post.content} />
      </article>
      <Separator className="my-20 max-w-2xl mx-auto" />
      <div className="max-w-2xl mx-auto">
        <MoreItems
          title="More writing"
          items={morePosts ?? []}
          hrefPrefix="/blog"
        />
      </div>
    </Container>
  );
}
