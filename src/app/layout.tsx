import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import type { ReactNode } from "react";

import "@/app/globals.css";
import { DirectionProvider } from "@/components/docsite/direction-provider";
import { StructuredData } from "@/components/seo/structured-data";
import { Toaster } from "@/components/ui/sonner";

const baseUrl = (() => {
  const url =
    process.env.NEXT_PUBLIC_REGISTRY_URL || "https://blok.sitecore.com";
  // If URL doesn't start with http:// or https://, add https://
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    return `https://${url}`;
  }
  return url;
})();

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

const gainsightPxTag = process.env.NEXT_PUBLIC_GAINSIGHT_PX_TAG?.trim() || "";

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
      <head>
        {gainsightPxTag ? (
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `(function(n,t,a,e,co){var i="aptrinsic";n[i]=n[i]||function(){(n[i].q=n[i].q||[]).push(arguments)};n[i].p=e;n[i].c=co;var r=t.createElement("script");r.async=!0;r.src=a+"?a="+e;var c=t.getElementsByTagName("script")[0];c.parentNode.insertBefore(r,c);})(window,document,"https://web-sdk-eu.aptrinsic.com/api/aptrinsic.js","${gainsightPxTag.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}");`,
            }}
          />
        ) : null}
      </head>
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
