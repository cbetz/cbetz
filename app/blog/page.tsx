import type { Metadata } from "next";
import { draftMode } from "next/headers";
import Container from "@/components/container";
import JsonLd from "@/components/json-ld";
import RecentPosts from "@/components/recent-posts";
import { getAllPostsForHome } from "@/lib/api";
import { collectionPageSchema } from "@/lib/schema";

const DESCRIPTION =
  "Notes on building software, AI, and the occasional side project — by Chris Betz.";

export const metadata: Metadata = {
  title: "Writing",
  description: DESCRIPTION,
  alternates: { canonical: "/blog" },
};

export default async function BlogIndex() {
  const { isEnabled: preview } = await draftMode();
  const allPosts = await getAllPostsForHome(preview);

  return (
    <Container>
      <JsonLd
        data={collectionPageSchema({
          name: "Writing — Chris Betz",
          path: "/blog",
          description: DESCRIPTION,
        })}
      />
      <header className="pt-4 md:pt-8">
        <p className="eyebrow mb-2">Writing</p>
        <h1 className="font-serif text-3xl font-semibold tracking-tight md:text-4xl">
          Writing
        </h1>
        <p className="mt-3 max-w-xl leading-relaxed text-muted-foreground">
          Notes on building software, AI, and the occasional side project.
        </p>
      </header>
      <div className="mt-10 md:mt-12">
        <RecentPosts posts={allPosts} showExcerpt />
      </div>
    </Container>
  );
}
