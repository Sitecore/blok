import type React from "react";
import NavigationMenuSimple from "@/app/demo/[name]/ui/navigation-menu-simple";
import NavigationMenuSecondary from "@/app/demo/[name]/ui/navigation-menu-secondary";

export const navigationMenu = {
  name: "navigation-menu",
  defaultComponent: (
    <NavigationMenuSimple />
  ),
  usage: [
    `import {\n NavigationMenu,\n NavigationMenuContent,\n NavigationMenuItem,\n NavigationMenuLink,\n NavigationMenuList,\n NavigationMenuTrigger,\n navigationMenuTriggerStyle \n} from "@/components/ui/navigation-menu";`,
    `<NavigationMenu>\n <NavigationMenuList>\n  <NavigationMenuItem>\n   <NavigationMenuTrigger>Item One</NavigationMenuTrigger>\n   <NavigationMenuContent>\n    <NavigationMenuLink>Link</NavigationMenuLink>\n   </NavigationMenuContent>\n  </NavigationMenuItem>\n </NavigationMenuList>\n</NavigationMenu>`,
  ],
  components: {
    Secondary: (
      <NavigationMenuSecondary />
    ),
  },
};
