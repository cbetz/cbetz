import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { draftMode } from "next/headers";
import Container from "@/components/container";
import Header from "@/components/header";
import Hero from "@/components/hero";
import PortfolioGrid from "@/components/portfolio-grid";
import RecentPosts from "@/components/recent-posts";
import { Separator } from "@/components/ui/separator";
import { getAllPortfolioItems, getAllPostsForHome } from "@/lib/api";
import { withBlur } from "@/lib/blur";

export default async function Home() {
  const { isEnabled: preview } = await draftMode();
  const [allPosts, rawPortfolioItems] = await Promise.all([
    getAllPostsForHome(preview).then((p) => p ?? []),
    getAllPortfolioItems(preview).then((p) => p ?? []),
  ]);
  const allPortfolioItems = await Promise.all(rawPortfolioItems.map(withBlur));
  const recentPosts = allPosts.slice(0, 3);

  return (
    <Container>
      <Header />
      <Hero />
      <Section title="Selected work">
        <PortfolioGrid items={allPortfolioItems} />
      </Section>
      <Separator className="my-20" />
      <Section
        title="Recent writing"
        action={
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm font-medium hover:underline underline-offset-4"
          >
            All writing
            <ArrowRight className="size-4" strokeWidth={1.75} />
          </Link>
        }
        className="pb-24"
      >
        <RecentPosts posts={recentPosts} />
      </Section>
    </Container>
  );
}

function Section({
  title,
  action,
  className,
  children,
}: {
  title: string;
  action?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section className={className}>
      <div className="flex items-baseline justify-between mb-8">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          {title}
        </h2>
        {action}
      </div>
      {children}
    </section>
  );
}
