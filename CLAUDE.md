# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `yarn dev` — start the Next.js dev server
- `yarn build` / `yarn start` — production build / serve
- `yarn lint` — run ESLint (flat config in `eslint.config.mjs`, extends `eslint-config-next/core-web-vitals`)
- `yarn typecheck` — run `tsc --noEmit`

There is no test suite. As of Next 15+, `next build` no longer runs ESLint — use `yarn lint` separately.

If a Contentful space ever needs to be re-bootstrapped from `contentful/export.json` (one-time operation), do not add `contentful-import` back to the project — run it transiently via `npx -y contentful-import@latest --content-file contentful/export.json --space-id $CONTENTFUL_SPACE_ID --management-token $CONTENTFUL_MANAGEMENT_TOKEN`. It was removed as a devDependency because it carried a large transitive vulnerability tree for a one-shot setup tool.

Required env vars (see `.env.local.example`): `CONTENTFUL_SPACE_ID`, `CONTENTFUL_ACCESS_TOKEN`, `CONTENTFUL_PREVIEW_ACCESS_TOKEN`, `CONTENTFUL_PREVIEW_SECRET`. Optionally `NEXT_PUBLIC_SITE_URL` to set the canonical origin used by `metadataBase` (defaults to `https://cbetz.com`).

## Architecture

Personal site: Next.js **App Router** + TypeScript + Tailwind 4 + shadcn/ui, content sourced from **Contentful** via GraphQL, deployed on Vercel. There is no `pages/` directory — everything lives under `app/`.

**Data flow.** All Contentful access goes through `lib/api.ts`, which posts hand-written GraphQL queries to `https://graphql.contentful.com/content/v1/spaces/${CONTENTFUL_SPACE_ID}` using either the public or preview access token depending on a `preview` flag. Two parallel content types are queried with near-identical helpers: `postCollection` (blog) and `portfolioItemCollection` (portfolio) — each has `getAll…`, `get…AndMore…`, and `getAllWithSlug` variants. When changing query fields, update both `POST_GRAPHQL_FIELDS` and `PORTFOLIO_GRAPHQL_FIELDS` constants at the top of the file. Strongly-typed return values (`Post`, `PortfolioItem`) come from `lib/types.ts`.

**Routing.** All pages are async server components that await `draftMode()` to decide whether to fetch preview content, then call into `lib/api.ts`. `app/page.tsx` is the home page; `app/blog/page.tsx` and `app/portfolio/page.tsx` are the index pages; `app/blog/[slug]/page.tsx` and `app/portfolio/[slug]/page.tsx` are the detail pages, each using `generateStaticParams` for SSG and `generateMetadata` for per-post titles + og:image.

**Preview mode.** `app/api/preview/route.ts` validates `?secret=…&slug=…` against `CONTENTFUL_PREVIEW_SECRET`, confirms the slug exists in Contentful, then calls `(await draftMode()).enable()` and redirects. `app/api/exit-preview/route.ts` disables it. The root layout reads `draftMode()` and passes the flag to `<Alert>`.

**Styling.** Tailwind 4 with CSS-first config — design tokens live in a `@theme {}` block in `styles/index.css` (no `tailwind.config.js`). shadcn/ui (Radix primitives, Nova preset, neutral base) is set up: shadcn components live in `components/ui/`, the `cn()` helper is in `lib/utils.ts`, theme CSS variables (light + dark) are in `styles/index.css`. Geist is wired up via `next/font/google` in `app/layout.tsx` and exposed to Tailwind as `var(--font-sans)`. Path aliases: `@/*` maps to the project root. One CSS module at `components/markdown-styles.module.css` for rendered post bodies — needs `@reference "../styles/index.css"` at the top to use `@apply` (Tailwind 4 requirement for CSS modules).

**Rich text.** Post/portfolio bodies are Contentful rich-text JSON rendered through `@contentful/rich-text-react-renderer` inside `components/post-body.tsx`.

**Analytics.** `@vercel/analytics` is wired into `app/layout.tsx`.

## Conventions and gotchas

- TypeScript is strict. Page-level prop types are inferred via `params: Promise<{ slug: string }>` (Next 15+ async params).
- The Contentful GraphQL queries interpolate `slug` directly into the query string. Slugs come from Contentful (trusted) and Next.js route params, so this is fine for current usage but worth noting before exposing any user-supplied input to these helpers.
- `next.config.js` whitelists `images.ctfassets.net` for `next/image`; any new image host must be added there.
- The OG image is self-hosted at `/public/og-image.jpg` (not yet uploaded — link previews 404 until that file exists).
