import { useCallback } from "react"
import {
  chat,
  type ListUserChatsModelResponseV2,
} from "@sitecore/stream-ui-core"

/**
 * Hook to retrieve the list of user chats for a specific organization and user.
 *
 * @param {string} orgId - The unique identifier of the organization.
 * @param {string} userId - The unique identifier of the user whose chats are to be fetched.
 * @return {function(): Promise<ListUserChatsModelResponseV2[]>} A function that, when invoked, returns a promise resolving to an array of chat data associated with the user.
 */
export function useGetChats(
  orgId: string,
  userId: string
): () => Promise<ListUserChatsModelResponseV2[]> {
  return useCallback(async (): Promise<ListUserChatsModelResponseV2[]> => {
    const { data } =
      await chat.listUserChatsV2ApiChatsV2OrganizationsOrganizationIdUsersUserIdChatsGet(
        {
          path: {
            organizationId: orgId,
            userId,
          },
        }
      )

    return data ?? []
  }, [orgId, userId])
}
