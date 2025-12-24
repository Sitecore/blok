import StackNavigationExample from "@/app/demo/[name]/ui/stack-navigation-example";
import StackNavigationHorizontal from "@/app/demo/[name]/ui/stack-navigation-horizontal";
import StackNavigationTabs from "@/app/demo/[name]/ui/stack-navigation-tabs";

export const stackNavigation = {
  name: "stack-navigation",
  defaultComponent: <StackNavigationExample />,
  usage: [
    `import StackNavigationExample from "./stack-navigation-example";`,
    `<StackNavigationExample/>`,
  ],
  components: {
    Horizontal: <StackNavigationHorizontal />,
    "Horizontal Tabs": <StackNavigationTabs />,
  },
};
