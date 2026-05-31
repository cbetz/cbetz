import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { ContentfulAsset } from "@/lib/types";

type Crumb = { name: string; href: string };

type Props = {
  breadcrumb: Crumb[];
  title: string;
  date: string;
  coverImage?: ContentfulAsset;
  tags?: string[] | null;
  externalLink?: string | null;
  byline?: boolean;
};

export default function ArticleHeader({
  breadcrumb,
  title,
  date,
  coverImage,
  tags,
  externalLink,
  byline = true,
}: Props) {
  return (
    <header className="mb-10">
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
          {breadcrumb.map((crumb, i) => {
            const last = i === breadcrumb.length - 1;
            return (
              <li key={crumb.href} className="flex items-center gap-1.5">
                {i > 0 && <span aria-hidden>/</span>}
                {last ? (
                  <span className="text-foreground" aria-current="page">
                    {crumb.name}
                  </span>
                ) : (
                  <Link
                    href={crumb.href}
                    className="transition-colors hover:text-foreground"
                  >
                    {crumb.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>

      <h1 className="font-serif text-3xl font-semibold leading-[1.12] tracking-tight md:text-4xl">
        {title}
      </h1>

      <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted-foreground sm:gap-x-4">
        {byline && (
          <>
            <span>
              By{" "}
              <Link href="/about" className="u-link text-foreground">
                Chris Betz
              </Link>
            </span>
            <span aria-hidden>·</span>
          </>
        )}
        <time dateTime={date} className="tabular-nums">
          {format(new Date(date), "MMMM d, yyyy")}
        </time>
        {tags && tags.length > 0 && (
          <>
            <span aria-hidden>·</span>
            <ul className="flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <li key={tag}>
                  <Badge variant="outline" className="font-normal">
                    {tag}
                  </Badge>
                </li>
              ))}
            </ul>
          </>
        )}
        {externalLink && (
          <>
            <span aria-hidden>·</span>
            <a
              href={externalLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-foreground u-link"
            >
              Visit
              <ArrowUpRight className="size-3.5" strokeWidth={1.75} />
            </a>
          </>
        )}
      </div>

      {coverImage?.url && (
        <Image
          src={coverImage.url}
          alt={`Cover image for ${title}`}
          width={coverImage.width}
          height={coverImage.height}
          sizes="(min-width: 768px) 672px, 100vw"
          {...(coverImage.blurDataURL && {
            placeholder: "blur" as const,
            blurDataURL: coverImage.blurDataURL,
          })}
          className="mt-8 h-auto w-full rounded-lg ring-1 ring-hairline"
          priority
        />
      )}
    </header>
  );
}
