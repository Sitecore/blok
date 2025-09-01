"use client"

import React from "react"
import { useAtomValue } from "jotai"
import { isEmpty } from "lodash"
import { createPortal } from "react-dom"

import { Reveal } from "../artifacts/Reveal"
import { isMessageAlreadyGeneratedAtom } from "../store/atoms"
import { ToolInvocationRefProps, ToolInvocationsProps } from "../types"
import { createTool } from "./utils/createTool"

export function ToolInvocations({
  messageId,
  message,
  toolInvocations,
  isLastMessage,
}: ToolInvocationsProps): React.ReactNode {
  /* Atoms */
  const isMessageAlreadyGenerated = useAtomValue(isMessageAlreadyGeneratedAtom)(
    messageId
  )

  const thinkingTools: React.ReactNode[] = []
  const brainstormingTools: React.ReactNode[] = []
  const restTools: React.ReactNode[] = []

  toolInvocations.forEach((toolInvocation: ToolInvocationRefProps) => {
    const { toolName } = toolInvocation

    const tool = createTool({ messageId, message, toolInvocation })
    if (!tool) return

    if (toolName === "brainstorming") {
      brainstormingTools.push(tool)
      return
    }
    if (toolName === "brief" || toolName === "answer") {
      restTools.push(tool)
      return
    }
    if (toolName === "followup_questions") {
      if (isLastMessage) restTools.push(tool)
      return
    }
    thinkingTools.push(tool)
  })

  return (
    <>
      {!isEmpty(thinkingTools) && (
        <Reveal
          isGenerating={isMessageAlreadyGenerated}
          titleStreamStart="Thinking"
          titleStreamEnd="Thinking"
          id="thinking_tools"
          isExpandable
        >
          {thinkingTools}
        </Reveal>
      )}
      {!isEmpty(brainstormingTools) && brainstormingTools}
      {!isEmpty(restTools) && restTools}
    </>
  )
}
