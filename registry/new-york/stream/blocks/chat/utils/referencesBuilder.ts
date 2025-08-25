type ReferenceType =
  | "brandkit"
  | "document"
  | "chat"
  | "chatMessage"
  | "component"

type ApiVersion = "v1" | "v2"

type Reference = {
  type: ReferenceType
  id: string
  path: string
  isArtefact?: boolean
}

export type PathOptions = Pick<Reference, "id"> & {
  apiVersion?: ApiVersion
  isArtefact?: boolean
}

export function ReferencesBuilder({
  orgId,
  userId,
}: {
  orgId: string
  userId: string
}) {
  const references: Reference[] = []

  return {
    addBrandkit: function ({ id, apiVersion = "v1", isArtefact }: PathOptions) {
      references.push({
        type: "brandkit",
        id,
        path: `/api/brands/${apiVersion}/organizations/${orgId}/brandkits/${id}/references`,
        ...(() => {
          return (
            isArtefact !== undefined && {
              isArtefact,
            }
          )
        })(),
      })
      return this
    },
    addDocument: function ({ id, apiVersion = "v1", isArtefact }: PathOptions) {
      references.push({
        type: "document",
        id,
        path: `/api/documents/${apiVersion}/organizations/${orgId}/documents/${id}/references`,
        ...(() => {
          return (
            isArtefact !== undefined && {
              isArtefact,
            }
          )
        })(),
      })
      return this
    },
    addChat: function ({
      id,
      apiVersion = "v1",
      brandkitId = "",
      isArtefact,
    }: PathOptions & { brandkitId?: string }) {
      references.push({
        type: "chat",
        id,
        path: `/api/chats/${apiVersion}/organizations/${orgId}/users/${userId}/chats/${id}/references${brandkitId && `/${brandkitId}`}`,
        ...(() => {
          return (
            isArtefact !== undefined && {
              isArtefact,
            }
          )
        })(),
      })
      return this
    },
    addChatMessage: function ({
      id,
      messageId,
      apiVersion = "v1",
      isArtefact,
    }: PathOptions & { messageId: string }) {
      references.push({
        type: "chatMessage",
        id: messageId,
        path: `/api/chats/${apiVersion}/organizations/${orgId}/users/${userId}/chats/${id}/messages/${messageId}/references`,
        ...(() => {
          return (
            isArtefact !== undefined && {
              isArtefact,
            }
          )
        })(),
      })
      return this
    },
    build: function () {
      return references
    },
  }
}

export default ReferencesBuilder
