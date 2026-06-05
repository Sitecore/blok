"use client"; // Please remove this if you are not using nextjs

import { promptInputDemoAttachMenu } from "@/app/content/bloks/prompt-input/prompt-input-attach-menu.demo";
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
            <PromptInputAttachButton
              aria-label="add attachment"
              attachMenu={promptInputDemoAttachMenu}
            />
            <PromptInputSelections />
          </PromptInputToolbar>
          <PromptInputActions>
            <PromptInputMicButton aria-label="record voice input" />
            <PromptInputSubmit aria-label="submit prompt" />
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
