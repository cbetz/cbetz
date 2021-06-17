import Container from '../../components/container';
import PortfolioItems from '../../components/portfolio-items';
import Layout from '../../components/layout';
import { getAllPortfolioItems } from '../../lib/api';
import Head from 'next/head';

export default function Index({ preview, allPortfolioItems }) {
  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>Chris Betz&apos;s Portfolio</title>
        </Head>
        <Container>
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight mb-20 mt-8">Portfolio</h2>
          <PortfolioItems posts={allPortfolioItems} />
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps({ preview = false }) {
  const allPortfolioItems = (await getAllPortfolioItems(preview)) ?? []
  return {
    props: { preview, allPortfolioItems },
  }
}
