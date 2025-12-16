import StackNavigationExample from "./stack-navigation-example";
import StackNavigationHorizontal from "./stack-navigation-horizontal";
import StackNavigationTabs from "./stack-navigation-tabs";

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
