import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { draftMode } from "next/headers";
import Alert from "@/components/alert";
import JsonLd from "@/components/json-ld";
import { ThemeProvider } from "@/components/theme-provider";
import "@/styles/index.css";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://cbetz.com";

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Chris Betz",
  url: SITE_URL,
  description:
    "Personal site of Chris Betz — Head of Engineering at Altitude, building real-world AI systems for healthcare.",
  inLanguage: "en-US",
  author: {
    "@type": "Person",
    name: "Chris Betz",
    url: SITE_URL,
  },
};

const geist = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://cbetz.com"
  ),
  title: {
    default: "Chris Betz – Head of Engineering at Altitude",
    template: "%s | Chris Betz",
  },
  description:
    "Chris Betz is Head of Engineering at Altitude, building real-world AI systems for healthcare. Writing, portfolio, and contact.",
  authors: [{ name: "Chris Betz", url: "https://cbetz.com" }],
  creator: "Chris Betz",
  icons: {
    apple: "/favicon/apple-touch-icon.png",
    icon: [
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/favicon/favicon.ico",
    other: [
      { rel: "mask-icon", url: "/favicon/safari-pinned-tab.svg", color: "#000000" },
    ],
  },
  manifest: "/favicon/site.webmanifest",
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
  openGraph: {
    type: "website",
    siteName: "cbetz.com",
    url: "/",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@thechrisbetz",
  },
};

export const viewport: Viewport = {
  themeColor: "#000",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isEnabled: preview } = await draftMode();
  return (
    <html lang="en" className={geist.variable} suppressHydrationWarning>
      <head>
        <link rel="me" href="https://www.linkedin.com/in/christopherbetz" />
        <link rel="me" href="https://github.com/cbetz" />
        <link rel="me" href="https://twitter.com/thechrisbetz" />
        <link rel="me" href="https://www.youtube.com/c/ChrisBetz" />
      </head>
      <body>
        <JsonLd data={websiteSchema} />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen">
            <main>{children}</main>
          </div>
          <Alert preview={preview} />
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
