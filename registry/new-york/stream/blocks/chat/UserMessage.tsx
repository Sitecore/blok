import React, { useState } from "react"

import EditCommands from "./EditCommands"

export interface UserMessageProps {
  children?: React.ReactNode | React.ReactNode[] | string
}

export function UserMessage({ children }: UserMessageProps): React.ReactNode {
  const [showCommands, setShowCommands] = useState<boolean>(false)

  return (
    <div
      data-testid="user_message"
      className="group relative flex items-center justify-start"
      onMouseOver={() => setShowCommands(true)}
      onMouseOut={() => setShowCommands(false)}
    >
      <div className="text-body-text relative z-10 overflow-hidden text-3xl font-semibold break-words whitespace-pre-line">
        {children}
      </div>
      {showCommands && (
        <EditCommands>
          <EditCommands.Copy
            className="h-9 w-9"
            iconClassname="text-blackAlpha-400 text-2xs"
            text={children as string}
          />
        </EditCommands>
      )}
    </div>
  )
}
