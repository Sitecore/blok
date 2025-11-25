"use client";

import { usePathname } from "next/navigation";
import { RightSidebar } from "./right-sidebar";
import { getRightSidebarMetadata } from "@/lib/right-sidebar-metadata";

const HIDDEN_SIDEBAR_PATHS = ["/","/primitives", "/bloks", "/theming", "/graphics", "/resources","/mcp"];

export function DynamicRightSidebar() {
  const pathname = usePathname();

  const shouldHideSidebar = HIDDEN_SIDEBAR_PATHS.some(path => 
    pathname === path || pathname.endsWith(path)
  );

  if (shouldHideSidebar) {
    return null;
  }

  const segments = pathname.split("/").filter(Boolean);
  const pageName = segments[segments.length - 1] || "";

  const metadata = getRightSidebarMetadata(pageName);

  return (
    <RightSidebar
      sections={metadata.sections}
      links={metadata.links}
    />
  );
}

