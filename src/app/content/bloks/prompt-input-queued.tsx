"use client"; // Please remove this if you are not using nextjs

import {
  PromptInput,
  PromptInputActions,
  PromptInputAttachButton,
  PromptInputAttachments,
  PromptInputBody,
  PromptInputFooter,
  PromptInputHeader,
  type PromptInputMessage,
  PromptInputMicButton,
  type PromptInputSelection,
  PromptInputSelections,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputToolbar,
  type PromptInputVariant,
  usePromptInputContext,
} from "@/components/bloks/prompt-input";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
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
  mdiAccountGroup,
  mdiAccountOutline,
  mdiAt,
  mdiBugOutline,
  mdiChartLine,
  mdiChevronDown,
  mdiCircleOutline,
  mdiClockOutline,
  mdiDatabaseOutline,
  mdiDotsHexagon,
  mdiFileDocumentOutline,
  mdiFileOutline,
  mdiFormatListBulleted,
  mdiGraphOutline,
  mdiHammerWrench,
  mdiLightningBolt,
  mdiMagnify,
  mdiOfficeBuilding,
  mdiPaperclip,
  mdiPlus,
  mdiRobotOutline,
  mdiShieldCheck,
  mdiSourceBranch,
  mdiStarFourPoints,
  mdiTextBoxSearch,
  mdiWeb,
} from "@mdi/js";
import { useMemo, useState } from "react";

// ---------------------------------------------------------------------------
// PromptInput "+" attach menu (demo data & layout — not part of core blok)
// ---------------------------------------------------------------------------

const promptInputAttachMenuItemClass =
  "gap-3 py-2.5 pr-2 pl-2.5 [&>svg:first-child]:size-[18px] [&>svg:first-child]:text-muted-foreground";

const promptInputAttachSubTriggerClass =
  "gap-3 py-2.5 pl-2.5 pr-1 [&>svg:first-child]:size-[18px] [&>svg:first-child]:text-muted-foreground";

type AttachMenuSubmenuChip = {
  path: string;
  className: string;
};

type AttachMenuSubmenuItem = {
  id: string;
  label: string;
  leading?: AttachMenuSubmenuChip;
  trailing?: readonly AttachMenuSubmenuChip[];
};

const ATTACH_MENU_DEMO_AGENTS: readonly AttachMenuSubmenuItem[] = [
  {
    id: "agent-1",
    label: "Research assistant",
    leading: { path: mdiRobotOutline, className: "bg-red-500" },
  },
  {
    id: "agent-2",
    label: "Code reviewer",
    leading: { path: mdiAccountOutline, className: "bg-emerald-500" },
  },
  {
    id: "agent-3",
    label: "Support triage",
    leading: { path: mdiStarFourPoints, className: "bg-violet-500" },
  },
  {
    id: "agent-4",
    label: "Documentation helper",
    leading: { path: mdiTextBoxSearch, className: "bg-sky-500" },
  },
  {
    id: "agent-5",
    label: "Analytics copilot",
    leading: { path: mdiChartLine, className: "bg-indigo-500" },
  },
  {
    id: "agent-6",
    label: "Security guard",
    leading: { path: mdiShieldCheck, className: "bg-slate-600" },
  },
];

const ATTACH_MENU_DEMO_FLOWS: readonly AttachMenuSubmenuItem[] = [
  {
    id: "flow-1",
    label: "Handoff to human",
    trailing: [
      { path: mdiSourceBranch, className: "bg-emerald-500" },
      { path: mdiFileDocumentOutline, className: "bg-violet-500" },
    ],
  },
  {
    id: "flow-2",
    label: "Daily standup summary",
    trailing: [
      { path: mdiFormatListBulleted, className: "bg-blue-500" },
      { path: mdiAccountGroup, className: "bg-red-500" },
      { path: mdiPlus, className: "bg-fuchsia-500" },
    ],
  },
  {
    id: "flow-3",
    label: "Release checklist",
    trailing: [
      { path: mdiFileOutline, className: "bg-sky-400" },
      { path: mdiWeb, className: "bg-amber-500" },
      { path: mdiAccountOutline, className: "bg-indigo-400" },
      { path: mdiLightningBolt, className: "bg-rose-500" },
    ],
  },
  {
    id: "flow-4",
    label: "Incident response",
    trailing: [
      { path: mdiBugOutline, className: "bg-orange-500" },
      { path: mdiSourceBranch, className: "bg-teal-600" },
    ],
  },
  {
    id: "flow-5",
    label: "Customer onboarding",
    trailing: [
      { path: mdiAccountGroup, className: "bg-blue-500" },
      { path: mdiFileDocumentOutline, className: "bg-violet-500" },
      { path: mdiPlus, className: "bg-pink-500" },
    ],
  },
  {
    id: "flow-6",
    label: "Invoice automation",
    trailing: [
      { path: mdiFormatListBulleted, className: "bg-emerald-600" },
      { path: mdiDatabaseOutline, className: "bg-slate-500" },
    ],
  },
];

