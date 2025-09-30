import React, { Fragment } from "react"
import { mdiCheckboxMarkedCircleOutline, mdiWeb } from "@mdi/js"

import { type ToolProps, type Tools } from "../../types"
import { Answer } from "../Answer"
import { Brainstorming } from "../brainstorming/Brainstorming"
import { Brief } from "../brief/Brief"
import { FollowupQuestions } from "../FollowupQuestions"
import { ThinkingTool } from "../ThinkingTool"

const TOOLS: Tools = {
  knowledge_search(props): React.ReactNode {
    return (
      <ThinkingTool
        title="Searched brand knowledge"
        icon={mdiCheckboxMarkedCircleOutline}
        {...props}
      />
    )
  },
  web_search(props): React.ReactNode {
    return <ThinkingTool title="Search the web" icon={mdiWeb} {...props} />
  },
  brand_knowledge(props): React.ReactNode {
    return (
      <ThinkingTool
        title="Used brand kit sections"
        icon={mdiCheckboxMarkedCircleOutline}
        {...props}
      />
    )
  },
  answer(props): React.ReactNode {
    return <Answer {...props} />
  },
  followup_questions(props): React.ReactNode {
    return <FollowupQuestions {...props} />
  },
  brief(props): React.ReactNode {
    return <Brief {...props} />
  },
  brainstorming(props): React.ReactNode {
    return <Brainstorming {...props} />
  },
}

export function createTool({
  id,
  messageId,
  message,
  toolInvocation,
}: ToolProps): React.ReactNode {
  const { toolName, toolCallId } = toolInvocation

  if (!TOOLS[toolName]) return null

  return (
    <Fragment key={`${toolName}_${toolCallId}`}>
      {
        TOOLS[toolName]({
          id,
          messageId,
          message,
          toolInvocation,
        }) as React.ReactNode
      }
    </Fragment>
  )
}
