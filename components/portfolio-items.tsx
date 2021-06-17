import PortfolioItemreview from "../components/portfolio-item-preview";

export default function PortfolioItems({ posts }) {
  return (
    <section>
      <h2 className="mb-8 text-6xl md:text-7xl font-bold tracking-tighter leading-tight">
        Some of my recent work
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
        {posts.map((post) => (
          <PortfolioItemreview
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
