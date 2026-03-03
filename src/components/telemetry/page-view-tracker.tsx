"use client";

import { TELEMETRY_EVENTS, track } from "@/lib/telemetry";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

function getSectionFromPath(pathname: string): string | undefined {
  if (!pathname || pathname === "/") return "home";
  if (pathname.startsWith("/primitives")) return "primitives";
  if (pathname.startsWith("/bloks")) return "bloks";
  if (pathname.startsWith("/theming")) return "theming";
  if (pathname.startsWith("/graphics")) return "graphics";
  if (pathname.startsWith("/resources")) return "resources";
  if (pathname.startsWith("/mcp")) return "mcp";
  if (pathname.startsWith("/rtl")) return "rtl";
  if (pathname.startsWith("/migration")) return "migration";
  return undefined;
}

function getComponentOrBlockName(pathname: string): string | undefined {
  const match = pathname.match(/^\/(primitives|bloks)\/([^/]+)/);
  return match ? match[2] : undefined;
}

/**
 * Fires page_view when the route changes (registry layout only).
 */
export function PageViewTracker() {
  const pathname = usePathname();
  const initialRef = useRef(true);

  useEffect(() => {
    if (!pathname) return;

    const section = getSectionFromPath(pathname);
    const componentName = getComponentOrBlockName(pathname);

    track(TELEMETRY_EVENTS.page_view, {
      path: pathname,
      pathname,
      ...(section && { section }),
      ...(componentName && { component_name: componentName }),
    });

    initialRef.current = false;
  }, [pathname]);

  return null;
}
