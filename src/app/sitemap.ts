import type { MetadataRoute } from "next";

import { getBlocks, getComponents } from "@/lib/registry";

const baseUrl =
  process.env.NEXT_PUBLIC_REGISTRY_URL || "https://blok.sitecore.com";

// Format date to W3C Datetime format (YYYY-MM-DD)
function formatW3CDate(date: Date): string {
  return date.toISOString().split("T")[0];
}

export default function sitemap(): MetadataRoute.Sitemap {
  // Static routes
  const staticRoutes = [
    "",
    "/primitives",
    "/bloks",
    "/graphics",
    "/graphics/icons",
    "/graphics/illustrations",
    "/graphics/logos",
    "/graphics/favicons",
    "/theming",
    "/theming/colors",
    "/theming/typography",
    "/theming/spacing",
    "/theming/shadows",
    "/theming/border-radius",
    "/theming/breakpoints",
    "/theming/sizes",
    "/theming/semantic-tokens",
    "/rtl",
    "/mcp",
    "/resources",
  ];

  // Dynamic routes for primitives
  const components = getComponents();
  const primitiveRoutes = components.map(
    (component) => `/primitives/${component.name}`,
  );

  // Dynamic routes for bloks
  const blocks = getBlocks();
  const blokRoutes = blocks.map((block) => `/bloks/${block.name}`);

  // Combine all routes
  const allRoutes = [...staticRoutes, ...primitiveRoutes, ...blokRoutes];

  const now = new Date();
  const lastModified = formatW3CDate(now);

  // Main sections that should have high priority
  const mainSections = [
    "/primitives",
    "/bloks",
    "/mcp",
    "/graphics",
    "/theming",
    "/rtl",
    "/resources",
  ];

  return allRoutes.map((route) => {
    // Determine priority
    let priority: number;
    if (route === "") {
      // Homepage - highest priority
      priority = 1.0;
    } else if (mainSections.includes(route)) {
      // Main sections - high priority
      priority = 0.9;
    } else {
      // Sub-pages (individual components, bloks, graphics sub-pages, theming sub-pages) - lower priority
      priority = 0.6;
    }

    return {
      url: `${baseUrl}${route}`,
      lastModified,
      changeFrequency: route === "" ? ("daily" as const) : ("weekly" as const),
      priority,
    };
  });
}
