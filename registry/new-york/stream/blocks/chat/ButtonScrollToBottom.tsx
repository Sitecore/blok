import React from "react"
import { mdiArrowDown } from "@mdi/js"

import { cn } from "@/lib/utils"
import { StreamIcon } from "@/registry/new-york/stream/ui/stream-icon"
import { Button } from "@/registry/new-york/ui/button"

interface ButtonScrollToBottomProps {
  isAtBottom: boolean
  scrollToBottom: () => void
}

export function ButtonScrollToBottom({
  isAtBottom,
  scrollToBottom,
  ...props
}: ButtonScrollToBottomProps): React.ReactNode {
  return (
    <Button
      variant="outline"
      colorScheme="neutral"
      size="icon"
      className={cn(
        "absolute top-[-4rem] right-16 z-10 bg-white shadow-lg transition-opacity hover:bg-gray-100",
        isAtBottom ? "opacity-0" : "opacity-100"
      )}
      onClick={() => scrollToBottom()}
      {...props}
    >
      <StreamIcon path={mdiArrowDown} />
      <span className="sr-only">Scroll to bottom</span>
    </Button>
  )
}
