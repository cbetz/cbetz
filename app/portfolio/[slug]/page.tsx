import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import ArticleHeader from "@/components/article-header";
import AuthorBio from "@/components/author-bio";
import Container from "@/components/container";
import JsonLd from "@/components/json-ld";
import MoreItems from "@/components/more-items";
import PostBody from "@/components/post-body";
import { Separator } from "@/components/ui/separator";
import {
  getAllPortfolioItemsWithSlug,
  getPortfolioItemAndMorePortfolioItems,
} from "@/lib/api";
import { withBlur } from "@/lib/blur";
import { breadcrumbSchema, creativeWorkSchema } from "@/lib/schema";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  const allItems = await getAllPortfolioItemsWithSlug();
  return allItems.map(({ slug }) => ({ slug }));
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
  const description = post.oneLiner ?? post.excerpt;
  return {
    title: post.title,
    description,
    alternates: {
      canonical: `/portfolio/${post.slug}`,
      types: { "text/markdown": `/portfolio/${post.slug}/raw.md` },
    },
    openGraph: {
      type: "article",
      title: post.title,
      description,
      url: `/portfolio/${post.slug}`,
      publishedTime: post.date,
      authors: ["Chris Betz"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
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

  const facts = [
    post.role && { label: "Role", value: post.role },
    post.year && { label: "Year", value: post.year },
    post.category && { label: "Type", value: post.category },
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <Container>
      <JsonLd
        data={creativeWorkSchema({
          title: post.title,
          excerpt: post.oneLiner ?? post.excerpt,
          image: post.coverImage?.url,
          date: post.date,
          slug: post.slug,
          link: post.link,
          tags: post.tags,
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Work", path: "/portfolio" },
          { name: post.title, path: `/portfolio/${post.slug}` },
        ])}
      />
      <article className="pt-4 md:pt-8">
        <ArticleHeader
          breadcrumb={[
            { name: "Home", href: "/" },
            { name: "Work", href: "/portfolio" },
            { name: post.title, href: `/portfolio/${post.slug}` },
          ]}
          title={post.title}
          date={post.date}
          coverImage={post.coverImage}
          tags={post.stack ?? post.tags}
          externalLink={post.link}
          repoLink={post.repo}
        />

        {facts.length > 0 && (
          <dl className="mb-10 grid grid-cols-2 gap-x-6 gap-y-4 border-y border-hairline py-5 text-sm sm:grid-cols-3">
            {facts.map(({ label, value }) => (
              <div key={label}>
                <dt className="eyebrow mb-1">{label}</dt>
                <dd className="tabular-nums">{value}</dd>
              </div>
            ))}
          </dl>
        )}

        {post.highlights && post.highlights.length > 0 && (
          <section className="mb-10">
            <h2 className="mb-3 text-sm font-semibold tracking-tight">
              Highlights
            </h2>
            <ul className="space-y-2.5">
              {post.highlights.map((h) => (
                <li key={h} className="flex gap-2.5 leading-relaxed">
                  <span
                    className="mt-2.5 size-1 shrink-0 rounded-full bg-muted-foreground"
                    aria-hidden
                  />
                  <span className="text-muted-foreground">{h}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        <PostBody content={post.content} />
      </article>

      <Separator className="my-12" />
      <AuthorBio />
      <div className="mt-16">
        <MoreItems
          title="More work"
          items={morePosts}
          hrefPrefix="/portfolio"
        />
      </div>
    </Container>
  );
}
