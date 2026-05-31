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
      "Trove turns public-domain healthcare datasets that are widely cited but nearly impossible to use in raw form — CMS Medicare Cost Reports, IRS Form 990 Schedule H hospital financials, FDA drug-approval reviews — into clean, queryable bundles. Each dataset ships as both a search-first web lookup for people and an installable Claude skill for agents.",
    category: "Healthcare AI",
    year: "2026",
    role: "Solo build",
    stack: ["Next.js", "Claude Skill", "TypeScript"],
    highlights: [
      "Packages opaque federal datasets (HCRIS cost reports, IRS 990 Schedule H, FDA approvals) into clean, queryable bundles",
      "Dual-surfaced: a search-first web lookup for people and an installable Claude skill for agents",
      "Decodes raw worksheet/line/column schemas so charity-care, beds, staffing, and trial evidence are usable without manual parsing",
      "Open-source and built on public-domain data — reproducible and free to extend",
    ],
    featured: true,
    link: null,
  },
  "last-ehr": {
    title: "Last EHR",
    oneLiner: "Low-code platform for composing a headless EHR with AI agents",
    blurb:
      "Last EHR is a low-code platform for assembling healthcare software without rebuilding the foundations every time: pick a headless EHR, wire up the integrations you need, and layer in AI agents. The composable model lets clinical teams ship on top of existing systems instead of writing custom infrastructure.",
    category: "Healthcare AI",
    year: "2024",
    role: "Design + engineering",
    stack: ["Next.js", "React", "AI agents"],
    highlights: [
      "Composable, headless-EHR-first architecture — choose the EHR backend, then assemble integrations on top",
      "AI agents as a first-class building block, not a bolt-on",
      "Low-code surface aimed at cutting EHR build time so teams focus on clinical outcomes",
    ],
    featured: true,
    link: "https://www.lastehr.com",
  },
  "gluten-free-scout": {
    title: "Gluten Free Scout",
    oneLiner: "Cross-platform gluten-free product discovery with community reviews",
    blurb:
      "A consumer app for discovering, rating, and reviewing gluten-free products, with the ability to save favorites and share them. Built cross-platform from a shared React core — a Next.js site and a React Native client — so the catalog, reviews, and saved lists stay consistent everywhere a user lands.",
    category: "Mobile app",
    year: "2024",
    role: "Solo build",
    stack: ["Next.js", "React", "React Native"],
    highlights: [
      "Cross-platform from a shared React core — Next.js for web, React Native for mobile",
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
      "Next.js server rendering keeps discovery pages fast and indexable — central to an SEO-driven product",
      "Search matches EV models to a buyer's needs rather than listing a flat catalog",
    ],
    featured: false,
    link: null,
  },
  "all-beer-no-gluten": {
    title: "All Beer No Gluten",
    oneLiner: "A searchable database of truly gluten-free beers",
    blurb:
      "A curated, searchable catalog of beers that are genuinely gluten-free rather than merely gluten-reduced — a distinction that matters to people with celiac disease. Visitors browse and filter by style, brewery, and name, with the catalog maintained as editorial content in a headless CMS so updates ship without touching code.",
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
      "Flight Master is an iOS fitness utility that lets you set a daily Flights Climbed target and track progress toward closing the ring. It reads Apple Health's Flights Climbed metric, turning a normally overlooked HealthKit data point into a first-class daily goal — built fully in SwiftUI as an early adopter of Apple's declarative UI framework.",
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

// Display order: featured first, then most recent.
export const PROJECT_ORDER = [
  "trove-project",
  "last-ehr",
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
