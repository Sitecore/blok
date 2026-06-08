"use client";

import {
  ATTACH_MENU_DEMO_AGENTS,
  ATTACH_MENU_DEMO_CONTEXT,
  ATTACH_MENU_DEMO_FLOWS,
  ATTACH_MENU_DEMO_TOOLS,
  type AttachMenuSubmenuChip,
  type AttachMenuSubmenuItem,
} from "@/app/content/bloks/prompt-input/prompt-input-attach-menu.mock-data";
import {
  type PromptInputSelection,
  usePromptInputContext,
} from "@/components/bloks/prompt-input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SearchInput,
  SearchInputClearButton,
  SearchInputField,
  SearchInputLeftElement,
  SearchInputRightElement,
} from "@/components/ui/search-input";
import { Icon } from "@/lib/icon";
import { cn } from "@/lib/utils";
import {
  mdiAt,
  mdiGraphOutline,
  mdiHammerWrench,
  mdiMagnify,
  mdiPaperclip,
  mdiStarFourPoints,
} from "@mdi/js";
import { useMemo, useState } from "react";

const promptInputAttachMenuItemClass =
  "gap-3 py-2.5 pr-2 pl-2.5 [&>svg:first-child]:size-[18px] [&>svg:first-child]:text-muted-foreground";

const promptInputAttachSubTriggerClass =
  "gap-3 py-2.5 pl-2.5 pr-1 [&>svg:first-child]:size-[18px] [&>svg:first-child]:text-muted-foreground";

function AttachMenuChipTile({ path, className }: AttachMenuSubmenuChip) {
  return (
    <span
      className={cn(
        "flex size-7 shrink-0 items-center justify-center rounded-md text-white shadow-sm",
        className,
      )}
      aria-hidden
    >
      <Icon path={path} className="size-4 text-white" />
    </span>
  );
}

function AttachMenuTrailingIcons({
  icons,
}: {
  icons: readonly AttachMenuSubmenuChip[];
}) {
  return (
    <span className="flex shrink-0 items-center justify-end gap-1" aria-hidden>
      {icons.map((tic, i) => (
        <AttachMenuChipTile key={i} {...tic} />
      ))}
    </span>
  );
}

