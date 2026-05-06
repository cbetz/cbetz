import type { Document } from "@contentful/rich-text-types";

export type ContentfulAsset = {
  url: string;
  width: number;
  height: number;
};

export type Author = {
  name: string;
  picture: { url: string };
};

export type Post = {
  slug: string;
  title: string;
  coverImage: ContentfulAsset;
  date: string;
  author: Author;
  excerpt: string;
  content: { json: Document };
};

export type PortfolioItem = Post & {
  tags: string[] | null;
  link: string | null;
};
