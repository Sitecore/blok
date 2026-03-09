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
} from "@/components/ui/input-group";`,
      `<InputGroup>
  <InputGroupInput placeholder="Enter text..." />
  <InputGroupAddon>
    <InputGroupButton>Action</InputGroupButton>
  </InputGroupAddon>
</InputGroup>`,
    ],
  },
  components: {
    URL: { component: "input-group-url" },
    Dropdown: { component: "input-group-dropdown" },
  },
};
