import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { EnrichedPortfolioItem } from "@/lib/types";

export default function FeaturedProject({
  item,
}: {
  item: EnrichedPortfolioItem;
}) {
  const tags = item.stack ?? item.tags ?? [];
  return (
    <Link
      href={`/portfolio/${item.slug}`}
      className="group reveal block overflow-hidden rounded-lg ring-1 ring-hairline transition-colors hover:bg-wash"
    >
      {item.coverImage?.url && (
        <Image
          src={item.coverImage.url}
          alt={item.title}
          width={item.coverImage.width}
          height={item.coverImage.height}
          sizes="(min-width: 768px) 672px, 100vw"
          {...(item.coverImage.blurDataURL && {
            placeholder: "blur" as const,
            blurDataURL: item.coverImage.blurDataURL,
          })}
          className="aspect-[16/9] w-full bg-muted/40 object-cover"
        />
      )}
      <div className="p-5 md:p-6">
        <p className="eyebrow mb-2">
          Featured{item.category ? ` · ${item.category}` : ""}
        </p>
        <h3 className="font-serif text-xl font-semibold tracking-tight md:text-2xl">
          {item.title}
        </h3>
        <p className="mt-2 leading-relaxed text-muted-foreground">
          {item.blurb ?? item.excerpt}
        </p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          {tags.length > 0 && (
            <ul className="flex flex-wrap gap-1.5">
              {tags.slice(0, 4).map((tag) => (
                <li key={tag}>
                  <Badge variant="outline" className="font-normal">
                    {tag}
                  </Badge>
                </li>
              ))}
            </ul>
          )}
          <span className="inline-flex items-center gap-1 text-sm font-medium">
            View the project
            <ArrowRight
              className="size-4 transition-transform group-hover:translate-x-0.5"
              strokeWidth={1.75}
            />
          </span>
        </div>
      </div>
    </Link>
  );
}
