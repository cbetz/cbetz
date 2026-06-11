export type Role = {
  role: string;
  company: string;
  href?: string | null;
  period: string;
  note: string;
};

// Reverse-chronological career history (from résumé). Feeds the About page
// timeline and the printable /resume page.
export const EXPERIENCE: Role[] = [
  {
    role: "Head of Engineering",
    company: "Altitude",
    href: "https://joinaltitude.com",
    period: "2025 to Present",
    note: "Lead engineering, data, security, and AI strategy; led the pivot from rule-based engines to LLM- and agent-driven clinical pipelines.",
  },
  {
    role: "CTO",
    company: "aptihealth",
    href: "https://www.aptihealth.com",
    period: "2023 to 2025",
    note: "Owned product and technology vision; built the team, data platform, and the security and compliance foundations.",
  },
  {
    role: "Senior Director of Engineering",
    company: "Brightside Health",
    href: "https://www.brightside.com",
    period: "2022 to 2023",
    note: "Led 30+ engineers building mental-health software; drove EHR interoperability and HITRUST certification.",
  },
  {
    role: "CTO",
    company: "New Ocean Health Solutions",
    href: null,
    period: "2013 to 2022",
    note: "Built the engineering org from the ground up: B2C, B2B, and B2B2C products, FHIR APIs, and native iOS and Android apps.",
  },
  {
    role: "Senior Software Engineer",
    company: "Take Care Health (acquired by Walgreens)",
    href: null,
    period: "2006 to 2013",
    note: "Built enterprise APIs and data layers across web and early mobile; lead developer on an EMR/EHR web app.",
  },
];

export const EDUCATION = {
  school: "Lehigh University",
  href: "https://www.lehigh.edu",
  degree: "B.S. Computer Engineering",
};
