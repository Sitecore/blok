"use client";

import {
  Attachment,
  AttachmentInfo,
  AttachmentPreview,
  AttachmentRemove,
  Attachments,
} from "@/components/ai-elements/attachments";
import {
  PromptInput,
  PromptInputActionAddAttachments,
  PromptInputActionAddScreenshot,
  PromptInputActionMenu,
  PromptInputActionMenuContent,
  PromptInputActionMenuTrigger,
  PromptInputBody,
  PromptInputButton,
  PromptInputFooter,
  PromptInputHeader,
  type PromptInputMessage,
  PromptInputSelect,
  PromptInputSelectContent,
  PromptInputSelectItem,
  PromptInputSelectTrigger,
  PromptInputSelectValue,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
  usePromptInputAttachments,
} from "@/components/ai-elements/prompt-input";
import type { QueueTodo } from "@/components/ai-elements/queue";
import {
  Queue,
  QueueItem,
  QueueItemAction,
  QueueItemActions,
  QueueItemContent,
  QueueItemDescription,
  QueueItemIndicator,
  QueueSectionLabel,
} from "@/components/ai-elements/queue";
import {
  SpeechInput,
  type SpeechInputHandle,
  type SpeechInputVoiceUiPhase,
} from "@/components/ai-elements/speech-input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  SearchInput,
  SearchInputClearButton,
  SearchInputField,
  SearchInputLeftElement,
  SearchInputRightElement,
} from "@/components/ui/search-input";
import { Spinner } from "@/components/ui/spinner";
import { Icon } from "@/lib/icon";
import { cn } from "@/lib/utils";
import {
  mdiAccountGroup,
  mdiAccountOutline,
  mdiAt,
  mdiBugOutline,
  mdiChartLine,
  mdiCircleOutline,
  mdiClose,
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
  mdiPlus,
  mdiRobotOutline,
  mdiShieldCheck,
  mdiSourceBranch,
  mdiSquare,
  mdiStarFourPoints,
  mdiTextBoxSearch,
  mdiWeb,
} from "@mdi/js";
import { memo, useCallback, useMemo, useRef, useState } from "react";
import {
  PROMPT_INPUT_DEMO_MODELS,
  handlePromptInputAudioRecorded,
  usePromptInputVercelChat,
} from "./prompt-input-vercel-demo-shared";

// ---------------------------------------------------------------------------
// PromptInputSelection — a non-file picked item (agent / flow / tool / context)
// shown as an inline chip and sent in the API body alongside text + files.
// ---------------------------------------------------------------------------

type PromptInputSelection = {
  id: string;
  label: string;
  iconPath?: string;
  iconClassName?: string;
};

// ---------------------------------------------------------------------------
// Attach menu (dropdown) demo data, types, and helpers — duplicated from the
// floating prompt input so the "+" menu has the same Agents / Flows / Tools /
// Context submenus.
// ---------------------------------------------------------------------------

const promptInputAttachSubTriggerClass =
  "gap-3 py-2.5 pl-2.5 pr-1 [&>svg:first-child]:size-[14px] [&>svg:first-child]:text-muted-foreground";

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
        "flex size-6 shrink-0 items-center justify-center rounded-md text-white shadow-sm",
        className,
      )}
      aria-hidden
    >
      <Icon path={path} className="size-3 text-white" />
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
        <span className="min-w-0 flex-1 text-left">{label}</span>
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
              <SearchInputLeftElement className="pl-2 [&>svg:not([class*='size-'])]:size-3">
                <Icon className="size-3 shrink-0" path={mdiMagnify} />
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
              <div className="px-2 py-3 text-center text-xs text-muted-foreground">
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

// Fixed-width chip so toolbar controls don't shift around as chips appear.
const SELECTION_CHIP_WIDTH_PX = 140;
const SELECTION_OVERFLOW_CHIP_WIDTH_PX = 36;
const SELECTION_MAX_VISIBLE = 2;

