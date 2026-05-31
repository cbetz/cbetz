import type { Metadata } from "next";
import Container from "@/components/container";
import ContactEmail from "@/components/contact-email";

export const metadata: Metadata = {
  title: "Now",
  description:
    "What Chris Betz is focused on right now: building production AI for healthcare at Altitude.",
  alternates: { canonical: "/now" },
};

const LAST_UPDATED = "May 2026";

const SECTIONS = [
  {
    heading: "Building",
    body: "Leading engineering at Altitude, building production AI for healthcare. Right now that means LLM- and agent-driven clinical pipelines, the evaluation and governance that make them trustworthy, and EHR integrations (Epic, Athenahealth, SMART on FHIR).",
  },
  {
    heading: "Thinking about",
    body: "How to make AI dependable enough for regulated, high-stakes settings: the evaluation, guardrails, and team practices that keep clinical AI honest, not just impressive in a demo.",
  },
  {
    heading: "Tinkering on",
    body: "Trove: open-source lookup tools and Claude skills for underused public healthcare data (CMS cost reports, IRS 990s, FDA approvals).",
  },
];

export default function NowPage() {
  return (
    <Container>
      <header className="pt-4 md:pt-8">
        <p className="eyebrow mb-2">Now</p>
        <h1 className="font-serif text-3xl font-semibold tracking-tight md:text-4xl">
          What I&apos;m doing now
        </h1>
        <p className="mt-2 text-sm tabular-nums text-muted-foreground">
          Last updated {LAST_UPDATED}
        </p>
      </header>

      <div className="mt-10 space-y-8">
        {SECTIONS.map(({ heading, body }) => (
          <section key={heading}>
            <h2 className="text-lg font-semibold tracking-tight">{heading}</h2>
            <p className="mt-2 leading-relaxed text-muted-foreground">{body}</p>
          </section>
        ))}

        <section>
          <h2 className="text-lg font-semibold tracking-tight">Open to</h2>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            Hiring great engineers, collaborating on hard healthcare problems,
            and the occasional advising conversation. Reach me at{" "}
            <ContactEmail className="u-link text-foreground" /> or on{" "}
            <a
              href="https://www.linkedin.com/in/christopherbetz"
              target="_blank"
              rel="noreferrer me"
              className="u-link"
            >
              LinkedIn
            </a>
            .
          </p>
        </section>
      </div>

      <p className="mt-12 text-sm text-muted-foreground">
        This is a{" "}
        <a
          href="https://nownownow.com/about"
          target="_blank"
          rel="noreferrer"
          className="u-link"
        >
          /now page
        </a>
        .
      </p>
    </Container>
  );
}
