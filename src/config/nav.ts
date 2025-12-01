// navigation items for the site
export const navItems = [
  { name: "Primitives", href: "/primitives" },
  { name: "Bloks", href: "/bloks" },
  { name: "Theming", href: "/theming" },
  { name: "Graphics", href: "/graphics" },
  { name: "Resources", href: "/resources" },
];

// Theming items for sidebar
export const themingItems = [
  { title: "Border radius", path: "/theming/border-radius" },
  { title: "Breakpoints", path: "/theming/breakpoints" },
  { title: "Colors", path: "/theming/colors" },
  { title: "Semantic tokens", path: "/theming/semantic-tokens" },
  { title: "Shadows", path: "/theming/shadows" },
  { title: "Sizes", path: "/theming/sizes" },
  { title: "Spacing", path: "/theming/spacing" },
  { title: "Typography", path: "/theming/typography" },
];

// Graphics items for sidebar
export const graphicsItems = [
  { title: "Favicons", path: "/graphics/favicons" },
  { title: "Icons", path: "/graphics/icons" },
  { title: "Illustrations", path: "/graphics/illustrations" },
  { title: "Logos", path: "/graphics/logos" },
];

// Searchable items
export const searchableItems = [
  // Theming items
  ...themingItems.map(item => ({
    title: item.title,
    href: item.path,
    type: 'theming' as const,
    description: `Theming: ${item.title}`
  })),
  // Graphics items
  ...graphicsItems.map(item => ({
    title: item.title,
    href: item.path,
    type: 'graphics' as const,
    description: `Graphics: ${item.title}`
  })),
  // MCP Server
  {
    title: "MCP Server",
    href: "/mcp",
    type: 'page' as const,
    description: "Blok MCP Server configuration and setup"
  },
];
