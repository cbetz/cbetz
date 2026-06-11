import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { EnrichedPortfolioItem } from "@/lib/types";

function yearOf(item: EnrichedPortfolioItem): string | null {
  if (item.year) return item.year;
  if (item.date) return new Date(item.date).getFullYear().toString();
  return null;
}

function WorkRow({ item }: { item: EnrichedPortfolioItem }) {
  const year = yearOf(item);
  const meta = [item.category, year].filter(Boolean).join(" · ");
  const subtitle = item.oneLiner ?? item.excerpt;
  return (
    <li className="reveal">
      <Link
        href={`/portfolio/${item.slug}`}
        className="group -mx-3 flex flex-col gap-1 rounded-md px-3 py-4 transition-colors hover:bg-wash sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
      >
        <div className="min-w-0">
          <span className="flex items-center gap-1.5 font-medium">
            <span className="truncate">{item.title}</span>
            <ArrowUpRight
              className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              strokeWidth={1.75}
            />
          </span>
          {subtitle && (
            <span className="mt-0.5 block text-sm text-muted-foreground">
              {subtitle}
            </span>
          )}
        </div>
        {meta && (
          <span className="shrink-0 font-mono text-xs uppercase tracking-wide tabular-nums text-muted-foreground">
            {meta}
          </span>
        )}
      </Link>
    </li>
  );
}

export default function WorkList({
  items,
}: {
  items: EnrichedPortfolioItem[];
}) {
  if (items.length === 0) return null;
  return (
    <ul className="divide-y divide-hairline">
      {items.map((item) => (
        <WorkRow key={item.slug} item={item} />
      ))}
    </ul>
  );
}
