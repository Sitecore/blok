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
          { id: "alert-primary", title: "Primary" },
          { id: "alert-success", title: "Success" },
          { id: "alert-danger", title: "Danger" },
          { id: "alert-warning", title: "Warning" },
          { id: "alert-closable", title: "Closable" },
          { id: "alert-button-link", title: "With Button Link" },
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
          { id: "avatar-fallback", title: "Fallback" },
          { id: "avatar-large", title: "Large" },
          { id: "avatar-interactive", title: "Interactive" },
          { id: "avatar-menu", title: "Menu" },
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
          { id: "badge-sizing", title: "Sizing" },
          { id: "badge-color-schemes", title: "Color Schemes" },
          { id: "badge-bold", title: "Bold Variants" },
          { id: "badge-link", title: "Links" },
          { id: "badge-closable", title: "Closable" },
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
          { id: "button-variants", title: "Variants" },
          { id: "button-sizing", title: "Sizing" },
          { id: "button-color-schemes", title: "Color Schemes" },
          { id: "button-icon-sizing", title: "Icon Sizing" },
          { id: "button-icon-text", title: "Icon with Text" },
          { id: "button-disabled", title: "Disabled States" },
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
          { id: "calendar", title: "Single" },
          { id: "calendar-multiple", title: "Two Months" },
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
          { id: "card-elevation", title: "Elevation" },
          { id: "card-style", title: "Style" },
          { id: "card-padding", title: "Padding" },
          { id: "card-styled", title: "Styled Card" },
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
          { id: "carousel-start-aligned", title: "Start Aligned" },
          { id: "carousel-negative-margin", title: "Negative Margin" },
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
          { id: "checkbox-description", title: "With Description" },
          { id: "checkbox-disabled", title: "Disabled" },
          { id: "checkbox-label", title: "Enabled Label" },
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
          { id: "combobox-framework", title: "Framework Combobox" },
          { id: "combobox-user", title: "User Combobox" },
          { id: "combobox-timezone", title: "Timezone Combobox" },
          { id: "combobox-checkbox", title: "Combobox With Checkbox" },
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
          { id: "date-picker-range", title: "Date Picker With Range" },
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
          { id: "dialog-scrollable", title: "Scrollable" },
          { id: "dialog-sticky-footer", title: "Sticky Footer" },
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
          { id: "draggable-basic", title: "Basic Drag and Drop" },
          { id: "draggable-sortable-list", title: "Sortable List" },
          { id: "draggable-custom-handle", title: "Custom Handle" },
          { id: "draggable-sortable-drop", title: "Drag, Drop & Sort" },
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
          { id: "drawer-scrollable", title: "Scrollable Drawer" },
          { id: "drawer-direction", title: "Drawer Directions" },
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
          { id: "dropdown-menu-radio-group", title: "Dropdown Menu Radio Group Demo" },
          { id: "dropdown-menu-avatar", title: "Dropdown Menu With Avatar" },
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
          { id: "empty-states-no-results", title: "No Search Results" },
          { id: "empty-states-nothing-created", title: "Nothing Created" },
          { id: "empty-states-error", title: "Error" },
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
          { id: "error-states-generic", title: "Generic" },
          { id: "error-states-400", title: "Bad Request (400)" },
          { id: "error-states-401", title: "Unauthorized (401)" },
          { id: "error-states-403", title: "Forbidden (403)" },
          { id: "error-states-404", title: "Page Not Found (404)" },
          { id: "error-states-500", title: "Internal Server Error (500)" },
          { id: "error-states-503", title: "Service Unavailable (503)" },
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
          { id: "icon-variants", title: "Variants" },
          { id: "icon-sizing", title: "Sizing" },
          { id: "icon-color-schemes", title: "Color Schemes" },
          { id: "icon-subtle", title: "Subtle Variants" },
          { id: "icon-filled", title: "Filled Variants" },
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
          { id: "input-email", title: "Email" },
          { id: "input-text", title: "Text" },
          { id: "input-password", title: "Password" },
          { id: "input-file", title: "File" },
          { id: "input-disabled", title: "Disabled" },
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
          { id: "inputOtp-pattern", title: "Pattern" },
          { id: "inputOtp-spacing", title: "With Spacing" },
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
          { id: "navigation-menu-secondary", title: "Secondary" },
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
          { id: "resizable-vertical", title: "Vertical" },
          { id: "resizable-handle", title: "Handle" },
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
          { id: "scroll-area", title: "Vertical" },
          { id: "scroll-area-horizontal", title: "Horizontal" },
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
          { id: "select-large-list", title: "Large List" },
          { id: "select-icon", title: "With Icon" },
          { id: "select-disabled", title: "Disabled" },
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
          { id: "sheet-directions", title: "Directions" },
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
          { id: "skeleton-card", title: "Card List" },
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
          { id: "sonner", title: "Default" },
          { id: "sonner-success", title: "Success" },
          { id: "sonner-warning", title: "Warning" },
          { id: "sonner-error", title: "Error" },
          { id: "sonner-action", title: "Action" },
          { id: "sonner-closable", title: "Closable" },
        ],
      },
    ],
  },
  spinner: {
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
          { id: "spinner-variants", title: "Variants" },
          { id: "spinner-text", title: "With Text Spinner" },
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
          { id: "stack-navigation-horizontal", title: "Horizontal" },
          { id: "stack-navigation-horizontal-tabs", title: "Horizontal Tabs" },
        ],
      },
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
          { id: "switch", title: "Primary" },
          { id: "switch-danger", title: "Danger" },
          { id: "switch-success", title: "Success" },
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
          { id: "table-data", title: "Data table" },
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
          { id: "tabs-line", title: "Line Variant" },
          { id: "tabs-line-icon", title: "Line Variant with Icons" },
          { id: "tabs-soft-rounded", title: "Soft Rounded Variant" },
          { id: "tabs-icons", title: "With Icons" },
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
          { id: "textarea-invalid", title: "Invalid" },
          { id: "textarea-with-label", title: "With Label" },
          { id: "textarea-with-label-and-description", title: "With Label and Description" },
          { id: "textarea-disabled", title: "Disabled" },
          { id: "textarea-small", title: "Small" },
          { id: "textarea-large", title: "Large" },
          { id: "textarea-with-default-value", title: "With Default Value" },
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
          { id: "toggle-square", title: "Square" },
          { id: "toggle-rounded", title: "Rounded" },
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
          { id: "toggle-group-square", title: "Square Variant" },
          { id: "toggle-group-rounded", title: "Rounded Variant" },
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
