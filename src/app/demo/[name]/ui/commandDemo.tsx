"use client";

import React from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import {
  mdiCalendarBlankOutline,
  mdiEmoticonHappyOutline,
  mdiAccountOutline,
  mdiCalculatorVariantOutline,
  mdiCreditCardOutline,
  mdiCogOutline,
} from "@mdi/js";
import { Icon } from "@/lib/icon";

const CommandDemo = () => {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <div>
      <div className="flex rounded-t-md bg-white">
        <>
          <p className="text-muted-foreground text-sm">
            Press{" "}
            <kbd className="bg-muted text-muted-foreground pointer-events-none inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none">
              <span className="text-xs">⌘</span>J
            </kbd>
          </p>
          <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Suggestions">
                <CommandItem>
                  <Icon path={mdiCalendarBlankOutline} />
                  <span>Calendar</span>
                </CommandItem>
                <CommandItem>
                  <Icon path={mdiEmoticonHappyOutline} />
                  <span>Search Emoji</span>
                </CommandItem>
                <CommandItem>
                  <Icon path={mdiCalculatorVariantOutline} />
                  <span>Calculator</span>
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Settings">
                <CommandItem>
                  <Icon path={mdiAccountOutline} />
                  <span>Profile</span>
                  <CommandShortcut>⌘P</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <Icon path={mdiCreditCardOutline} />
                  <span>Billing</span>
                  <CommandShortcut>⌘B</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <Icon path={mdiCogOutline} />

                  <span>Settings</span>
                  <CommandShortcut>⌘S</CommandShortcut>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </CommandDialog>
        </>
      </div>
    </div>
  );
};

export default CommandDemo;
