import React, { useMemo } from "react"
import { useAtomValue } from "jotai"

import { Markdown } from "../Markdown"
import { MessageSubtitle } from "../MessageSubtitle"
import { isMessageAlreadyGeneratedAtom } from "../store/atoms"
import { type ToolProps } from "../types"
import { replaceNewLines } from "../utils"
import { Sources } from "./Sources"
import { Tool } from "./Tool"

export type ThinkingToolProps = ToolProps & {
  title?: string
  icon?: string
}

export function ThinkingTool({
  icon,
  messageId,
  toolInvocation,
  title = "",
}: ThinkingToolProps): React.ReactNode {
  const {
    args: { result = "", arguments: { answer = "" } = {}, data = {} } = {},
  } = toolInvocation ?? {}

  /* Atoms */
  const isMessageAlreadyGenerated = useAtomValue(isMessageAlreadyGeneratedAtom)(
    messageId
  )

  /* Computed */
  const content = useMemo(() => answer || result, [answer, result])
  const contentTestId = title.split(" ").join("_").toLowerCase()

  if (!content?.length) return null

  return (
    <Tool className="rounded-lg border border-[#F7F7F7] bg-white p-2 py-3">
      <MessageSubtitle
        isGenerating={isMessageAlreadyGenerated}
        icon={icon}
        title={title}
      />
      <Markdown text={replaceNewLines(content)} id={`thinking_tool`} />
      <Sources testId={`${contentTestId}`} sources={data?.sources} />
    </Tool>
  )
}
