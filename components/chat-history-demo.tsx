"use client"

import { ChatHistory } from "@/registry/new-york/stream/blocks/stream-chat-history/chat-history"

export function ChatHistoryDemo() {
  return (
    <div className="inline-block max-h-[300px] overflow-auto">
      <ChatHistory
        chats={Array.from({ length: 10 }, (_, i) => ({
          id: `chat-${i + 1}`,
          title: `Chat ${i + 1}`,
          disabled: i % 3 === 0,
        }))}
        onChatClick={(chatId) => {
          console.log("Chat clicked:", chatId)
        }}
        onChatDelete={(chatId) => {
          console.log("Chat deleted:", chatId)
        }}
      />
    </div>
  )
}
