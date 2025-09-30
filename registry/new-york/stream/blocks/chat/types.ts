import { type FunctionComponent } from "react"
import { type UIMessage } from "@ai-sdk/ui-utils"
import {
  type ReferenceModel,
  type ToolInvocation,
} from "@sitecore/stream-ui-core"
import { type Message } from "ai"

import { type Artifacts } from "../chat/store/types"
import { TOOLS_SOURCES_TITLES } from "./utils"

export type ExtractSourceRecordProps = Record<
  (typeof TOOLS_SOURCES_TITLES)[keyof typeof TOOLS_SOURCES_TITLES],
  Source[]
>
export type ExtractSourceProps = [
  (typeof TOOLS_SOURCES_TITLES)[keyof typeof TOOLS_SOURCES_TITLES],
  Source[],
]
export type ExtractSourcesProps = ExtractSourceProps[]

export interface MessageContent {
  type: "text"
  tool: string
  value: object
}

export interface ToolProps {
  id?: number | string
  messageId: string
  message: UIMessage
  toolInvocation: ToolInvocationRefProps
}

export type HTTPValidationError = {
  detail: {
    loc: string | number[]
    msg: string
    type: string
  }[]
}

export interface ToolInvocationsProps {
  messageId: string
  message: UIMessage
  toolInvocations: ToolInvocationRefProps[]
  isLastMessage: boolean
}

export interface Source {
  id: string
  documentId: string
  title: string
  url: string
  description: string
  type: "image" | "pdf" | void
  name: string
  siteName: string
  content: string
  snippet: string
}

export type ToolInvocationRefProps = ToolInvocation & {
  reference: ReferenceModel
}

export interface Tools {
  [key: string]: FunctionComponent<ToolProps>
}

export interface DbPart {
  tool: string
  value: Record<string, unknown>
}

export interface MessageAnnotation {
  id: string
  references: Array<ReferenceModel>
}

export interface MessageFeedback {
  type?: "good" | "bad"
  message?: string
  reason?: string
  categories?: string[]
}

// ListUserChatMessagesModelResponseV2
export interface DBMessage {
  id: string
  role: "system" | "user" | "assistant" | "tool"
  content: unknown
  references: Array<ReferenceModel>
  timestamp: number
  feedback?: MessageFeedback
}

export type SelectionTypes =
  | "messages"
  | "artifacts"
  | "isChatActionPending"
  | "hasError"
  | "input"
export type SelectionValues =
  | ["messages", Message[]]
  | ["artifacts", Artifacts]
  | ["isChatActionPending", boolean]
  | ["hasError", boolean]
  | ["input", string]
export type Selections = SelectionTypes | SelectionValues
export type ResetSelections = Selections[]
