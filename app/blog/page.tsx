import type { Metadata } from "next";
import { draftMode } from "next/headers";
import Container from "@/components/container";
import MoreStories from "@/components/more-stories";
import HeroPost from "@/components/hero-post";
import Header from "@/components/header";
import { getAllPostsForHome } from "@/lib/api";

export const metadata: Metadata = {
  title: "Chris Betz's Blog",
};

export default async function BlogIndex() {
  const { isEnabled: preview } = await draftMode();
  const allPosts = (await getAllPostsForHome(preview)) ?? [];
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);

  return (
    <Container>
      <Header />
      <h2 className="mb-8 text-6xl md:text-7xl font-bold tracking-tighter leading-tight">
        Blog
      </h2>
      {heroPost && (
        <HeroPost
          title={heroPost.title}
          coverImage={heroPost.coverImage}
          date={heroPost.date}
          author={heroPost.author}
          slug={heroPost.slug}
          excerpt={heroPost.excerpt}
        />
      )}
      {morePosts.length > 0 && <MoreStories posts={morePosts} />}
    </Container>
  );
}
