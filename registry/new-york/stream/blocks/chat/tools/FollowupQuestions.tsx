import React, { useEffect, useMemo, useRef } from "react"
import { mdiArrowRight } from "@mdi/js"
import { useAtomValue } from "jotai"

import { Button } from "@/registry/new-york/ui/button"

import { Reveal } from "../artifacts/Reveal"
import { Icon } from "../Icon"
import { isMessageAlreadyGeneratedAtom } from "../store/atoms"
import { ToolProps } from "../types"

interface Question {
  question: string
}

interface Questions {
  questions: Question[]
}

export function FollowupQuestions({
  messageId,
  toolInvocation,
}: ToolProps): React.ReactNode {
  const {
    args: { questions = [] as Question[], result = {} as Questions } = {},
  } = toolInvocation ?? {}

  /* Atoms */
  const isMessageAlreadyGenerated = useAtomValue(isMessageAlreadyGeneratedAtom)(
    messageId
  )

  /* Computed */
  const content: Question[] = useMemo(
    () => (questions.length ? questions : result?.questions),
    [questions, result?.questions]
  )

  const wrapperRef = useRef<HTMLDivElement>(null)
  const wasAtBottom = useRef<boolean>(false)

  useEffect(() => {
    if (wasAtBottom.current) scrollToBottom()
  }, [content])

  if (!content?.length) return null

  const scrollToBottom = (): void => {
    wrapperRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <Reveal
      id="followup_questions"
      isGenerating={isMessageAlreadyGenerated}
      title="Suggested follow-up questions"
      position="right"
      className="border-none bg-transparent"
    >
      <div
        className="ml-auto flex max-w-fit flex-col gap-2 text-right"
        ref={wrapperRef}
      >
        {content.map(({ question }, index) => (
          <Button
            data-testid={`chat_follow_up_questions_dropdown_${index}_open`}
            key={`${question}_${index}`}
            variant="outline"
            className="text-body-text ml-auto h-auto w-full justify-end rounded-xl text-left text-lg font-normal text-wrap"
          >
            <span className="block flex-1">{question}</span>
            <Icon
              path={mdiArrowRight}
              size="2xs"
              className="text-blackAlpha-500 ml-2"
            />
          </Button>
        ))}
      </div>
    </Reveal>
  )
}
