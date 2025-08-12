import React, { ReactNode, useEffect, useRef, useState } from "react"
import {
  mdiArrowCollapseVertical,
  mdiArrowExpandVertical,
  mdiChevronUp,
  mdiLoading,
} from "@mdi/js"

import { cn } from "@/lib/utils"
import { Button } from "@/registry/new-york/ui/button"

import { useAutoScroll } from "../hooks/useAutoScroll"
import { Icon } from "../Icon"

interface RevealSharedProps {
  id: string
  children?: ReactNode | ReactNode[]
  isRevealed?: boolean
  className?: string
  isGenerating?: boolean
  position?: "left" | "right"
  isExpandable?: boolean
}

type RevealTitleProps = RevealSharedProps & {
  title?: string
  titleStreamStart?: never
  titleStreamEnd?: never
}

type RevealStreamTitlesProps = RevealSharedProps & {
  title?: never
  titleStreamStart: string
  titleStreamEnd: string
}

export type RevealProps = RevealTitleProps | RevealStreamTitlesProps

export function Reveal({
  id,
  isRevealed,
  position = "left",
  title,
  titleStreamStart = "",
  titleStreamEnd,
  children,
  isExpandable = false,
  isGenerating,
  className = "",
}: RevealProps): React.ReactNode {
  /* Hooks */
  const { contentRef, handleStopAutoScrollingOnScroll } =
    useAutoScroll(children)
  const [reveal, setReveal] = useState<boolean>(false)
  const [expand, setExpand] = useState<boolean>(false)
  const mounted = useRef(false)

  /* Computed */
  const isRevealing = isRevealed || reveal

  function handleRevealOnClick(): void {
    setReveal(!reveal)
  }

  function handleExpandOnClick(): void {
    setExpand(!expand)
  }

  useEffect(
    function () {
      if (!mounted.current && isGenerating) {
        setReveal(true)
        mounted.current = true
      }
    },
    [isGenerating]
  )

  return (
    <section
      data-testid={`thinking_reveal_${id}`}
      className={cn(
        "bg-blackAlpha-50 relative mb-5 flex flex-col rounded-lg p-2 transition-all",
        className
      )}
    >
      <header className="flex">
        <Button
          data-testid={`thinking_reveal_${reveal ? "close" : "open"}_${id}`}
          variant="link"
          className={cn(
            "text-md text-neutral-fg w-full flex-1 justify-start px-0 py-2 font-normal hover:no-underline",
            position === "right" && "justify-end"
          )}
          onClick={handleRevealOnClick}
        >
          {isGenerating && <Icon path={mdiLoading} className="animate-spin" />}
          {title ? title : isGenerating ? titleStreamStart : titleStreamEnd}
          <Icon
            path={mdiChevronUp}
            className={cn(
              "rotate-0 transition-all duration-200",
              !isRevealing && "rotate-180"
            )}
          />
        </Button>
        {isRevealing && isExpandable && (
          <Button
            onClick={handleExpandOnClick}
            data-testid={`thinking_reveal_${reveal ? "close" : "open"}_${id}`}
            variant={"ghost"}
            colorScheme="neutral"
            size={"icon"}
            className="self-end"
          >
            <Icon
              path={!expand ? mdiArrowExpandVertical : mdiArrowCollapseVertical}
            />
          </Button>
        )}
      </header>
      <div
        data-testid={`reveal_content_${id}`}
        ref={contentRef}
        className={cn(
          "flex max-h-0 flex-col space-y-5 opacity-0 transition-all duration-300",
          isRevealing && "mt-2 max-h-[450px] overflow-y-auto opacity-100",
          isRevealing && expand && "max-h-full"
        )}
        onWheel={handleStopAutoScrollingOnScroll}
      >
        {isRevealing && children}
      </div>
    </section>
  )
}
