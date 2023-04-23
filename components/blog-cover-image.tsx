import Link from "next/link";

export default function BlogCoverImage({ title, url, slug = null }) {
  const image = (
    <img
      src={url}
      alt={`Cover Image for ${title}`}
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
