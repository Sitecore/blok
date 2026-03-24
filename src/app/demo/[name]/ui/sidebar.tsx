export const sidebar = {
  name: "sidebar",
  preview: {
    defaultComponent: "sidebar",
  },
  usage: {
    usage: [
      `import {\n  Sidebar,\n  SidebarContent,\n  SidebarHeader,\n  SidebarMenu,\n  SidebarMenuItem,\n  SidebarMenuButton,\n  SidebarProvider,\n} from "@/components/ui/sidebar";`,
      `<Sidebar>\n <SidebarHeader />\n <SidebarContent>\n  <SidebarGroup />\n  <SidebarGroup />\n </SidebarContent>\n <SidebarFooter />\n</Sidebar>`,
    ],
  },
  components: {
    "Default": { component: "sidebar-default" },
    "With Leading Icon": { component: "sidebar-leading-icon" },
    "With Trailing Icon": { component: "sidebar-trailing-icon" },
    "With Icon Combination": { component: "sidebar-icon-combination" },
  },
};
