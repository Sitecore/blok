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
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputToolbar,
} from "@/components/bloks/prompt-input";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Icon } from "@/lib/icon";
import { cn } from "@/lib/utils";
import { mdiChevronDown } from "@mdi/js";
import { useState } from "react";

const COLUMN_WIDTH_PX = 576;

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  text: string;
};

const initialMessages: ChatMessage[] = [
  {
    id: "1",
    role: "user",
    text: "Edit this image to be more warm in tone",
  },
  {
    id: "2",
    role: "assistant",
    text: "Sure thing!\nI will now edit this image to be more warm in tone!",
  },
  {
    id: "3",
    role: "user",
    text: "Can you replace the font with something Serif?",
  },
  {
    id: "4",
    role: "assistant",
    text: "Of course! I will now replace the font with the Serif font \u2018Georgia\u2019.",
  },
];

function FloatingChatCard() {
  const [, setLastMessage] = useState<string>("");

  const handleSubmit = (message: PromptInputMessage) => {
    setLastMessage(message.text);
  };

  return (
    <div
      className={cn(
        "flex min-w-0 max-w-full flex-col rounded-xl border bg-white shadow-lg",
        "dark:bg-input/30",
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
          <span className="min-w-0">Chat</span>
        </CollapsibleTrigger>
        <CollapsibleContent className="overflow-hidden">
          <ul className="flex flex-col gap-3 px-4 pb-4">
            {initialMessages.map((message) => (
              <li
                key={message.id}
                className={cn(
                  "flex min-w-0",
                  message.role === "user" ? "justify-end" : "justify-start",
                )}
              >
                {message.role === "user" ? (
                  <div className="max-w-[80%] whitespace-pre-line rounded-md bg-muted px-3 py-2 text-sm text-foreground">
                    {message.text}
                  </div>
                ) : (
                  <p className="max-w-[90%] whitespace-pre-line text-sm text-foreground">
                    {message.text}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </CollapsibleContent>
      </Collapsible>

      <PromptInput
        variant="floating"
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
        <PromptInputToolbar inline>
          <PromptInputAttachButton attachMenu={promptInputDemoAttachMenu} />
        </PromptInputToolbar>
        <PromptInputBody>
          <PromptInputTextarea placeholder="/ for tools, @ for context references" />
        </PromptInputBody>
        <PromptInputFooter>
          <PromptInputToolbar>
            <PromptInputAttachButton attachMenu={promptInputDemoAttachMenu} />
          </PromptInputToolbar>
          <PromptInputActions>
            <PromptInputMicButton />
            <PromptInputSubmit />
          </PromptInputActions>
        </PromptInputFooter>
      </PromptInput>
    </div>
  );
}

export default function PromptInputFloatingDemo() {
  const [lastMessage, setLastMessage] = useState<string>("");

  const handleSubmit = (message: PromptInputMessage) => {
    setLastMessage(message.text);
  };

  return (
    <div className="flex w-full flex-col gap-3 p-8">
      <div className="relative flex min-h-[400px] w-full flex-col items-center justify-end gap-4 rounded-lg bg-muted/30 p-8">
        <div className="flex flex-1 items-center justify-center">
          <p className="text-sm text-muted-foreground">
            {lastMessage
              ? `You said: "${lastMessage}"`
              : "Canvas / page content area"}
          </p>
        </div>
        <PromptInput
          variant="floating"
          onSubmit={handleSubmit}
          className="w-full max-w-xl"
        >
          <PromptInputHeader>
            <PromptInputAttachments />
          </PromptInputHeader>
          {/* Visible only when single-line (inline layout) */}
          <PromptInputToolbar inline>
            <PromptInputAttachButton attachMenu={promptInputDemoAttachMenu} />
          </PromptInputToolbar>
          <PromptInputBody>
            <PromptInputTextarea placeholder="Edit this page…" />
          </PromptInputBody>
          <PromptInputFooter>
            {/* Visible only when multiline (column layout) */}
            <PromptInputToolbar>
              <PromptInputAttachButton attachMenu={promptInputDemoAttachMenu} />
            </PromptInputToolbar>
            <PromptInputActions>
              <PromptInputMicButton />
              <PromptInputSubmit />
            </PromptInputActions>
          </PromptInputFooter>
        </PromptInput>
      </div>

      <div className="relative flex min-h-[480px] w-full flex-col items-center justify-end gap-4 rounded-lg bg-muted/30 p-8">
        <FloatingChatCard />
      </div>
    </div>
  );
}
