import React from "react"
import { mdiLoading, mdiStarFourPoints } from "@mdi/js"

import { cn } from "@/lib/utils"
import { StreamIcon } from "@/registry/new-york/stream/ui/stream-icon"

export interface MessageSubtitleProps {
  icon?: string
  title?: string
  size?: "sm" | "lg"
  className?: string
  isGenerating?: boolean
}

export function MessageSubtitle({
  icon,
  title,
  size = "lg",
  className,
  isGenerating,
}: MessageSubtitleProps): React.ReactNode {
  return (
    <div
      data-testid={`message_subtitle_${title?.split(" ").join("_").toLowerCase()}`}
      className={cn(
        "subtle-text mb-3 flex items-center gap-3 font-semibold",
        size === "sm" ? "text-sm" : "text-lg",
        className
      )}
    >
      {isGenerating ? (
        <StreamIcon path={mdiLoading} className="animate-spin" />
      ) : (
        icon &&
        (icon === "sparkle" ? (
          <StreamIcon
            path={mdiStarFourPoints}
            size="xs"
            className="text-md text-current"
          />
        ) : (
          <StreamIcon path={icon} className="text-md h-6 w-6" />
        ))
      )}
      {title || ""}
    </div>
  )
}
