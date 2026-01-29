export const toggleGroup = {
  name: "toggle-group",
  preview: {
    defaultComponent: "toggle-group-square",
  },
  usage: {
    usage: [
      `import {\n ToggleGroup,\n ToggleGroupItem\n} from "@/components/ui/toggle-group";`,
      `<ToggleGroup>\n <ToggleGroupItem>\n  <Icon path={mdiFormatBold} />\n </ToggleGroupItem>\n</ToggleGroup>`,
    ],
  },
  components: {
    "Square Variant": { component: "toggle-group-square" },
    "Rounded Variant": { component: "toggle-group-rounded" },
  },
};
