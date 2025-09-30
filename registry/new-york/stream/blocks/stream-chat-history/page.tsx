import { ChatHistory } from "./chat-history"

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
          onChatClick={(chat) => alert(`Clicked: ${chat.title}`)}
          onChatDelete={(chat) => alert(`Deleted: ${chat.title}`)}
        />
      </div>
    </div>
  )
}
