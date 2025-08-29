"use client"

import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react"
import { UIMessage } from "@ai-sdk/ui-utils"
import {
  dbMessagesToAIMessages,
  ListUserChatMessagesModelResponseV2,
  ReferenceModel,
  ToolInvocation,
  ToolInvocationUIPart,
} from "@sitecore/stream-ui-core"
import { useChat, UseChatHelpers } from "ai/react"
import { useAtom, useAtomValue, useSetAtom } from "jotai"
import { isEmpty } from "lodash"
import { toast } from "sonner"

import { useGetChatMessages } from "../../hooks/use-get-chat-messages"
import { cn } from "../../lib/utils"
import { ButtonScrollToBottom } from "./ButtonScrollToBottom"
import { Feedback } from "./Feedback"
import { useAiChatProvider } from "./hooks/useAiChatProvider"
import { useScrollAnchor } from "./hooks/useScrollAnchor"
import { PromptForm } from "./PromptForm"
import {
  isAnyArtifactOpenAtom,
  isLoadingAtom,
  messagesIdsAtom,
  postChatGenerateBodyAtom,
  sessionAtom,
} from "./store/atoms"
import { Session } from "./store/types"
import { ToolInvocations } from "./tools/ToolInvocations"
import { MessageAnnotation } from "./types"
import { UserMessage } from "./UserMessage"
import { streamMessagesClientsConfig } from "./utils"

import "../../stream.css"

export type VercelAiUiProviderType = UseChatHelpers & {
  addToolResult: ({
    toolCallId,
    result,
  }: {
    toolCallId: string
    result: unknown
  }) => void
}

export const VercelAiUiContext = createContext<
  VercelAiUiProviderType | undefined
>(undefined)

interface MessagesProps {
  session: Session
}

const baseUrlEnv = {
  dev: "-dev.sitecore-staging.cloud",
  qa: "-qa.sitecore-staging.cloud",
  staging: "-staging.sitecore-staging.cloud",
  preprod: "-preprod.sitecorecloud.io",
  prod: "sitecorecloud.io",
}

function StreamMessages({ session }: MessagesProps) {
  const { orgId, userId, chatId, region, env } = session

  /* Atoms */
  const chatBodyAtom = useAtomValue(postChatGenerateBodyAtom)
  const setMessageIds = useSetAtom(messagesIdsAtom)
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom)

  const { isLoading: _isLoading, ...chat } = useChat({
    api: `https://ai-chat-api-${region}${baseUrlEnv[env]}/api/chats/v1/organizations/${orgId}/users/${userId}/chats/${chatId}/generatemessage`,
    body: chatBodyAtom,
    experimental_throttle: 200,
    onFinish: async (message) => {
      const messageId = (
        message?.annotations?.[0] as unknown as MessageAnnotation
      )?.id
      setMessageIds((prev) => [...prev, messageId])
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const context = useMemo(
    () => ({
      ...chat,
      isLoading,
    }),
    [chat, isLoading]
  )

  useEffect(() => {
    if (_isLoading !== isLoading) setIsLoading(_isLoading)
  }, [_isLoading, isLoading, setIsLoading])

  return (
    <VercelAiUiContext.Provider value={context}>
      <Messages session={session} />
    </VercelAiUiContext.Provider>
  )
}

function Messages({ session }: MessagesProps): React.ReactNode {
  const { orgId, userId, chatId } = session

  /* Atoms */
  const isAnyArtifactOpen = useAtomValue(isAnyArtifactOpenAtom)
  const setSession = useSetAtom(sessionAtom)

  /* Hooks */
  const { messages, setMessages } = useAiChatProvider()
  const getChatMessages = useGetChatMessages(orgId, userId)
  const { messagesRef, scrollRef, isAtBottom, scrollToBottom } =
    useScrollAnchor(messages)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])

  const initMessages = useCallback(async (): Promise<void> => {
    /* Get messages for a specific chat */
    const messages: ListUserChatMessagesModelResponseV2[] =
      await getChatMessages(chatId)

    setMessages(dbMessagesToAIMessages(messages) as UIMessage[])
  }, [chatId, getChatMessages, setMessages])

  const onClearFiles = useCallback(() => {
    setUploadedFiles([])
  }, [])

  useEffect(() => {
    if (!messages.length) initMessages()
    if (!isEmpty(session)) setSession(session)
  }, [messages.length, initMessages, session, setSession])

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

export { StreamMessages, type MessagesProps, streamMessagesClientsConfig }
