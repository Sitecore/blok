import { DropdownMenuSimple } from "@/app/demo/[name]/ui/dropdown-simple";
import { DropdownMenuCheckboxes } from "@/app/demo/[name]/ui/dropdown-checkbox";
import { DropdownMenuRadioGroupDemo } from "@/app/demo/[name]/ui/dropdown-radio-group";
import { DropdownMenuWithAvatar } from "@/app/demo/[name]/ui/dropdown-avatar";
import { DropdownMenuAvatarOnly } from "@/app/demo/[name]/ui/dropdown-avatar-only";
import { DropdownMenuIconColor } from "@/app/demo/[name]/ui/dropdown-icon-color";

export const dropdownMenu = {
  name: "dropdown-menu",
  defaultComponent: (
    <DropdownMenuSimple />
  ),
  usage: [
    `import {\n  DropdownMenu,\n  DropdownMenuContent,\n  DropdownMenuItem,\n  DropdownMenuLabel,\n  DropdownMenuSeparator,\n  DropdownMenuTrigger,\n} from "@/components/ui/dropdown-menu";`,
    `<DropdownMenu>\n  <DropdownMenuTrigger>Open</DropdownMenuTrigger>\n  <DropdownMenuContent>\n    <DropdownMenuLabel>My Account</DropdownMenuLabel>\n    <DropdownMenuSeparator />\n    <DropdownMenuItem>Profile</DropdownMenuItem>\n    <DropdownMenuItem>Billing</DropdownMenuItem>\n    <DropdownMenuItem>Team</DropdownMenuItem>\n    <DropdownMenuItem>Subscription</DropdownMenuItem>\n  </DropdownMenuContent>\n</DropdownMenu>`,
  ],
  components: {
    "Dropdown Menu Checkboxes": <DropdownMenuCheckboxes />,
    "Dropdown Menu Radio Group Demo": <DropdownMenuRadioGroupDemo />,
    "Dropdown Menu With Avatar": <DropdownMenuWithAvatar />,
    "Dropdown Menu Avatar Only": <DropdownMenuAvatarOnly />,
    "Dropdown Menu Icon Color": <DropdownMenuIconColor />,
  },
};
