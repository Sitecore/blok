export const stackNavigation = {
  name: "stack-navigation",
  preview: {
    defaultComponent: "stack-navigation",
  },
  usage: {
    usage: [
      `import { StackNavigation } from "@/components/ui/stack-navigation";`,
      `<StackNavigation items={items} />`,
    ],
  },
  components: {
    Horizontal: { component: "stack-navigation-horizontal" },
    "Horizontal Tabs": { component: "stack-navigation-horizontal-tabs" },
    "Color Schemes": { component: "stack-navigation-color-schemes" },
  },
};
