import type { Document } from "@contentful/rich-text-types";

export type ContentfulAsset = {
  url: string;
  width: number;
  height: number;
  blurDataURL?: string;
};

export type Author = {
  name: string;
  picture: { url: string };
};

export type Post = {
  slug: string;
  title: string;
  // Optional: fallback content and cover-less items render gracefully.
  coverImage?: ContentfulAsset;
  date: string;
  author: Author;
  excerpt: string;
  content: { json: Document };
};

export type PortfolioItem = Post & {
  tags: string[] | null;
  link: string | null;
};

export type ProjectCategory =
  | "Healthcare AI"
  | "Developer tool"
  | "Web app"
  | "Mobile app";

// Curated editorial metadata, keyed by slug, layered on top of Contentful
// (which owns the cover image and rich-text body). Lets the index render as
// typographic rows with a category, year, normalized stack, and highlights.
export type ProjectMeta = {
  title: string;
  oneLiner: string;
  blurb: string;
  category: ProjectCategory;
  year: string;
  role: string;
  stack: string[];
  highlights: string[];
  featured: boolean;
  link?: string | null;
  repo?: string | null;
};

export type EnrichedPortfolioItem = PortfolioItem & Partial<ProjectMeta>;
