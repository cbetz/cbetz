import { ALTITUDE_URL, PROFILE_IMAGE_URL, SAME_AS, SITE_URL } from "./site";

// Stable @id anchors so every page references one Person/Organization/WebSite
// node in the knowledge graph instead of redefining them. This consolidation
// is the core entity-SEO signal for ranking "Chris Betz" as an entity.
export const PERSON_ID = `${SITE_URL}/#chris-betz`;
export const ORG_ID = `${ALTITUDE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

const DESCRIPTION =
  "Chris Betz is Head of Engineering at Altitude, building real-world AI systems for healthcare. Two decades shipping software across web, mobile, and applied AI — twice a CTO before Altitude.";

export const organizationEntity = {
  "@type": "Organization",
  "@id": ORG_ID,
  name: "Altitude",
  url: ALTITUDE_URL,
  description: "A healthcare-AI company.",
};

export const personEntity = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: "Chris Betz",
  alternateName: ["Christopher Betz", "Christopher William Betz"],
  url: `${SITE_URL}/about`,
  image: PROFILE_IMAGE_URL,
  description: DESCRIPTION,
  jobTitle: "Head of Engineering",
  worksFor: { "@id": ORG_ID },
  alumniOf: {
    "@type": "EducationalOrganization",
    name: "Lehigh University",
    url: "https://www.lehigh.edu",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Media",
    addressRegion: "PA",
    addressCountry: "US",
  },
  knowsAbout: [
    "Software engineering",
    "Engineering leadership",
    "Applied AI",
    "Healthcare technology",
    "Large language model applications",
    "AI agents",
    "Healthcare interoperability",
    "FHIR and EHR integration",
    "HIPAA and SOC 2 compliance",
    "Product engineering",
  ],
  sameAs: SAME_AS,
};

export const websiteEntity = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  name: "Chris Betz",
  url: SITE_URL,
  description: DESCRIPTION,
  inLanguage: "en-US",
  publisher: { "@id": PERSON_ID },
  author: { "@id": PERSON_ID },
};

// Site-wide graph rendered once in the root layout.
export const siteGraph = {
  "@context": "https://schema.org",
  "@graph": [websiteEntity, organizationEntity, personEntity],
};

export function breadcrumbSchema(
  trail: { name: string; path: string }[]
): object {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: `${SITE_URL}${t.path}`,
    })),
  };
}

export function collectionPageSchema(opts: {
  name: string;
  path: string;
  description: string;
}): object {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: opts.name,
    url: `${SITE_URL}${opts.path}`,
    description: opts.description,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": PERSON_ID },
  };
}

export function profilePageSchema(path = "/about"): object {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: `${SITE_URL}${path}`,
    dateModified: new Date().toISOString(),
    mainEntity: { "@id": PERSON_ID },
  };
}

export function blogPostingSchema(post: {
  title: string;
  excerpt: string;
  image?: string;
  date: string;
  slug: string;
}): object {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    ...(post.image ? { image: post.image } : {}),
    datePublished: post.date,
    dateModified: post.date,
    author: { "@id": PERSON_ID },
    publisher: { "@id": PERSON_ID },
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
    isPartOf: { "@id": WEBSITE_ID },
  };
}

export function creativeWorkSchema(item: {
  title: string;
  excerpt: string;
  image?: string;
  date: string;
  slug: string;
  link?: string | null;
  tags?: string[] | null;
}): object {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: item.title,
    description: item.excerpt,
    ...(item.image ? { image: item.image } : {}),
    datePublished: item.date,
    url: item.link ?? `${SITE_URL}/portfolio/${item.slug}`,
    ...(item.tags && item.tags.length > 0
      ? { keywords: item.tags.join(", ") }
      : {}),
    creator: { "@id": PERSON_ID },
    isPartOf: { "@id": WEBSITE_ID },
  };
}
