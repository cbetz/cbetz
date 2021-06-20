import Link from "next/link";
import DateComponent from "../components/date";
import PortfolioCoverImage from "./portfolio-cover-image";

export default function PortfolioItemPreview({
  title,
  coverImage,
  date,
  excerpt,
  tags,
  slug,
}) {
  return (
    <div>
      <div className="mb-5">
        <PortfolioCoverImage title={title} slug={slug} url={coverImage.url} />
      </div>
      <h3 className="text-3xl mb-3 leading-snug">
        <Link as={`/portfolio/${slug}`} href="/portfolio/[slug]">
          <a className="hover:underline">{title}</a>
        </Link>
      </h3>
      <div className="text-lg mb-4">
        <DateComponent dateString={date} />
      </div>
      <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
      {tags &&
        tags.map((tag) => (
          <span key={tag} className="mr-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
            {tag}
          </span>
        ))}
    </div>
  );
}
