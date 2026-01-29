export const dropdownMenu = {
  name: "dropdown-menu",
  preview: {
    defaultComponent: "dropdown-menu",
  },
  usage: {
    usage: [
      `import {\n  DropdownMenu,\n  DropdownMenuContent,\n  DropdownMenuItem,\n  DropdownMenuLabel,\n  DropdownMenuSeparator,\n  DropdownMenuTrigger,\n} from "@/components/ui/dropdown-menu";`,
      `<DropdownMenu>\n  <DropdownMenuTrigger>Open</DropdownMenuTrigger>\n  <DropdownMenuContent>\n    <DropdownMenuLabel>My Account</DropdownMenuLabel>\n    <DropdownMenuSeparator />\n    <DropdownMenuItem>Profile</DropdownMenuItem>\n    <DropdownMenuItem>Billing</DropdownMenuItem>\n    <DropdownMenuItem>Team</DropdownMenuItem>\n    <DropdownMenuItem>Subscription</DropdownMenuItem>\n  </DropdownMenuContent>\n</DropdownMenu>`,
    ],
  },
  components: {
    "Dropdown Menu Checkboxes": { component: "dropdown-menu-checkboxes" },
    "Dropdown Menu Radio Group Demo": {
      component: "dropdown-menu-radio-group",
    },
    "Dropdown Menu With Avatar": { component: "dropdown-menu-avatar" },
    "Dropdown Menu Avatar Only": { component: "dropdown-menu-avatar-only" },
    "Dropdown Menu Icon Color": { component: "dropdown-menu-icon-color" },
  },
};
