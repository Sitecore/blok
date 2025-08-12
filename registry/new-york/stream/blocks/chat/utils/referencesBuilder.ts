type ReferenceTypeOptions =
  | 'brandkit'
  | 'document'
  | 'chat'
  | 'chatMessage'
  | 'component';

type ApiVersionOptions = 'v1' | 'v2';

interface Reference {
  type: ReferenceTypeOptions;
  id: string;
  path: string;
  isArtefact?: boolean;
}

export type PathOptions = Pick<Reference, 'id'> & {
  apiVersion?: ApiVersionOptions;
  isArtefact?: boolean;
};

interface ReferencesBuilderProps {
  addBrandkit: (options: PathOptions) => ReferencesBuilderProps;
  addDocument: (options: PathOptions) => ReferencesBuilderProps;
  addChat: (
    options: PathOptions & { brandkitId?: string }
  ) => ReferencesBuilderProps;
  addChatMessage: (
    options: PathOptions & { messageId: string }
  ) => ReferencesBuilderProps;
  addBrief: (
    options: PathOptions & { briefId: string }
  ) => ReferencesBuilderProps;
  build: () => Reference[];
}

export function ReferencesBuilder({
  orgId,
  userId,
}: {
  orgId: string;
  userId: string;
}): ReferencesBuilderProps {
  const references: Reference[] = [];

  return {
    addBrandkit: function ({
      id,
      apiVersion = 'v1',
      isArtefact,
    }: PathOptions): ReferencesBuilderProps {
      references.push({
        type: 'brandkit',
        id,
        path: `/api/brands/${apiVersion}/organizations/${orgId}/brandkits/${id}/references`,
        ...(isArtefact !== undefined && { isArtefact }),
      });
      return this;
    },
    addDocument: function ({
      id,
      apiVersion = 'v1',
      isArtefact,
    }: PathOptions): ReferencesBuilderProps {
      references.push({
        type: 'document',
        id,
        path: `/api/documents/${apiVersion}/organizations/${orgId}/documents/${id}/references`,
        ...(isArtefact !== undefined && { isArtefact }),
      });
      return this;
    },
    addChat: function ({
      id,
      apiVersion = 'v1',
      brandkitId = '',
      isArtefact,
    }: PathOptions & { brandkitId?: string }): ReferencesBuilderProps {
      references.push({
        type: 'chat',
        id,
        path: `/api/chats/${apiVersion}/organizations/${orgId}/users/${userId}/chats/${id}/references${brandkitId && `/${brandkitId}`}`,
        ...(isArtefact !== undefined && { isArtefact }),
      });
      return this;
    },
    addChatMessage: function ({
      id,
      messageId,
      apiVersion = 'v1',
      isArtefact,
    }: PathOptions & { messageId: string }): ReferencesBuilderProps {
      references.push({
        type: 'chatMessage',
        id: messageId,
        path: `/api/chats/${apiVersion}/organizations/${orgId}/users/${userId}/chats/${id}/messages/${messageId}/references`,
        ...(isArtefact !== undefined && { isArtefact }),
      });
      return this;
    },
    addBrief: function ({
      id,
      briefId,
      apiVersion = 'v1',
      isArtefact,
    }: PathOptions & { briefId: string }): ReferencesBuilderProps {
      references.push({
        type: 'chatMessage',
        id,
        path: `/api/briefs/${apiVersion}/organizations/${orgId}/briefs/${briefId}/references`,
        ...(isArtefact !== undefined && { isArtefact }),
      });
      return this;
    },
    build: function (): Reference[] {
      return references;
    },
  };
}

export default ReferencesBuilder;
