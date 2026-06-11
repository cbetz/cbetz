import Link from "next/link";
import Container from "@/components/container";
import { GITHUB_REPO_URL, NAV_LINKS, SOCIAL_LINKS } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-hairline py-10 md:mt-32 print:hidden">
      <Container>
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xs">
            <Link href="/about" className="u-link font-medium">
              Chris Betz
            </Link>
            <p className="mt-1 text-sm text-muted-foreground">
              Head of Engineering at Altitude. Building real-world AI for
              healthcare.
            </p>
          </div>

          <div className="flex flex-col gap-6 sm:flex-row sm:gap-16">
            <nav aria-label="Footer">
              <ul className="space-y-2 text-sm">
                {[...NAV_LINKS, { href: "/resume", label: "Resume" }].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <ul className="space-y-2 text-sm">
              {SOCIAL_LINKS.map(({ href, label }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer me"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-hairline pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Chris Betz</p>
          <p>
            <a
              href={GITHUB_REPO_URL}
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-foreground"
            >
              Source on GitHub
            </a>
            <span aria-hidden> · </span>
            Built with Next.js
          </p>
        </div>
      </Container>
    </footer>
  );
}
