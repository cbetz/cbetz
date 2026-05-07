import type { MetadataRoute } from "next";
import {
  getAllPortfolioItemsWithSlug,
  getAllPostsWithSlug,
} from "@/lib/api";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://cbetz.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, items] = await Promise.all([
    getAllPostsWithSlug(),
    getAllPortfolioItemsWithSlug(),
  ]);

  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now },
    { url: `${SITE_URL}/about`, lastModified: now },
    { url: `${SITE_URL}/blog`, lastModified: now },
    { url: `${SITE_URL}/portfolio`, lastModified: now },
  ];

  const postRoutes: MetadataRoute.Sitemap =
    posts?.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.date),
    })) ?? [];

  const portfolioRoutes: MetadataRoute.Sitemap =
    items?.map((item) => ({
      url: `${SITE_URL}/portfolio/${item.slug}`,
      lastModified: new Date(item.date),
    })) ?? [];

  return [...staticRoutes, ...postRoutes, ...portfolioRoutes];
}
