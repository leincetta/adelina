import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(circle at 30% 20%, #5c2a4a 0%, #0b0a09 45%), #0b0a09",
          color: "#f3ede2",
          fontFamily: "Helvetica, Arial, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 132,
            fontWeight: 700,
            letterSpacing: -2,
            textTransform: "uppercase",
            display: "flex",
          }}
        >
          Adelina
        </div>
        <div
          style={{
            marginTop: 20,
            fontSize: 30,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: "#cfc6b6",
            display: "flex",
          }}
        >
          Small-batch gelato — Brooklyn
        </div>
      </div>
    ),
    { ...size }
  );
}
