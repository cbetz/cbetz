import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/container";
import ContactEmail from "@/components/contact-email";
import JsonLd from "@/components/json-ld";
import PrintButton from "@/components/print-button";
import { EDUCATION, EXPERIENCE } from "@/lib/experience";
import { profilePageSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Resume of Chris Betz: Head of Engineering at Altitude, twice a CTO, two decades building healthcare software across web, mobile, and applied AI.",
  alternates: { canonical: "/resume" },
};

const FOCUS_AREAS = [
  "Applied AI in healthcare",
  "Engineering leadership",
  "Full-stack product engineering",
  "Mobile apps",
  "EHR integration (Epic, athenahealth, SMART on FHIR)",
  "Security and compliance (HITRUST, HIPAA)",
];

const SELECTED_PROJECTS = [
  {
    title: "Trove",
    href: "/portfolio/trove-project",
    line: "Open-source lookup tools and Claude skills for public healthcare data (CMS cost reports, IRS 990s, FDA approvals).",
  },
  {
    title: "Last EHR",
    href: "/portfolio/last-ehr",
    line: "Low-code platform for composing a headless EHR with AI agents.",
  },
];

export default function ResumePage() {
  return (
    <Container>
      <JsonLd data={profilePageSchema("/resume")} />
      <div className="pt-4 md:pt-8">
        <header className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="eyebrow mb-2 print:hidden">Resume</p>
            <h1 className="font-serif text-3xl font-semibold tracking-tight md:text-4xl">
              Chris Betz
            </h1>
            <p className="mt-1 text-muted-foreground">
              Head of Engineering at Altitude
            </p>
            <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
              <span>Media, PA (Philadelphia area)</span>
              <ContactEmail className="u-link" />
              <a
                href="https://www.linkedin.com/in/christopherbetz"
                target="_blank"
                rel="noreferrer me"
                className="u-link"
              >
                linkedin.com/in/christopherbetz
              </a>
              <Link href="/" className="u-link">
                www.cbetz.com
              </Link>
            </p>
          </div>
          <PrintButton label="Print or save as PDF" />
        </header>

        <section className="mt-10">
          <h2 className="eyebrow mb-3">Summary</h2>
          <p className="max-w-2xl leading-relaxed">
            Engineering leader with two decades in healthcare technology, twice
            a CTO. I build teams and production systems for hard, regulated
            problems: applied AI with real evaluation and governance, EHR
            interoperability, and products across web and mobile.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="eyebrow mb-4">Experience</h2>
          <ul className="space-y-6">
            {EXPERIENCE.map((r) => (
              <li
                key={`${r.company}-${r.period}`}
                className="grid grid-cols-1 gap-1 sm:grid-cols-[1fr_auto] sm:gap-6"
              >
                <div>
                  <h3 className="font-medium">
                    {r.role} <span className="text-muted-foreground">·</span>{" "}
                    {r.company}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {r.note}
                  </p>
                </div>
                <span className="font-mono text-xs uppercase tracking-wide tabular-nums text-muted-foreground sm:pt-1 sm:text-right">
                  {r.period}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="eyebrow mb-3">Focus areas</h2>
          <ul className="flex max-w-2xl flex-wrap gap-x-2 gap-y-1.5 text-sm leading-relaxed text-muted-foreground">
            {FOCUS_AREAS.map((area, i) => (
              <li key={area}>
                {area}
                {i < FOCUS_AREAS.length - 1 && (
                  <span aria-hidden> ·</span>
                )}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="eyebrow mb-3">Selected projects</h2>
          <ul className="space-y-3">
            {SELECTED_PROJECTS.map((p) => (
              <li key={p.title} className="text-sm leading-relaxed">
                <Link href={p.href} className="u-link font-medium">
                  {p.title}
                </Link>{" "}
                <span className="text-muted-foreground">{p.line}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="eyebrow mb-3">Education</h2>
          <p className="text-sm leading-relaxed">
            {EDUCATION.degree}
            <span className="text-muted-foreground"> · </span>
            <a
              href={EDUCATION.href}
              target="_blank"
              rel="noreferrer"
              className="u-link"
            >
              {EDUCATION.school}
            </a>
          </p>
        </section>
      </div>
    </Container>
  );
}
