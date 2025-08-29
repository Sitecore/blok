import React from "react"

import { cn } from "../../../lib/utils"

interface ToolProps {
  testId?: string
  children: React.ReactNode | React.ReactNode[]
  className?: string
}

export function Tool({
  testId = "tool",
  children,
  className,
}: ToolProps): React.ReactNode {
  return (
    <div
      className={cn(
        "stream-chat-container group relative flex flex-col items-start gap-4",
        className
      )}
    >
      <div className="flex w-full flex-col">
        <div className="col-span-4 flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <div className="relative space-y-3" data-testid={`${testId}`}>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
