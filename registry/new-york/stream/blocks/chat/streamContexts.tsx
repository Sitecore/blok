import { createContext } from "react"
import type { UseChatHelpers } from "ai/react"

import type { Session } from "./store/types.ts"
import type { ResetSelections } from "./types.ts"

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
