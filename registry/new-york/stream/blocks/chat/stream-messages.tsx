"use client"

import React, { useCallback, useEffect, useState } from "react"
import { UIMessage } from "@ai-sdk/ui-utils"
import {
  dbMessagesToAIMessages,
  ListUserChatMessagesModelResponseV2,
  ReferenceModel,
  ToolInvocation,
  ToolInvocationUIPart,
} from "@sitecore/stream-ui-core"
import { useChat } from "ai/react"
import { useAtomValue, useSetAtom } from "jotai"

import { cn } from "@/lib/utils"
import { useGetChatMessages } from "@/registry/new-york/stream/hooks/use-get-chat-messages"

import { ButtonScrollToBottom } from "./ButtonScrollToBottom"
import { Feedback } from "./Feedback"
import { useScrollAnchor } from "./hooks/useScrollAnchor"
import { PromptForm } from "./PromptForm"
import {
  brandkitIdAtom,
  chatIdAtom,
  isAnyArtifactOpenAtom,
  orgIdAtom,
  postChatGenerateBodyAtom,
  userIdAtom,
} from "./store/atoms"
import { ToolInvocations } from "./tools/ToolInvocations"
import { MessageAnnotation } from "./types"
import { UserMessage } from "./UserMessage"

export { streamMessagesClientsConfig } from "./utils"

interface MessagesProps {
  orgId: string
  userId: string
  brandkitId: string
  chatId: string
  token: string
}

function StreamMessages({
  orgId,
  userId,
  brandkitId,
  chatId,
  token,
}: MessagesProps): React.ReactNode {
  /* Atoms */
  const isAnyArtifactOpen = useAtomValue(isAnyArtifactOpenAtom)
  const setOrgId = useSetAtom(orgIdAtom)
  const setUserId = useSetAtom(userIdAtom)
  const setBrandkitId = useSetAtom(brandkitIdAtom)
  const setChatId = useSetAtom(chatIdAtom)
  const chatBodyAtom = useAtomValue(postChatGenerateBodyAtom)

  /* Hooks */
  const chat = useChat({
    api: `https://ai-chat-api-euw-dev.sitecore-staging.cloud/api/chats/v1/organizations/${orgId}/users/${userId}/chats/${chatId}/generatemessage`,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: chatBodyAtom,
    experimental_throttle: 200,
  })
  const getChatMessages = useGetChatMessages(orgId, userId)
  const { messagesRef, scrollRef, isAtBottom, scrollToBottom } =
    useScrollAnchor(chat.messages)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])

  const initMessages = useCallback(async (): Promise<void> => {
    /* Get messages for a specific chat */
    const messages: ListUserChatMessagesModelResponseV2[] =
      await getChatMessages(chatId)

    chat.setMessages(dbMessagesToAIMessages(messages) as UIMessage[])
  }, [chat, chatId, getChatMessages])

  const onClearFiles = useCallback(() => {
    setUploadedFiles([])
  }, [])

  useEffect(() => {
    if (!chat.messages.length) initMessages()
    if (orgId) setOrgId(orgId)
    if (userId) setUserId(userId)
    if (brandkitId) setBrandkitId(brandkitId)
    if (chatId) setChatId(chatId)
  }, [
    brandkitId,
    chat,
    chatId,
    initMessages,
    orgId,
    setBrandkitId,
    setChatId,
    setOrgId,
    setUserId,
    userId,
  ])

  return (
    <div className="flex h-lvh max-w-full justify-center overflow-hidden">
      <div className="relative flex flex-col gap-4 px-6 pt-2 pb-2">
        <div className="group relative flex-1 overflow-hidden">
          <div
            className="flex h-full flex-col gap-4 overflow-auto"
            ref={scrollRef}
            data-testid="scroll-contain-base-chat"
          >
            <div className="space-y-4" ref={messagesRef}>
              {chat.messages?.map((message, messageIndex, messagesArray) => {
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
              <div
                className="stream-chat-container space-y-4"
                id="followupQuestions"
              />
            </div>
          </div>
        </div>
        <div className="relative flex flex-col gap-4">
          <ButtonScrollToBottom
            isAtBottom={isAtBottom}
            scrollToBottom={scrollToBottom}
          />
          <div className="stream-chat-container">
            <PromptForm
              chat={chat}
              orgId={orgId}
              userId={userId}
              brandkitId={brandkitId}
              chatId={chatId}
              uploadedFiles={uploadedFiles}
              onFileRemove={(file) => {
                setUploadedFiles((prevFiles) =>
                  prevFiles.filter((f) => f !== file)
                )
              }}
              onFileUpload={(files) => {
                setUploadedFiles((prevFiles) => [...prevFiles, ...files])
              }}
              onClearFiles={onClearFiles}
            />
          </div>
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
