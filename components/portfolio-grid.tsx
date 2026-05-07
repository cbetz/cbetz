import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { PortfolioItem } from "@/lib/types";

export default function PortfolioGrid({ items }: { items: PortfolioItem[] }) {
  if (items.length === 0) return null;
  return (
    <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <li key={item.slug}>
          <PortfolioCard item={item} />
        </li>
      ))}
    </ul>
  );
}

function PortfolioCard({ item }: { item: PortfolioItem }) {
  return (
    <Link
      href={`/portfolio/${item.slug}`}
      className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xl"
    >
      <Card className="h-full transition-shadow group-hover:shadow-md gap-3 py-0">
        <Image
          src={item.coverImage.url}
          alt={item.title}
          width={item.coverImage.width}
          height={item.coverImage.height}
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          {...(item.coverImage.blurDataURL && {
            placeholder: "blur" as const,
            blurDataURL: item.coverImage.blurDataURL,
          })}
          className="aspect-[4/3] w-full object-cover"
        />
        <CardHeader className="pt-3">
          <CardTitle className="flex items-start justify-between gap-2 text-lg leading-tight">
            <span>{item.title}</span>
            <ArrowUpRight
              className="size-4 mt-1 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              strokeWidth={1.75}
            />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 pb-4">
          <p className="text-sm text-muted-foreground line-clamp-3">
            {item.excerpt}
          </p>
          {item.tags && item.tags.length > 0 && (
            <ul className="flex flex-wrap gap-1.5">
              {item.tags.map((tag) => (
                <li key={tag}>
                  <Badge variant="secondary" className="font-normal">
                    {tag}
                  </Badge>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
