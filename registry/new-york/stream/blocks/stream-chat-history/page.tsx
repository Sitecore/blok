import { ChatHistory } from "./chat-history"

const mockChats = [
  { id: "1", title: "General" },
  { id: "2", title: "Support" },
  { id: "3", title: "Random", disabled: true },
]

export default function StreamChatHistoryPage() {
  return (
    <div className="container mx-auto space-y-6 p-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Stream Chat History</h1>
        <p className="text-muted-foreground">
          A component for displaying a list of chat conversations with actions.
        </p>
      </div>
      <div className="space-y-4">
        <ChatHistory
          chats={mockChats}
          onChatClick={(chat) => alert(`Clicked: ${chat.title}`)}
          onChatDelete={(chat) => alert(`Deleted: ${chat.title}`)}
        />
      </div>
    </div>
  )
}
