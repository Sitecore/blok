export const navigationMenu = {
  name: "navigation-menu",
  defaultComponent: "navigation-menu",
  usage: [
    `import {\n NavigationMenu,\n NavigationMenuContent,\n NavigationMenuItem,\n NavigationMenuLink,\n NavigationMenuList,\n NavigationMenuTrigger,\n navigationMenuTriggerStyle \n} from "@/components/ui/navigation-menu";`,
    `<NavigationMenu>\n <NavigationMenuList>\n  <NavigationMenuItem>\n   <NavigationMenuTrigger>Item One</NavigationMenuTrigger>\n   <NavigationMenuContent>\n    <NavigationMenuLink>Link</NavigationMenuLink>\n   </NavigationMenuContent>\n  </NavigationMenuItem>\n </NavigationMenuList>\n</NavigationMenu>`,
  ],
  components: {
    Secondary: "navigation-menu-secondary",
  },
};
