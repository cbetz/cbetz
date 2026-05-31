import type { Document } from "@contentful/rich-text-types";
import type { PortfolioItem, Post } from "./types";
import { PROJECT_META, PROJECT_ORDER } from "./projects";
import { PROFILE_IMAGE_URL } from "./site";

// Local content used when Contentful credentials are absent (e.g. local dev
// without secrets) or the API is unreachable. Keeps the site fully renderable
// and acts as a graceful degradation layer in production. On a configured
// deploy, Contentful is the source of truth and this is never reached.

const AUTHOR = {
  name: "Chris Betz",
  picture: { url: PROFILE_IMAGE_URL },
};

function richText(paragraphs: string[]): { json: Document } {
  return {
    json: {
      nodeType: "document",
      data: {},
      content: paragraphs.map((value) => ({
        nodeType: "paragraph",
        data: {},
        content: [{ nodeType: "text", value, marks: [], data: {} }],
      })),
    } as unknown as Document,
  };
}

export const FALLBACK_POSTS: Post[] = [
  {
    slug: "lets-build-an-image-labeler-app-using-aws-amplify-auth-api-graphql-datastore",
    title:
      "Let's build an Image Labeler App using AWS Amplify Auth, API (GraphQL), DataStore, Storage, Predictions and React Native",
    date: "2021-04-09",
    author: AUTHOR,
    excerpt:
      "A hands-on walkthrough of building a React Native image labeler end to end with AWS Amplify — auth, a GraphQL API, DataStore, Storage, and Predictions.",
    content: richText([
      "A step-by-step build of a React Native image labeler powered by AWS Amplify: authentication, a GraphQL API, offline-first DataStore, file Storage, and the Predictions category for image labeling.",
      "Read the full post on the live site — the complete walkthrough lives in Contentful.",
    ]),
  },
  {
    slug: "99-gluten-free-beers",
    title: "99 Gluten Free Beers",
    date: "2020-12-18",
    author: AUTHOR,
    excerpt:
      "A running list of genuinely gluten-free beers worth seeking out — the side project that kicked off a small family of gluten-free apps.",
    content: richText([
      "A curated list of gluten-free beers — the distinction between truly gluten-free and merely gluten-reduced, and the ones actually worth drinking.",
      "Read the full post on the live site — the complete list lives in Contentful.",
    ]),
  },
];

export const FALLBACK_PORTFOLIO_ITEMS: PortfolioItem[] = PROJECT_ORDER.map(
  (slug) => {
    const meta = PROJECT_META[slug];
    return {
      slug,
      title: meta.title,
      date: `${meta.year}-01-01`,
      author: AUTHOR,
      excerpt: meta.oneLiner,
      tags: meta.stack,
      link: meta.link ?? null,
      content: richText([meta.blurb, ...meta.highlights]),
    };
  }
);
