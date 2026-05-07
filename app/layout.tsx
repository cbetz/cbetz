import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { draftMode } from "next/headers";
import Alert from "@/components/alert";
import { ThemeProvider } from "@/components/theme-provider";
import "@/styles/index.css";

const geist = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://cbetz.com"
  ),
  title: "Chris Betz",
  description: "Chris Betz's Personal Website",
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
    types: {
      "application/rss+xml": "/feed.xml",
    },
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
      <body>
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
        </ThemeProvider>
      </body>
    </html>
  );
}
