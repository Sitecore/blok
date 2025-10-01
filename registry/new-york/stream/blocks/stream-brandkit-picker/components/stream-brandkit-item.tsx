"use client"

import React from "react"
import { type Brandkit } from "@sitecore/stream-ui-core"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/new-york/ui/avatar"
import { Button } from "@/registry/new-york/ui/button"

import { cn } from "../../../lib/utils"
import { GetDocumentProxyUrl } from "../../chat/GetDocumentProxyUrl"
import { firstCharToUpperCase } from "../../chat/utils"

export interface StreamBrandkitItemProps {
  brandkit: Brandkit
  onSelect?: (brandkit: Brandkit) => void
  testId?: string
  variant?: "link" | "default" | "ghost" | "outline" | null | undefined
  className?: string
  showAvatar?: boolean
  children?: React.ReactNode
}

export function StreamBrandkitItem({
  brandkit,
  onSelect,
  testId,
  className,
  variant = "ghost",
  showAvatar = true,
  children,
}: StreamBrandkitItemProps): React.ReactNode {
  /* Events */
  const handleBrandkitOnSelect = (brandkit: Brandkit): void => {
    onSelect?.(brandkit)
  }

  return (
    <Button
      data-testid={testId}
      variant={variant}
      className={cn(
        "flex items-center justify-start rounded-md px-1 py-4",
        className
      )}
      onClick={() => handleBrandkitOnSelect(brandkit)}
      title={brandkit.name}
    >
      {showAvatar && (
        <Avatar className="h-9 w-9 border-2">
          <GetDocumentProxyUrl
            url={brandkit?.logo}
            item={(url) => {
              return (
                <AvatarImage
                  className="object-contain"
                  src={url}
                  alt={brandkit?.name}
                />
              )
            }}
          />
          <AvatarFallback className="flex h-full w-full items-center justify-center font-bold text-gray-500">
            {firstCharToUpperCase(brandkit?.name)}
          </AvatarFallback>
        </Avatar>
      )}
      <span className="overflow-hidden overflow-ellipsis whitespace-nowrap">
        {brandkit?.name}
      </span>
      {children}
    </Button>
  )
}
