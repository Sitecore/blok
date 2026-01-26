export const inputGroup = {
  name: "input-group",
  preview: {
    defaultComponent: "input-group",
  },
  usage: {
    usage: [
      `import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Icon } from "@/lib/icon";
import { mdiMagnify } from "@mdi/js";`,
      `<InputGroup>
  <InputGroupInput placeholder="Search..." />
  <InputGroupAddon>
    <Icon path={mdiMagnify} size={1} />
  </InputGroupAddon>
  <InputGroupAddon align="inline-end">
    <InputGroupButton>Search</InputGroupButton>
  </InputGroupAddon>
</InputGroup>`,
    ],
  },
  components: {
    Search: { component: "input-group-search" },
    URL: { component: "input-group-url" },
    Dropdown: { component: "input-group-dropdown" },
  },
};
