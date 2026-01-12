import type { TocSection, RightSidebarLinks } from "@/components/layout/right-sidebar";

export interface RightSidebarMetadata {
  links?: RightSidebarLinks;
  sections?: TocSection[];
}

// Default links for component pages
export const defaultComponentLinks: RightSidebarLinks = {
      shadcn: "https://ui.shadcn.com/docs/components/{$componentName}",
};

// Default sections for component pages
export const defaultComponentSections: TocSection[] = [
  { id: "preview", title: "Preview" },
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
];

export const rightSidebarMetadata: Record<string, RightSidebarMetadata> = {
  // ===== COMPONENT-SPECIFIC METADATA =====
  accordion: {
    links: {
      shadcn: "https://ui.shadcn.com/docs/components/accordion",
      figma: "https://www.figma.com/design/x0CUbrC5Kjcuk64VPCnbgz/Blok-Components?m=auto&node-id=8164-5745&t=NScvPldB3fxBBWL8-1"
    },
  },
  "action-bar": {
    links: {
      figma: "https://www.figma.com/design/x0CUbrC5Kjcuk64VPCnbgz/Blok-Components?m=auto&node-id=10195-6505&t=phPvYFQwTMa2lY7e-1"
    },
    sections: [
      { id: "preview", title: "Preview" },
      { id: "installation", title: "Installation" },
      { id: "usage", title: "Usage" },
    ],
  },
  alert: {
    links: {
      shadcn: "https://ui.shadcn.com/docs/components/alert",
      figma: "https://www.figma.com/design/x0CUbrC5Kjcuk64VPCnbgz/Blok-Components?m=auto&node-id=6748-14484&t=NScvPldB3fxBBWL8-1",
    },
    sections: [
      { id: "preview", title: "Preview" },
      { id: "installation", title: "Installation" },
      { id: "usage", title: "Usage" },
      {
        id: "examples",
        title: "Examples",
        children: [
          { id: "primary", title: "Primary" },
          { id: "success", title: "Success" },
          { id: "danger", title: "Danger" },
          { id: "warning", title: "Warning" },
          { id: "closable", title: "Closable" },
          { id: "with-button-link", title: "With Button Link" },
        ],
      },
    ],
  },
  "alert-dialog": {
    links: {
      shadcn: "https://ui.shadcn.com/docs/components/alert-dialog",
      figma: "https://www.figma.com/design/x0CUbrC5Kjcuk64VPCnbgz/Blok-Components?m=auto&node-id=6748-14510&t=NScvPldB3fxBBWL8-1"
    },
  },
  "aspect-ratio": {
    links: {
      shadcn: "https://ui.shadcn.com/docs/components/aspect-ratio",
    },
  },
  avatar: {
    links: {
      shadcn: "https://ui.shadcn.com/docs/components/avatar",
      figma: "https://www.figma.com/design/x0CUbrC5Kjcuk64VPCnbgz/Blok-Components?m=auto&node-id=6748-14508&t=NScvPldB3fxBBWL8-1"
    },
    sections: [
      { id: "preview", title: "Preview" },
      { id: "installation", title: "Installation" },
      { id: "usage", title: "Usage" },
      {
        id: "examples",
        title: "Examples",
        children: [
          { id: "fallback", title: "Fallback" },
          { id: "large", title: "Large" },
          { id: "interactive", title: "Interactive" },
          { id: "avatar-menu", title: "Avatar Menu" },
        ],
      },
    ],
  },
  badge: {
    links: {
      shadcn: "https://ui.shadcn.com/docs/components/badge",
      figma: "https://www.figma.com/design/x0CUbrC5Kjcuk64VPCnbgz/Blok-Components?m=auto&node-id=6748-14477&t=NScvPldB3fxBBWL8-1"
    },
    sections: [
      { id: "preview", title: "Preview" },
      { id: "installation", title: "Installation" },
      { id: "usage", title: "Usage" },
      {
        id: "examples",
        title: "Examples",
        children: [
          { id: "sizing", title: "Sizing" },
          { id: "color-schemes", title: "Color Schemes" },
          { id: "bold-variants", title: "Bold Variants" },
          { id: "links", title: "Links" },
          { id: "bold-links", title: "Bold Links" },
          { id: "closable", title: "Closable" },
          { id: "closable-bold", title: "Closable Bold" },
          { id: "closable-sizes", title: "Closable Sizes" },
        ],
      },
    ],
  },
  breadcrumb: {
    links: {
      shadcn: "https://ui.shadcn.com/docs/components/breadcrumb",
      figma:"https://www.figma.com/design/x0CUbrC5Kjcuk64VPCnbgz/Blok-Components?m=auto&node-id=6748-14479&t=NScvPldB3fxBBWL8-1"
    },
  },
  button: {
    links: {
      shadcn: "https://ui.shadcn.com/docs/components/button",
      figma:"https://www.figma.com/design/x0CUbrC5Kjcuk64VPCnbgz/Blok-Components?m=auto&node-id=6748-14498&t=NScvPldB3fxBBWL8-1"
    },
    sections: [
      { id: "preview", title: "Preview" },
      { id: "installation", title: "Installation" },
      { id: "usage", title: "Usage" },
      {
        id: "examples",
        title: "Examples",
        children: [
          { id: "variants", title: "Variants" },
          { id: "sizing", title: "Sizing" },
          { id: "color-schemes", title: "Color Schemes" },
          { id: "icon-sizing", title: "Icon Sizing" },
          { id: "icon-with-text", title: "Icon with Text" },
          { id: "disabled-states", title: "Disabled States" },
        ],
      },
    ],
  },
  calendar: {
    links: {
      shadcn: "https://ui.shadcn.com/docs/components/calendar",
    },
    sections: [
      { id: "preview", title: "Preview" },
      { id: "installation", title: "Installation" },
      { id: "usage", title: "Usage" },
      {
        id: "examples",
        title: "Examples",
        children: [
          { id: "single", title: "Single" },
          { id: "two-months", title: "Two Months" },
        ],
      },
    ],
  },
  card: {
    links: {
      shadcn: "https://ui.shadcn.com/docs/components/card",
      figma: "https://www.figma.com/design/x0CUbrC5Kjcuk64VPCnbgz/Blok-Components?m=auto&node-id=8101-4778&t=NScvPldB3fxBBWL8-1"
    },
    sections: [
      { id: "preview", title: "Preview" },
      { id: "installation", title: "Installation" },
      { id: "usage", title: "Usage" },
      {
        id: "examples",
        title: "Examples",
        children: [
          { id: "elevation", title: "Elevation" },
          { id: "style", title: "Style" },
          { id: "padding", title: "Padding" },
          { id: "styled-card", title: "Styled Card" },
        ],
      },
    ],
  },
  carousel: {
    links: {
      shadcn: "https://ui.shadcn.com/docs/components/carousel",
    },
    sections: [
      { id: "preview", title: "Preview" },
      { id: "installation", title: "Installation" },
      { id: "usage", title: "Usage" },
      {
        id: "examples",
        title: "Examples",
        children: [
          { id: "start-aligned", title: "Start Aligned" },
          { id: "negative-margin", title: "Negative Margin" },
        ],
      },
    ],
  },
  chart: {
    links: {
      shadcn: "https://ui.shadcn.com/docs/components/chart",
    },
    sections: [
      { id: "preview", title: "Preview" },
      { id: "installation", title: "Installation" },
      {
        id: "examples",
        title: "Examples",
        children: [
          { id: "area-chart", title: "Area Chart" },
          { id: "bar-chart", title: "Bar Chart" },
          { id: "mixed-bar-chart", title: "Mixed Bar Chart" },
          { id: "line-chart", title: "Line Chart" },
          { id: "pie-chart", title: "Pie Chart" },
        ],
      },
    ],
  },
  checkbox: {
    links: {
      shadcn: "https://ui.shadcn.com/docs/components/checkbox",
      figma: "https://www.figma.com/design/x0CUbrC5Kjcuk64VPCnbgz/Blok-Components?m=auto&node-id=312-447&t=NScvPldB3fxBBWL8-1"
    },
    sections: [
      { id: "preview", title: "Preview" },
      { id: "installation", title: "Installation" },
      { id: "usage", title: "Usage" },
      {
        id: "examples",
        title: "Examples",
        children: [
          { id: "with-description", title: "With Description" },
          { id: "disabled", title: "Disabled" },
          { id: "enabled-label", title: "Enabled Label" },
        ],
      },
    ],
  },
  collapsible: {
    links: {
      shadcn: "https://ui.shadcn.com/docs/components/collapsible",
    },
  },
  combobox: {
    links: {
      shadcn: "https://ui.shadcn.com/docs/components/combobox",
    },
    sections: [
      { id: "preview", title: "Preview" },
      { id: "installation", title: "Installation" },
      { id: "usage", title: "Usage" },
      {
        id: "examples",
        title: "Examples",
        children: [
          { id: "framework-combobox", title: "Framework Combobox" },
          { id: "user-combobox", title: "User Combobox" },
          { id: "timezone-combobox", title: "Timezone Combobox" },
          { id: "combobox-with-checkbox", title: "Combobox With Checkbox" },
        ],
      },
    ],
  },
  command: {
    links: {
      shadcn: "https://ui.shadcn.com/docs/components/command",
    },
  },
  "context-menu": {
    links: {
      shadcn: "https://ui.shadcn.com/docs/components/context-menu",
    },
  },
  "date-picker": {
    links: {
      shadcn: "https://ui.shadcn.com/docs/components/date-picker",
      figma: "https://www.figma.com/design/x0CUbrC5Kjcuk64VPCnbgz/Blok-Components?m=auto&node-id=10437-6444&t=NScvPldB3fxBBWL8-1"
    },
    sections: [
      { id: "preview", title: "Preview" },
      { id: "installation", title: "Installation" },
      { id: "usage", title: "Usage" },
      {
        id: "examples",
        title: "Examples",
        children: [
          { id: "date-picker-simple", title: "Date Picker Simple" },
          { id: "date-picker-with-range", title: "Date Picker With Range" },
        ],
      },
    ],
  },
  dialog: {
    links: {
      shadcn: "https://ui.shadcn.com/docs/components/dialog",
      figma: "https://www.figma.com/design/x0CUbrC5Kjcuk64VPCnbgz/Blok-Components?m=auto&node-id=6748-14505&t=NScvPldB3fxBBWL8-1"
    },
    sections: [
      { id: "preview", title: "Preview" },
      { id: "installation", title: "Installation" },
      { id: "usage", title: "Usage" },
      {
        id: "examples",
        title: "Examples",
        children: [
          { id: "scrollable", title: "Scrollable" },
          { id: "sticky-footer", title: "Sticky Footer" },
        ],
      },
    ],
  },
  editable: {
    links: {
      chakra: "https://www.chakra-ui.com/docs/components/editable",
    },
    sections: [
      { id: "preview", title: "Preview" },
      { id: "installation", title: "Installation" },
      { id: "usage", title: "Usage" },
      {
        id: "examples",
        title: "Examples",
        children: [
          { id: "textarea", title: "Textarea" },
        ],
      },
    ],
  },
  draggable: {
    links: {
      documentation: "https://docs.dndkit.com/",
    },
    sections: [
      { id: "preview", title: "Preview" },
      { id: "installation", title: "Installation" },
      { id: "usage", title: "Usage" },
      {
        id: "examples",
        title: "Examples",
        children: [
          { id: "basic-drag-and-drop", title: "Basic Drag and Drop" },
          { id: "custom-handle", title: "Custom Handle" },
          { id: "drag,-drop-&-sort", title: "Drag, Drop & Sort" },
        ],
      },
    ],
  },
  drawer: {
    links: {
      shadcn: "https://ui.shadcn.com/docs/components/drawer",
      figma: "https://www.figma.com/design/x0CUbrC5Kjcuk64VPCnbgz/Blok-Components?m=auto&node-id=6748-14509&t=NScvPldB3fxBBWL8-1"
    },
    sections: [
      { id: "preview", title: "Preview" },
      { id: "installation", title: "Installation" },
      { id: "usage", title: "Usage" },
      {
        id: "examples",
        title: "Examples",
        children: [
          { id: "default", title: "Default" },
          { id: "scrollable-drawer", title: "Scrollable Drawer" },
          { id: "drawer-directions", title: "Drawer Directions" },
        ],
      },
    ],
  },
  "dropdown-menu": {
    links: {
      shadcn: "https://ui.shadcn.com/docs/components/dropdown-menu",
    },
    sections: [
      { id: "preview", title: "Preview" },
      { id: "installation", title: "Installation" },
      { id: "usage", title: "Usage" },
      {
        id: "examples",
        title: "Examples",
        children: [
          { id: "dropdown-menu-checkboxes", title: "Dropdown Menu Checkboxes" },
          { id: "dropdown-menu-radio-group-demo", title: "Dropdown Menu Radio Group Demo" },
          { id: "dropdown-menu-with-avatar", title: "Dropdown Menu With Avatar" },
          { id: "dropdown-menu-avatar-only", title: "Dropdown Menu Avatar Only" },
          { id: "dropdown-menu-icon-color", title: "Dropdown Menu Icon Color" },
        ],
      },
    ],
  },
  "empty-states":{
    links: {
      figma: "https://www.figma.com/design/x0CUbrC5Kjcuk64VPCnbgz/Blok-Components?m=auto&node-id=6748-14511&t=NScvPldB3fxBBWL8-1",
    },
    sections: [
      { id: "preview", title: "Preview" },
      { id: "installation", title: "Installation" },
      { id: "usage", title: "Usage" },
      {
        id: "examples",
        title: "Examples",
        children: [
          { id: "no-search-results", title: "No Search Results" },
          { id: "nothing-created", title: "Nothing Created" },
          { id: "error", title: "Error" },
        ],
      },
    ],
  },
  "error-states":{
    links: {
    },
    sections: [
      { id: "preview", title: "Preview" },
      { id: "installation", title: "Installation" },
      { id: "usage", title: "Usage" },
      {
        id: "examples",
        title: "Examples",
        children: [
          { id: "generic", title: "Generic" },
          { id: "bad-request-(400)", title: "Bad Request (400)" },
          { id: "unauthorized-(401)", title: "Unauthorized (401)" },
          { id: "forbidden-(403)", title: "Forbidden (403)" },
          { id: "page-not-found-(404)", title: "Page Not Found (404)" },
          { id: "internal-server-error-(500)", title: "Internal Server Error (500)" },
          { id: "service-unavailable-(503)", title: "Service Unavailable (503)" },
        ],
      },
    ],
  },
  "hover-card": {
    links: {
      shadcn: "https://ui.shadcn.com/docs/components/hover-card",
    },
  },
  icon: {
    links: {
    },
    sections: [
      { id: "preview", title: "Preview" },
      { id: "installation", title: "Installation" },
      { id: "usage", title: "Usage" },
      {
        id: "examples",
        title: "Examples",
        children: [
          { id: "variants", title: "Variants" },
          { id: "sizing", title: "Sizing" },
          { id: "color-schemes", title: "Color Schemes" },
          { id: "subtle-variants", title: "Subtle Variants" },
          { id: "filled-variants", title: "Filled Variants" },
          // { id: "sitecore-logos", title: "Sitecore Logos" },
        ],
      },
    ],
  },
  input: {
    links: {
      shadcn: "https://ui.shadcn.com/docs/components/input",
      figma: "https://www.figma.com/design/x0CUbrC5Kjcuk64VPCnbgz/Blok-Components?m=auto&node-id=6748-14494&t=NScvPldB3fxBBWL8-1"
    },
    sections: [
      { id: "preview", title: "Preview" },
      { id: "installation", title: "Installation" },
      { id: "usage", title: "Usage" },
      {
        id: "examples",
        title: "Examples",
        children: [
          { id: "email", title: "Email" },
          { id: "text", title: "Text" },
          { id: "password", title: "Password" },
          { id: "file", title: "File" },
          { id: "disabled", title: "Disabled" },
        ],
      },
    ],
  },
  "input-group": {
    links: {
      shadcn: "https://ui.shadcn.com/docs/components/input-group",
    },
    sections: [
      { id: "preview", title: "Preview" },
      { id: "installation", title: "Installation" },
      { id: "usage", title: "Usage" },
      {
        id: "examples",
        title: "Examples",
        children: [
          { id: "search", title: "Search" },
          { id: "url", title: "URL" },
          { id: "dropdown", title: "Dropdown" },
        ],
      },
    ],
  },
  "inputOtp": {
    links: {
      shadcn: "https://ui.shadcn.com/docs/components/input-otp",
    },
    sections: [
      { id: "preview", title: "Preview" },
      { id: "installation", title: "Installation" },
      { id: "usage", title: "Usage" },
      {
        id: "examples",
        title: "Examples",
        children: [
          { id: "pattern", title: "Pattern" },
          { id: "with-spacing", title: "With Spacing" },
        ],
      },
    ],
  },
  kbd: {
    links: {
      shadcn: "https://ui.shadcn.com/docs/components/kbd",
    },
    sections: [
      { id: "preview", title: "Preview" },
      { id: "installation", title: "Installation" },
      { id: "usage", title: "Usage" },
      {
        id: "examples",
        title: "Examples",
        children: [
          { id: "group", title: "Group" },
          { id: "button", title: "Button" },
          { id: "tooltip", title: "Tooltip" },
          { id: "keyboard-shortcuts", title: "Keyboard Shortcuts" },
        ],
      },
    ],
  },
  label: {
    links: {
      shadcn: "https://ui.shadcn.com/docs/components/label",
    },
  },
  "navigation-menu": {
    links: {
      shadcn: "https://ui.shadcn.com/docs/components/navigation-menu",
    },
    sections: [
      { id: "preview", title: "Preview" },
      { id: "installation", title: "Installation" },
      { id: "usage", title: "Usage" },
      {
        id: "examples",
        title: "Examples",
        children: [
          { id: "secondary", title: "Secondary" },
        ],
      },
    ],
  },
  pagination: {
    links: {
      shadcn: "https://ui.shadcn.com/docs/components/pagination",
      figma: "https://www.figma.com/design/x0CUbrC5Kjcuk64VPCnbgz/Blok-Components?m=auto&node-id=6748-14478&t=NScvPldB3fxBBWL8-1"
    },
  },
  popover: {
    links: {
      shadcn: "https://ui.shadcn.com/docs/components/popover",
      figma: "https://www.figma.com/design/x0CUbrC5Kjcuk64VPCnbgz/Blok-Components?m=auto&node-id=9143-6120&t=NScvPldB3fxBBWL8-1"
    },
  },
  progress: {
    links: {
      shadcn: "https://ui.shadcn.com/docs/components/progress",
      figma: "https://www.figma.com/design/x0CUbrC5Kjcuk64VPCnbgz/Blok-Components?m=auto&node-id=7069-16457&t=NScvPldB3fxBBWL8-1"
    },
  },
  "radio-group": {
    links: {
      shadcn: "https://ui.shadcn.com/docs/components/radio-group",
      figma: "https://www.figma.com/design/x0CUbrC5Kjcuk64VPCnbgz/Blok-Components?m=auto&node-id=316-158&t=NScvPldB3fxBBWL8-1"
    },
  },
  resizable: {
    links: {
      shadcn: "https://ui.shadcn.com/docs/components/resizable",
    },
    sections: [
      { id: "preview", title: "Preview" },
      { id: "installation", title: "Installation" },
      { id: "usage", title: "Usage" },
      {
        id: "examples",
        title: "Examples",
        children: [
          { id: "vertical", title: "Vertical" },
          { id: "handle", title: "Handle" },
        ],
      },
    ],
  },
  "scroll-area": {
    links: {
      shadcn: "https://ui.shadcn.com/docs/components/scroll-area",
    },
    sections: [
      { id: "preview", title: "Preview" },
      { id: "installation", title: "Installation" },
      { id: "usage", title: "Usage" },
      {
        id: "examples",
        title: "Examples",
        children: [
          { id: "vertical", title: "Vertical" },
          { id: "horizontal", title: "Horizontal" },
        ],
      },
    ],
  },
  select: {
    links: {
      shadcn: "https://ui.shadcn.com/docs/components/select",
      figma: "https://www.figma.com/design/x0CUbrC5Kjcuk64VPCnbgz/Blok-Components?m=auto&node-id=3727-14331&t=NScvPldB3fxBBWL8-1"
    },
    sections: [
      { id: "preview", title: "Preview" },
      { id: "installation", title: "Installation" },
      { id: "usage", title: "Usage" },
      {
        id: "examples",
        title: "Examples",
        children: [
          { id: "large-list", title: "Large List" },
          { id: "with-icon", title: "With Icon" },
          { id: "disabled", title: "Disabled" },
        ],
      },
    ],
  },
  separator: {
    links: {
      shadcn: "https://ui.shadcn.com/docs/components/separator",
      figma: "https://www.figma.com/design/x0CUbrC5Kjcuk64VPCnbgz/Blok-Components?m=auto&node-id=6748-14475&t=NScvPldB3fxBBWL8-1"
    },
  },
  sheet: {
    links: {
      shadcn: "https://ui.shadcn.com/docs/components/sheet",
      figma: "https://www.figma.com/design/x0CUbrC5Kjcuk64VPCnbgz/Blok-Components?m=auto&node-id=6748-14509&t=NScvPldB3fxBBWL8-1"
    },
    sections: [
      { id: "preview", title: "Preview" },
      { id: "installation", title: "Installation" },
      { id: "usage", title: "Usage" },
      {
        id: "examples",
        title: "Examples",
        children: [
          { id: "directions", title: "Directions" },
        ],
      },
    ],
  },
  sidebar: {
    links: {
      shadcn: "https://ui.shadcn.com/docs/components/sidebar",
      figma: "https://www.figma.com/design/x0CUbrC5Kjcuk64VPCnbgz/Blok-Components?m=auto&node-id=6990-12387&t=NScvPldB3fxBBWL8-1"
    },
  },
  skeleton: {
    links: {
      shadcn: "https://ui.shadcn.com/docs/components/skeleton",
      figma: "https://www.figma.com/design/x0CUbrC5Kjcuk64VPCnbgz/Blok-Components?m=auto&node-id=9145-8142&t=NScvPldB3fxBBWL8-1"
    },
    sections: [
      { id: "preview", title: "Preview" },
      { id: "installation", title: "Installation" },
      { id: "usage", title: "Usage" },
      {
        id: "examples",
        title: "Examples",
        children: [
          { id: "card-list", title: "Card List" },
        ],
      },
    ],
  },
  slider: {
    links: {
      shadcn: "https://ui.shadcn.com/docs/components/slider",
      figma: "https://www.figma.com/design/x0CUbrC5Kjcuk64VPCnbgz/Blok-Components?m=auto&node-id=3798-14446&t=NScvPldB3fxBBWL8-1"
    },
  },
  sonner: {
    links: {
      shadcn: "https://ui.shadcn.com/docs/components/sonner",
      figma: "https://www.figma.com/design/x0CUbrC5Kjcuk64VPCnbgz/Blok-Components?m=auto&node-id=7069-16459&t=NScvPldB3fxBBWL8-1"
    },
    sections: [
      { id: "preview", title: "Preview" },
      { id: "installation", title: "Installation" },
      { id: "usage", title: "Usage" },
      {
        id: "examples",
        title: "Examples",
        children: [
          { id: "default", title: "Default" },
          { id: "success", title: "Success" },
          { id: "warning", title: "Warning" },
          { id: "error", title: "Error" },
          { id: "action", title: "Action" },
          { id: "closable", title: "Closable" },
        ],
      },
    ],
  },
  "circular-progress": {
    links: {
      shadcn: "https://ui.shadcn.com/docs/components/spinner",
      figma: "https://www.figma.com/design/x0CUbrC5Kjcuk64VPCnbgz/Blok-Components?m=auto&node-id=7069-16458&t=NScvPldB3fxBBWL8-1"
    },
    sections: [
      { id: "preview", title: "Preview" },
      { id: "installation", title: "Installation" },
      { id: "usage", title: "Usage" },
      {
        id: "examples",
        title: "Examples",
        children: [
          { id: "variants", title: "Variants" },
          { id: "with-text-circular-progress", title: "With Text Circular Progress" },
        ],
      },
    ],
  },
  spinner: {
    links: {
      shadcn: "https://ui.shadcn.com/docs/components/spinner",
    },
    sections: [
      { id: "preview", title: "Preview" },
      { id: "installation", title: "Installation" },
      { id: "usage", title: "Usage" },
      {
        id: "examples",
        title: "Examples",
        children: [
          { id: "size", title: "Size" },
          { id: "button", title: "Button" },
          { id: "badge", title: "Badge" },
        ],
      },
    ],
  },
  "stack-navigation": {
    links:{
      figma: "https://www.figma.com/design/x0CUbrC5Kjcuk64VPCnbgz/Blok-Components?m=auto&node-id=10256-14999&t=NScvPldB3fxBBWL8-1"
    },
        sections: [
      { id: "preview", title: "Preview" },
      { id: "installation", title: "Installation" },
      { id: "usage", title: "Usage" },
      {
        id: "examples",
        title: "Examples",
        children: [
          { id: "horizontal", title: "Horizontal" },
          { id: "horizontal-tabs", title: "Horizontal Tabs" },
        ],
      },
    ],
  },
  stepper: {
    links: {
    
    },
    sections: [
      { id: "preview", title: "Preview" },
      { id: "installation", title: "Installation" },
      { id: "usage", title: "Usage" },
    ],
  },
  switch: {
    links: {
      shadcn: "https://ui.shadcn.com/docs/components/switch",
      figma: "https://www.figma.com/design/x0CUbrC5Kjcuk64VPCnbgz/Blok-Components?m=auto&node-id=318-158&t=NScvPldB3fxBBWL8-1"
    },
    sections: [
      { id: "preview", title: "Preview" },
      { id: "installation", title: "Installation" },
      { id: "usage", title: "Usage" },
      {
        id: "examples",
        title: "Examples",
        children: [
          { id: "primary", title: "Primary" },
          { id: "danger", title: "Danger" },
          { id: "success", title: "Success" },
        ],
      },
    ],
  },
  table: {
    links: {
      shadcn: "https://ui.shadcn.com/docs/components/table",
      figma: "https://www.figma.com/design/x0CUbrC5Kjcuk64VPCnbgz/Blok-Components?m=auto&node-id=6748-14476&t=NScvPldB3fxBBWL8-1"
    },
    sections: [
      { id: "preview", title: "Preview" },
      { id: "installation", title: "Installation" },
      { id: "usage", title: "Usage" },
      {
        id: "examples",
        title: "Examples",
        children: [
          { id: "data-table", title: "Data table" },
        ],
      },
    ],
  },
  tabs: {
    links: {
      shadcn: "https://ui.shadcn.com/docs/components/tabs",
      figma: "https://www.figma.com/design/x0CUbrC5Kjcuk64VPCnbgz/Blok-Components?m=auto&node-id=6748-14482&t=NScvPldB3fxBBWL8-1"
    },
    sections: [
      { id: "preview", title: "Preview" },
      { id: "installation", title: "Installation" },
      { id: "usage", title: "Usage" }, 
      {
        id: "examples",
        title: "Examples",
        children: [
          { id: "line-variant", title: "Line Variant" },
          { id: "line-variant-with-icons", title: "Line Variant with Icons" },
          { id: "soft-rounded-variant", title: "Soft Rounded Variant" },
          { id: "with-icons", title: "With Icons" },
        ],
      },
    ],
  },
  textarea: {
    links: {
      shadcn: "https://ui.shadcn.com/docs/components/textarea",
      figma: "https://www.figma.com/design/x0CUbrC5Kjcuk64VPCnbgz/Blok-Components?m=auto&node-id=3968-15028&t=NScvPldB3fxBBWL8-1"
    },
    sections: [
      { id: "preview", title: "Preview" },
      { id: "installation", title: "Installation" },
      { id: "usage", title: "Usage" },
      {
        id: "examples",
        title: "Examples",
        children: [
          { id: "invalid", title: "Invalid" },
          { id: "with-label", title: "With Label" },
          { id: "with-label-and-description", title: "With Label and Description" },
          { id: "disabled", title: "Disabled" },
          { id: "small", title: "Small" },
          { id: "large", title: "Large" },
          { id: "with-default-value", title: "With Default Value" },
        ],
      },
    ],
  },
  "time-picker": {
    links: {
    },
  },
  toggle: {
    links: {
      shadcn: "https://ui.shadcn.com/docs/components/toggle",
      figma: "https://www.figma.com/design/x0CUbrC5Kjcuk64VPCnbgz/Blok-Components?m=auto&node-id=7069-16468&t=NScvPldB3fxBBWL8-1"
    },
    sections: [
      { id: "preview", title: "Preview" },
      { id: "installation", title: "Installation" },
      { id: "usage", title: "Usage" },
      {
        id: "examples",
        title: "Examples",
        children: [
          { id: "square", title: "Square" },
          { id: "rounded", title: "Rounded" },
        ],
      },
    ],
  },
  "toggle-group": {
    links: {
      shadcn: "https://ui.shadcn.com/docs/components/toggle-group",
    },
    sections: [
      { id: "preview", title: "Preview" },
      { id: "installation", title: "Installation" },
      { id: "usage", title: "Usage" },
      {
        id: "examples",
        title: "Examples",
        children: [
          { id: "square-variant", title: "Square Variant" },
          { id: "rounded-variant", title: "Rounded Variant" },
        ],
      },
    ],
  },
  tooltip: {
    links: {
      shadcn: "https://ui.shadcn.com/docs/components/tooltip",
      figma: "https://www.figma.com/design/x0CUbrC5Kjcuk64VPCnbgz/Blok-Components?m=auto&node-id=7069-16463&t=NScvPldB3fxBBWL8-1"
    },
  },
  topbar: {
    links: {
      figma: "https://www.figma.com/design/x0CUbrC5Kjcuk64VPCnbgz/Blok-Components?m=auto&node-id=6748-14480&t=NScvPldB3fxBBWL8-1"
    },
  },
  timeline: {
    links: {
    },
    sections: [
      { id: "preview", title: "Preview" },
      { id: "installation", title: "Installation" },
      { id: "usage", title: "Usage" },
      {
        id: "examples",
        title: "Examples",
        children: [
          { id: "variants", title: "Variants" },
          { id: "sizes", title: "Sizes" },
          { id: "connector-variants", title: "Connector Variants" },
        ],
      },
    ],
  },

  // ===== BLOK-SPECIFIC METADATA =====
  "all-site": {
     links: {

    },
  },
  "pinned-site": {
    links: {

    },
  },
    "site-card": {
    links: {
      
    },
  },
  // ===== THEMING-SPECIFIC METADATA =====

  // "theming-colors": {
  //   links: {
  //     documentation: "https://blok.sitecore.com/theming/colors",
  //     figma: "#",
  //   },
  // },

  // ===== GRAPHICS-SPECIFIC METADATA =====
  // "graphics-animations": {
  //   links: {
  //     figma: "#",
  //   },
  // },

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
