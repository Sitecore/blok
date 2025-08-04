"use client"

import React, { useEffect, useState } from "react"
import { mdiChevronDown } from "@mdi/js"
import { type Brandkit } from "@sitecore/stream-ui-core"

import { cn } from "@/registry/new-york/lib/utils"
import { StreamIcon } from "@/registry/new-york/stream/ui/stream-icon"
import { Button } from "@/registry/new-york/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/new-york/ui/popover"

import { StreamBrandkitItem } from "./stream-brandkit-item"
import {
  StreamBrandkitList,
  StreamBrandkitListProps,
} from "./stream-brandkit-list"

export interface StreamBrandkitPickerProps {
  brandkits: Brandkit[]
  recentBrandkit?: Brandkit
  onSelect?: (brandkit: Brandkit) => void
  onSearch?: (query: string) => Brandkit[]
  loading?: boolean
  placeholder?: string
  className?: string
  emptyStateMessage?: string
  disabled?: boolean
  testId?: string
}

export function StreamBrandkitPicker({
  brandkits,
  recentBrandkit,
  onSelect,
  onSearch,
  disabled,
  loading,
  placeholder = "Search",
  className,
  emptyStateMessage,
  testId,
}: StreamBrandkitPickerProps): React.ReactNode {
  /* Hooks */
  const [isOpen, setIsOpen] = useState(false)

  const [selectedBrandkit, setSelectedBrandkit] = useState<Brandkit | null>()

  /* Events */
  const handleBrandkitOnSelect = (brandkit: Brandkit): void => {
    setSelectedBrandkit(brandkit)
    onSelect?.(brandkit)
    setIsOpen(false)
  }

  useEffect(() => {
    if (recentBrandkit) setSelectedBrandkit(recentBrandkit)
  }, [recentBrandkit])

  return (
    <Popover
      open={isOpen}
      onOpenChange={(open: boolean | ((prevState: boolean) => boolean)) =>
        setIsOpen(open)
      }
      data-testid={testId}
    >
      <PopoverTrigger asChild disabled={disabled}>
        <div title={selectedBrandkit?.name || "Select a brandkit"}>
          {selectedBrandkit?.id ? (
            <StreamBrandkitItem
              variant="outline"
              brandkit={selectedBrandkit}
              className="max-w-[240px] rounded-full"
              onSelect={handleBrandkitOnSelect}
              testId="stream-brandkit-picker"
            />
          ) : (
            <Button
              variant="outline"
              className="text-md truncate rounded-full text-left font-normal"
            >
              {loading
                ? "Loading brandkit..."
                : selectedBrandkit?.name || "Select a brandkit"}
              <StreamIcon
                path={mdiChevronDown}
                className="neutral transition"
              />
            </Button>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent
        className={cn(className)}
        align="start"
        side="bottom"
        sideOffset={2}
        alignOffset={0}
        avoidCollisions={false}
      >
        <StreamBrandkitList
          brandkits={brandkits}
          placeholder={placeholder}
          recentBrandkit={recentBrandkit}
          onSelect={handleBrandkitOnSelect}
          onSearch={onSearch}
          loading={loading}
          emptyStateMessage={emptyStateMessage}
        />
      </PopoverContent>
    </Popover>
  )
}
