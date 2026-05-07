import { ImageResponse } from "next/og";
import { getPortfolioItemAndMorePortfolioItems } from "@/lib/api";

export const alt = "Chris Betz — Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Params = Promise<{ slug: string }>;

export default async function OpengraphImage({ params }: { params: Params }) {
  const { slug } = await params;
  const { post } = await getPortfolioItemAndMorePortfolioItems(slug, false);
  const title = post?.title ?? "Portfolio";
  const tags = post?.tags ?? null;

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
          cbetz.com / portfolio
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
          {tags && tags.length > 0 && (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 12,
              }}
            >
              {tags.slice(0, 5).map((tag) => (
                <div
                  key={tag}
                  style={{
                    fontSize: 24,
                    color: "#525252",
                    background: "#e5e5e5",
                    padding: "8px 16px",
                    borderRadius: 999,
                  }}
                >
                  {tag}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    ),
    size
  );
}
