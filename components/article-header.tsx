import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { ContentfulAsset } from "@/lib/types";

type Props = {
  backHref: string;
  backLabel: string;
  title: string;
  date: string;
  coverImage: ContentfulAsset;
  tags?: string[] | null;
  externalLink?: string | null;
};

export default function ArticleHeader({
  backHref,
  backLabel,
  title,
  date,
  coverImage,
  tags,
  externalLink,
}: Props) {
  return (
    <header className="mb-12">
      <Link
        href={backHref}
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="size-4" strokeWidth={1.75} />
        {backLabel}
      </Link>
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] mb-4">
        {title}
      </h1>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground mb-10">
        <time dateTime={date}>{format(new Date(date), "MMMM d, yyyy")}</time>
        {tags && tags.length > 0 && (
          <>
            <span aria-hidden>·</span>
            <ul className="flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <li key={tag}>
                  <Badge variant="secondary" className="font-normal">
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
              className="inline-flex items-center gap-1 text-foreground hover:underline underline-offset-4"
            >
              Visit
              <ArrowUpRight className="size-3.5" strokeWidth={1.75} />
            </a>
          </>
        )}
      </div>
      <Image
        src={coverImage.url}
        alt={`Cover image for ${title}`}
        width={coverImage.width}
        height={coverImage.height}
        sizes="(min-width: 768px) 768px, 100vw"
        {...(coverImage.blurDataURL && {
          placeholder: "blur" as const,
          blurDataURL: coverImage.blurDataURL,
        })}
        className="w-full h-auto rounded-xl ring-1 ring-foreground/10"
        priority
      />
    </header>
  );
}