function AttachMenuCategorySub({
  icon,
  label,
  searchPlaceholder,
  items,
  showItemTrailingIcons = false,
  onSelectItem,
}: {
  icon: string;
  label: string;
  searchPlaceholder: string;
  items: readonly AttachMenuSubmenuItem[];
  showItemTrailingIcons?: boolean;
  onSelectItem?: (selection: PromptInputSelection) => void;
}) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [...items];
    return items.filter((entry) => entry.label.toLowerCase().includes(q));
  }, [items, query]);

  return (
    <DropdownMenuSub
      onOpenChange={(open) => {
        if (!open) setQuery("");
      }}
    >
      <DropdownMenuSubTrigger className={promptInputAttachSubTriggerClass}>
        <Icon path={icon} className="shrink-0" />
        <span className="min-w-0 flex-1 text-left font-normal">{label}</span>
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent
          className={cn(
            "min-w-0 overflow-x-hidden rounded-lg p-0",
            showItemTrailingIcons
              ? "w-[min(100vw-2rem,24rem)] max-w-[min(100vw-2rem,26rem)]"
              : "min-w-68 max-w-[min(100vw-2rem,26rem)]",
          )}
        >
          <div
            className="p-2"
            onPointerDown={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
          >
            <SearchInput className="h-8">
              <SearchInputLeftElement className="pl-2 [&>svg:not([class*='size-'])]:size-4">
                <Icon path={mdiMagnify} />
              </SearchInputLeftElement>
              <SearchInputField
                placeholder={searchPlaceholder}
                aria-label={searchPlaceholder}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="h-8 text-sm"
              />
              {query ? (
                <SearchInputRightElement className="pr-0.5">
                  <SearchInputClearButton onClear={() => setQuery("")} />
                </SearchInputRightElement>
              ) : null}
            </SearchInput>
          </div>
          <div className="max-h-[min(20rem,60vh)] w-full min-w-0 overflow-x-hidden overflow-y-auto py-1">
            {filtered.length === 0 ? (
              <div className="text-muted-foreground px-2 py-3 text-center text-xs">
                No results
              </div>
            ) : (
              filtered.map((entry) => {
                const hasTrailing =
                  showItemTrailingIcons &&
                  entry.trailing &&
                  entry.trailing.length > 0;
                const chipIcon =
                  entry.leading ??
                  (entry.trailing && entry.trailing.length > 0
                    ? entry.trailing[0]
                    : { path: icon, className: "bg-muted-foreground/40" });
                return (
                  <DropdownMenuItem
                    key={entry.id}
                    onSelect={() => {
                      onSelectItem?.({
                        id: `${label.toLowerCase()}-${entry.id}`,
                        label: entry.label,
                        iconPath: chipIcon.path,
                        iconClassName: chipIcon.className,
                      });
                    }}
                    className={cn(
                      "min-w-0 items-center py-2",
                      hasTrailing
                        ? "flex w-full min-w-0 justify-between gap-0! px-3"
                        : "flex gap-2.5 px-2",
                    )}
                  >
                    {!showItemTrailingIcons && entry.leading ? (
                      <AttachMenuChipTile {...entry.leading} />
                    ) : null}
                    <span
                      className={cn(
                        "min-w-0 truncate text-left",
                        hasTrailing ? "max-w-[62%] shrink" : "flex-1",
                      )}
                    >
                      {entry.label}
                    </span>
                    {hasTrailing && entry.trailing ? (
                      <AttachMenuTrailingIcons icons={entry.trailing} />
                    ) : null}
                  </DropdownMenuItem>
                );
              })
            )}
          </div>
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
}

export function PromptInputAttachMenuPanel({
  onAttachFile,
  onSelectItem,
}: {
  onAttachFile: () => void;
  onSelectItem?: (selection: PromptInputSelection) => void;
}) {
  return (
    <>
      <DropdownMenuItem
        className={promptInputAttachMenuItemClass}
        onSelect={() => {
          onAttachFile();
        }}
      >
        <Icon path={mdiPaperclip} className="shrink-0" />
        <span className="min-w-0 flex-1 font-normal">Attach file</span>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <AttachMenuCategorySub
        icon={mdiStarFourPoints}
        label="Agents"
        searchPlaceholder="Search agents"
        items={ATTACH_MENU_DEMO_AGENTS}
        onSelectItem={onSelectItem}
      />
      <AttachMenuCategorySub
        icon={mdiGraphOutline}
        label="Flows"
        searchPlaceholder="Search flows"
        items={ATTACH_MENU_DEMO_FLOWS}
        showItemTrailingIcons
        onSelectItem={onSelectItem}
      />
      <AttachMenuCategorySub
        icon={mdiHammerWrench}
        label="Tools"
        searchPlaceholder="Search tools"
        items={ATTACH_MENU_DEMO_TOOLS}
        showItemTrailingIcons
        onSelectItem={onSelectItem}
      />
      <AttachMenuCategorySub
        icon={mdiAt}
        label="Context"
        searchPlaceholder="Search context"
        items={ATTACH_MENU_DEMO_CONTEXT}
        onSelectItem={onSelectItem}
      />
    </>
  );
}

/**
 * Connects `PromptInputAttachMenuPanel` to the surrounding `PromptInput`
 * context so picked items become inline selection chips.
 */
function PromptInputAttachMenuPanelConnected({
  onAttachFile,
}: {
  onAttachFile: () => void;
}) {
  const { addSelection } = usePromptInputContext();
  return (
    <PromptInputAttachMenuPanel
      onAttachFile={onAttachFile}
      onSelectItem={addSelection}
    />
  );
}

/** Shared attach dropdown for prompt-input demos (default + floating). */
export function promptInputDemoAttachMenu({
  openFileDialog,
}: {
  openFileDialog: () => void;
}) {
  return <PromptInputAttachMenuPanelConnected onAttachFile={openFileDialog} />;
}

/** Isolated attach dropdown preview (e.g. docsite). */
export function PromptInputAttachMenuContentDemo() {
  return (
    <div className="flex justify-center p-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" colorScheme="neutral">
            Open attach menu
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          side="bottom"
          align="start"
          sideOffset={6}
          className="min-w-0 w-[min(100vw-2rem,13rem)] rounded-lg"
        >
          <PromptInputAttachMenuPanel onAttachFile={() => {}} />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
