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
  type PromptInputVariant,
} from "@/components/bloks/prompt-input";
import { cn } from "@/lib/utils";
import { useState } from "react";

const question =
  "This is the question that is being asked by the AI… or is it?";
const answers = [
  { id: "a", label: "This is the first response to the question" },
  { id: "b", label: "This is the second response to the question" },
  { id: "c", label: "This is the third response to the question" },
];

const COLUMN_WIDTH_PX = 576;

interface QuestionPromptCardProps {
  variant: PromptInputVariant;
  placeholder: string;
  /** Optional shadow override; floating uses `shadow-lg`. */
  shellShadowClass?: string;
}

function QuestionPromptCard({
  variant,
  placeholder,
  shellShadowClass = "shadow-sm",
}: QuestionPromptCardProps) {
  const [, setLastMessage] = useState<string>("");
  const [selectedId, setSelectedId] = useState<string | null>("a");
  const [skipped, setSkipped] = useState(false);

  const handleSubmit = (message: PromptInputMessage) => {
    setLastMessage(message.text);
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
      {!skipped && (
        <div className="flex w-full min-w-0 flex-col gap-3 px-4 pt-3 pb-4">
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm font-semibold text-foreground">
              Questions
            </span>
            <button
              type="button"
              onClick={() => setSkipped(true)}
              className={cn(
                "rounded-sm text-sm font-medium text-primary outline-none",
                "hover:underline focus-visible:ring-2 focus-visible:ring-ring/50",
              )}
            >
              Skip
            </button>
          </div>

          <p className="text-sm text-foreground">{question}</p>

          <ul
            role="radiogroup"
            aria-label="Question answers"
            className="flex flex-col gap-2"
          >
            {answers.map((answer, index) => {
              const letter = String.fromCharCode(65 + index);
              const isSelected = selectedId === answer.id;
              return (
                <li key={answer.id} className="min-w-0">
                  <button
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => setSelectedId(answer.id)}
                    className={cn(
                      "flex w-full min-w-0 items-center gap-1 rounded-md px-3 py-2.5 text-left text-sm outline-none transition-colors",
                      "focus-visible:ring-2 focus-visible:ring-ring/50",
                      isSelected
                        ? "bg-primary-background text-foreground"
                        : "bg-muted text-foreground hover:bg-muted/70",
                    )}
                  >
                    <span className="shrink-0">{letter}.</span>
                    <span className="min-w-0 truncate">{answer.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}

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
          marginTop: skipped ? "-1px" : 0,
        }}
        className={cn(
          "border bg-white shadow-none",
          skipped ? "rounded-xl" : "rounded-b-xl rounded-t-lg",
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
          </PromptInputToolbar>
        )}
        <PromptInputBody>
          <PromptInputTextarea placeholder={placeholder} />
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

export default function PromptInputQuestionsDemo() {
  return (
    <div className="flex w-full flex-col gap-3 p-8">
      <div className="relative flex min-h-[420px] w-full flex-col items-center justify-end p-4">
        <QuestionPromptCard
          variant="default"
          placeholder="Respond to the question"
        />
      </div>

      <div className="relative flex min-h-[420px] w-full flex-col items-center justify-end gap-4 rounded-lg bg-muted/30 p-8">
        <QuestionPromptCard
          variant="floating"
          placeholder="Respond to the question"
          shellShadowClass="shadow-lg"
        />
      </div>
    </div>
  );
}
