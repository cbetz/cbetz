import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/container";
import ContactEmail from "@/components/contact-email";
import ExperienceTimeline from "@/components/experience-timeline";
import JsonLd from "@/components/json-ld";
import { profilePageSchema } from "@/lib/schema";
import { ALTITUDE_URL, PROFILE_IMAGE_URL, SOCIAL_LINKS } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Chris Betz, Head of Engineering at Altitude. Two decades building healthcare software, twice a CTO. Based in the Philadelphia area.",
  alternates: { canonical: "/about" },
};

const QA = [
  {
    q: "Who is Chris Betz?",
    a: "Chris Betz (also known as Christopher Betz) is a software engineer and engineering leader with two decades in healthcare technology, currently Head of Engineering at Altitude.",
  },
  {
    q: "What does Chris Betz do?",
    a: "He leads engineering, data, security, and applied-AI strategy at Altitude, whose clinical intelligence platform helps primary care clinicians manage chronic conditions. Before Altitude he was CTO of aptihealth and of New Ocean Health.",
  },
  {
    q: "Where is Chris Betz based?",
    a: "The Philadelphia area (Media, Pennsylvania), working remotely.",
  },
  {
    q: "Where did Chris Betz study?",
    a: "Lehigh University, where he earned a B.S. in Computer Engineering.",
  },
];

export default function AboutPage() {
  return (
    <Container>
      <JsonLd data={profilePageSchema("/about")} />
      <div className="pt-4 md:pt-8">
        <div className="flex items-center gap-5">
          <Image
            src={PROFILE_IMAGE_URL}
            alt="Chris Betz"
            width={120}
            height={120}
            priority
            className="size-20 shrink-0 rounded-full object-cover ring-1 ring-hairline md:size-24"
          />
          <div>
            <p className="eyebrow mb-1">About</p>
            <h1 className="font-serif text-3xl font-semibold tracking-tight md:text-4xl">
              Chris Betz
            </h1>
            <p className="mt-1 text-muted-foreground">
              Head of Engineering at{" "}
              <Link
                href={ALTITUDE_URL}
                target="_blank"
                rel="noreferrer"
                className="u-link text-foreground"
              >
                Altitude
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-10 space-y-5 text-base leading-relaxed md:text-lg">
          <p>
            I&apos;m Chris Betz. I lead engineering at{" "}
            <Link
              href={ALTITUDE_URL}
              target="_blank"
              rel="noreferrer"
              className="u-link"
            >
              Altitude
            </Link>
            , where we build clinical intelligence software for chronic
            condition management: AI that helps primary care teams manage
            conditions like hypertension, diabetes, and heart failure, and
            extends their reach between visits.
          </p>
          <p>
            I&apos;ve spent two decades building healthcare software. I started
            as an engineer at Take Care Health (acquired by Walgreens), spent
            nine years as CTO of New Ocean Health building an engineering org
            and product suite from scratch, led engineering at Brightside
            Health, and was CTO of aptihealth before joining Altitude. The
            thread runs straight through: hard, regulated problems where the
            software has to actually work.
          </p>
          <p>
            I care about small teams that own their outcomes, and I treat AI as
            a tool aimed at real problems, not a demo. In healthcare,
            correctness and trust matter more than almost anywhere else, so I
            put as much energy into evaluation, security, and governance as into
            shipping.
          </p>
          <p>
            I&apos;m based just outside Philadelphia and studied Computer
            Engineering at{" "}
            <Link
              href="https://www.lehigh.edu"
              target="_blank"
              rel="noreferrer"
              className="u-link"
            >
              Lehigh University
            </Link>
            . A long-running interest in gluten-free living explains a good
            chunk of my side projects.
          </p>
        </div>

        <section className="mt-14">
          <p className="eyebrow mb-5">Experience</p>
          <ExperienceTimeline />
        </section>

        <section className="mt-14">
          <p className="eyebrow mb-5">In brief</p>
          <dl className="space-y-5">
            {QA.map(({ q, a }) => (
              <div key={q}>
                <dt className="font-medium">{q}</dt>
                <dd className="mt-1 leading-relaxed text-muted-foreground">
                  {a}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mt-14">
          <p className="eyebrow mb-4">Elsewhere</p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-3">
            {SOCIAL_LINKS.map(({ href, label, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer me"
                  className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Icon className="size-5" aria-hidden />
                  <span className="text-sm">{label}</span>
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-muted-foreground">
            Prefer email?{" "}
            <ContactEmail className="u-link text-foreground" />
            <span aria-hidden> · </span>
            Need a resume?{" "}
            <Link href="/resume" className="u-link text-foreground">
              Printable version
            </Link>
          </p>
        </section>
      </div>
    </Container>
  );
}