const ATTACH_MENU_DEMO_TOOLS: readonly AttachMenuSubmenuItem[] = [
  {
    id: "tool-1",
    label: "Web search",
    trailing: [
      { path: mdiWeb, className: "bg-blue-500" },
      { path: mdiRobotOutline, className: "bg-violet-500" },
    ],
  },
  {
    id: "tool-2",
    label: "Calculator",
    trailing: [
      { path: mdiFormatListBulleted, className: "bg-emerald-500" },
      { path: mdiDatabaseOutline, className: "bg-slate-500" },
      { path: mdiPlus, className: "bg-fuchsia-500" },
    ],
  },
  {
    id: "tool-3",
    label: "SQL runner",
    trailing: [
      { path: mdiSourceBranch, className: "bg-red-500" },
      { path: mdiFileDocumentOutline, className: "bg-amber-500" },
    ],
  },
  {
    id: "tool-4",
    label: "API explorer",
    trailing: [
      { path: mdiWeb, className: "bg-cyan-600" },
      { path: mdiLightningBolt, className: "bg-yellow-500" },
      { path: mdiRobotOutline, className: "bg-purple-600" },
    ],
  },
  {
    id: "tool-5",
    label: "Image studio",
    trailing: [
      { path: mdiFileOutline, className: "bg-rose-500" },
      { path: mdiStarFourPoints, className: "bg-fuchsia-500" },
    ],
  },
  {
    id: "tool-6",
    label: "Log tailer",
    trailing: [
      { path: mdiFormatListBulleted, className: "bg-stone-500" },
      { path: mdiAccountOutline, className: "bg-blue-600" },
      { path: mdiPlus, className: "bg-green-600" },
    ],
  },
];

const ATTACH_MENU_DEMO_CONTEXT: readonly AttachMenuSubmenuItem[] = [
  {
    id: "ctx-1",
    label: "Martech company",
    leading: {
      path: mdiOfficeBuilding,
      className: "bg-gradient-to-br from-amber-400 via-red-500 to-blue-600",
    },
  },
  {
    id: "ctx-2",
    label: "Sitecore",
    leading: { path: mdiCircleOutline, className: "bg-rose-600" },
  },
  {
    id: "ctx-3",
    label: "SitecoreAI",
    leading: { path: mdiDotsHexagon, className: "bg-fuchsia-600" },
  },
];

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

