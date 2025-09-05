"use client"

import { mdiChatOutline, mdiTrashCanOutline } from "@mdi/js"

import { cn } from "../../lib/utils"
import { Icon } from "../chat/Icon"

export type ChatHistoryProps = {
  className?: string
  chats?: Array<{
    id: string
    title: string
    disabled?: boolean
  }>
  onChatClick?: (chat: NonNullable<ChatHistoryProps["chats"]>[number]) => void
  onChatDelete?: (chat: NonNullable<ChatHistoryProps["chats"]>[number]) => void
}

/**
 * Renders a chat history list with clickable chat items and delete buttons.
 *
 * @param {Object} props The properties for the ChatHistory component.
 * @param {string} props.className Optional additional class names for the container.
 * @param {Array} props.chats An array of chat objects to be displayed. Each chat object should include `id`, `title`, and `disabled` properties.
 * @param {Function} [props.onChatClick] A callback function invoked when a chat item is clicked. Receives the clicked chat object as a parameter.
 * @param {Function} [props.onChatDelete] A callback function invoked when the delete button for a chat is clicked. Receives the chat object to be deleted as a parameter.
 * @return {JSX.Element} The rendered ChatHistory component.
 */
export function ChatHistory(props: ChatHistoryProps) {
  const { className, chats, onChatClick, onChatDelete } = props

  return (
    <div className={cn("flex w-64 flex-col gap-1", className)}>
      {chats?.map((chat) => (
        <div
          key={chat.id}
          aria-disabled={chat.disabled}
          className={cn(
            "group flex min-h-10 items-center justify-between gap-2 rounded px-2 py-1 transition-colors",
            {
              "cursor-pointer hover:bg-purple-100": !chat.disabled,
              "cursor-not-allowed opacity-50": chat.disabled,
            }
          )}
          onClick={() => {
            if (chat.disabled) return
            onChatClick?.(chat)
          }}
        >
          <div className="flex min-w-0 items-center gap-2">
            <Icon path={mdiChatOutline} className="size-6 text-gray-500" />
            <h2 className="text-md min-w-0 truncate">{chat.title}</h2>
          </div>
          <button
            disabled={chat.disabled}
            className={cn("hidden", {
              "cursor-pointer group-hover:block": !chat.disabled,
              "cursor-not-allowed": chat.disabled,
            })}
            onClick={(e) => {
              e.stopPropagation()
              if (chat.disabled) return
              onChatDelete?.(chat)
            }}
          >
            <Icon
              path={mdiTrashCanOutline}
              className="size-8 rounded-full p-1 text-gray-500 hover:bg-purple-300"
            />
          </button>
        </div>
      ))}
    </div>
  )
}
