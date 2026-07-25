// next.config.js
const movedContent = require("./lib/moved-content.json");

// Content that moved off the domain keeps its ranking equity only if the old
// URL permanently redirects. Sourced from lib/moved-content.json so the
// redirect and the sitemap/feed/llms.txt exclusions can't drift apart.
const movedPostRedirects = Object.entries(movedContent.posts).flatMap(
  ([slug, destination]) => [
    { source: `/blog/${slug}`, destination, permanent: true },
    { source: `/blog/${slug}/raw.md`, destination, permanent: true },
  ]
);

module.exports = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.ctfassets.net" },
    ],
  },
  async redirects() {
    return [...movedPostRedirects];
  },
};
