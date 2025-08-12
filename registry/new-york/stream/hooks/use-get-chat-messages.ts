import { useCallback } from "react"
import {
  chat,
  ListUserChatMessagesModelResponseV2,
} from "@sitecore/stream-ui-core"

/**
 * Custom hook to fetch chat messages for a specific chat.
 *
 * @param {string} orgId - The organization ID.
 * @param {string} userId - The user ID.
 * @return {(chatId: string) => Promise<ListUserChatMessagesModelResponseV2[]>} - A function that accepts a chat ID and returns a promise resolving to an array of chat messages.
 */
export function useGetChatMessages(
  orgId: string,
  userId: string
): (chatId: string) => Promise<ListUserChatMessagesModelResponseV2[]> {
  return useCallback(
    async (chatId: string): Promise<ListUserChatMessagesModelResponseV2[]> => {
      const { data } =
        await chat.listUserChatMessagesV2ApiChatsV2OrganizationsOrganizationIdUsersUserIdChatsChatIdMessagesGet(
          {
            path: {
              organizationId: orgId,
              userId,
              chatId,
            },
          }
        )

      return data ?? []
    },
    [orgId, userId]
  )
}
