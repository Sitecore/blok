"use client"

import React, {
  createContext,
  JSX,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react"
import { UIMessage } from "@ai-sdk/ui-utils"
import { useChat, UseChatHelpers } from "ai/react"
import { useAtom, useAtomValue, useSetAtom } from "jotai"
import { toast } from "sonner"

import { useChatProvider } from "./hooks/useChatProvider"
import { Messages } from "./Messages"
import {
  apiQueueAtom,
  artifactsAtom,
  brainstormingAtom,
  brandkitIdAtom,
  chatIdAtom,
  configAtom,
  hasErrorAtom,
  isBrainstormingActiveAtom,
  isChatActionPendingAtom,
  isLoadingAtom,
  isNewChatAtom,
  messagesIdsAtom,
  postChatGenerateBodyAtom,
  selectedChatWithIdAtom,
} from "./store/atoms"
import { Session } from "./store/types"
import { MessageAnnotation, ResetSelections, SelectionValues } from "./types"
import { useStreamMessagesClientsConfig } from "./utils"

import "../../stream.css"

import {
  chat as chatApi,
  dbMessagesToAIMessages,
  HTTPError,
  ListUserChatMessagesModelResponseV2,
} from "@sitecore/stream-ui-core"
import { Message } from "ai"
import { last } from "lodash"

import { useGetChatMessages } from "../../hooks/use-get-chat-messages"
import { Artifacts } from "./store/types"

export type ChatContextType = {
  session: Session
}

export type VercelAiUiProviderType = UseChatHelpers & {
  brandkitId: string
  chatId: string
  addToolResult: ({
    toolCallId,
    result,
  }: {
    toolCallId: string
    result: unknown
  }) => void
  rollbackChatChanges: (callbacks?: {
    onRemoveChat?: () => void
    onDeleteMessage?: () => void
  }) => void
  reset: (selections: ResetSelections) => void
}

export const ChatContext = createContext<ChatContextType | undefined>(undefined)
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

export interface ChatProps {
  session: Omit<Session, "apiEnv">
  children?: React.ReactNode
}

/**
 * Props for the StreamMessages component.
 */
export interface StreamMessagesProps {
  brandkitId: string
  chatId: string
  isNewChat: boolean
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

export function Chat({ session, children }: ChatProps) {
  const apiEnv = `${session.region}${baseUrlEnv[session.env]}`

  return (
    <ChatContext.Provider value={{ session: { ...session, apiEnv } }}>
      {children}
    </ChatContext.Provider>
  )
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
  brandkitId,
  chatId,
  prompt,
  config,
  isNewChat,
}: StreamMessagesProps): JSX.Element {
  /* Atoms */
  const chatBodyAtom = useAtomValue(postChatGenerateBodyAtom)
  const setMessageIds = useSetAtom(messagesIdsAtom)
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom)
  const setBrainstormingData = useSetAtom(brainstormingAtom)
  const setIsBrainstormingActive = useSetAtom(isBrainstormingActiveAtom)
  const [_config, setConfig] = useAtom(configAtom)

  /* Hooks */
  const { session } = useChatProvider()
  const getChatMessages = useGetChatMessages(session.orgId, session.userId)
  const setApiQueue = useSetAtom(apiQueueAtom)
  const setArtifacts = useSetAtom(artifactsAtom)
  const setSelectedChatWithId = useSetAtom(selectedChatWithIdAtom)
  const setIsChatActionPending = useSetAtom(isChatActionPendingAtom)
  const setHasError = useSetAtom(hasErrorAtom)
  const [_isNewChat, setIsNewChat] = useAtom(isNewChatAtom)
  const [_chatId, setChatId] = useAtom(chatIdAtom)
  const [_brandkitId, setBrandkitId] = useAtom(brandkitIdAtom)
  const brandkitIdRef = useRef("")
  const chatIdRef = useRef("")

  const {
    isLoading: _isLoading,
    messages,
    setMessages,
    setInput,
    stop,
    ...chat
  } = useChat({
    api: `https://ai-chat-api-${session.region}${baseUrlEnv[session.env]}/api/chats/v1/organizations/${session.orgId}/users/${session.userId}/chats/${_chatId}/generatemessage`,
    body: chatBodyAtom,
    initialInput: prompt ?? "",
    headers: {
      Authorization: `Bearer ${session.token}`,
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
      console.error("Error:", error)
    },
  })

  /* Computed */
  const areMessagesAvailable = !!messages?.length

  const reset = useCallback(
    (selections: ResetSelections) => {
      const actions = {
        messages: (value?: Message[]) => {
          setMessages(value ?? [])
          setMessageIds([])
          setSelectedChatWithId("")
        },
        artifacts: (value?: Artifacts) => setArtifacts(value ?? {}),
        isChatActionPending: (value?: boolean) =>
          setIsChatActionPending(value ?? false),
        hasError: (value?: boolean) => setHasError(value ?? false),
        input: (value?: string) => setInput(value ?? ""),
      }

      selections.forEach((selection) => {
        if (Array.isArray(selection)) {
          const [key, value] = selection as SelectionValues
          actions[key](value as never)
        } else actions[selection]()
      })
    },
    [
      setArtifacts,
      setHasError,
      setInput,
      setIsChatActionPending,
      setMessageIds,
      setMessages,
      setSelectedChatWithId,
    ]
  )

  const initMessages = useCallback(async (): Promise<void> => {
    /* Get messages for a specific chat */
    const messages: ListUserChatMessagesModelResponseV2[] =
      await getChatMessages(_chatId)
    const dbMessages = dbMessagesToAIMessages(messages) as UIMessage[]

    setMessages(dbMessages)
    setMessageIds(
      dbMessages.map((message) => {
        return (message?.annotations?.[0] as unknown as MessageAnnotation)?.id
      })
    )
  }, [getChatMessages, _chatId, setMessageIds, setMessages])

  const rollbackChatChanges = useCallback(
    async (callbacks?: {
      onRemoveChat?: () => void
      onDeleteMessage?: () => void
    }) => {
      const { onRemoveChat, onDeleteMessage } = callbacks ?? {}

      const messageAssistant = (last(messages) as Message)?.role === "assistant"
      const messageId = (
        (last(messages) as Message)
          ?.annotations?.[0] as unknown as MessageAnnotation
      )?.id

      const isMessageAssistantInvalid = !messageAssistant || !messageId
      const isFirstMessage = messages.length && messages.length <= 2

      stop()

      setApiQueue({})
      reset(["hasError", "artifacts"])

      /* If there are two or fewer messages, then delete the chat */
      if (isFirstMessage) {
        try {
          await chatApi.deleteUserChatApiChatsV1OrganizationsOrganizationIdUsersUserIdChatsChatIdDelete(
            {
              path: {
                userId: session.userId,
                chatId: _chatId,
                organizationId: session.orgId,
              },
            }
          )
          await initMessages()

          if (onRemoveChat) {
            onRemoveChat()
            return
          }
        } catch (error: unknown) {
          const { response } = error as HTTPError
          const { detail } = (await response.json()) as {
            type: string
            detail: string
          }
          toast.error(detail)
        }
        return
      }

      if (isMessageAssistantInvalid) {
        if (onDeleteMessage) {
          onDeleteMessage()
          return
        }
        await initMessages()
        return
      }

      try {
        await chatApi.deleteUserChatMessageApiChatsV1OrganizationsOrganizationIdUsersUserIdChatsChatIdMessagesMessageIdDelete(
          {
            path: {
              userId: session.userId,
              chatId: _chatId,
              organizationId: session.orgId,
              messageId,
            },
          }
        )
        if (onDeleteMessage) {
          onDeleteMessage()
          return
        }
      } catch (error: unknown) {
        const { response } = error as HTTPError
        const { detail } = (await response.json()) as {
          type: string
          detail: string
        }
        toast.error(detail)
      }
    },
    [
      initMessages,
      messages,
      reset,
      _chatId,
      session.orgId,
      session.userId,
      setApiQueue,
      stop,
    ]
  )

  const handleNewChat = useCallback(() => {
    setIsNewChat(false)
    setBrainstormingData(undefined)
    setIsBrainstormingActive(false)
    setMessages([])
    setChatId("")

    if (isLoading) {
      rollbackChatChanges({
        onDeleteMessage: () => {
          setMessages([])
        },
      })
    }
  }, [
    isLoading,
    rollbackChatChanges,
    setBrainstormingData,
    setChatId,
    setIsBrainstormingActive,
    setIsNewChat,
    setMessages,
  ])

  const updateInternalState = useCallback(() => {
    if (chatId) setChatId(chatId)
    if (brandkitId) setBrandkitId(brandkitId)
    if (isNewChat) {
      setIsNewChat(isNewChat)
      handleNewChat()
    }
    if (config) setConfig(config)
    if (_isLoading !== isLoading) setIsLoading(_isLoading)
  }, [
    _isLoading,
    brandkitId,
    chatId,
    config,
    handleNewChat,
    isLoading,
    isNewChat,
    setBrandkitId,
    setChatId,
    setConfig,
    setIsLoading,
    setIsNewChat,
  ])

  const handleChatInit = useCallback(() => {
    if (!_chatId) return

    if (_isNewChat) {
      setIsNewChat(false)
      chat.handleSubmit()
      return
    }

    if (!areMessagesAvailable) {
      initMessages()
    }
  }, [
    _chatId,
    _isNewChat,
    areMessagesAvailable,
    chat,
    initMessages,
    setIsNewChat,
  ])

  useEffect(() => {
    updateInternalState()
    handleChatInit()
  }, [handleChatInit, updateInternalState])

  const context = useMemo(
    () => ({
      ...chat,
      setInput,
      reset,
      rollbackChatChanges,
      setMessages,
      messages,
      isLoading,
      stop,
      brandkitId,
      chatId,
    }),
    [
      brandkitId,
      chat,
      chatId,
      isLoading,
      messages,
      reset,
      rollbackChatChanges,
      setInput,
      setMessages,
      stop,
    ]
  )

  return (
    <VercelAiUiContext.Provider value={context}>
      <Messages />
    </VercelAiUiContext.Provider>
  )
}

export { StreamMessages, useStreamMessagesClientsConfig }
