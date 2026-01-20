export const kbd = {
  name: "kbd",
  preview: {
    defaultComponent: "kbd",
  },
  usage: {
    usage: [
      `import { Kbd, KbdGroup } from "@/components/ui/kbd"`,
      `<KbdGroup>
  <Kbd>Ctrl</Kbd>
  <Kbd>K</Kbd>
</KbdGroup>`,
    ],
  },
  components: {
    "Group": { component: "kbd-group", },
    "Button": { component: "kbd-button", },
    "Tooltip": { component: "kbd-tooltip", },
    "Keyboard Shortcuts": { component: "kbd-shortcut", },
  },
};
