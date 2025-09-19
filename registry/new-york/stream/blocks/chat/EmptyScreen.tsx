import { memo } from "react"

import { EmptyScreenBoxes } from "./EmptyScreenBoxes"

export const EmptyScreen = memo(function EmptyScreen() {
  return (
    <div className="chat-container flex flex-1 flex-col items-center justify-center">
      <div className="flex flex-wrap gap-4">
        <h2 className="bg-ai-400 inline-block bg-clip-text text-5xl font-semibold text-transparent">
          How can I help?
        </h2>
        <EmptyScreenBoxes />
      </div>
    </div>
  )
})
