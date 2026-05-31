import type { Metadata } from "next";
import { draftMode } from "next/headers";
import Container from "@/components/container";
import JsonLd from "@/components/json-ld";
import WorkList from "@/components/work-list";
import { getAllPortfolioItems } from "@/lib/api";
import { collectionPageSchema } from "@/lib/schema";

const DESCRIPTION =
  "Selected work by Chris Betz — healthcare AI, web apps, and mobile, from open-source tools to production platforms.";

export const metadata: Metadata = {
  title: "Work",
  description: DESCRIPTION,
  alternates: { canonical: "/portfolio" },
};

export default async function PortfolioIndex() {
  const { isEnabled: preview } = await draftMode();
  const items = await getAllPortfolioItems(preview);

  return (
    <Container>
      <JsonLd
        data={collectionPageSchema({
          name: "Work — Chris Betz",
          path: "/portfolio",
          description: DESCRIPTION,
        })}
      />
      <header className="pt-4 md:pt-8">
        <p className="eyebrow mb-2">Work</p>
        <h1 className="font-serif text-3xl font-semibold tracking-tight md:text-4xl">
          Selected work
        </h1>
        <p className="mt-3 max-w-xl leading-relaxed text-muted-foreground">
          Healthcare AI, web apps, and mobile — from open-source tools to
          production platforms. A mix of work I&apos;ve led and side projects
          I&apos;ve shipped solo.
        </p>
      </header>
      <div className="mt-10 md:mt-12">
        <WorkList items={items} />
      </div>
    </Container>
  );
}
