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
import { getAllPostsWithSlug, getPostAndMorePosts } from "@/lib/api";
import { withBlur } from "@/lib/blur";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://cbetz.com";

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
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${post.slug}`,
      types: {
        "text/markdown": `/blog/${post.slug}/raw.md`,
      },
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

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage.url,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: post.author.name,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Person",
      name: "Chris Betz",
      url: SITE_URL,
    },
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Writing",
        item: `${SITE_URL}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${SITE_URL}/blog/${post.slug}`,
      },
    ],
  };

  return (
    <Container>
      <JsonLd data={blogPostingSchema} />
      <JsonLd data={breadcrumbSchema} />
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
