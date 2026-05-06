import cn from "classnames";
import Image from "next/image";
import Link from "next/link";
import type { ContentfulAsset } from "../lib/types";

type Props = ContentfulAsset & {
  title: string;
  slug?: string | null;
};

export default function BlogCoverImage({
  title,
  url,
  width,
  height,
  slug = null,
}: Props) {
  const image = (
    <Image
      src={url}
      alt={`Cover Image for ${title}`}
      width={width}
      height={height}
      sizes="(min-width: 768px) 768px, 100vw"
      className={cn("shadow-small w-full h-auto", {
        "hover:shadow-medium transition-shadow duration-200": slug,
      })}
    />
  );
  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link as={`/blog/${slug}`} href="/blog/[slug]" aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  );
}
