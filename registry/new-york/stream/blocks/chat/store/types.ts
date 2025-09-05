import { UseChatHelpers } from "ai/react"

export interface ArtifactsProperties {
  open: boolean
}

export interface Artifacts {
  [key: string]: ArtifactsProperties
}

export type BrainstormingSearchTypeOptions =
  | "web"
  | "knowledge"
  | "knowledge_web"

export type BrainstormingOptions =
  | {
      mode: "brainstorming"
      params: {
        searchType: BrainstormingSearchTypeOptions
      }
    }
  | {
      mode: "web_search"
      params: never
    }
  | undefined

export type BrandKitDetailsModalStateOptions = "create" | "edit" | "idle"

export type IsMessageAlreadyGeneratedProps = (message: string) => boolean

export type UserChatParams = UseChatHelpers & {
  addToolResult: ({
    toolCallId,
    result,
  }: {
    toolCallId: string
    result: unknown
  }) => void
}

export interface Session {
  orgId: string
  userId: string
  brandkitId: string
  chatId: string
  region: string
  env: "dev" | "qa" | "staging" | "preprod" | "prod"
  token: string
  apiEnv?: string
  isNewChat?: boolean
}
