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
  brainstormingAtom,
  configAtom,
  isBrainstormingActiveAtom,
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
 * Configuration for example prompts displayed in the chat interface.
 */
type ExamplePrompt = {
  /**
   * Icon element to display alongside the prompt.
   * @example <span className="text-md neutral-fg ml-auto">💡</span>
   */
  icon: JSX.Element

  /**
   * The text content of the example prompt.
   * @example "Generate a creative brief for a new product launch"
   */
  content: string
}

/**
 * Props for the StreamMessages component.
 */
export interface StreamMessagesProps {
  /**
   * Session configuration containing user and organization information for chat functionality.
   * @example {
   *   brandkitId: '2f669d68-d5ab-4664-944a-b1504a1a2a6c',
   *   userId: 'auth0|1234567890',
   *   orgId: 'org_b07iKFjB2zYhi49p',
   *   chatId: 'e092c859-fce8-49be-b916-bf84477659d8',
   *   region: 'euw',
   *   env: 'dev',
   *   token: 'your-auth-token-here'
   * }
   */
  session: Omit<Session, "apiEnv" | "isNewChat">

  /**
   * Initial prompt to display in the chat interface.
   * @example "Generate a creative brief for a new product launch"
   * @default undefined
   */
  prompt?: string

  /**
   * Configuration options for customizing the chat interface.
   * @default undefined
   */
  config?: {
    /**
     * Disclaimer text or component to display in the chat interface.
     * @example "This is a test disclaimer. It can be a string or a React node."
     * @example <div className="text-sm text-neutral-500"><p>AI responses may contain errors.</p></div>
     * @default undefined
     */
    disclaimer?: string | React.ReactNode

    /**
     * Array of example prompts to show users before they start chatting.
     * @example [
     *   {
     *     icon: <span className="text-md neutral-fg ml-auto">💡</span>,
     *     content: 'Generate a creative brief for a new product launch'
     *   },
     *   {
     *     icon: <span className="text-md neutral-fg ml-auto">🧠</span>,
     *     content: 'Brainstorm some ideas for a social media campaign'
     *   }
     * ]
     * @default undefined
     */
    examplePrompts?: ExamplePrompt[]
  }
}

/**
 * StreamMessages is a React component that provides a chat interface with AI capabilities.
 * It handles real-time messaging, tool invocations, and integrates with various AI services
 * for brainstorming, content generation, and more.
 *
 * @param props - The props for the StreamMessages component
 * @returns A JSX element rendering the complete chat interface
 *
 * @example
 * ```tsx
 * // Basic usage with required session configuration
 * <StreamMessages
 *   session={{
 *     brandkitId: '2f669d68-d5ab-4664-944a-b1504a1a2a6c',
 *     userId: 'auth0|1234567890',
 *     orgId: 'org_b07iKFjB2zYhi49p',
 *     chatId: 'e092c859-fce8-49be-b916-bf84477659d8',
 *     region: 'euw',
 *     env: 'dev',
 *     token: 'your-auth-token-here'
 *   }}
 * />
 *
 * // Advanced usage with custom configuration and example prompts
 * <StreamMessages
 *   session={{
 *     brandkitId: '2f669d68-d5ab-4664-944a-b1504a1a2a6c',
 *     userId: 'auth0|1234567890',
 *     orgId: 'org_b07iKFjB2zYhi49p',
 *     chatId: 'e092c859-fce8-49be-b916-bf84477659d8',
 *     region: 'euw',
 *     env: 'dev',
 *     token: 'your-auth-token-here'
 *   }}
 *   prompt="Generate a creative brief for a new product launch"
 *   config={{
 *     examplePrompts: [
 *       {
 *         icon: <span className="text-md neutral-fg ml-auto">💡</span>,
 *         content: 'Generate a creative brief for a new product launch',
 *       },
 *       {
 *         icon: <span className="text-md neutral-fg ml-auto">🧠</span>,
 *         content: 'Brainstorm some ideas for a social media campaign',
 *       },
 *     ],
 *     disclaimer: (
 *       <div className="text-sm text-neutral-500">
 *         <p>This is a test disclaimer. It can be a string or a React node.</p>
 *       </div>
 *     ),
 *   }}
 * />
 * ```
 *
 * @remarks
 * This component requires the stream clients to be loaded via `useStreamMessagesClientsConfig`
 * before it can function properly. It manages chat state through Jotai atoms and integrates
 * with the Vercel AI SDK for chat functionality.
 */

function StreamMessages({
  session,
  prompt,
  config,
}: StreamMessagesProps): JSX.Element {
  /* Atoms */
  const chatBodyAtom = useAtomValue(postChatGenerateBodyAtom)
  const setMessageIds = useSetAtom(messagesIdsAtom)
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom)
  const [_session, setSession] = useAtom(sessionAtom)
  const setBrainstormingData = useSetAtom(brainstormingAtom)
  const setIsBrainstormingActive = useSetAtom(isBrainstormingActiveAtom)
  const setConfig = useSetAtom(configAtom)

  /* Hooks */
  const getChatMessages = useGetChatMessages(_session.orgId, _session.userId)

  const { isLoading: _isLoading, ...chat } = useChat({
    api: `https://ai-chat-api-${_session.region}${baseUrlEnv[_session.env]}/api/chats/v1/organizations/${_session.orgId}/users/${_session.userId}/chats/${_session.chatId}/generatemessage`,
    body: chatBodyAtom,
    initialInput: prompt ?? "",
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

  useEffect(
    function () {
      if (session) {
        const apiEnv = `${_session.region}${baseUrlEnv[_session.env]}`

        if (
          _session.brandkitId !== session.brandkitId ||
          !session.brandkitId ||
          !session.chatId
        ) {
          setBrainstormingData(undefined)
          setIsBrainstormingActive(false)
        }

        setSession((prev) => ({ ...prev, ...session, apiEnv }))
      }
    },
    [
      _session.brandkitId,
      _session.env,
      _session.region,
      session,
      setBrainstormingData,
      setIsBrainstormingActive,
      setSession,
    ]
  )

  useEffect(() => {
    if (config) {
      setConfig(config)
    }
  }, [config, setConfig])

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

  useEffect(
    function () {
      if (_isLoading !== isLoading) setIsLoading(_isLoading)
    },
    [_isLoading, isLoading, setIsLoading]
  )

  useEffect(
    function () {
      return function () {
        if (!session.chatId) {
          const apiEnv = `${_session.region}${baseUrlEnv[_session.env]}`

          setBrainstormingData(undefined)
          setIsBrainstormingActive(false)
          setSession((prev) => ({ ...prev, ...session, apiEnv }))
        }
      }
    },
    [
      _session.env,
      _session.region,
      session,
      setBrainstormingData,
      setIsBrainstormingActive,
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
