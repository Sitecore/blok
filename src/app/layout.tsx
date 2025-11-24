import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { RootProvider } from "fumadocs-ui/provider/next";
import { SidebarProvider, SidebarInset } from "@/components/docsite/docsite-sidebar";

import "@/app/globals.css";
import { Toaster } from "@/components/ui/sonner";
import {
  MobileSidebarTrigger,
  RegistrySidebar,
  REGISTRY_SIDEBAR_WIDTH,
} from "@/components/layout/registry-sidebar";
export const metadata: Metadata = {
  title: "Blok Registry (Beta)",
  description: "Blok Registry is a Shadcn Custom Registry",
  icons: [{ rel: "icon", url: "/favicon.svg", type: "image/svg+xml" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <meta
        name="robots"
        content="noindex, nofollow, noarchive, nosnippet, noimageindex"
      />
      <body className="flex grow bg-subtle-bg text-foreground font-ui">
      <SidebarProvider 
            className="flex flex-1 w-full"
            style={{ "--sidebar-width": REGISTRY_SIDEBAR_WIDTH } as React.CSSProperties}
          >
        <RootProvider>{children}</RootProvider>
        </SidebarProvider>

        <Analytics />
        <SpeedInsights />
        <Toaster />
      </body>
    </html>
  );
}
