import type {
  EnrichedPortfolioItem,
  PortfolioItem,
  ProjectMeta,
} from "./types";

// Curated editorial metadata for each portfolio project, keyed by Contentful
// slug. Contentful owns the cover image, rich-text body, and date; this layer
// adds the framing the redesigned index + case studies need.
export const PROJECT_META: Record<string, ProjectMeta> = {
  "trove-project": {
    title: "Trove",
    oneLiner: "Open-source lookup tools and Claude skills for public healthcare data",
    blurb:
      "Federal healthcare data is public but barely usable: CMS publishes Medicare Cost Reports as headerless 100,000-row CSVs, the IRS ships Form 990s as bulk XML, and the FDA scatters drug-approval reviews across hundreds of PDF directories. Trove does the parsing, joining, and packaging. It covers 1,295 nonprofit hospital systems (CMS Worksheet S-10 against IRS 990 Schedule H, side by side) and 218 FDA novel drug approvals from 2021 to 2024 across both CDER and CBER. Every dataset ships twice: as a search-first web lookup for people, and as an installable Claude skill that reads the underlying filings at query time for agents.",
    category: "Healthcare AI",
    year: "2026",
    role: "Solo build",
    stack: ["Python", "TypeScript", "Claude Skill", "DuckDB", "Parquet"],
    highlights: [
      "Quantifies a real reporting gap: across 228 hospital systems whose CMS and IRS charity-care filings are both period-aligned and material, the median absolute difference is 25%",
      "Ships a 44-variable semantic dictionary that decodes HCRIS worksheet/line/column codes into tidy DataFrames and partitioned Parquet",
      "Dual-surfaced by design: a web lookup for people, plus fda-analyst and hcris-analyst Claude skills that read the actual filings and PDFs at query time",
      "Fully reproducible from public-domain sources with two scripts, MIT-licensed, and careful about redistribution terms (CDC SVI bundled; UW ADI deliberately local-only)",
    ],
    featured: true,
    link: "https://troveproject.com",
    repo: "https://github.com/cbetz/trove",
  },
  "last-ehr": {
    title: "Last EHR",
    oneLiner:
      "A protocol and reference implementation for approval-gated AI agent writes on FHIR",
    blurb:
      "When an AI agent writes to a patient chart, the step between \"the agent wants to write\" and \"the chart changed\" has no standard. CDS Hooks covers EHR-initiated suggestions, HL7's AI Transparency IG covers after-the-fact provenance, and MCP covers transport, but none of them define what an agent-initiated write a human must approve actually is. Last EHR specifies that missing layer as Approval-Gated Agent Writes on FHIR: Proposal, Decision, Commit, Audit. A write tool never executes; it emits the exact FHIR resource it would create and waits for a reviewer. Two independent implementations run in the repo, plus a conformance suite that verifies any implementation using its own FHIR reads.",
    category: "Healthcare AI",
    year: "2026",
    role: "Solo build",
    stack: ["TypeScript", "Next.js", "FHIR", "MCP", "Medplum"],
    highlights: [
      "Specifies a protocol, not just an app: Proposal to Decision to Commit to Audit, RFC 2119 language, extracted from two running implementations rather than designed on paper",
      "Two conforming hosts from one spec: a web approval card and MCP elicitation-gated write tools, so the protocol is proven framework-neutral",
      "Ships an executable conformance suite (npx @lastehr/agent-write-conformance) that verifies implementations against real FHIR reads instead of self-reported claims",
      "A layer, not an EHR: runs on any headless FHIR backend (Medplum, HAPI, Firely, Aidbox), is never the system of record, and stores no PHI of its own",
      "Published to npm and the official MCP Registry, with a zero-signup synthetic-data demo where every write passes through the approval gate",
    ],
    featured: true,
    link: "https://www.lastehr.com",
    repo: "https://github.com/cbetz/last-ehr",
  },
  ratebook: {
    title: "Ratebook",
    oneLiner: "Open-source electricity rate engine, tariff database, and MCP server",
    blurb:
      "Ratebook turns the messy world of U.S. electricity tariffs — tiered pricing, time-of-use windows, seasonal rates, and fixed charges — into accurate, programmatic bill estimates. A dependency-free Python rate engine, cross-validated against NREL's PySAM and real utility bills, is mirrored byte-for-byte by a TypeScript port and fed by a tariff database built from the public URDB plus Claude-powered PDF extraction. The same engine ships three ways: an MCP server agents can call, a Home Assistant integration with live price sensors, and a self-contained browser demo.",
    category: "Developer tool",
    year: "2026",
    role: "Solo build",
    stack: ["Python", "TypeScript", "Claude", "MCP", "DuckDB"],
    highlights: [
      "Deterministic, dependency-free rate engine cross-validated against NREL PySAM and a real utility bill (reproduced to within two cents)",
      "Python and TypeScript engines kept byte-for-byte identical through shared JSON test vectors",
      "Claude-powered pipeline extracts utility tariff PDFs into a validated, queryable database (6,000+ rates from the public URDB)",
      "One engine, three surfaces: an MCP server for agents, a Home Assistant integration with live price sensors, and a browser demo",
    ],
    featured: false,
    link: null,
    repo: "https://github.com/cbetz/ratebook",
  },
  taskproof: {
    title: "taskproof",
    oneLiner: "CI harness that tests whether real AI agents can complete tasks on your site",
    blurb:
      "taskproof checks whether AI agents — not just humans — can actually use your website. You describe tasks in YAML as a natural-language goal plus deterministic success assertions, and taskproof drives multiple agent harnesses (Claude computer-use, browser-use) through them in parallel, grading with pass@k to tolerate non-determinism. It renders an interactive HTML report with per-step screenshots, cost breakdowns, and baseline diffs, so CI catches agent-usability regressions the way it catches broken tests.",
    category: "Developer tool",
    year: "2026",
    role: "Solo build",
    stack: ["TypeScript", "Python", "Playwright", "Claude", "Anthropic SDK"],
    highlights: [
      "Pass@k grading with statistical thresholds instead of brittle binary gates — built for non-deterministic agents",
      "Pluggable adapter interface: every agent harness emits the same run artifact, so Claude computer-use and browser-use compare directly in one matrix",
      "Deterministic-first assertion engine (URL/DOM/network) with an optional LLM judge that can only fail a pass, never override it",
      "Self-contained interactive HTML reports with per-step traces, screenshots, cost breakdowns, and CI regression diffs",
    ],
    featured: false,
    link: null,
    repo: "https://github.com/taskproof/taskproof",
  },
  feedguard: {
    title: "FeedGuard",
    oneLiner: "Tells Shopify merchants which products Google is about to disapprove — and how to fix them",
    blurb:
      "FeedGuard catches the silent Google Shopping disapprovals that Shopify's own admin can't surface. Paste a product URL and it extracts the page's Product JSON-LD, pulls the store's real product data from public Shopify endpoints, and runs a versioned ruleset (Google's 2026 spec) to flag missing return/shipping policies, undersized images, missing identifiers, and — most decisively — price and availability mismatches between the page and the feed. It returns a 0–100 score, a risk band, and store-specific fixes, all computed server-side with no third-party APIs.",
    category: "Web app",
    year: "2026",
    role: "Solo build",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Neon"],
    highlights: [
      "Diffs on-page structured data against the store's real Shopify feed — the highest-precision predictor of disapproval, which most checkers ignore",
      "Version-stamped ruleset that tracks Google's shifting 2026 Merchant requirements independently of the app",
      "Zero-dependency serverless design: the core checker runs on Vercel's free tier with no external APIs",
      "Store-aware fixes that show merchants their own real data — barcode, image size, price — and exactly what to change",
    ],
    featured: false,
    link: "https://www.feedguardapp.com",
  },
  "confluence-agent-cli": {
    title: "Confluence Agent CLI",
    oneLiner: "A git-like CLI that lets coding agents pull, edit, and push Confluence pages as local files",
    blurb:
      "Confluence Agent CLI gives AI coding agents a filesystem-native way to work with Confluence. It treats a Confluence page tree like a git repo: pull pages into local Markdown (with the raw storage HTML and attachments preserved), review changes as unified diffs, and push back with optimistic version checks that refuse to clobber remotely-edited pages. It detects lossy conversions when Confluence-specific macros are present and ships with a Claude agent skill documenting the recommended edit workflow.",
    category: "Developer tool",
    year: "2026",
    role: "Solo build",
    stack: ["TypeScript", "Node.js", "Commander", "Confluence API", "Claude Skill"],
    highlights: [
      "git-like pull / diff / push model over the Confluence Cloud REST API, natural for agents already thinking in version control",
      "Preserves both agent-friendly Markdown and macro-safe storage HTML, refusing lossy pushes unless explicitly allowed",
      "Optimistic version checks detect remote edits and prevent accidental overwrites",
      "Ships as an npm package with a bundled Claude agent skill for AI-driven editing",
    ],
    featured: false,
    link: null,
    repo: "https://github.com/cbetz/confluence-agent-cli",
  },
  "gluten-free-scout": {
    title: "Gluten Free Scout",
    oneLiner: "Cross-platform gluten-free product discovery with community reviews",
    blurb:
      "A consumer app for discovering, rating, and reviewing gluten-free products, with the ability to save favorites and share them. Built cross-platform from a shared React core (a Next.js site and a React Native client), so the catalog, reviews, and saved lists stay consistent everywhere a user lands.",
    category: "Mobile app",
    year: "2024",
    role: "Solo build",
    stack: ["Next.js", "React", "React Native"],
    highlights: [
      "Cross-platform from a shared React core: Next.js for web, React Native for mobile",
      "Community layer: ratings, reviews, save-to-favorites, and social sharing",
      "Product-discovery focus solving a real, niche dietary need",
    ],
    featured: false,
    link: null,
  },
  "ev-intersection": {
    title: "EV Intersection",
    oneLiner: "A content-driven discovery engine for finding your next EV",
    blurb:
      "EV Intersection helps buyers research and compare electric vehicles through model reviews, buying guides, and a search interface that matches cars to a shopper's needs. It pairs a Sanity headless CMS for editorial content with a Next.js front end, so the catalog stays easy to author while pages render fast and SEO-friendly.",
    category: "Web app",
    year: "2023",
    role: "Design + engineering",
    stack: ["Next.js", "React", "Sanity", "Mantine"],
    highlights: [
      "Sanity headless CMS structures vehicle reviews and guides for non-developer authoring",
      "Next.js server rendering keeps discovery pages fast and indexable, central to an SEO-driven product",
      "Search matches EV models to a buyer's needs rather than listing a flat catalog",
    ],
    featured: false,
    link: null,
  },
  "all-beer-no-gluten": {
    title: "All Beer No Gluten",
    oneLiner: "A searchable database of truly gluten-free beers",
    blurb:
      "A curated, searchable catalog of beers that are genuinely gluten-free rather than merely gluten-reduced, a distinction that matters to people with celiac disease. Visitors browse and filter by style, brewery, and name, with the catalog maintained as editorial content in a headless CMS so updates ship without touching code.",
    category: "Web app",
    year: "2021",
    role: "Solo build",
    stack: ["Next.js", "React", "Contentful", "Tailwind CSS"],
    highlights: [
      "Filterable browse by beer style, brewery, and name",
      "Editorially curated for truly gluten-free (not gluten-reduced) options",
      "Catalog managed in Contentful so non-technical updates require no deploys",
    ],
    featured: false,
    link: null,
  },
  "easy-curb": {
    title: "Easy Curb",
    oneLiner: "Contactless curbside pickup for retail and food-service businesses",
    blurb:
      "Easy Curb lets businesses run contactless curbside pickup end to end. Customers get order details over text and email, share live status, and staff scan a QR code to verify and hand off the right order from a distance. Built with Ionic on iOS and Android over a Firebase backend, it shipped in 2020 to meet the surge in no-contact pickup.",
    category: "Mobile app",
    year: "2020",
    role: "iOS + Android + backend",
    stack: ["iOS", "Android", "Ionic", "Firebase"],
    highlights: [
      "Two-way order flow: automated SMS/email notifications plus live customer status updates",
      "QR-code scanning for contactless verification and handoff",
      "Single Ionic codebase shipping to both iOS and Android, backed by Firebase",
    ],
    featured: false,
    link: "https://easycurbsidepickup.com",
  },
  "flight-master": {
    title: "Flight Master",
    oneLiner: "An iOS app to set and close a daily Flights Climbed goal",
    blurb:
      "Flight Master is an iOS fitness utility that lets you set a daily Flights Climbed target and track progress toward closing the ring. It reads Apple Health's Flights Climbed metric, turning a normally overlooked HealthKit data point into a first-class daily goal, built fully in SwiftUI as an early adopter of Apple's declarative UI framework.",
    category: "Mobile app",
    year: "2020",
    role: "Solo build",
    stack: ["iOS", "Swift", "SwiftUI", "HealthKit"],
    highlights: [
      "Surfaces Apple Health's Flights Climbed metric as a dedicated, goal-driven daily ring",
      "Built fully in SwiftUI as an early adopter of Apple's declarative UI framework (~2020)",
      "Focused single-purpose design: one clear goal, one clear progress view",
    ],
    featured: false,
    link: "https://apps.apple.com/us/app/flight-master/id1495056152",
  },
  "gluten-free-yum": {
    title: "Gluten Free Yum",
    oneLiner: "Barcode-scanning gluten-free product finder for iOS and Android",
    blurb:
      "A cross-platform mobile app for discovering gluten-free products: scan a barcode to look up an item, read community ratings and reviews, and find products tagged to local stores. It pairs an Ionic client targeting iOS and Android with a Go backend serving a community-contributed product database.",
    category: "Mobile app",
    year: "2018",
    role: "iOS + Android + backend",
    stack: ["iOS", "Android", "Ionic", "Go"],
    highlights: [
      "Barcode scanning for instant product lookups against a shared database",
      "Community-driven catalog: users add products, ratings, and reviews",
      "Single Ionic codebase shipping to both iOS and Android, backed by a Go API",
    ],
    featured: false,
    link: null,
  },
};

