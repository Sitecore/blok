import React, { Fragment } from "react"
import { mdiLinkVariant, mdiOpenInNew } from "@mdi/js"

import { Button } from "@/registry/new-york/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/new-york/ui/popover"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/registry/new-york/ui/tooltip"

import { cn } from "../../lib/utils"
import { StreamIcon } from "../../ui/stream-icon"
import { GetDocumentProxyUrl } from "./GetDocumentProxyUrl"
import type { Source } from "./types"

export interface AnchorsProps {
  testId?: string
  items: Source[]
  className?: string
  buttonClassName?: string
}

const MAX_TAGS = 3

export function Anchors({
  testId = "anchors",
  items,
  className,
  buttonClassName,
}: AnchorsProps): React.ReactNode {
  if (!items?.length) return null

  const button = ({
    index,
    name,
    title,
    url,
  }: Source & { index: number | string }) => {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            data-testid={`${testId}_anchor_button_${index}`}
            variant="outline"
            className={cn(
              "text-md text-blackAlpha-600 my-[6px] h-[33px] max-w-[146px] p-0 font-semibold",
              buttonClassName
            )}
          >
            <GetDocumentProxyUrl
              url={url}
              item={(url) => {
                return (
                  <a
                    href={url}
                    className="flex h-full w-full items-center justify-center space-x-2 px-3"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <StreamIcon path={mdiLinkVariant} />
                    <span className="truncate">{name || title}</span>
                    <StreamIcon path={mdiOpenInNew} />
                  </a>
                )
              }}
            />
          </Button>
        </TooltipTrigger>
        <TooltipContent>{name || title}</TooltipContent>
      </Tooltip>
    )
  }

  return (
    <div
      data-testid={`anchors_container`}
      className={cn("my-[6px] flex flex-wrap items-center gap-x-3", className)}
    >
      {items
        ?.filter((_, index) => index < MAX_TAGS)
        .map((item, index) => (
          <Fragment key={`max_${index}`}>{button({ ...item, index })}</Fragment>
        ))}
      {items?.length > MAX_TAGS && (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="text-md text-blackAlpha-600 h-[33px] px-3 py-0 font-semibold"
            >
              +{items?.length - MAX_TAGS}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="flex w-min flex-col gap-4 p-4" align="end">
            {items
              ?.filter((_, index) => index > MAX_TAGS - 1)
              .map((item, index) => (
                <Fragment key={`rest_${index}`}>
                  {button({ ...item, index: `additional_${index}` })}
                </Fragment>
              ))}
          </PopoverContent>
        </Popover>
      )}
    </div>
  )
}
