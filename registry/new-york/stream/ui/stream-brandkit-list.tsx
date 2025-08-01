"use client"

import React, { useEffect, useState } from "react"
import { type Brandkit } from "@sitecore/stream-ui-core"

import { cn } from "@/registry/new-york/lib/utils"
import { StreamSpinner } from "@/registry/new-york/stream/ui/stream-spinner"
import { Input } from "@/registry/new-york/ui/input"
import { Separator } from "@/registry/new-york/ui/separator"

import { StreamBrandkitItem } from "./stream-brandkit-item"

export interface StreamBrandkitListProps {
  brandkits: Brandkit[]
  recentBrandkit?: Brandkit
  onSelect?: (brandkit: Brandkit) => void
  onSearch?: (query: string) => Brandkit[]
  loading?: boolean
  placeholder?: string
  className?: string
  emptyStateMessage?: string
  testId?: string
}

export function StreamBrandkitList({
  brandkits,
  recentBrandkit,
  onSelect,
  onSearch,
  loading,
  placeholder = "Search",
  className,
  emptyStateMessage,
  testId,
}: StreamBrandkitListProps): React.ReactNode {
  /* Hooks */
  const [filteredBrandkits, setFilteredBrandkits] = useState<Brandkit[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  /* Events */
  const handleBrandkitOnSelect = (brandkit: Brandkit): void => {
    onSelect?.(brandkit)
  }

  const handleSearchOnChange = (query: string): void => {
    setSearchQuery(query)
    if (onSearch) {
      setFilteredBrandkits(onSearch(query))
      return
    }
    setFilteredBrandkits(
      brandkits.filter((brandkit) =>
        brandkit.name.toLowerCase().includes(query.toLowerCase())
      )
    )
  }

  useEffect(() => {
    if (brandkits) setFilteredBrandkits(brandkits)
  }, [brandkits])

  return (
    <section
      className={cn("flex flex-col gap-2", className)}
      data-testid={testId}
    >
      <div className="flex flex-col gap-2">
        <span className="flex items-center gap-2 font-semibold">
          Recent Brand
        </span>
        {recentBrandkit && (
          <StreamBrandkitItem
            brandkit={recentBrandkit}
            onSelect={handleBrandkitOnSelect}
          />
        )}
        {loading && <div className="py-1">Loading brandkit...</div>}
        {recentBrandkit === undefined && !loading && (
          <div className="py-1">No recent brandkit</div>
        )}
        <Separator />
        <span className="my-4 flex items-center gap-2 font-semibold">
          All Brands {loading && <StreamSpinner size={"xs"} />}
        </span>
        <Input
          type="search"
          placeholder={placeholder}
          className="rounded-lg"
          value={searchQuery}
          onChange={(e: { target: { value: string } }) =>
            handleSearchOnChange(e.target.value)
          }
        />
      </div>
      <div className="mt-2 flex max-h-96 min-h-48 flex-1 flex-col gap-1 overflow-y-auto">
        {filteredBrandkits?.map((brandkit: Brandkit) => (
          <StreamBrandkitItem
            key={brandkit.id}
            brandkit={brandkit}
            onSelect={handleBrandkitOnSelect}
          />
        ))}

        {loading && (
          <div className="grid flex-1 place-items-center">
            <div className="flex flex-col items-center gap-6">
              <StreamSpinner size="lg" />
              <span>Loading brandkits...</span>
            </div>
          </div>
        )}

        {!brandkits?.length && !loading && (
          <div className="grid flex-1 place-items-center">
            <div className="flex flex-col items-center gap-6">
              <span>{emptyStateMessage || "No brandkits found"}</span>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
