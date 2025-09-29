"use client"

import { useCallback, useEffect, useState } from "react"
import { mdiChatOutline, mdiTrashCanOutline } from "@mdi/js"
import { chat as chatApi, HTTPError } from "@sitecore/stream-ui-core"
import { useSetAtom } from "jotai"
import { omit } from "lodash"
import { flushSync } from "react-dom"
import { toast } from "sonner"

import { Button } from "@/registry/new-york/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/registry/new-york/ui/dialog"

import { useGetChats } from "../../hooks/use-get-chats"
import { cn } from "../../lib/utils"
import { useChatProvider } from "../chat/hooks/useChatProvider"
import { Icon } from "../chat/Icon"
import { apiQueueAtom } from "../chat/store/atoms"

interface ChatItem {
  id: string
  title: string
  disabled: boolean
}

export type ChatHistoryProps = {
  className?: string
  onChatClick?: (chat: ChatItem) => void
  onChatDelete?: (chat: ChatItem) => void
  disabled?: boolean
  refetch?: boolean
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
  const { className, onChatClick, onChatDelete, disabled, refetch } = props

  /* Hooks */
  const { session } = useChatProvider()
  const [deletedChat, setDeletedChat] = useState<ChatItem | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isDeleteChatModalOpen, setIsDeleteChatModalOpen] = useState(false)
  const getChats = useGetChats(session.orgId, session.userId)
  const [_chats, setChats] = useState<ChatItem[]>([])

  /* Atoms */
  const setApiQueue = useSetAtom(apiQueueAtom)

  async function handleDeleteChatOnDelete(chat: ChatItem) {
    setIsDeleting(true)
    setApiQueue((prev) => ({ ...prev, [`removeChat_${chat?.id}`]: chat?.id }))

    try {
      await chatApi.deleteUserChatApiChatsV1OrganizationsOrganizationIdUsersUserIdChatsChatIdDelete(
        {
          path: {
            userId: session.userId,
            chatId: chat.id,
            organizationId: session.orgId,
          },
        }
      )

      setDeletedChat(null)
      setIsDeleteChatModalOpen(false)
      flushSync(() => {
        onChatDelete?.(chat)
      })

      toast.success("Chat deleted successfully")

      await fetchChats()
    } catch (error: unknown) {
      const { response } = error as HTTPError
      const { detail } = (await response.json()) as {
        type: string
        detail: string
      }
      toast.error(detail)
    } finally {
      setIsDeleting(false)
      setApiQueue((prev) => omit(prev, [`removeChat_${chat?.id}`]))
    }
  }

  const fetchChats = useCallback(
    async function () {
      try {
        const data = await getChats()
        setChats(data as unknown as ChatItem[])
      } catch (error: unknown) {
        const { response } = error as HTTPError
        const { detail } = (await response.json()) as {
          type: string
          detail: string
        }
        toast.error(detail)
      }
    },
    [getChats]
  )

  /* Init */
  useEffect(() => {
    fetchChats()
  }, [fetchChats])

  useEffect(() => {
    if (refetch) fetchChats()
  }, [fetchChats, refetch])

  return (
    <div className={cn("flex w-64 flex-col gap-1", className)}>
      {_chats
        ?.map((chat) => ({ ...chat, disabled }) as ChatItem)
        .map((chat) => (
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
                setDeletedChat(chat)
                setIsDeleteChatModalOpen(true)
              }}
            >
              <Icon
                path={mdiTrashCanOutline}
                className="size-8 rounded-full p-1 text-gray-500 hover:bg-purple-300"
              />
            </button>
          </div>
        ))}
      <Dialog
        open={isDeleteChatModalOpen}
        onOpenChange={setIsDeleteChatModalOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="body-text text-xl">Delete Chat</DialogTitle>
          </DialogHeader>
          <p className="text-md py-5 font-normal">
            Are you sure you want to delete this chat? This action cannot be
            undone.
          </p>
          <DialogFooter>
            <Button
              variant="ghost"
              colorScheme="neutral"
              onClick={() => {
                setDeletedChat(null)
                setIsDeleteChatModalOpen(false)
              }}
            >
              Cancel
            </Button>
            <Button
              disabled={isDeleting}
              colorScheme="danger"
              onClick={() => handleDeleteChatOnDelete(deletedChat as ChatItem)}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
