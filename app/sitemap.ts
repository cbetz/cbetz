import type { MetadataRoute } from "next";
import {
  getAllPortfolioItemsWithSlug,
  getAllPostsWithSlug,
} from "@/lib/api";
import { withoutMovedPosts } from "@/lib/moved";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.cbetz.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, items] = await Promise.all([
    getAllPostsWithSlug(),
    getAllPortfolioItemsWithSlug(),
  ]);

  const livePosts = withoutMovedPosts(posts ?? []);

  // Newest content date stands in for "when the site last changed". Stamping
  // every static route with `new Date()` on each build asserts a freshness
  // that isn't real, and Google learns to discount the signal.
  const latestContentDate = [
    ...livePosts.map((p) => p.date),
    ...(items ?? []).map((i) => i.date),
  ]
    .filter(Boolean)
    .sort()
    .at(-1);
  const siteModified = latestContentDate
    ? new Date(latestContentDate)
    : new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: siteModified, priority: 1.0 },
    { url: `${SITE_URL}/about`, lastModified: siteModified, priority: 0.9 },
    { url: `${SITE_URL}/portfolio`, lastModified: siteModified, priority: 0.9 },
    { url: `${SITE_URL}/blog`, lastModified: siteModified, priority: 0.8 },
    { url: `${SITE_URL}/resume`, lastModified: siteModified, priority: 0.8 },
    { url: `${SITE_URL}/now`, lastModified: siteModified, priority: 0.5 },
  ];

  const postRoutes: MetadataRoute.Sitemap = livePosts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    priority: 0.7,
  }));

  const portfolioRoutes: MetadataRoute.Sitemap =
    items?.map((item) => ({
      url: `${SITE_URL}/portfolio/${item.slug}`,
      lastModified: new Date(item.date),
      priority: 0.7,
    })) ?? [];

  return [...staticRoutes, ...postRoutes, ...portfolioRoutes];
}
