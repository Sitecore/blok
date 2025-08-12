import React from "react"
import { mdiContentCopy } from "@mdi/js"

import { cn } from "@/lib/utils"
import { StreamIcon } from "@/registry/new-york/stream/ui/stream-icon"
import { Button } from "@/registry/new-york/ui/button"

import { copyToClipboard } from "./utils"

interface EditCommandsProps {
  children: React.ReactNode
  className?: string
}

type CopyCommandProps = { className?: string; iconClassname?: string } & (
  | { text: string; onClick?: never }
  | { text?: never; onClick: () => void }
  | { text?: never; onClick?: never }
)

function CopyCommand({
  className,
  iconClassname,
  text,
  onClick,
}: CopyCommandProps): React.ReactNode {
  const handleCopyToClipboardOnClick = (): void => {
    if (onClick) {
      onClick()
      return
    }
    if (text) copyToClipboard(text)
  }

  return (
    <>
      <Button
        data-testid="edit_commands_copy"
        className={cn("", className)}
        size="icon"
        variant="ghost"
        colorScheme="neutral"
        onClick={handleCopyToClipboardOnClick}
      >
        <StreamIcon className={cn("", iconClassname)} path={mdiContentCopy} />
      </Button>
    </>
  )
}

function EditCommands({
  children,
  className,
}: EditCommandsProps): React.ReactNode {
  return (
    <div
      data-testid="edit_commands_container"
      className={cn("flex justify-between", className)}
    >
      {children}
    </div>
  )
}

EditCommands.Copy = CopyCommand

export default EditCommands
