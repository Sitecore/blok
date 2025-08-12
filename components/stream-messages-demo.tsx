import { useCallback, useEffect, useState } from "react"
import { Message } from "@sitecore/stream-ui-core"
import {
  dbMessagesToAIMessages,
  ListUserChatMessagesModelResponseV2,
} from "@sitecore/stream-ui-core/"

import {
  StreamMessages,
  streamMessagesClientsConfig,
} from "@/registry/new-york/stream/blocks/chat/stream-messages"
import { useGetChatMessages } from "@/registry/new-york/stream/hooks/use-get-chat-messages"
import { useGetChats } from "@/registry/new-york/stream/hooks/use-get-chats"

/* Token for the example to be able to work */
const token = ""

/*
 * Initialize the clients below in order for the StreamMessages component to work properly
 */
streamMessagesClientsConfig(token) // !!!!!!!!!!! THIS IS MANDATORY !!!!!!!!!!!

export function StreamMessagesDemo() {
  const [messages, setMessages] = useState<Message[]>([])
  const [chatId, setChatId] = useState("")
  const getChats = useGetChats(
    "org_b07iKFjB2zYhi49p",
    "auth0|65bce928f68ddcd240a78fb4"
  )
  const getChatMessages = useGetChatMessages(
    "org_b07iKFjB2zYhi49p",
    "auth0|65bce928f68ddcd240a78fb4"
  )

  const init = useCallback(async (): Promise<void> => {
    /* Get all available chats */
    const data = await getChats()

    /* Get messages for a specific chat */
    const messages: ListUserChatMessagesModelResponseV2[] =
      await getChatMessages(data?.[1]?.id)

    setMessages(dbMessagesToAIMessages(messages) as Message[])
    setChatId(data?.[1]?.id)
  }, [getChatMessages, getChats])

  useEffect(() => {
    if (!messages.length) init()
  }, [init, messages])

  return (
    <StreamMessages
      userId="auth0|65bce928f68ddcd240a78fb4"
      orgId="org_b07iKFjB2zYhi49p"
      messages={messages}
      chatId={chatId}
    />
  )
}
