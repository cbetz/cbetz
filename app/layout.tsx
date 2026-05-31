import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, STIX_Two_Text } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { draftMode } from "next/headers";
import Alert from "@/components/alert";
import Header from "@/components/header";
import Footer from "@/components/footer";
import JsonLd from "@/components/json-ld";
import { ThemeProvider } from "@/components/theme-provider";
import { siteGraph } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";
import "@/styles/index.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

// Serif used only for the name + page/case-study titles (editorial contrast).
const stixSerif = STIX_Two_Text({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Chris Betz, Head of Engineering at Altitude",
    template: "%s | Chris Betz",
  },
  description:
    "Chris Betz is Head of Engineering at Altitude, building real-world AI systems for healthcare. Two decades shipping software across web, mobile, and applied AI.",
  authors: [{ name: "Chris Betz", url: SITE_URL }],
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
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isEnabled: preview } = await draftMode();
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${stixSerif.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="me" href="https://www.linkedin.com/in/christopherbetz" />
        <link rel="me" href="https://github.com/cbetz" />
        <link rel="me" href="https://twitter.com/thechrisbetz" />
        <link rel="me" href="https://www.youtube.com/c/ChrisBetz" />
      </head>
      <body>
        <JsonLd data={siteGraph} />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Alert preview={preview} />
          <div className="flex min-h-dvh flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
