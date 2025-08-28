import {
  DropdownMenuAvatarOnly,
  DropdownMenuCheckboxes,
  DropdownMenuIconColor,
  DropdownMenuRadioGroupDemo,
  DropdownMenuSimple,
  DropdownMenuWithAvatar,
} from "./dropdownMenu-options";

export const dropdownMenu = {
  name: "dropdown-menu",
  components: {
    Default: <DropdownMenuSimple />,
    DropdownMenuCheckboxes: <DropdownMenuCheckboxes />,
    DropdownMenuRadioGroupDemo: <DropdownMenuRadioGroupDemo />,
    DropdownMenuWithAvatar: <DropdownMenuWithAvatar />,
    DropdownMenuAvatarOnly: <DropdownMenuAvatarOnly />,
    DropdownMenuIconColor: <DropdownMenuIconColor />,
  },
};
