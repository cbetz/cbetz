import type { Metadata } from "next";
import { draftMode } from "next/headers";
import Container from "@/components/container";
import Header from "@/components/header";
import RecentPosts from "@/components/recent-posts";
import { getAllPostsForHome } from "@/lib/api";

export const metadata: Metadata = {
  title: "Writing",
  description: "Notes, essays, and posts by Chris Betz.",
  alternates: { canonical: "/blog" },
};

export default async function BlogIndex() {
  const { isEnabled: preview } = await draftMode();
  const allPosts = (await getAllPostsForHome(preview)) ?? [];

  return (
    <Container>
      <Header />
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-12">
        Writing
      </h1>
      <RecentPosts posts={allPosts} />
    </Container>
  );
}
