"use client"; // Please remove this if you are not using nextjs

import { promptInputDemoAttachMenu } from "@/app/content/bloks/prompt-input";
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
  PromptInputSelections,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputToolbar,
  type PromptInputVariant,
} from "@/components/bloks/prompt-input";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Icon } from "@/lib/icon";
import { cn } from "@/lib/utils";
import { mdiChevronDown, mdiClockOutline } from "@mdi/js";
import { useState } from "react";

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
