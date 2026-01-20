export const contextMenu = {
  name: "context-menu",
  preview: {
    defaultComponent: "context-menu",
  },
  usage: {
    usage: [
      `import {\n  ContextMenu,\n  ContextMenuContent,\n  ContextMenuItem,\n  ContextMenuLabel,\n  ContextMenuRadioGroup,\n  ContextMenuRadioItem,\n  ContextMenuSeparator,\n  ContextMenuShortcut,\n  ContextMenuSub,\n  ContextMenuSubContent,\n  ContextMenuSubTrigger,\n  ContextMenuTrigger,\n} from "@/components/ui/context-menu";`,
      `<ContextMenu>\n <ContextMenuTrigger>Right click</ContextMenuTrigger>\n <ContextMenuContent>\n  <ContextMenuItem>Profile</ContextMenuItem>\n  <ContextMenuItem>Billing</ContextMenuItem>\n  <ContextMenuItem>Team</ContextMenuItem>\n  <ContextMenuItem>Subscription</ContextMenuItem>\n </ContextMenuContent>\n</ContextMenu>`,
    ],
  },
};
