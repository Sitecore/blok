import { useContext } from "react"

import { VercelAiUiContext } from "../stream-messages"

export const useAiChatProvider = () => {
  const context = useContext(VercelAiUiContext)

  if (context === undefined) {
    throw new Error("useChatProvider must be used within a VercelAiProvider")
  }

  return context
}
