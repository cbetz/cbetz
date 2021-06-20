import PortfolioItemPreview from "../components/portfolio-item-preview";

export default function PortfolioItems({ posts }) {
  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
        {posts.map((post) => (
          <PortfolioItemPreview
            key={post.slug}
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            tags={post.tags}
            slug={post.slug}
            excerpt={post.excerpt}
          />
        ))}
      </div>
    </section>
  );
}
