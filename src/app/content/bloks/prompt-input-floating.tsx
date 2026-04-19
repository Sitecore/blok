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
import { useState } from "react";

export default function PromptInputFloatingDemo() {
  const [lastMessage, setLastMessage] = useState<string>("");

  const handleSubmit = (message: PromptInputMessage) => {
    setLastMessage(message.text);
  };

  return (
    <div className="relative flex flex-col items-center justify-end gap-4 p-8 min-h-[400px] w-full bg-muted/30 rounded-lg">
      <div className="flex-1 flex items-center justify-center">
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
  );
}
