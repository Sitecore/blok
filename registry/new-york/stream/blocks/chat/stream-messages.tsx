import React, { useEffect } from "react"
import {
  Message,
  ReferenceModel,
  ToolInvocation,
  ToolInvocationUIPart,
} from "@sitecore/stream-ui-core"
import { useAtomValue, useSetAtom } from "jotai"

import { cn } from "../../../lib/utils"
import { ButtonScrollToBottom } from "./ButtonScrollToBottom"
import { Feedback } from "./Feedback"
import { useScrollAnchor } from "./hooks/useScrollAnchor"
import {
  brandkitIdAtom,
  chatIdAtom,
  isAnyArtifactOpenAtom,
  orgIdAtom,
  userIdAtom,
} from "./store/atoms"
import { ToolInvocations } from "./tools/ToolInvocations"
import { MessageAnnotation } from "./types"
import { UserMessage } from "./UserMessage"

export { streamMessagesClientsConfig } from "./utils"

interface MessagesProps {
  messages: Message[]
  orgId: string
  userId: string
  brandkitId?: string
  chatId: string
}

function StreamMessages({
  messages = [] as Message[],
  orgId,
  userId,
  brandkitId,
  chatId,
}: MessagesProps): React.ReactNode {
  /* Hooks */
  const { messagesRef, scrollRef, isAtBottom, scrollToBottom } =
    useScrollAnchor(messages)

  /* Atoms */
  const isAnyArtifactOpen = useAtomValue(isAnyArtifactOpenAtom)
  const setOrgId = useSetAtom(orgIdAtom)
  const setUserId = useSetAtom(userIdAtom)
  const setBrandkitId = useSetAtom(brandkitIdAtom)
  const setChatId = useSetAtom(chatIdAtom)

  useEffect(() => {
    if (orgId) setOrgId(orgId)
    if (userId) setUserId(userId)
    if (brandkitId) setBrandkitId(brandkitId)
    if (chatId) setChatId(chatId)
  }, [
    brandkitId,
    chatId,
    orgId,
    setBrandkitId,
    setChatId,
    setOrgId,
    setUserId,
    userId,
  ])

  return (
    <div className="flex h-lvh max-w-full overflow-hidden">
      <div className="relative flex flex-1 basis-1/2 flex-col gap-4 px-6 pt-2 pb-2">
        <div className="group relative flex-1 overflow-hidden">
          <div
            className="flex h-full flex-col gap-4 overflow-auto"
            ref={scrollRef}
            data-testid="scroll-contain-base-chat"
          >
            <div className="space-y-4" ref={messagesRef}>
              {messages?.map((message, messageIndex, messagesArray) => {
                /* The message ID is found in the annotation array. The id you see in the response object is the db id */
                const messageId = (
                  message?.annotations?.[0] as unknown as MessageAnnotation
                )?.id

                const isLastMessage = messageIndex === messagesArray.length - 1

                const toolInvocations = (
                  message.parts as ToolInvocationUIPart[] | undefined
                )
                  ?.filter(
                    (part: ToolInvocationUIPart) =>
                      part.type === "tool-invocation"
                  )
                  .map(
                    (part: ToolInvocationUIPart) => part.toolInvocation
                  ) as (ToolInvocation & {
                  reference: ReferenceModel
                })[]

                const areToolInvocationsAvailable = !!toolInvocations?.length

                return (
                  <div
                    key={`${message.id}_${messageIndex}`}
                    className={cn("stream-chat-container space-y-4", {
                      "pb-4": messageIndex % 2 !== 0 && !isLastMessage,
                    })}
                  >
                    {message.role === "user" && (
                      <UserMessage>{message.content}</UserMessage>
                    )}
                    {message.role === "assistant" && (
                      <>
                        {areToolInvocationsAvailable && (
                          <>
                            <ToolInvocations
                              messageId={messageId}
                              message={message}
                              toolInvocations={toolInvocations}
                              isLastMessage={isLastMessage}
                            />
                            <Feedback
                              messageId={messageId}
                              message={message}
                              isLastMessage={isLastMessage}
                            />
                          </>
                        )}
                      </>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <div className="relative flex flex-col gap-4">
          <ButtonScrollToBottom
            isAtBottom={isAtBottom}
            scrollToBottom={scrollToBottom}
          />
          <div className="stream-chat-container">{/* TODO Prompt */}</div>
        </div>
      </div>
      <aside
        id="artifactsPortalPlaceholder"
        className={cn(
          "z-10 basis-1/2 overflow-hidden transition-all duration-300",
          {
            "mr-0": isAnyArtifactOpen,
            "-mr-[50%]": !isAnyArtifactOpen,
          }
        )}
      />
    </div>
  )
}

export { StreamMessages, type MessagesProps }
