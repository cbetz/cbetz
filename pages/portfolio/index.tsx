import Container from "../../components/container";
import PortfolioItems from "../../components/portfolio-items";
import Layout from "../../components/layout";
import { getAllPortfolioItems } from "../../lib/api";
import Head from "next/head";
import Header from "../../components/header";

export default function Index({ preview, allPortfolioItems }) {
  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>Chris Betz&apos;s Portfolio</title>
        </Head>
        <Container>
          <Header />
          <h2 className="mb-8 text-6xl md:text-7xl font-bold tracking-tighter leading-tight">
            Portfolio
          </h2>
          <PortfolioItems posts={allPortfolioItems} />
        </Container>
      </Layout>
    </>
  );
}

export async function getStaticProps({ preview = false }) {
  const allPortfolioItems = (await getAllPortfolioItems(preview)) ?? [];
  return {
    props: { preview, allPortfolioItems },
  };
}
