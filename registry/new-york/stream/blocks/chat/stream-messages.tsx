"use client"

import React, {
  createContext,
  JSX,
  useCallback,
  useEffect,
  useMemo,
} from "react"
import { UIMessage } from "@ai-sdk/ui-utils"
import { useChat, UseChatHelpers } from "ai/react"
import { useAtom, useAtomValue, useSetAtom } from "jotai"
import { toast } from "sonner"

import { Messages } from "./Messages"
import {
  isLoadingAtom,
  messagesIdsAtom,
  postChatGenerateBodyAtom,
  sessionAtom,
} from "./store/atoms"
import { Session } from "./store/types"
import { MessageAnnotation } from "./types"
import { useStreamMessagesClientsConfig } from "./utils"

import "../../stream.css"

import {
  dbMessagesToAIMessages,
  ListUserChatMessagesModelResponseV2,
} from "@sitecore/stream-ui-core"

import { useGetChatMessages } from "../../hooks/use-get-chat-messages"

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

const baseUrlEnv = {
  dev: "-dev.sitecore-staging.cloud",
  qa: "-qa.sitecore-staging.cloud",
  staging: "-staging.sitecore-staging.cloud",
  preprod: "-preprod.sitecorecloud.io",
  prod: "sitecorecloud.io",
}

/**
 * Streams messages for a chat session. It sets up necessary configurations,
 * manages message states, and provides context for the chat UI.
 *
 * @param {Object} session - The session object containing details about the current session.
 * @param {string} session.orgId - The organization ID of the user.
 * @param {string} session.userId - The user ID for the session.
 * @param {string} session.chatId - The chat ID associated with the session.
 * @param {string} session.region - The region identifier for API configuration.
 * @param {string} session.env - The environment for configuring the base API URL.
 * @param {string} session.token - The authorization token for making API requests.
 *
 * @return {JSX.Element} The component context containing chat functionality and the rendered messages.
 */
function StreamMessages({
  session,
}: {
  session: Omit<Session, "apiEnv" | "isNewChat">
}): JSX.Element {
  /* Atoms */
  const chatBodyAtom = useAtomValue(postChatGenerateBodyAtom)
  const setMessageIds = useSetAtom(messagesIdsAtom)
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom)
  const [_session, setSession] = useAtom(sessionAtom)

  /* Hooks */
  const getChatMessages = useGetChatMessages(_session.orgId, _session.userId)

  const { isLoading: _isLoading, ...chat } = useChat({
    api: `https://ai-chat-api-${_session.region}${baseUrlEnv[_session.env]}/api/chats/v1/organizations/${_session.orgId}/users/${_session.userId}/chats/${_session.chatId}/generatemessage`,
    body: chatBodyAtom,
    headers: {
      Authorization: `Bearer ${_session.token}`,
      "Content-Type": "application/json",
    },
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

  const initMessages = useCallback(async (): Promise<void> => {
    /* Get messages for a specific chat */
    const messages: ListUserChatMessagesModelResponseV2[] =
      await getChatMessages(_session.chatId)
    const dbMessages = dbMessagesToAIMessages(messages) as UIMessage[]

    chat.setMessages(dbMessages)
    setMessageIds(
      dbMessages.map((message) => {
        return (message?.annotations?.[0] as unknown as MessageAnnotation)?.id
      })
    )
  }, [chat, _session.chatId, getChatMessages, setMessageIds])

  useEffect(() => {
    if (session) {
      const apiEnv = `${_session.region}${baseUrlEnv[_session.env]}`

      // If we change the brandkit or is empty, we need to reset the chatId
      if (_session.brandkitId !== session.brandkitId || !session.brandkitId) {
        setSession((prev) => ({ ...prev, ...session, apiEnv, chatId: "" }))
        return
      }

      setSession((prev) => ({ ...prev, ...session, apiEnv }))
    }
  }, [_session.brandkitId, _session.env, _session.region, session, setSession])

  useEffect(
    function () {
      if (_isLoading !== isLoading) setIsLoading(_isLoading)
    },
    [_isLoading, isLoading, setIsLoading]
  )

  useEffect(
    function () {
      if (_session.chatId) {
        if (_session.isNewChat) {
          setSession((prev) => ({ ...prev, isNewChat: false }))
          chat.handleSubmit()
        } else {
          if (!chat.messages.length) {
            initMessages()
          }
        }
      }
    },
    [
      _session.chatId,
      _session.isNewChat,
      chat,
      initMessages,
      session,
      setSession,
    ]
  )

  return (
    <VercelAiUiContext.Provider value={context}>
      <Messages />
    </VercelAiUiContext.Provider>
  )
}

export { StreamMessages, useStreamMessagesClientsConfig }
