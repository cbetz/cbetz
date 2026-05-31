import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { draftMode } from "next/headers";
import Capabilities from "@/components/capabilities";
import Container from "@/components/container";
import ContactCTA from "@/components/contact-cta";
import FeaturedProject from "@/components/featured-project";
import Hero from "@/components/hero";
import JsonLd from "@/components/json-ld";
import RecentPosts from "@/components/recent-posts";
import SectionHeading from "@/components/section-heading";
import WorkList from "@/components/work-list";
import { getAllPortfolioItems, getAllPostsForHome } from "@/lib/api";
import { profilePageSchema } from "@/lib/schema";
import { withBlur } from "@/lib/blur";

function MoreLink({ href, children }: { href: string; children: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
    >
      {children}
      <ArrowRight className="size-4" strokeWidth={1.75} />
    </Link>
  );
}

export default async function Home() {
  const { isEnabled: preview } = await draftMode();
  const [allPosts, items] = await Promise.all([
    getAllPostsForHome(preview),
    getAllPortfolioItems(preview),
  ]);

  const featured = items.find((i) => i.featured) ?? items[0];
  const featuredItem = featured ? await withBlur(featured) : undefined;
  const rest = items.filter((i) => i.slug !== featured?.slug).slice(0, 5);
  const recentPosts = allPosts.slice(0, 3);

  return (
    <Container>
      <JsonLd data={profilePageSchema("/")} />
      <Hero />

      <div className="mt-16 md:mt-24">
        <Capabilities />
      </div>

      {featuredItem && (
        <div className="mt-16 md:mt-24">
          <p className="sr-only">Featured project</p>
          <FeaturedProject item={featuredItem} />
        </div>
      )}

      <section className="mt-16 md:mt-24">
        <SectionHeading
          title="Selected work"
          action={<MoreLink href="/portfolio">All work</MoreLink>}
        />
        <WorkList items={rest} />
      </section>

      <section className="mt-16 md:mt-24">
        <SectionHeading
          title="Writing"
          action={<MoreLink href="/blog">All writing</MoreLink>}
        />
        <RecentPosts posts={recentPosts} />
      </section>

      <div className="mt-16 md:mt-24">
        <ContactCTA />
      </div>
    </Container>
  );
}
