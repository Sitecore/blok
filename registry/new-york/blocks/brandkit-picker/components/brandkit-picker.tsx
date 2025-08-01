'use client'
import React, { useEffect, useState } from "react"
import { mdiChevronDown } from "@mdi/js"
import { type Brandkit } from "@sitecore/stream-ui-core"

import { BrandkitItem } from "@/registry/new-york/blocks/brandkit-item/components/brandkit-item"
import {
  BrandkitList,
  BrandkitListProps,
} from "@/registry/new-york/blocks/brandkit-list/components/brandkit-list"
import { Icon } from "@/registry/new-york/blocks/icon/components/icon"
import { cn } from "@/registry/new-york/lib/utils"
import { Button } from "@/registry/new-york/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/new-york/ui/popover"

export interface BrandkitPickerProps extends BrandkitListProps {
  disabled?: boolean
  className?: string
  testId?: string
}

export function BrandkitPicker({
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
}: BrandkitPickerProps): React.ReactNode {
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
            <BrandkitItem
              variant="outline"
              brandkit={selectedBrandkit}
              className="max-w-[240px] rounded-full"
              onSelect={handleBrandkitOnSelect}
              testId="brandkit-picker"
            />
          ) : (
            <Button
              variant="outline"
              colorScheme="neutral"
              className="text-md truncate rounded-full text-left font-normal"
            >
              {loading
                ? "Loading brandkit..."
                : selectedBrandkit?.name || "Select a brandkit"}
              <Icon path={mdiChevronDown} className="neutral transition" />
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
        <BrandkitList
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
