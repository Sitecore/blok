import React, { useEffect, useState } from "react"
import { mdiChevronDown } from "@mdi/js"
import { type Brandkit } from "@sitecore/stream-ui-core"

import { Button } from "@/registry/new-york/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/new-york/ui/popover"

import { useBrandkitById } from "../../../hooks/use-brandkit-by-id"
import { useGetChats } from "../../../hooks/use-get-chats"
import { cn } from "../../../lib/utils"
import { StreamIcon } from "../../../ui/stream-icon"
import { useChatProvider } from "../../chat/hooks/useChatProvider"
import { StreamBrandkitItem } from "./stream-brandkit-item"
import { StreamBrandkitList } from "./stream-brandkit-list"

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

/**
 * A component that renders a picker for selecting a brandkit.
 *
 * @param {Object} props - The properties to configure the component.
 * @param {Brandkit[]} props.brandkits - An array of available brandkits that can be selected.
 * @param {Brandkit|null} props.recentBrandkit - The most recently used brandkit to display by default.
 * @param {Function} props.onSelect - A callback function triggered when a brandkit is selected. Receives the selected brandkit as an argument.
 * @param {Function} [props.onSearch] - An optional callback function triggered when performing a search within the picker.
 * @param {boolean} [props.disabled=false] - A flag to disable interaction with the picker.
 * @param {boolean} [props.loading=false] - A flag to indicate a loading state for fetching brandkits.
 * @param {string} [props.placeholder="Search"] - Placeholder text shown in the search input field.
 * @param {string} [props.className] - Additional CSS classes for styling the component.
 * @param {string} [props.emptyStateMessage] - A message displayed when no brandkits are available.
 * @param {string} [props.testId] - A unique identifier for testing purposes.
 *
 * @return {React.ReactNode} The rendered brandkit picker component.
 */
export function StreamBrandkitPicker({
  brandkits,
  recentBrandkit: recentBrandkitFromProps,
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

  // Recent brandkit logic (mirrors BrandkitPickerNew): fetch chats -> take first reference id -> fetch brandkit
  const { session } = useChatProvider()
  const getChats = useGetChats(session.orgId, session.userId)
  const [recentBrandkitId, setRecentBrandkitId] = useState<string>("")
  const { brandkit: recentBrandkit, isLoading: isRecentBrandkitLoading } =
    useBrandkitById(recentBrandkitId, {
      organizationId: session.orgId,
      includeDeleted: false,
    })

  useEffect(() => {
    let isMounted = true
    async function fetchRecentFromChats() {
      try {
        if (!session?.orgId || !session?.userId) return
        const chats = await getChats()
        if (!isMounted) return
        if (Array.isArray(chats) && chats.length > 0) {
          const firstChat = chats[0]
          const brandkitId = firstChat.references?.[0]?.id ?? ""
          if (!brandkitId) return
          setRecentBrandkitId(brandkitId)
        }
      } catch (err) {
        // Swallow errors to avoid breaking the picker; recent brandkit is optional
        console.error("Failed to fetch chats for recent brandkit:", err)
      }
    }
    fetchRecentFromChats()
    return () => {
      isMounted = false
    }
  }, [getChats, onSelect, session?.orgId, session?.userId])

  /* Events */
  const handleBrandkitOnSelect = (brandkit: Brandkit): void => {
    setSelectedBrandkit(brandkit)
    onSelect?.(brandkit)
    setIsOpen(false)
  }

  // Prefer fetched recent brandkit, fallback to prop-provided one
  const effectiveRecentBrandkit =
    recentBrandkit ?? recentBrandkitFromProps ?? undefined

  useEffect(() => {
    if (effectiveRecentBrandkit) setSelectedBrandkit(effectiveRecentBrandkit)
  }, [effectiveRecentBrandkit])

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
              brandkit={selectedBrandkit}
              className="hover:bg-blackAlpha-100 border-blackAlpha-200 z-10 flex h-9 max-w-[240px] items-center justify-start rounded-full border-none bg-gray-50 py-1 pr-3 pl-1"
              testId="stream-brandkit-picker"
            >
              <StreamIcon
                path={mdiChevronDown}
                className="neutral transition"
              />
            </StreamBrandkitItem>
          ) : (
            <Button className="text-md hover:bg-blackAlpha-100 border-blackAlpha-200 z-10 h-9 max-w-[240px] justify-between truncate rounded-full border-none bg-gray-50 py-1 pr-3 pl-1 text-left font-normal">
              {loading || isRecentBrandkitLoading
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
          recentBrandkit={effectiveRecentBrandkit}
          onSelect={handleBrandkitOnSelect}
          onSearch={onSearch}
          loading={loading || isRecentBrandkitLoading}
          emptyStateMessage={emptyStateMessage}
        />
      </PopoverContent>
    </Popover>
  )
}
