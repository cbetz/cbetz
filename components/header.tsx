import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center justify-between py-8 mb-12">
      <Link
        href="/"
        className="text-lg font-semibold tracking-tight hover:underline underline-offset-4"
      >
        cbetz.com
      </Link>
      <nav>
        <ul className="flex items-center gap-6 text-sm">
          <li>
            <Link
              href="/portfolio"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Portfolio
            </Link>
          </li>
          <li>
            <Link
              href="/blog"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Blog
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
