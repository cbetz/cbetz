import Link from "next/link";
import { ArrowRight } from "lucide-react";

export type RelatedLink = {
  href: string;
  title: string;
  description?: string;
};

/**
 * Small contextual link block used to connect a post to the project it covers
 * and back again. Deliberately not the same component as MoreItems: those are
 * date-ordered siblings, these are hand-picked and cross-section.
 */
export default function RelatedLinks({
  title,
  links,
}: {
  title: string;
  links: RelatedLink[];
}) {
  if (links.length === 0) return null;

  return (
    <aside className="mt-12 rounded-lg border border-hairline bg-wash/50 p-6">
      <h2 className="eyebrow mb-4">{title}</h2>
      <ul className="space-y-4">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="group block">
              <span className="inline-flex items-center gap-1.5 font-medium leading-snug">
                {link.title}
                <ArrowRight
                  className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5"
                  strokeWidth={1.75}
                  aria-hidden
                />
              </span>
              {link.description && (
                <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                  {link.description}
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
