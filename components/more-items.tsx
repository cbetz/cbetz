import Link from "next/link";
import { format } from "date-fns";

type Item = {
  slug: string;
  title: string;
  date: string;
};

type Props = {
  title: string;
  items: Item[];
  hrefPrefix: string;
};

export default function MoreItems({ title, items, hrefPrefix }: Props) {
  if (items.length === 0) return null;
  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold tracking-tight">{title}</h2>
      <ul className="divide-y divide-hairline">
        {items.map((item) => (
          <li key={item.slug}>
            <Link
              href={`${hrefPrefix}/${item.slug}`}
              className="group -mx-3 flex flex-col gap-1 rounded-md px-3 py-4 transition-colors hover:bg-wash sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
            >
              <span className="font-medium leading-snug group-hover:text-foreground">
                {item.title}
              </span>
              <time
                dateTime={item.date}
                className="shrink-0 font-mono text-xs uppercase tracking-wide tabular-nums text-muted-foreground"
              >
                {format(new Date(item.date), "MMM d, yyyy")}
              </time>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
