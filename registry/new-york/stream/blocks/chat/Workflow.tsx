import React from "react"
import { mdiCheck, mdiLoading, mdiStarFourPoints } from "@mdi/js"
import { isString } from "lodash"

import { cn } from "../../lib/utils"
import { StreamIcon } from "../../ui/stream-icon"
import { Markdown } from "./Markdown"
import type { Source } from "./types"
import { firstCharToUpperCase } from "./utils"

export type SearchContentProps = {
  question: string
} & {
  knowledge_search: Source[]
  brand_knowledge: Source[]
  web_search: { result: string; sources: Source[] }[]
}

export interface BrainstormingWorkflowSearch {
  name: string
  content: SearchContentProps[]
}

export interface WorkflowBrandkitSection {
  sectionName: string
  sectionId: string
  fields: string[]
}

export interface WorkflowItem {
  name: string
  content: string | React.ReactNode | React.ReactNode[] | SearchContentProps[]
  isLoading?: boolean
  data?: {
    brandkitSections: WorkflowBrandkitSection[]
  }
}

export interface WorkflowProps {
  items: WorkflowItem[]
}

export function Workflow({ items }: WorkflowProps): React.ReactNode {
  if (!items.length) return null

  return (
    <div className="relative space-y-2 pl-6" data-testid="thinking_workflow">
      {items.map((item, index) => {
        const isComplete = !item.isLoading && item.content

        return (
          <div
            key={index}
            className="relative flex items-start gap-4 before:absolute before:top-8 before:bottom-0 before:left-3 before:w-[2px] before:bg-gray-200 before:content-[''] last:before:hidden"
          >
            {/* Icon */}
            <div className="relative z-10">
              <div
                className={cn(
                  "flex h-6 w-6 items-center justify-center rounded-full border-2 bg-white",
                  {
                    "border-purple-500": isComplete,
                    "border-gray-300": !isComplete,
                  }
                )}
              >
                <StreamIcon
                  path={
                    item.isLoading
                      ? mdiLoading
                      : isComplete
                        ? mdiCheck
                        : mdiStarFourPoints
                  }
                  size="3xs"
                  className={cn("h-4 w-4 text-gray-500", {
                    "animate-spin": item.isLoading,
                    "text-purple-500": isComplete,
                  })}
                />
              </div>
            </div>

            {/* Content */}
            <div className="min-h-20 flex-1">
              <h4 className="text-md text-blackAlpha-900 font-medium">
                {firstCharToUpperCase(item.name)}
              </h4>
              <div className="text-md text-blackAlpha-900 mt-1 font-normal">
                {isString(item.content) ? (
                  <Markdown id="workflow" text={item.content} />
                ) : (
                  (item.content as React.ReactNode | React.ReactNode[])
                )}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
