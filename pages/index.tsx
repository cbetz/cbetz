import Container from "../components/container";
import MoreStories from "../components/more-stories";
import HeroPost from "../components/hero-post";
import Intro from "../components/intro";
import Layout from "../components/layout";
import Profile from "../components/profile";
import { getAllPortfolioItems, getAllPostsForHome } from "../lib/api";
import Head from "next/head";
import PortfolioItems from "../components/portfolio-items";

export default function Index({ preview, allPosts, allPortfolioItems }) {
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);
  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>Chris Betz</title>
        </Head>
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
      </Layout>
    </>
  );
}

export async function getStaticProps({ preview = false }) {
  const allPosts = (await getAllPostsForHome(preview)) ?? [];
  const allPortfolioItems = (await getAllPortfolioItems(preview)) ?? [];
  return {
    props: { preview, allPosts, allPortfolioItems },
  };
}
