import Link from "next/link";
import { format } from "date-fns";
import type { Post } from "@/lib/types";

export default function RecentPosts({ posts }: { posts: Post[] }) {
  if (posts.length === 0) return null;
  return (
    <ul className="divide-y divide-border">
      {posts.map((post) => (
        <li key={post.slug}>
          <Link
            href={`/blog/${post.slug}`}
            className="group flex flex-col gap-1 py-5 md:flex-row md:items-baseline md:justify-between md:gap-6"
          >
            <h3 className="text-lg md:text-xl font-medium leading-snug group-hover:underline underline-offset-4">
              {post.title}
            </h3>
            <time
              dateTime={post.date}
              className="text-sm text-muted-foreground shrink-0"
            >
              {format(new Date(post.date), "MMM d, yyyy")}
            </time>
          </Link>
        </li>
      ))}
    </ul>
  );
}
