import { mdiFileDocumentOutline, mdiTextLong } from "@mdi/js"

import { TOOL_ACTIONS, type ToolActionType } from "./tools"

export type ToolDefinition = {
  name: string
  key: string
  description?: string
  icon: string
  action: ToolActionType
}

export const toolDefinitions: ToolDefinition[] = [
  {
    name: "Brainstorming",
    key: "brainstorming",
    description: "Create long form content (e.g. blogs, articles)",
    icon: mdiTextLong,
    action: TOOL_ACTIONS.TOGGLE_BRAINSTORMING,
  },
  {
    name: "Brief",
    key: "contentOpsBrief",
    description: "Generate content with contenthub ops briefs",
    icon: mdiFileDocumentOutline,
    action: TOOL_ACTIONS.TOGGLE_BRIEF,
  },
]

export const toolList = toolDefinitions
