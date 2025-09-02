"use client"

import React, { createContext, JSX, useEffect, useMemo } from "react"
import { useChat, UseChatHelpers } from "ai/react"
import { useAtom, useAtomValue, useSetAtom } from "jotai"
import { isEmpty } from "lodash"
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
  session: Omit<Session, "apiEnv">
}): JSX.Element {
  const { orgId, userId, chatId, region, env, token } = session

  /* Atoms */
  const chatBodyAtom = useAtomValue(postChatGenerateBodyAtom)
  const setMessageIds = useSetAtom(messagesIdsAtom)
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom)
  const setSession = useSetAtom(sessionAtom)

  const { isLoading: _isLoading, ...chat } = useChat({
    api: `https://ai-chat-api-${region}${baseUrlEnv[env]}/api/chats/v1/organizations/${orgId}/users/${userId}/chats/${chatId}/generatemessage`,
    body: chatBodyAtom,
    headers: {
      Authorization: `Bearer ${token}`,
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

  useEffect(() => {
    if (_isLoading !== isLoading) setIsLoading(_isLoading)
    if (!isEmpty(session))
      setSession({ ...session, apiEnv: `${region}${baseUrlEnv[env]}` })
  }, [_isLoading, env, isLoading, region, session, setIsLoading, setSession])

  return (
    <VercelAiUiContext.Provider value={context}>
      {!isEmpty(session) && <Messages />}
    </VercelAiUiContext.Provider>
  )
}

export { StreamMessages, streamMessagesClientsConfig }
