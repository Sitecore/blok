import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

export const contextMenu = {
  name: "context-menu",
  defaultComponent: (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
        Right click here
      </ContextMenuTrigger>
      <ContextMenuContent className="w-52">
        <ContextMenuItem inset>
          Back
          <ContextMenuShortcut>⌘[</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem inset>
          Forward
          <ContextMenuShortcut>⌘]</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem disabled inset>
          Reload
          <ContextMenuShortcut>⌘R</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger inset>More Tools</ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-44">
            <ContextMenuItem inset>Save Page...</ContextMenuItem>
            <ContextMenuItem inset>Create Shortcut...</ContextMenuItem>
            <ContextMenuItem inset>Name Window...</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem inset>Developer Tools</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem variant="destructive">Delete</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuCheckboxItem checked>
          Show Bookmarks
        </ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem>Show Full URLs</ContextMenuCheckboxItem>
        <ContextMenuSeparator />
        <ContextMenuRadioGroup value="people">
          <ContextMenuLabel inset>People</ContextMenuLabel>
          <ContextMenuRadioItem value="thomas">
            Sarantis Fakaris
          </ContextMenuRadioItem>
          <ContextMenuRadioItem value="chris">Gent Gashi</ContextMenuRadioItem>
        </ContextMenuRadioGroup>
      </ContextMenuContent>
    </ContextMenu>
  ),
  usage: [
    `import {\n  ContextMenu,\n  ContextMenuContent,\n  ContextMenuItem,\n  ContextMenuLabel,\n  ContextMenuRadioGroup,\n  ContextMenuRadioItem,\n  ContextMenuSeparator,\n  ContextMenuShortcut,\n  ContextMenuSub,\n  ContextMenuSubContent,\n  ContextMenuSubTrigger,\n  ContextMenuTrigger,\n} from "@/components/ui/context-menu";`,
    `<ContextMenu>\n <ContextMenuTrigger>Right click</ContextMenuTrigger>\n <ContextMenuContent>\n  <ContextMenuItem>Profile</ContextMenuItem>\n  <ContextMenuItem>Billing</ContextMenuItem>\n  <ContextMenuItem>Team</ContextMenuItem>\n  <ContextMenuItem>Subscription</ContextMenuItem>\n </ContextMenuContent>\n</ContextMenu>`,
  ],
};
