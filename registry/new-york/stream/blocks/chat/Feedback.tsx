import React from "react"
import { UIMessage } from "@ai-sdk/ui-utils"
import {
  ContentModelRead,
  ListUserChatMessagesModelResponseV2,
} from "@sitecore/stream-ui-core"

import { MessageFeedback } from "./MessageFeedback"
import { MessageAnnotation } from "./types"

export interface FeedbackProps {
  message: UIMessage &
    Pick<ListUserChatMessagesModelResponseV2, "feedback"> & {
      content?: string | Array<ContentModelRead>
    }
  isLastMessage: boolean
  previousMessageContent?: string
  messageId: string
}

export function Feedback({
  messageId,
  message,
}: FeedbackProps): React.ReactNode {
  const messageAnnotation = message
    ?.annotations?.[0] as unknown as MessageAnnotation
  const isMessageFeedbackAvailable = !!messageAnnotation?.id?.length

  return (
    <div className="flex w-full items-center rounded-lg py-2">
      {isMessageFeedbackAvailable && (
        <>
          <MessageFeedback messageId={messageId} message={message} />
        </>
      )}
    </div>
  )
}
