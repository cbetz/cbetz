import { draftMode } from "next/headers";
import Container from "@/components/container";
import MoreStories from "@/components/more-stories";
import HeroPost from "@/components/hero-post";
import Intro from "@/components/intro";
import Profile from "@/components/profile";
import PortfolioItems from "@/components/portfolio-items";
import { getAllPortfolioItems, getAllPostsForHome } from "@/lib/api";

export default async function Home() {
  const { isEnabled: preview } = await draftMode();
  const allPosts = (await getAllPostsForHome(preview)) ?? [];
  const allPortfolioItems = (await getAllPortfolioItems(preview)) ?? [];
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);

  return (
    <Container>
      <Intro />
      <h2 className="mb-8 text-6xl md:text-7xl font-bold tracking-tighter leading-tight">
        About
      </h2>
      <Profile />
      <h2 className="mb-8 text-6xl md:text-7xl font-bold tracking-tighter leading-tight">
        Portfolio
      </h2>
      <PortfolioItems posts={allPortfolioItems} />
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
