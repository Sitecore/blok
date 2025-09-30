import React, { useMemo } from "react"

import { Markdown } from "../Markdown"
import { type ToolProps } from "../types"
import { replaceNewLines } from "../utils"
import { Tool } from "./Tool"

interface AnswerProps {
  args: {
    answer?: string
    result?: {
      answer?: string
    }
  }
}

export function Answer({ toolInvocation }: ToolProps): React.ReactNode {
  const { args } = toolInvocation
  const { answer: streamAnswer = "", result: { answer = "" } = {} } =
    args ?? ({} as AnswerProps)

  /* Computed */
  const content = useMemo(() => streamAnswer || answer, [answer, streamAnswer])

  if (!content?.length) return null

  return (
    <Tool className="border-none px-0 py-2">
      <Markdown id="answer" text={replaceNewLines(content)} />
    </Tool>
  )
}
