export const command = {
  name: "command",
  preview: {
    defaultComponent: "command",
  },
  usage: {
    usage: [
      `import {\n  Command,\n  CommandDialog,\n  CommandEmpty,\n  CommandGroup,\n  CommandInput,\n  CommandItem,\n  CommandList,\n  CommandSeparator,\n  CommandShortcut,\n} from "@/components/ui/command"`,
      `<Command>\n  <CommandInput placeholder="Type a command or search..." />\n  <CommandList>\n    <CommandEmpty>No results found.</CommandEmpty>\n    <CommandGroup heading="Suggestions">\n      <CommandItem>Calendar</CommandItem>\n      <CommandItem>Search Emoji</CommandItem>\n      <CommandItem>Calculator</CommandItem>\n    </CommandGroup>\n    <CommandSeparator />\n    <CommandGroup heading="Settings">\n      <CommandItem>Profile</CommandItem>\n      <CommandItem>Billing</CommandItem>\n      <CommandItem>Settings</CommandItem>\n    </CommandGroup>\n  </CommandList>\n</Command>`,
    ],
  },
};
