import type { TocSection, RightSidebarLinks } from "@/components/layout/right-sidebar";

export interface RightSidebarMetadata {
  links?: RightSidebarLinks;
  sections?: TocSection[];
}

// Default links for component pages
export const defaultComponentLinks: RightSidebarLinks = {
    shadcn: "https://ui.shadcn.com/docs/components/",
      rules: "#",
      figma: "#",
      confluence: "#",
      v1Docs: "https://blok.sitecore.com",
};

// Default sections for component pages
export const defaultComponentSections: TocSection[] = [
  { id: "preview", title: "Preview" },
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  { id: "examples", title: "Examples" },
];

export const rightSidebarMetadata: Record<string, RightSidebarMetadata> = {
  // ===== COMPONENT-SPECIFIC METADATA =====
  accordion: {
    links: {
      shadcn: "https://ui.shadcn.com/docs/components/alert",
      rules: "#",
      figma: "#",
      confluence: "#",
      v1Docs: "https://blok.sitecore.com",
    },
    sections: [
      { id: "starting-kit", title: "Preview" },
      { id: "installation", title: "Installation" },
      { id: "usage", title: "Usage" },
      {
        id: "examples",
        title: "Examples",
        children: [
          { id: "size", title: "Size" },
          { id: "variant", title: "Variant" },
          { id: "color-scheme", title: "Color scheme" },
          { id: "state", title: "State" },
          { id: "icons", title: "Icons" },
          { id: "alternatives", title: "Alternatives" },
        ],
      },
    ],
  },
  alert: {
    links: {
      shadcn: "https://ui.shadcn.com/docs/components/alert",
      rules: "#",
      figma: "#",
      confluence: "#",
      v1Docs: "https://blok.sitecore.com",
    },
  },
  "alert-dialog": {
    links: {
      shadcn: "https://ui.shadcn.com/docs/components/alert-dialog",
      rules: "#",
      figma: "#",
      confluence: "#",
      v1Docs: "https://blok.sitecore.com",
    },
  },

  // ===== BLOK-SPECIFIC METADATA =====

  // ===== THEMING-SPECIFIC METADATA =====

  "theming-colors": {
    links: {
      documentation: "https://blok.sitecore.com/theming/colors",
      figma: "#",
    },
  },
  "theming-typography": {
    links: {
      documentation: "https://blok.sitecore.com/theming/typography",
      figma: "#",
    },
  },
  "theming-spacing": {
    links: {
      documentation: "https://blok.sitecore.com/theming/spacing",
      figma: "#",
    },
  },
  "theming-sizes": {
    links: {
      documentation: "https://blok.sitecore.com/theming/sizes",
      figma: "#",
    },
  },
  "theming-shadows": {
    links: {
      documentation: "https://blok.sitecore.com/theming/shadows",
      figma: "#",
    },
  },
  "theming-border-radius": {
    links: {
      documentation: "https://blok.sitecore.com/theming/border-radius",
      figma: "#",
    },
  },
  "theming-breakpoints": {
    links: {
      documentation: "https://blok.sitecore.com/theming/breakpoints",
      figma: "#",
    },
  },
  "theming-semantic-tokens": {
    links: {
      documentation: "https://blok.sitecore.com/theming/semantic-tokens",
      figma: "#",
    },
  },

  // ===== GRAPHICS-SPECIFIC METADATA =====
  "graphics-animations": {
    links: {
      figma: "#",
    },
  },
  "graphics-empty-states": {
    links: {
      figma: "#",
    },
  },
  "graphics-error-states": {
    links: {
      figma: "#",
    },
  },
  "graphics-icons": {
    links: {
      figma: "#",
    },
  },
  "graphics-illustrations": {
    links: {
      figma: "#",
    },
  },
  "graphics-logos": {
    links: {
      figma: "#",
    },
  },
};


export function getRightSidebarMetadata(key: string): RightSidebarMetadata {
  const metadata = rightSidebarMetadata[key];
  
  // Get the links and replace {$componentName} placeholder with the actual key
  const links = metadata?.links || defaultComponentLinks;
  const processedLinks = { ...links };
  
  // Replace {$componentName} in shadcn link if it exists
  if (processedLinks.shadcn && typeof processedLinks.shadcn === 'string') {
    processedLinks.shadcn = processedLinks.shadcn.replace('{$componentName}', key);
  }
  
  return {
    links: processedLinks,
    sections: metadata?.sections || defaultComponentSections,
  };
}

export function getShadcnUrl(componentName: string): string {
  return `https://ui.shadcn.com/docs/components/${componentName}`;
}

export type { TocSection, RightSidebarLinks };

