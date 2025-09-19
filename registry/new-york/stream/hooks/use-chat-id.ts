import { useEffect, useState } from "react"

export function useChatId() {
  const [chatId, _setChatId] = useState<string>("")
  const [, setNewChat] = useState<number>(0)

  function setChatId(id: string) {
    _setChatId(id)
    if (!id) setNewChat((prev) => prev + 1)
  }

  return { chatId, setChatId }
}
