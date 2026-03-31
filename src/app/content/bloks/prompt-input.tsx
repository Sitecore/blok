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
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputToolbar,
} from "@/components/bloks/prompt-input";
import { useState } from "react";

export default function PromptInputDemo() {
  const [lastMessage, setLastMessage] = useState<string>("");

  const handleSubmit = (message: PromptInputMessage) => {
    setLastMessage(message.text);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6 p-8 min-h-[300px] w-full max-w-2xl mx-auto">
      <PromptInput variant="default" onSubmit={handleSubmit}>
        <PromptInputHeader>
          <PromptInputAttachments />
        </PromptInputHeader>
        <PromptInputBody>
          <PromptInputTextarea />
        </PromptInputBody>
        <PromptInputFooter>
          <PromptInputToolbar>
            <PromptInputAttachButton />
          </PromptInputToolbar>
          <PromptInputActions>
            <PromptInputMicButton />
            <PromptInputSubmit />
          </PromptInputActions>
        </PromptInputFooter>
      </PromptInput>
      {lastMessage && (
        <p className="text-sm text-muted-foreground">
          Last sent: &ldquo;{lastMessage}&rdquo;
        </p>
      )}
    </div>
  );
}
