import type { Metadata } from "next";
import { draftMode } from "next/headers";
import Container from "@/components/container";
import Header from "@/components/header";
import PortfolioGrid from "@/components/portfolio-grid";
import { getAllPortfolioItems } from "@/lib/api";
import { withBlur } from "@/lib/blur";

export const metadata: Metadata = {
  title: "Portfolio | Chris Betz",
};

export default async function PortfolioIndex() {
  const { isEnabled: preview } = await draftMode();
  const rawPortfolioItems = (await getAllPortfolioItems(preview)) ?? [];
  const allPortfolioItems = await Promise.all(
    rawPortfolioItems.map(withBlur)
  );

  return (
    <Container>
      <Header />
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-12">
        Selected work
      </h1>
      <PortfolioGrid items={allPortfolioItems} />
    </Container>
  );
}
