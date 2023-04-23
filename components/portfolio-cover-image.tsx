import Link from "next/link";

export default function PortfolioCoverImage({ title, url, slug = null }) {
  const image = (
    <img
      src={url}
      alt={`Cover Image for ${title}`}
    />
  );
  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link as={`/portfolio/${slug}`} href="/portfolio/[slug]" aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  );
}
