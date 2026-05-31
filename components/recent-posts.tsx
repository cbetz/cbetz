import Link from "next/link";
import { format } from "date-fns";
import type { Post } from "@/lib/types";

export default function RecentPosts({
  posts,
  showExcerpt = false,
}: {
  posts: Post[];
  showExcerpt?: boolean;
}) {
  if (posts.length === 0) return null;
  return (
    <ul className="divide-y divide-hairline">
      {posts.map((post) => (
        <li key={post.slug} className="reveal">
          <Link
            href={`/blog/${post.slug}`}
            className="group -mx-3 flex flex-col gap-1 rounded-md px-3 py-4 transition-colors hover:bg-wash sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
          >
            <div className="min-w-0">
              <span className="font-medium leading-snug">{post.title}</span>
              {showExcerpt && post.excerpt && (
                <span className="mt-0.5 block text-sm text-muted-foreground">
                  {post.excerpt}
                </span>
              )}
            </div>
            <time
              dateTime={post.date}
              className="shrink-0 font-mono text-xs uppercase tracking-wide tabular-nums text-muted-foreground"
            >
              {format(new Date(post.date), "MMM d, yyyy")}
            </time>
          </Link>
        </li>
      ))}
    </ul>
  );
}
