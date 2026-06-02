"use client";

import type { PromptInputMessage } from "@/components/ai-elements/prompt-input";
import { useChat } from "@ai-sdk/react";
import type { ChatStatus, UIMessage } from "ai";
import { useCallback } from "react";

export type PromptInputDemoSelection = {
  id: string;
  label: string;
  iconPath?: string;
  iconClassName?: string;
};

export const PROMPT_INPUT_DEMO_MODELS = [
  { id: "gpt-4o", name: "GPT-4o" },
  { id: "claude-opus-4-20250514", name: "Claude 4 Opus" },
] as const;

/**
 * Fallback handler for browsers that don't support Web Speech API (Firefox, Safari).
 * Sends recorded audio to a transcription service (OpenAI Whisper in this demo).
 */
export async function handlePromptInputAudioRecorded(
  audioBlob: Blob,
): Promise<string> {
  const formData = new FormData();
  formData.append("file", audioBlob, "audio.webm");
  formData.append("model", "whisper-1");

  const response = await fetch(
    "https://api.openai.com/v1/audio/transcriptions",
    {
      body: formData,
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
      },
      method: "POST",
    },
  );

  if (!response.ok) {
    throw new Error("Transcription failed");
  }

  const data = (await response.json()) as { text?: string };
  return data.text ?? "";
}

export type PromptInputSubmitContext = {
  model: string;
  useWebSearch: boolean;
  selections: PromptInputDemoSelection[];
};

export function canSubmitPromptInputMessage(
  message: PromptInputMessage,
  selections: PromptInputDemoSelection[],
): boolean {
  return (
    Boolean(message.text) ||
    Boolean(message.files?.length) ||
    selections.length > 0
  );
}

export function submitPromptInputMessage(
  sendMessage: ReturnType<typeof useChat>["sendMessage"],
  message: PromptInputMessage,
  { model, useWebSearch, selections }: PromptInputSubmitContext,
): boolean {
  if (!canSubmitPromptInputMessage(message, selections)) {
    return false;
  }

  sendMessage(
    {
      text: message.text || "Sent with attachments",
      files: message.files,
    },
    {
      body: {
        model,
        webSearch: useWebSearch,
        selections: selections.map(({ id, label }) => ({ id, label })),
      },
    },
  );

  return true;
}

export function usePromptInputVercelChat(initialMessages?: UIMessage[]) {
  const { sendMessage, status, messages } = useChat({
    messages: initialMessages,
  });

  const submitPrompt = useCallback(
    (message: PromptInputMessage, context: PromptInputSubmitContext) =>
      submitPromptInputMessage(sendMessage, message, context),
    [sendMessage],
  );

  return { messages, submitPrompt, status: status as ChatStatus };
}
