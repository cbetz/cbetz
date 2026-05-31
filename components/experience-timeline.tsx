import Link from "next/link";

type Role = {
  role: string;
  company: string;
  href?: string | null;
  period: string;
  note: string;
};

// Reverse-chronological career history (from résumé). Feeds the About page.
const EXPERIENCE: Role[] = [
  {
    role: "Head of Engineering",
    company: "Altitude",
    href: "https://joinaltitude.com",
    period: "2025 — Present",
    note: "Lead engineering, data, security, and AI strategy; led the pivot from rule-based engines to LLM- and agent-driven clinical pipelines.",
  },
  {
    role: "CTO",
    company: "aptihealth",
    href: "https://www.aptihealth.com",
    period: "2023 — 2025",
    note: "Owned product and technology vision; built the team, data platform, and the security and compliance foundations.",
  },
  {
    role: "Senior Director of Engineering",
    company: "Brightside Health",
    href: "https://www.brightside.com",
    period: "2022 — 2023",
    note: "Led 30+ engineers building mental-health software; drove EHR interoperability and HITRUST certification.",
  },
  {
    role: "CTO",
    company: "New Ocean Health Solutions",
    href: null,
    period: "2013 — 2022",
    note: "Built the engineering org from the ground up — B2C, B2B, and B2B2C products, FHIR APIs, and native iOS and Android apps.",
  },
  {
    role: "Senior Software Engineer",
    company: "Take Care Health (acquired by Walgreens)",
    href: null,
    period: "2006 — 2013",
    note: "Built enterprise APIs and data layers across web and early mobile; lead developer on an EMR/EHR web app.",
  },
];

export default function ExperienceTimeline() {
  return (
    <ul>
      {EXPERIENCE.map((r) => (
        <li
          key={`${r.company}-${r.period}`}
          className="reveal grid grid-cols-1 gap-1 border-t border-hairline py-5 sm:grid-cols-[1fr_auto] sm:gap-6"
        >
          <div>
            <h3 className="font-medium">
              {r.role}{" "}
              <span className="text-muted-foreground">·</span>{" "}
              {r.href ? (
                <Link
                  href={r.href}
                  target="_blank"
                  rel="noreferrer"
                  className="u-link"
                >
                  {r.company}
                </Link>
              ) : (
                <span>{r.company}</span>
              )}
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
  );
}
