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
    <section className="pb-24">
      <h2 className="text-xl font-semibold tracking-tight mb-6">{title}</h2>
      <ul className="divide-y divide-border">
        {items.map((item) => (
          <li key={item.slug}>
            <Link
              href={`${hrefPrefix}/${item.slug}`}
              className="group flex flex-col gap-1 py-4 md:flex-row md:items-baseline md:justify-between md:gap-6"
            >
              <span className="text-base md:text-lg font-medium leading-snug group-hover:underline underline-offset-4">
                {item.title}
              </span>
              <time
                dateTime={item.date}
                className="text-sm text-muted-foreground shrink-0"
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
