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
  link,
}) {
  return (
    <div>
      <div className="mb-5">
        <PortfolioCoverImage title={title} slug={slug} url={coverImage.url} />
      </div>
      <h3 className="text-3xl mb-3 leading-snug">
        <Link
          as={`/portfolio/${slug}`}
          href="/portfolio/[slug]">
          {title}
        </Link>
      </h3>
      <div className="text-lg mb-4">
        <DateComponent dateString={date} />
      </div>
      <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
      {link && (
        <p className="text-lg leading-relaxed mb-4">
          {
            // eslint-disable-next-line react/jsx-no-target-blank
            <a className="hover:underline" href={link} target="_blank">
              Learn More
            </a>
          }
        </p>
      )}
      {tags &&
        tags.map((tag) => (
          <span
            key={tag}
            className="mr-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
          >
            {tag}
          </span>
        ))}
    </div>
  );
}
