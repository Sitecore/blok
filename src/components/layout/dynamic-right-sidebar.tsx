"use client";

import { getRightSidebarMetadata } from "@/lib/right-sidebar-metadata";
import { usePathname } from "next/navigation";
import { RightSidebar } from "./right-sidebar";

const HIDDEN_SIDEBAR_PATHS = [
  "/",
  "/primitives",
  "/bloks",
  "/theming",
  "/graphics",
  "/resources",
  "/mcp",
  "/migration",
  "/rtl",
  "/theming/border-radius",
  "/theming/breakpoints",
  "/theming/colors",
  "/theming/semantic-tokens",
  "/theming/shadows",
  "/theming/sizes",
  "/theming/spacing",
  "/theming/typography",
  "/graphics/favicons",
  "/graphics/icons",
  "/graphics/illustrations",
  "/graphics/logos",
];

export function DynamicRightSidebar() {
  const pathname = usePathname();

  const shouldHideSidebar = HIDDEN_SIDEBAR_PATHS.some(
    (path) => pathname === path || pathname.endsWith(path),
  );

  if (shouldHideSidebar) {
    return null;
  }

  const segments = pathname.split("/").filter(Boolean);
  const pageName = segments[segments.length - 1] || "";

  const pageType =
    pathname.startsWith("/primitives/") && segments.length >= 2
      ? ("primitive" as const)
      : pathname.startsWith("/bloks/") && segments.length >= 2
        ? ("blok" as const)
        : undefined;

  const metadata = getRightSidebarMetadata(pageName);

  return (
    <RightSidebar
      sections={metadata.sections}
      links={metadata.links}
      pageName={pageName}
      pageType={pageType}
    />
  );
}