function SelectionChip({
  selection,
  onRemove,
}: {
  selection: PromptInputSelection;
  onRemove: () => void;
}) {
  return (
    <Badge
      colorScheme="neutral"
      size="lg"
      className="min-h-7 shrink-0 justify-start gap-1.5 py-1 pl-1 pr-1 text-sm"
      style={{
        width: SELECTION_CHIP_WIDTH_PX,
        minWidth: SELECTION_CHIP_WIDTH_PX,
      }}
    >
      {selection.iconPath ? (
        <span
          className={cn(
            "flex size-4 shrink-0 items-center justify-center rounded text-white",
            selection.iconClassName ?? "bg-muted-foreground/40",
          )}
          aria-hidden
        >
          <Icon path={selection.iconPath} className="size-2.5 text-white" />
        </span>
      ) : null}
      <span className="min-w-0 flex-1 truncate text-left">
        {selection.label}
      </span>
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove ${selection.label}`}
        className={cn(
          "flex size-3.5 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors",
          "hover:bg-foreground/10 hover:text-foreground",
          "focus:outline-none focus-visible:ring-1 focus-visible:ring-ring",
        )}
      >
        <Icon path={mdiClose} className="size-2.5" />
      </button>
    </Badge>
  );
}

function SelectionList({
  selections,
  onRemove,
}: {
  selections: PromptInputSelection[];
  onRemove: (id: string) => void;
}) {
  if (selections.length === 0) return null;

  const visible = selections.slice(0, SELECTION_MAX_VISIBLE);
  const overflowCount = selections.length - SELECTION_MAX_VISIBLE;

  return (
    <div
      aria-label="Selected agents, flows, tools and context"
      className="flex min-w-0 flex-nowrap items-center gap-1.5"
    >
      {visible.map((s) => (
        <SelectionChip
          key={s.id}
          selection={s}
          onRemove={() => onRemove(s.id)}
        />
      ))}
      {overflowCount > 0 ? (
        <Popover>
          <PopoverTrigger asChild>
            <button
              type="button"
              aria-label={`Show ${overflowCount} more ${
                overflowCount === 1 ? "selection" : "selections"
              }`}
              className="shrink-0 cursor-pointer"
            >
              <Badge
                colorScheme="neutral"
                size="lg"
                className="min-h-7 shrink-0 justify-center"
                style={{
                  width: SELECTION_OVERFLOW_CHIP_WIDTH_PX,
                  minWidth: SELECTION_OVERFLOW_CHIP_WIDTH_PX,
                }}
              >
                +{overflowCount}
              </Badge>
            </button>
          </PopoverTrigger>
          <PopoverContent
            align="start"
            side="top"
            className="max-h-60 w-72 overflow-y-auto p-2"
          >
            <p className="px-1 pb-2 text-xs text-muted-foreground">
              All selections ({selections.length})
            </p>
            <div className="flex flex-col gap-1">
              {selections.map((s) => (
                <div
                  key={s.id}
                  className="flex items-center gap-2 rounded-md px-1.5 py-1 text-xs hover:bg-muted/50"
                >
                  {s.iconPath ? (
                    <span
                      className={cn(
                        "flex size-5 shrink-0 items-center justify-center rounded text-white",
                        s.iconClassName ?? "bg-muted-foreground/40",
                      )}
                      aria-hidden
                    >
                      <Icon path={s.iconPath} className="size-3 text-white" />
                    </span>
                  ) : null}
                  <span className="min-w-0 flex-1 truncate">{s.label}</span>
                  <button
                    type="button"
                    onClick={() => onRemove(s.id)}
                    aria-label={`Remove ${s.label}`}
                    className="shrink-0 rounded-full p-0.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <Icon path={mdiClose} className="size-2.5" />
                  </button>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      ) : null}
    </div>
  );
}

interface TodoItemProps {
  todo: QueueTodo;
  onRemove: (id: string) => void;
}

const TodoItem = memo(({ todo, onRemove }: TodoItemProps) => {
  const isCompleted = todo.status === "completed";
  const handleRemove = useCallback(
    () => onRemove(todo.id),
    [onRemove, todo.id],
  );

  return (
    <QueueItem className="flex-row items-center gap-2">
      <QueueItemIndicator className="mt-0 shrink-0" completed={isCompleted} />
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <QueueItemContent completed={isCompleted}>
          {todo.title}
        </QueueItemContent>
        {todo.description ? (
          <QueueItemDescription className="ml-0" completed={isCompleted}>
            {todo.description}
          </QueueItemDescription>
        ) : null}
      </div>
      <QueueItemActions className="shrink-0">
        <QueueItemAction
          aria-label="Remove todo"
          className="h-5 w-5 min-h-5 p-px text-muted-foreground/60 hover:bg-muted/50 hover:text-muted-foreground"
          onClick={handleRemove}
        >
          <Icon className="size-2 shrink-0" path={mdiClose} />
        </QueueItemAction>
      </QueueItemActions>
    </QueueItem>
  );
});

TodoItem.displayName = "TodoItem";

const sampleTodos: QueueTodo[] = [
  {
    description: "Complete the README and API docs",
    id: "todo-1",
    status: "completed",
    title: "Write project documentation",
  },
  {
    id: "todo-2",
    status: "pending",
    title: "Implement authentication",
  },
  {
    description: "Resolve crash on settings page",
    id: "todo-3",
    status: "pending",
    title: "Fix bug #42",
  },
  {
    description: "Unify queue and todo state management",
    id: "todo-4",
    status: "pending",
    title: "Refactor queue logic",
  },
  {
    description: "Increase test coverage for hooks",
    id: "todo-5",
    status: "pending",
    title: "Add unit tests",
  },
];

/** Vertical overlap between queue and prompt (px). Same value works open + collapsed. */
const QUEUE_OVERLAP_PX = 20;

const PromptInputAttachmentsDisplay = () => {
  const attachments = usePromptInputAttachments();

  if (attachments.files.length === 0) {
    return null;
  }

  return (
    <Attachments variant="inline">
      {attachments.files.map((attachment) => (
        <Attachment
          data={attachment}
          key={attachment.id}
          onRemove={() => attachments.remove(attachment.id)}
        >
          <AttachmentPreview />
          <AttachmentInfo />
          <AttachmentRemove />
        </Attachment>
      ))}
    </Attachments>
  );
};

const models = PROMPT_INPUT_DEMO_MODELS;

export default function PromptInputQueuedVercelDemo() {
  const [text, setText] = useState<string>("");
  const [model, setModel] = useState<string>(models[0].id);
  const [useWebSearch, setUseWebSearch] = useState<boolean>(false);
  const [selections, setSelections] = useState<PromptInputSelection[]>([]);
  const [todos, setTodos] = useState<QueueTodo[]>(sampleTodos);
  const [queueOpen, setQueueOpen] = useState(true);
  const [voiceUiPhase, setVoiceUiPhase] =
    useState<SpeechInputVoiceUiPhase>("idle");
  const formRef = useRef<HTMLFormElement>(null);
  const speechRef = useRef<SpeechInputHandle>(null);
  const { submitPrompt, status } = usePromptInputVercelChat();

  const handleRemoveTodo = useCallback((id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }, []);

  const addSelection = (selection: PromptInputSelection) => {
    setSelections((prev) =>
      prev.some((s) => s.id === selection.id) ? prev : [...prev, selection],
    );
  };

  const removeSelection = (id: string) => {
    setSelections((prev) => prev.filter((s) => s.id !== id));
  };

  const handleTranscriptionChange = useCallback((spoken: string) => {
    setText((prev) => {
      const trimmed = spoken.trim();
      if (!trimmed) return prev;
      return prev ? `${prev} ${trimmed}` : trimmed;
    });
  }, []);

  const handleSubmit = (message: PromptInputMessage) => {
    if (
      !submitPrompt(message, {
        model,
        useWebSearch,
        selections,
      })
    ) {
      return;
    }

    const queuedTitle = (message.text ?? "").trim() || "Sent with attachments";
    setTodos((prev) => [
      ...prev,
      {
        id: `queued-${crypto.randomUUID()}`,
        status: "pending" as const,
        title: queuedTitle.slice(0, 120),
      },
    ]);
    setText("");
  };

  const handleVoiceStopClick = useCallback(() => {
    void speechRef.current?.stop();
  }, []);

  return (
    <div
      className="mx-auto flex h-[min(32rem,75vh)] w-full min-w-0 flex-col"
      style={{ width: "48rem", maxWidth: "100%" }}
    >
      <div className="min-h-0 flex-1" aria-hidden />
      <div className="relative isolate flex shrink-0 flex-col">
        {todos.length > 0 ? (
          <Queue
            className={cn(
              "relative z-0 overflow-hidden rounded-t-xl rounded-b-none border-b-0 p-0 shadow-none",
            )}
            style={{
              width: "calc(100% + 2px)",
              maxWidth: "calc(100% + 2px)",
              marginLeft: -1,
              marginRight: -1,
            }}
          >
            <Collapsible
              className="flex min-w-0 flex-col gap-2"
              onOpenChange={setQueueOpen}
              open={queueOpen}
            >
              <CollapsibleTrigger asChild>
                <button
                  className={cn(
                    "group flex w-full items-center justify-between rounded-md bg-muted/40 px-3 py-2 text-left text-xs font-semibold text-foreground transition-colors hover:bg-muted [&_svg]:text-muted-foreground",
                  )}
                  type="button"
                >
                  <QueueSectionLabel
                    count={todos.length}
                    label={
                      todos.length === 1
                        ? "prompt in queue"
                        : "prompts in queue"
                    }
                  />
                </button>
              </CollapsibleTrigger>
              <div
                className={cn(
                  "grid min-h-0 overflow-hidden transition-[grid-template-rows] duration-200 ease-out motion-reduce:transition-none",
                  queueOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                )}
              >
                <div className="min-h-0 flex flex-col gap-0">
                  <ScrollArea className="h-[min(11rem,32vh)] w-full">
                    <ul className="list-none space-y-0 px-3 pb-8 pt-0.5 scroll-pb-10">
                      {todos.map((todo) => (
                        <TodoItem
                          key={todo.id}
                          onRemove={handleRemoveTodo}
                          todo={todo}
                        />
                      ))}
                    </ul>
                  </ScrollArea>
                  <div
                    aria-hidden
                    className="shrink-0"
                    style={{ height: QUEUE_OVERLAP_PX }}
                  />
                </div>
              </div>
            </Collapsible>
          </Queue>
        ) : null}
        <PromptInput
          ref={formRef}
          onSubmit={handleSubmit}
          style={
            todos.length > 0
              ? {
                  marginTop: -QUEUE_OVERLAP_PX,
                  width: "calc(100% + 2px)",
                  maxWidth: "calc(100% + 2px)",
                  marginLeft: -1,
                  marginRight: -1,
                }
              : undefined
          }
          className={cn(
            "w-full **:data-[slot=input-group]:bg-white! **:data-[slot=input-group]:dark:bg-background! **:data-[slot=input-group]:shadow-lg!",
            todos.length > 0 &&
              "relative z-10 **:data-[slot=input-group]:rounded-2xl",
          )}
          globalDrop
          multiple
        >
          <PromptInputHeader>
            <PromptInputAttachmentsDisplay />
          </PromptInputHeader>
          <PromptInputBody>
            <PromptInputTextarea
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => {
                if (
                  voiceUiPhase !== "idle" &&
                  e.key === "Enter" &&
                  !e.shiftKey
                ) {
                  e.preventDefault();
                }
              }}
              value={text}
            />
          </PromptInputBody>
          <PromptInputFooter>
            <PromptInputTools>
              <PromptInputActionMenu>
                <PromptInputActionMenuTrigger />
                <PromptInputActionMenuContent>
                  <PromptInputActionAddAttachments />
                  <PromptInputActionAddScreenshot />
                  <DropdownMenuSeparator />
                  <AttachMenuCategorySub
                    icon={mdiStarFourPoints}
                    label="Agents"
                    searchPlaceholder="Search agents"
                    items={ATTACH_MENU_DEMO_AGENTS}
                    onSelectItem={addSelection}
                  />
                  <AttachMenuCategorySub
                    icon={mdiGraphOutline}
                    label="Flows"
                    searchPlaceholder="Search flows"
                    items={ATTACH_MENU_DEMO_FLOWS}
                    showItemTrailingIcons
                    onSelectItem={addSelection}
                  />
                  <AttachMenuCategorySub
                    icon={mdiHammerWrench}
                    label="Tools"
                    searchPlaceholder="Search tools"
                    items={ATTACH_MENU_DEMO_TOOLS}
                    showItemTrailingIcons
                    onSelectItem={addSelection}
                  />
                  <AttachMenuCategorySub
                    icon={mdiAt}
                    label="Context"
                    searchPlaceholder="Search context"
                    items={ATTACH_MENU_DEMO_CONTEXT}
                    onSelectItem={addSelection}
                  />
                </PromptInputActionMenuContent>
              </PromptInputActionMenu>
              <PromptInputButton
                onClick={() => setUseWebSearch(!useWebSearch)}
                tooltip={{ content: "Search the web", shortcut: "⌘K" }}
                variant={useWebSearch ? "default" : "ghost"}
              >
                <Icon
                  className="size-3 shrink-0 text-current"
                  path={mdiWeb}
                  title="Web search"
                />
                <span>Search</span>
              </PromptInputButton>
              <PromptInputSelect
                onValueChange={(value) => {
                  setModel(value);
                }}
                value={model}
              >
                <PromptInputSelectTrigger>
                  <PromptInputSelectValue />
                </PromptInputSelectTrigger>
                <PromptInputSelectContent>
                  {models.map((model) => (
                    <PromptInputSelectItem key={model.id} value={model.id}>
                      {model.name}
                    </PromptInputSelectItem>
                  ))}
                </PromptInputSelectContent>
              </PromptInputSelect>
              <SelectionList
                selections={selections}
                onRemove={removeSelection}
              />
            </PromptInputTools>
            <div className="flex shrink-0 items-center gap-2">
              <SpeechInput
                ref={speechRef}
                integration="prompt"
                onAudioRecorded={handlePromptInputAudioRecorded}
                onTranscriptionChange={handleTranscriptionChange}
                onVoiceSessionComplete={() => {
                  formRef.current?.requestSubmit();
                }}
                onVoiceUiPhaseChange={setVoiceUiPhase}
              />
              {voiceUiPhase === "listening" ? (
                <Button
                  aria-label="Stop recording"
                  className="shrink-0"
                  data-slot="prompt-input-submit"
                  onClick={handleVoiceStopClick}
                  size="icon-sm"
                  type="button"
                  variant="default"
                >
                  <Icon className="h-4! w-4! shrink-0" path={mdiSquare} />
                </Button>
              ) : voiceUiPhase === "processing" ? (
                <Button
                  aria-label="Transcribing"
                  className="shrink-0"
                  data-slot="prompt-input-submit"
                  disabled
                  size="icon-sm"
                  type="button"
                  variant="default"
                >
                  <Spinner className="text-current" />
                </Button>
              ) : (
                <PromptInputSubmit
                  disabled={!text && !status}
                  status={status}
                />
              )}
            </div>
          </PromptInputFooter>
        </PromptInput>
      </div>
    </div>
  );
}
