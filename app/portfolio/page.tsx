import type { Metadata } from "next";
import { draftMode } from "next/headers";
import Container from "@/components/container";
import JsonLd from "@/components/json-ld";
import WorkList from "@/components/work-list";
import { getAllPortfolioItems } from "@/lib/api";
import { collectionPageSchema } from "@/lib/schema";

const DESCRIPTION =
  "Selected work by Chris Betz: healthcare AI, web apps, and mobile, from open-source tools to production platforms.";

export const metadata: Metadata = {
  title: "Work",
  description: DESCRIPTION,
  alternates: { canonical: "/portfolio" },
};

export default async function PortfolioIndex() {
  const { isEnabled: preview } = await draftMode();
  const items = await getAllPortfolioItems(preview);
  const featured = items.filter((i) => i.featured);
  const sideProjects = items.filter((i) => !i.featured);

  return (
    <Container>
      <JsonLd
        data={collectionPageSchema({
          name: "Work by Chris Betz",
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
          Healthcare AI and the tools around it, plus the side projects I ship
          to keep my hands in the code.
        </p>
      </header>
      {items.length === 0 && (
        <p className="mt-10 leading-relaxed text-muted-foreground md:mt-12">
          Project write-ups are on their way. In the meantime, recent work
          lives on{" "}
          <a
            href="https://github.com/cbetz"
            target="_blank"
            rel="noreferrer"
            className="u-link text-foreground"
          >
            GitHub
          </a>
          .
        </p>
      )}
      {featured.length > 0 && (
        <div className="mt-10 md:mt-12">
          <WorkList items={featured} />
        </div>
      )}
      {sideProjects.length > 0 && (
        <section className="mt-12 md:mt-16">
          <h2 className="eyebrow mb-5">Side projects</h2>
          <WorkList items={sideProjects} />
        </section>
      )}
    </Container>
  );
}
