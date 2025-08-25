import { useCallback, useEffect, useState } from "react"

import {
  StreamMessages,
  streamMessagesClientsConfig,
} from "@/registry/new-york/stream/blocks/chat/stream-messages"
import { useGetChats } from "@/registry/new-york/stream/hooks/use-get-chats"

/* Token for the example to be able to work */
const token = ""

/*
 * Initialize the clients below in order for the StreamMessages component to work properly
 */
streamMessagesClientsConfig(token) // !!!!!!!!!!! THIS IS MANDATORY !!!!!!!!!!!

export function StreamMessagesDemo() {
  const [chatId, setChatId] = useState("")
  const getChats = useGetChats(
    "org_b07iKFjB2zYhi49p",
    "auth0|65bce928f68ddcd240a78fb4"
  )

  const init = useCallback(async (): Promise<void> => {
    /* Get all available chats */
    const data = await getChats()

    /* Set a chat id */
    setChatId(data?.[0]?.id)
  }, [getChats])

  useEffect(() => {
    if (!chatId) init()
  }, [chatId, init])

  return (
    <StreamMessages
      brandkitId="2f669d68-d5ab-4664-944a-b1504a1a2a6c"
      userId="auth0|65bce928f68ddcd240a78fb4"
      orgId="org_b07iKFjB2zYhi49p"
      chatId={chatId}
      token={token}
    />
  )
}
