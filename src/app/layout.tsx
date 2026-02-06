import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import type { ReactNode } from "react";

import "@/app/globals.css";
import { DirectionProvider } from "@/components/docsite/direction-provider";
import { StructuredData } from "@/components/seo/structured-data";
import { Toaster } from "@/components/ui/sonner";

const baseUrl =
  process.env.NEXT_PUBLIC_REGISTRY_URL || "https://blok.sitecore.com";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Blok - Sitecore's Design System",
    template: "%s | Blok Design System",
  },
  description:
    "Blok is Sitecore's design system. Build better products faster with industry-leading martech application components, design tokens, and best practices.",
  keywords: [
    "design system",
    "Sitecore",
    "UI components",
    "React components",
    "Tailwind CSS",
    "shadcn/ui",
    "component library",
    "design tokens",
    "martech",
    "frontend framework",
  ],
  authors: [{ name: "Sitecore" }],
  creator: "Sitecore",
  publisher: "Sitecore",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: "Blok Design System",
    title: "Blok - Sitecore's Design System",
    description:
      "Build better products faster with Sitecore's design system. Industry-leading martech application components, design tokens, and best practices.",
    images: [
      {
        url: `${baseUrl}/preview.png`,
        width: 1200,
        height: 630,
        alt: "Blok Design System",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blok - Sitecore's Design System",
    description: "Build better products faster with Sitecore's design system.",
    images: [`${baseUrl}/preview.png`],
    creator: "@sitecore",
  },
  icons: [
    { rel: "icon", url: "/favicon.svg", type: "image/svg+xml" },
    { rel: "apple-touch-icon", url: "/favicon.svg" },
  ],
  alternates: {
    canonical: baseUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="en"
      style={{ fontFamily: "'Inter', 'Segoe UI', system-ui" }}
      className="bg-subtle-bg text-foreground"
    >
      <body className="flex grow">
        <StructuredData />
        <DirectionProvider>
          {children}
          <Analytics />
          <SpeedInsights />
          <Toaster />
        </DirectionProvider>
      </body>
    </html>
  );
}
