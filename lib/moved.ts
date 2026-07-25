import movedContent from "./moved-content.json";

// Slugs under /blog that now live on another domain. The 308 redirects are
// emitted from next.config.js off the same JSON file; these helpers keep the
// moved slugs out of every surface that advertises a URL, so we never point
// Google (or a feed reader) at something that only redirects.
export const MOVED_POSTS: Record<string, string> = movedContent.posts;

export function movedPostDestination(slug: string): string | undefined {
  return Object.hasOwn(MOVED_POSTS, slug) ? MOVED_POSTS[slug] : undefined;
}

// hasOwn, not `in`: `in` walks the prototype chain, so a slug like
// "constructor" or "toString" would report as moved and vanish from the site.
export function isMovedPost(slug: string): boolean {
  return Object.hasOwn(MOVED_POSTS, slug);
}

export function withoutMovedPosts<T extends { slug: string }>(posts: T[]): T[] {
  return posts.filter((post) => !isMovedPost(post.slug));
}
