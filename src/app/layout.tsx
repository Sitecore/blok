import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import type { ReactNode } from "react";

import "@/app/globals.css";
import { Toaster } from "@/components/ui/sonner";
import { DirectionProvider } from "@/components/docsite/direction-provider";

export const metadata: Metadata = {
  title: "Blok",
  description: "Blok is Sitecore's design system. It is used for creating industry leading martech applications.",
  icons: [{ rel: "icon", url: "/favicon.svg", type: "image/svg+xml" }],
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
      <meta
        name="robots"
        content="noindex, nofollow, noarchive, nosnippet, noimageindex"
      />
      <body className="flex grow">
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
