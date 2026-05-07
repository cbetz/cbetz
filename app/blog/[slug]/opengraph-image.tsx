import { ImageResponse } from "next/og";
import { format } from "date-fns";
import { getPostAndMorePosts } from "@/lib/api";

export const alt = "Chris Betz — Writing";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Params = Promise<{ slug: string }>;

export default async function OpengraphImage({ params }: { params: Params }) {
  const { slug } = await params;
  const { post } = await getPostAndMorePosts(slug, false);
  const title = post?.title ?? "Writing";
  const date = post?.date;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#fafafa",
          color: "#0a0a0a",
        }}
      >
        <div
          style={{
            fontSize: 28,
            color: "#737373",
            letterSpacing: "-0.01em",
          }}
        >
          cbetz.com / writing
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <div
            style={{
              fontSize: 80,
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
              display: "-webkit-box",
              WebkitLineClamp: 4,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {title}
          </div>
          {date && (
            <div
              style={{
                fontSize: 32,
                color: "#737373",
                letterSpacing: "-0.01em",
              }}
            >
              {format(new Date(date), "MMMM d, yyyy")}
            </div>
          )}
        </div>
      </div>
    ),
    size
  );
}
