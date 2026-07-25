import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import ArticleHeader from "@/components/article-header";
import AuthorBio from "@/components/author-bio";
import Container from "@/components/container";
import JsonLd from "@/components/json-ld";
import MoreItems from "@/components/more-items";
import PostBody from "@/components/post-body";
import RelatedLinks from "@/components/related-links";
import { Separator } from "@/components/ui/separator";
import { getAllPostsWithSlug, getPostAndMorePosts } from "@/lib/api";
import { withBlur } from "@/lib/blur";
import { withoutMovedPosts } from "@/lib/moved";
import { POST_PROJECT_LINKS, PROJECT_META } from "@/lib/projects";
import { blogPostingSchema, breadcrumbSchema } from "@/lib/schema";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  const allPosts = withoutMovedPosts(await getAllPostsWithSlug());
  return allPosts.map(({ slug }) => ({ slug }));
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
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${post.slug}`,
      types: { "text/markdown": `/blog/${post.slug}/raw.md` },
    },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: `/blog/${post.slug}`,
      publishedTime: post.date,
      authors: [post.author.name],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function Post({ params }: { params: Params }) {
  const { slug } = await params;
  const { isEnabled: preview } = await draftMode();
  const { post: rawPost, morePosts } = await getPostAndMorePosts(slug, preview);

  if (!rawPost) notFound();
  const post = await withBlur(rawPost);

  const relatedProjects = (POST_PROJECT_LINKS[slug] ?? []).flatMap((projectSlug) => {
    const meta = PROJECT_META[projectSlug];
    if (!meta) return [];
    return [
      {
        href: `/portfolio/${projectSlug}`,
        title: meta.title,
        description: meta.oneLiner,
      },
    ];
  });

  return (
    <Container>
      <JsonLd
        data={blogPostingSchema({
          title: post.title,
          excerpt: post.excerpt,
          image: post.coverImage?.url,
          date: post.date,
          slug: post.slug,
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Writing", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ])}
      />
      <article className="pt-4 md:pt-8">
        <ArticleHeader
          breadcrumb={[
            { name: "Home", href: "/" },
            { name: "Writing", href: "/blog" },
            { name: post.title, href: `/blog/${post.slug}` },
          ]}
          title={post.title}
          date={post.date}
          coverImage={post.coverImage}
        />
        <PostBody content={post.content} />
      </article>

      <RelatedLinks title="The project behind this" links={relatedProjects} />

      <Separator className="my-12" />
      <AuthorBio />
      <div className="mt-16">
        <MoreItems
          title="More writing"
          items={withoutMovedPosts(morePosts)}
          hrefPrefix="/blog"
        />
      </div>
    </Container>
  );
}
