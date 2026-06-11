"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "@/components/container";
import ThemeToggle from "@/components/theme-toggle";
import { NAV_LINKS } from "@/lib/site";
import { cn } from "@/lib/utils";

export default function Header() {
  const pathname = usePathname() || "/";

  return (
    <header className="py-6 print:hidden">
      <Container>
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-base font-semibold tracking-tight transition-opacity hover:opacity-70"
          >
            cbetz.com
          </Link>
          <nav>
            <ul className="flex items-center gap-3 text-sm sm:gap-4 md:gap-6">
              {NAV_LINKS.map((link) => {
                const active =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);
                return (
                  <li
                    key={link.href}
                    className={cn(link.headerMobileHidden && "hidden sm:block")}
                  >
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "underline-offset-[6px] transition-colors",
                        active
                          ? "text-foreground underline decoration-2 decoration-brand"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
              <li className="-mr-2">
                <ThemeToggle />
              </li>
            </ul>
          </nav>
        </div>
      </Container>
    </header>
  );
}