function PromptInputAttachMenuPanel({
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

function promptInputDemoAttachMenu({
  openFileDialog,
}: {
  openFileDialog: () => void;
}) {
  return <PromptInputAttachMenuPanelConnected onAttachFile={openFileDialog} />;
}

const queuedPrompts = [
  "Do this thing",
  "Do the other thing",
  "Do one more thing",
  "Let's make it interesting",
  "Lorem ipsum dolor sit amet consectetur. Neque felis scelerisque proin volutpat purus vel bibendum. Integer faucibus magna at augue sollicitudin.",
];

const COLUMN_WIDTH_PX = 576;

interface QueuedPromptCardProps {
  variant: PromptInputVariant;
  placeholder: string;
  /** Optional shadow override; floating uses `shadow-lg`. */
  shellShadowClass?: string;
}

function QueuedPromptCard({
  variant,
  placeholder,
  shellShadowClass = "shadow-sm",
}: QueuedPromptCardProps) {
  const [, setLastMessage] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(true);

  const handleSubmit = (message: PromptInputMessage) => {
    setLastMessage(message.text);
    setIsProcessing(true);
  };

  return (
    <div
      className={cn(
        "flex min-w-0 max-w-full flex-col rounded-xl border bg-white",
        "dark:bg-input/30",
        shellShadowClass,
      )}
      style={{ width: `${COLUMN_WIDTH_PX}px` }}
    >
      <Collapsible className="w-full min-w-0" defaultOpen>
        <CollapsibleTrigger
          className={cn(
            "grid w-full grid-cols-[1rem_minmax(0,1fr)] items-center gap-x-3 px-4 py-3 text-left text-sm font-semibold text-foreground outline-none",
            "hover:bg-muted/40 focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-inset",
            "[&[data-state=open]>svg:first-child]:rotate-0 [&[data-state=closed]>svg:first-child]:-rotate-90",
          )}
        >
          <Icon
            path={mdiChevronDown}
            className="size-4 shrink-0 justify-self-center text-muted-foreground transition-transform duration-200"
            aria-hidden
          />
          <span className="min-w-0">{queuedPrompts.length} prompts queued</span>
        </CollapsibleTrigger>
        <CollapsibleContent className="overflow-hidden">
          <ul className="space-y-2.5 px-4 pb-3">
            {queuedPrompts.map((text) => (
              <li
                key={text}
                className="grid w-full min-w-0 grid-cols-[1rem_minmax(0,1fr)] items-center gap-x-3"
              >
                <Icon
                  path={mdiClockOutline}
                  className="size-4 shrink-0 justify-self-center text-muted-foreground"
                  aria-hidden
                />
                <span className="min-w-0 truncate text-sm text-muted-foreground">
                  {text}
                </span>
              </li>
            ))}
          </ul>
        </CollapsibleContent>
      </Collapsible>

      <PromptInput
        variant={variant}
        onSubmit={handleSubmit}
        style={{
          minWidth: 0,
          width: "calc(100% + 2px)",
          maxWidth: "calc(100% + 2px)",
          marginLeft: "-1px",
          marginRight: "-1px",
          marginBottom: "-1px",
        }}
        className={cn(
          "rounded-b-xl rounded-t-lg border bg-white shadow-none",
          "focus-within:border-border focus-within:ring-0",
          "dark:bg-input/30",
        )}
      >
        <PromptInputHeader>
          <PromptInputAttachments />
        </PromptInputHeader>
        {variant === "floating" && (
          <PromptInputToolbar inline>
            <PromptInputAttachButton attachMenu={promptInputDemoAttachMenu} />
            <PromptInputSelections />
          </PromptInputToolbar>
        )}
        <PromptInputBody>
          <PromptInputTextarea placeholder={placeholder} />
        </PromptInputBody>
        <PromptInputFooter>
          <PromptInputToolbar>
            <PromptInputAttachButton attachMenu={promptInputDemoAttachMenu} />
            <PromptInputSelections />
          </PromptInputToolbar>
          <PromptInputActions>
            <PromptInputMicButton />
            <PromptInputSubmit
              status={isProcessing ? "streaming" : "ready"}
              onClick={(e) => {
                if (isProcessing) {
                  e.preventDefault();
                  setIsProcessing(false);
                }
              }}
            />
          </PromptInputActions>
        </PromptInputFooter>
      </PromptInput>
    </div>
  );
}

export default function PromptInputQueuedDemo() {
  return (
    <div className="flex w-full flex-col gap-3 p-8">
      <div className="relative flex min-h-[420px] w-full flex-col items-center justify-end p-4">
        <QueuedPromptCard variant="default" placeholder="Message..." />
      </div>

      <div className="relative flex min-h-[420px] w-full flex-col items-center justify-end gap-4 rounded-lg bg-muted/30 p-8">
        <QueuedPromptCard
          variant="floating"
          placeholder="Edit this page…"
          shellShadowClass="shadow-lg"
        />
      </div>
    </div>
  );
}
