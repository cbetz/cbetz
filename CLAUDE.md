# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `yarn dev` — start the Next.js dev server
- `yarn build` / `yarn start` — production build / serve
- `yarn lint` — run ESLint (flat config in `eslint.config.mjs`, extends `eslint-config-next/core-web-vitals`)
- `yarn typecheck` — run `tsc --noEmit`

There is no test suite. Note that as of Next 15+, `next build` no longer runs ESLint — use `yarn lint` separately.

If a Contentful space ever needs to be re-bootstrapped from `contentful/export.json` (one-time operation), do not add `contentful-import` back to the project — run it transiently via `npx -y contentful-import@latest --content-file contentful/export.json --space-id $CONTENTFUL_SPACE_ID --management-token $CONTENTFUL_MANAGEMENT_TOKEN`. It was removed as a devDependency because it carried a large transitive vulnerability tree for a one-shot setup tool.

Required env vars (see `.env.local.example`): `CONTENTFUL_SPACE_ID`, `CONTENTFUL_ACCESS_TOKEN`, `CONTENTFUL_PREVIEW_ACCESS_TOKEN`, `CONTENTFUL_PREVIEW_SECRET`.

## Architecture

Personal site: Next.js **Pages Router** (not App Router) + TypeScript + Tailwind, content sourced from **Contentful** via GraphQL, deployed on Vercel.

**Data flow.** All Contentful access goes through `lib/api.ts`, which posts hand-written GraphQL queries to `https://graphql.contentful.com/content/v1/spaces/${CONTENTFUL_SPACE_ID}` using either the public or preview access token depending on a `preview` flag. Two parallel content types are queried with near-identical helpers: `postCollection` (blog) and `portfolioItemCollection` (portfolio) — each has `getAll…`, `get…AndMore…`, and `getAllWithSlug` variants. When changing query fields, update both `POST_GRAPHQL_FIELDS` and `PORTFOLIO_GRAPHQL_FIELDS` constants at the top of the file.

**Routing.** `pages/index.tsx` is the home page composing `Intro`, `Profile`, `PortfolioItems`, then a hero blog post + `MoreStories`. Detail pages live at `pages/blog/[slug].tsx` and `pages/portfolio/[slug].tsx`, both using `getStaticProps` + `getStaticPaths` with `fallback: true` for ISR-style behavior.

**Preview mode.** `pages/api/preview.ts` validates `?secret=…&slug=…` against `CONTENTFUL_PREVIEW_SECRET`, confirms the slug exists in Contentful, then calls `res.setPreviewData({})` and emits an HTML meta-refresh redirect rather than a 307 — this is intentional to avoid open-redirect vulnerabilities (see comment in the file). `pages/api/exit-preview.ts` clears it.

**Styling.** Tailwind 3 with a small custom theme in `tailwind.config.js` (custom screens, `accent-1/2/7` colors, oversized `5xl–8xl` font sizes used by hero headings). The `content` glob includes `./app/**` even though the App Router is not in use. Global styles in `styles/index.css`; one CSS module at `components/markdown-styles.module.css` for rendered post bodies.

**Rich text.** Post/portfolio bodies are Contentful rich-text JSON rendered through `@contentful/rich-text-react-renderer` inside `components/post-body.tsx`.

**Analytics.** `@vercel/analytics` is wired into `pages/_app.tsx` — no other client-side instrumentation.

## Conventions and gotchas

- TypeScript is configured loosely (`strict: false`, `target: es5`) and most page/component props are untyped (`{ preview, allPosts, … }`).
- `lib/constants.ts` exports `HOME_OG_IMAGE_URL` pointing at a Medium-hosted image — replace if the OG image needs to be self-hosted.
- The Contentful GraphQL queries interpolate `slug` directly into the query string. Slugs come from Contentful (trusted) and Next.js route params, so this is fine for current usage but worth noting before exposing any user-supplied input to these helpers.
- `next.config.js` whitelists `images.ctfassets.net` for `next/image`; any new image host must be added there.