// Which project each post is actually about. Case studies added after a post
// went live are otherwise reachable only from /portfolio, and a page with one
// inbound link is the page Google discovers but never bothers to crawl. These
// pairs give each project an inbound link from an indexed post, and give each
// post an onward path for readers who want the code.
export const POST_PROJECT_LINKS: Record<string, string[]> = {
  "rate-sheet-is-half-your-bill": ["ratebook"],
  "same-brain-two-pairs-of-eyes": ["taskproof"],
};

// Reverse index, so a project page can list the writing about it.
export const PROJECT_POST_LINKS: Record<string, string[]> = Object.entries(
  POST_PROJECT_LINKS
).reduce<Record<string, string[]>>((acc, [postSlug, projectSlugs]) => {
  for (const projectSlug of projectSlugs) {
    (acc[projectSlug] ??= []).push(postSlug);
  }
  return acc;
}, {});

// Display order: featured first, then most recent.
export const PROJECT_ORDER = [
  "trove-project",
  "last-ehr",
  "ratebook",
  "confluence-agent-cli",
  "feedguard",
  "taskproof",
  "gluten-free-scout",
  "ev-intersection",
  "all-beer-no-gluten",
  "easy-curb",
  "flight-master",
  "gluten-free-yum",
];

export function enrichPortfolioItem(item: PortfolioItem): EnrichedPortfolioItem {
  const meta = PROJECT_META[item.slug];
  if (!meta) return item;
  return {
    ...item,
    ...meta,
    // Prefer Contentful's external link if present, else the curated one.
    link: item.link ?? meta.link ?? null,
    tags: item.tags && item.tags.length > 0 ? item.tags : meta.stack,
  };
}

// Featured first, then by year/date descending.
export function sortProjects<T extends EnrichedPortfolioItem>(items: T[]): T[] {
  const rank = (slug: string) => {
    const i = PROJECT_ORDER.indexOf(slug);
    return i === -1 ? PROJECT_ORDER.length : i;
  };
  return [...items].sort((a, b) => {
    if (!!a.featured !== !!b.featured) return a.featured ? -1 : 1;
    const byOrder = rank(a.slug) - rank(b.slug);
    if (byOrder !== 0) return byOrder;
    return (b.date ?? "").localeCompare(a.date ?? "");
  });
}
