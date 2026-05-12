export const button = {
  name: "button",
  preview: {
    defaultComponent: "button",
  },
  usage: {
    usage: [
      `import { Button } from "@/components/ui/button"`,
      `<Button>Click me</Button>`,
    ],
  },
  components: {
    Variants: { component: "button-variants" },
    Sizing: { component: "button-sizing" },
    "Color Schemes": { component: "button-color-schemes" },
    "Icon Sizing": { component: "button-icon-sizing" },
    "Icon with Text": { component: "button-icon-text" },
    "Disabled States": { component: "button-disabled" },
    Loading: { component: "button-loading" },
  },
};
