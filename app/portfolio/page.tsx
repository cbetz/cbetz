import type { Metadata } from "next";
import { draftMode } from "next/headers";
import Container from "@/components/container";
import PortfolioItems from "@/components/portfolio-items";
import Header from "@/components/header";
import { getAllPortfolioItems } from "@/lib/api";

export const metadata: Metadata = {
  title: "Chris Betz's Portfolio",
};

export default async function PortfolioIndex() {
  const { isEnabled: preview } = await draftMode();
  const allPortfolioItems = (await getAllPortfolioItems(preview)) ?? [];

  return (
    <Container>
      <Header />
      <h2 className="mb-8 text-6xl md:text-7xl font-bold tracking-tighter leading-tight">
        Portfolio
      </h2>
      <PortfolioItems posts={allPortfolioItems} />
    </Container>
  );
}
