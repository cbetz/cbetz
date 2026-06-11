import Link from "next/link";
import { EXPERIENCE } from "@/lib/experience";

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
