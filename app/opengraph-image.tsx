import { ImageResponse } from "next/og";

export const alt = "Chris Betz — Head of Engineering at Altitude";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
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
          cbetz.com
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <div
            style={{
              fontSize: 132,
              fontWeight: 700,
              letterSpacing: "-0.05em",
              lineHeight: 1,
            }}
          >
            Chris Betz
          </div>
          <div
            style={{
              fontSize: 44,
              color: "#525252",
              letterSpacing: "-0.02em",
            }}
          >
            Head of Engineering at Altitude
          </div>
        </div>
      </div>
    ),
    size
  );
}
