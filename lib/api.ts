import type { EnrichedPortfolioItem, PortfolioItem, Post } from "./types";
import { FALLBACK_PORTFOLIO_ITEMS, FALLBACK_POSTS } from "./fallback";
import { enrichPortfolioItem, sortProjects } from "./projects";

// When Contentful isn't configured (e.g. local dev without secrets) the site
// falls back to bundled content so it always renders. fetchGraphQL also
// catches network/shape errors and the callers degrade to fallback.
const HAS_CONTENTFUL = Boolean(
  process.env.CONTENTFUL_SPACE_ID && process.env.CONTENTFUL_ACCESS_TOKEN
);

function enrichItems(items: PortfolioItem[]): EnrichedPortfolioItem[] {
  return sortProjects(items.map(enrichPortfolioItem));
}

const POST_GRAPHQL_FIELDS = `
slug
title
coverImage {
  url
  width
  height
}
date
author {
  name
  picture {
    url
  }
}
excerpt
content {
  json
}
`;

const PORTFOLIO_GRAPHQL_FIELDS = `
slug
title
coverImage {
  url
  width
  height
}
date
author {
  name
  picture {
    url
  }
}
excerpt
content {
  json
}
tags
link
`;

type GraphQLResponse<T> = {
  data?: T;
};

async function fetchGraphQL<T>(
  query: string,
  preview = false
): Promise<GraphQLResponse<T>> {
  try {
    const response = await fetch(
      `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            preview
              ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
              : process.env.CONTENTFUL_ACCESS_TOKEN
          }`,
        },
        body: JSON.stringify({ query }),
      }
    );
    if (!response.ok) return {};
    return response.json();
  } catch {
    return {};
  }
}

type PostCollectionResponse = {
  postCollection: { items: Post[] };
};

type PortfolioItemCollectionResponse = {
  portfolioItemCollection: { items: PortfolioItem[] };
};

export async function getPreviewPostBySlug(
  slug: string
): Promise<Post | undefined> {
  const entry = await fetchGraphQL<PostCollectionResponse>(
    `query {
      postCollection(where: { slug: "${slug}" }, preview: true, limit: 1) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    true
  );
  return (
    entry.data?.postCollection.items[0] ??
    FALLBACK_POSTS.find((p) => p.slug === slug)
  );
}

export async function getAllPostsWithSlug(): Promise<Post[]> {
  if (!HAS_CONTENTFUL) return FALLBACK_POSTS;
  const entries = await fetchGraphQL<PostCollectionResponse>(
    `query {
      postCollection(where: { slug_exists: true }, order: date_DESC) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`
  );
  const items = entries.data?.postCollection.items;
  return items && items.length > 0 ? items : FALLBACK_POSTS;
}

export async function getAllPostsForHome(preview: boolean): Promise<Post[]> {
  if (!HAS_CONTENTFUL) return FALLBACK_POSTS;
  const entries = await fetchGraphQL<PostCollectionResponse>(
    `query {
      postCollection(order: date_DESC, preview: ${preview ? "true" : "false"}) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview
  );
  const items = entries.data?.postCollection.items;
  return items && items.length > 0 ? items : FALLBACK_POSTS;
}

export async function getPostAndMorePosts(
  slug: string,
  preview: boolean
): Promise<{ post: Post | undefined; morePosts: Post[] }> {
  const entry = await fetchGraphQL<PostCollectionResponse>(
    `query {
      postCollection(where: { slug: "${slug}" }, preview: ${
      preview ? "true" : "false"
    }, limit: 1) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview
  );
  const entries = await fetchGraphQL<PostCollectionResponse>(
    `query {
      postCollection(where: { slug_not_in: "${slug}" }, order: date_DESC, preview: ${
      preview ? "true" : "false"
    }, limit: 2) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview
  );
  const post =
    entry.data?.postCollection.items[0] ??
    FALLBACK_POSTS.find((p) => p.slug === slug);
  const morePosts =
    entries.data?.postCollection.items ??
    FALLBACK_POSTS.filter((p) => p.slug !== slug).slice(0, 2);
  return { post, morePosts };
}

// NOTE: queries portfolioItemCollection (not postCollection). The previous
// version queried the wrong collection with portfolio-only fields, which
// silently failed and kept portfolio items out of the sitemap + llms.txt.
export async function getAllPortfolioItemsWithSlug(): Promise<PortfolioItem[]> {
  if (!HAS_CONTENTFUL) return FALLBACK_PORTFOLIO_ITEMS;
  const entries = await fetchGraphQL<PortfolioItemCollectionResponse>(
    `query {
      portfolioItemCollection(where: { slug_exists: true }, order: date_DESC) {
        items {
          ${PORTFOLIO_GRAPHQL_FIELDS}
        }
      }
    }`
  );
  const items = entries.data?.portfolioItemCollection.items;
  return items && items.length > 0 ? items : FALLBACK_PORTFOLIO_ITEMS;
}

export async function getAllPortfolioItems(
  preview: boolean
): Promise<EnrichedPortfolioItem[]> {
  if (!HAS_CONTENTFUL) return enrichItems(FALLBACK_PORTFOLIO_ITEMS);
  const entries = await fetchGraphQL<PortfolioItemCollectionResponse>(
    `query {
      portfolioItemCollection(order: date_DESC, preview: ${
        preview ? "true" : "false"
      }) {
        items {
          ${PORTFOLIO_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview
  );
  const items = entries.data?.portfolioItemCollection.items;
  return enrichItems(items && items.length > 0 ? items : FALLBACK_PORTFOLIO_ITEMS);
}

export async function getPortfolioItemAndMorePortfolioItems(
  slug: string,
  preview: boolean
): Promise<{
  post: EnrichedPortfolioItem | undefined;
  morePosts: EnrichedPortfolioItem[];
}> {
  const entry = await fetchGraphQL<PortfolioItemCollectionResponse>(
    `query {
      portfolioItemCollection(where: { slug: "${slug}" }, preview: ${
      preview ? "true" : "false"
    }, limit: 1) {
        items {
          ${PORTFOLIO_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview
  );
  const entries = await fetchGraphQL<PortfolioItemCollectionResponse>(
    `query {
      portfolioItemCollection(where: { slug_not_in: "${slug}" }, order: date_DESC, preview: ${
      preview ? "true" : "false"
    }, limit: 2) {
        items {
          ${PORTFOLIO_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview
  );
  const rawPost =
    entry.data?.portfolioItemCollection.items[0] ??
    FALLBACK_PORTFOLIO_ITEMS.find((p) => p.slug === slug);
  const rawMore =
    entries.data?.portfolioItemCollection.items ??
    FALLBACK_PORTFOLIO_ITEMS.filter((p) => p.slug !== slug).slice(0, 2);
  return {
    post: rawPost ? enrichPortfolioItem(rawPost) : undefined,
    morePosts: enrichItems(rawMore),
  };
}
