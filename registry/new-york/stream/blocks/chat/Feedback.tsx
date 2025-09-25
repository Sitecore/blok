import React, { useEffect, useState } from "react"
import { UIMessage } from "@ai-sdk/ui-utils"
import { mdiWeb } from "@mdi/js"
import {
  ContentModelRead,
  ListUserChatMessagesModelResponseV2,
} from "@sitecore/stream-ui-core"
import { useSetAtom } from "jotai"

import { Button } from "@/registry/new-york/ui/button"

import { Icon } from "../chat/Icon"
import { postChatGenerateBodyAtom } from "../chat/store/atoms"
import { useAiChatProvider } from "./hooks/useAiChatProvider"
import { useChatProvider } from "./hooks/useChatProvider"
import { MessageFeedback } from "./MessageFeedback"
import { MessageAnnotation } from "./types"
import { ReferencesBuilder } from "./utils/referencesBuilder"

export interface FeedbackProps {
  message: UIMessage &
    Pick<ListUserChatMessagesModelResponseV2, "feedback"> & {
      content?: string | Array<ContentModelRead>
    }
  isLastMessage: boolean
  previousMessageContent?: string
  messageId: string
}

export const SEARCH_THE_WEB_TEXT = "Search the web for:"

export function Feedback({
  messageId,
  message,
  previousMessageContent,
  isLastMessage,
}: FeedbackProps): React.ReactNode {
  /* Hooks */
  const { session } = useChatProvider()
  const { setInput, handleSubmit, input, brandkitId } = useAiChatProvider()
  const [searchWeb, setSearchWeb] = useState(false)

  /* Atoms */
  const setChatBodyAtom = useSetAtom(postChatGenerateBodyAtom)

  /* Computed */
  const messageAnnotation = message
    ?.annotations?.[0] as unknown as MessageAnnotation
  const isMessageFeedbackAvailable = !!messageAnnotation?.id?.length
  const isWebSearchToolAvailable = !!message?.parts?.filter(
    (part) =>
      part.type === "tool-invocation" &&
      part.toolInvocation.toolName === "web_search"
  ).length

  useEffect(() => {
    if (input && searchWeb) {
      setSearchWeb(false)
      handleSubmit()
    }
  }, [handleSubmit, input, searchWeb])

  const handleWebSearchOnClick = () => {
    const hasSearchMessage =
      previousMessageContent?.includes(SEARCH_THE_WEB_TEXT)
    const prompt =
      `${hasSearchMessage ? "" : SEARCH_THE_WEB_TEXT} ${previousMessageContent}`.trim()

    const data = {
      content: prompt,
      references: [
        ...ReferencesBuilder({ orgId: session.orgId, userId: session.userId })
          .addBrandkit({ id: brandkitId, isArtefact: false })
          .build(),
      ],
      mode: "web_search",
    }

    setChatBodyAtom(data)
    setInput(prompt)
    setSearchWeb(true)
  }

  return (
    <div className="flex w-full items-center rounded-lg py-2">
      {isMessageFeedbackAvailable && (
        <>
          <MessageFeedback messageId={messageId} message={message} />
          {isLastMessage && !isWebSearchToolAvailable && (
            <Button
              data-testid="search_the_web_button"
              variant="ghost"
              colorScheme="neutral"
              onClick={handleWebSearchOnClick}
            >
              <Icon path={mdiWeb} /> <span>Search the web</span>
            </Button>
          )}
        </>
      )}
    </div>
  )
}
