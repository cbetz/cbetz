import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FiGithub, FiLinkedin, FiTwitter, FiYoutube } from "react-icons/fi";
import Container from "@/components/container";
import Header from "@/components/header";
import JsonLd from "@/components/json-ld";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://cbetz.com";

const PROFILE_IMAGE_URL =
  "https://images.ctfassets.net/nld1cbd8nf0f/50rUigjk0iUdn6YaTR8fM1/cd888f0f0e4c6b6644301c8ca1526904/profile.png";

export const metadata: Metadata = {
  title: "About",
  description:
    "Chris Betz — Head of Engineering at Altitude. Building real-world AI systems for healthcare. Based in New York.",
  alternates: { canonical: "/about" },
};

const profilePageSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  dateCreated: "2020-01-01T00:00:00Z",
  dateModified: new Date().toISOString(),
  mainEntity: {
    "@type": "Person",
    name: "Chris Betz",
    alternateName: "Christopher Betz",
    identifier: "chrisbetz",
    url: `${SITE_URL}/about`,
    description:
      "Head of Engineering at Altitude, building real-world AI systems for healthcare.",
    image: PROFILE_IMAGE_URL,
    jobTitle: "Head of Engineering",
    worksFor: {
      "@type": "Organization",
      name: "Altitude",
      url: "https://joinaltitude.com",
    },
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Lehigh University",
      url: "https://www.lehigh.edu",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "New York",
      addressRegion: "NY",
      addressCountry: "US",
    },
    knowsAbout: [
      "Software engineering",
      "Engineering management",
      "Artificial intelligence",
      "Healthcare technology",
      "Applied AI",
      "Product engineering",
    ],
    sameAs: [
      "https://www.linkedin.com/in/christopherbetz",
      "https://twitter.com/thechrisbetz",
      "https://github.com/cbetz",
      "https://www.youtube.com/c/ChrisBetz",
    ],
  },
};

const socialLinks = [
  { href: "https://www.linkedin.com/in/christopherbetz", label: "LinkedIn", icon: FiLinkedin },
  { href: "https://twitter.com/thechrisbetz", label: "Twitter", icon: FiTwitter },
  { href: "https://github.com/cbetz", label: "GitHub", icon: FiGithub },
  { href: "https://www.youtube.com/c/ChrisBetz", label: "YouTube", icon: FiYoutube },
];

export default function AboutPage() {
  return (
    <Container>
      <JsonLd data={profilePageSchema} />
      <Header />
      <article className="max-w-2xl mx-auto pb-24">
        <div className="flex items-center gap-6 mb-10">
          <Image
            src={PROFILE_IMAGE_URL}
            alt="Chris Betz"
            width={120}
            height={120}
            className="rounded-full size-24 md:size-28 object-cover ring-1 ring-foreground/10 shrink-0"
            priority
          />
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Chris Betz
            </h1>
            <p className="text-muted-foreground mt-1">
              Head of Engineering at{" "}
              <Link
                href="https://joinaltitude.com"
                target="_blank"
                rel="noreferrer"
                className="text-foreground underline underline-offset-4 hover:decoration-primary"
              >
                Altitude
              </Link>
            </p>
          </div>
        </div>

        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-5 text-base md:text-lg leading-relaxed">
          <p>
            I&apos;m Chris Betz (also known as Christopher Betz). I lead engineering at{" "}
            <Link
              href="https://joinaltitude.com"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4"
            >
              Altitude
            </Link>
            , where we&apos;re building real-world AI systems for healthcare.
          </p>
          <p>
            I&apos;m based in New York. I studied at{" "}
            <Link
              href="https://www.lehigh.edu"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4"
            >
              Lehigh University
            </Link>
            .
          </p>
          <p>
            The best way to reach me is{" "}
            <Link
              href="https://www.linkedin.com/in/christopherbetz"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4"
            >
              LinkedIn
            </Link>
            .
          </p>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-4">
            Elsewhere
          </h2>
          <ul className="flex flex-wrap items-center gap-5">
            {socialLinks.map(({ href, label, icon: Icon }) => (
              <li key={label}>
                <Link
                  href={href}
                  target="_blank"
                  rel="noreferrer me"
                  aria-label={label}
                  className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Icon className="size-5" />
                  <span className="text-sm">{label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </article>
    </Container>
  );
}
