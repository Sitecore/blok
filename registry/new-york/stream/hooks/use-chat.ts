import { useState } from "react"

export function useChat() {
  const [chatId, setChatId] = useState<string>("")
  const [isNewChat, setNewChat] = useState<boolean>(false)

  function newChat(cb?: () => void) {
    setNewChat(true)
    setChatId("")

    queueMicrotask(function () {
      setNewChat(false)
      cb?.()
    })
  }

  return { chatId, setChatId, isNewChat, newChat }
}
