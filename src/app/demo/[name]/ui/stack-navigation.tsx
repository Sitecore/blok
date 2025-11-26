import StackNavigationExample from "./stack-navigation-example";
import StackNavigationHorizontal from "./stack-navigation-horizontal";

export const stackNavigation = {
  name: "stack-navigation",
  defaultComponent: (
    <StackNavigationExample/>
  ),
  usage: [
    `import StackNavigationExample from "./stack-navigation-example";`,
    `<StackNavigationExample/>`,
  ],
  components: {
    Horizontal: (
      <StackNavigationHorizontal/>
    )
  },

};
