import type { PortfolioItem, Post } from "./types";

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
  return response.json();
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
  return entry.data?.postCollection.items[0];
}

export async function getAllPostsWithSlug(): Promise<Post[] | undefined> {
  const entries = await fetchGraphQL<PostCollectionResponse>(
    `query {
      postCollection(where: { slug_exists: true }, order: date_DESC) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`
  );
  return entries.data?.postCollection.items;
}

export async function getAllPostsForHome(
  preview: boolean
): Promise<Post[] | undefined> {
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
  return entries.data?.postCollection.items;
}

export async function getPostAndMorePosts(
  slug: string,
  preview: boolean
): Promise<{ post: Post | undefined; morePosts: Post[] | undefined }> {
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
  return {
    post: entry.data?.postCollection.items[0],
    morePosts: entries.data?.postCollection.items,
  };
}

export async function getAllPortfolioItemsWithSlug(): Promise<
  Post[] | undefined
> {
  const entries = await fetchGraphQL<PostCollectionResponse>(
    `query {
      postCollection(where: { slug_exists: true }, order: date_DESC) {
        items {
          ${PORTFOLIO_GRAPHQL_FIELDS}
        }
      }
    }`
  );
  return entries.data?.postCollection.items;
}

export async function getAllPortfolioItems(
  preview: boolean
): Promise<PortfolioItem[] | undefined> {
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
  return entries.data?.portfolioItemCollection.items;
}

export async function getPortfolioItemAndMorePortfolioItems(
  slug: string,
  preview: boolean
): Promise<{
  post: PortfolioItem | undefined;
  morePosts: PortfolioItem[] | undefined;
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
  return {
    post: entry.data?.portfolioItemCollection.items[0],
    morePosts: entries.data?.portfolioItemCollection.items,
  };
}
