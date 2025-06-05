"use client"

import * as React from "react"
import { mdiClose, mdiCheck, mdiChevronDown, mdiChevronUp } from "@mdi/js"
import Icon from "@mdi/react"

import { cn } from "@/lib/utils"
import { Button } from "@/registry/new-york/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/registry/new-york/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/new-york/ui/popover"
import { Badge } from "@/registry/new-york/ui/badge"

const filterVariants = {
  single: "single",
  multi: "multi",
  badge: "badge",
} as const

type FilterVariant = keyof typeof filterVariants

interface FilterProps<T extends { value: string; label: string }> {
  items: T[]
  placeholder: string
  variant?: FilterVariant
  className?: string
  selectedItems: T | T[]
  onSelect?: (value: T | T[] | null) => void
  onClear?: () => void
}

export function Filter<T extends { value: string; label: string }>({
  items,
  placeholder,
  variant = "single",
  className,
  selectedItems,
  onSelect,
  onClear,
}: FilterProps<T>) {
  const [open, setOpen] = React.useState(false)

  // Ensure selectedItems is always an array
  const selectedItemsArray = React.useMemo(() => {
    if (!selectedItems) return []
    return Array.isArray(selectedItems) ? selectedItems : [selectedItems]
  }, [selectedItems])

  const handleSelect = (item: T) => {
    if (variant === "single") {
      onSelect?.(item)
      setOpen(false)
    } else {
      const isSelected = selectedItemsArray.some((i) => i.value === item.value)
      const newItems = isSelected
        ? selectedItemsArray.filter((i) => i.value !== item.value)
        : [...selectedItemsArray, item]
      onSelect?.(newItems)
    }
  }

  const handleRemoveItem = (item: T, e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    if (variant === "single") {
      onSelect?.(null)
    } else {
      const newItems = selectedItemsArray.filter((i) => i.value !== item.value)
      onSelect?.(newItems)
    }
  }

  const isActive = open

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          colorScheme="neutral"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "border-input border-1 data-[state=open]:border-2 data-[state=open]:border-primary rounded-md text-md data-[placeholder]:text-muted-foreground flex w-fit items-center justify-between gap-2 bg-white px-3 py-2 whitespace-nowrap transition-[color,box-shadow] outline-none focus-visible:ring-[1px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 h-10",
            isActive && "border-2 border-primary",
            className
          )}
        >
          <span className={cn("flex items-center gap-2", isActive ? "text-neutral-fg" : "text-black")}>
            <span className="text-neutral-fg">
              {placeholder}{selectedItemsArray.length > 0 && ":"}
            </span>
            {selectedItemsArray.length > 0 && (
              <span className="font-medium flex items-center gap-1.5">
                {variant === "badge" ? (
                  selectedItemsArray.map((item) => (
                    <Badge 
                      key={item.value} 
                      colorScheme="neutral" 
                      className="text-xs flex items-center gap-1 group"
                    >
                      {item.label}
                      <div
                        role="button"
                        tabIndex={0}
                        className="p-0 h-4 w-4 flex items-center justify-center opacity-50 group-hover:opacity-100 transition-opacity cursor-pointer"
                        onClick={(e) => handleRemoveItem(item, e)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault()
                            handleRemoveItem(item, e as unknown as React.MouseEvent<HTMLDivElement>)
                          }
                        }}
                      >
                        <Icon
                          path={mdiClose}
                          size={0.7}
                        />
                      </div>
                    </Badge>
                  ))
                ) : (
                  selectedItemsArray.map((item) => item.label).join(", ")
                )}
              </span>
            )}
          </span>
          {selectedItemsArray.length > 0 && onClear ? (
            <div
              role="button"
              tabIndex={0}
              className="flex items-center justify-center h-4 w-4 p-0 hover:opacity-80 transition-opacity cursor-pointer"
              onClick={(e) => {
                e.stopPropagation()
                onClear()
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  e.stopPropagation()
                  onClear()
                }
              }}
            >
              <Icon
                path={mdiClose}
                size={0.9}
                className={cn("text-neutral-fg", isActive && "text-neutral-fg")}
              />
            </div>
          ) : (
            <Icon
              path={open ? mdiChevronUp : mdiChevronDown}
              size={0.9}
              className="text-neutral-fg"
            />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
        <Command>
          <CommandInput placeholder={`Search ${placeholder.toLowerCase()}...`} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={() => handleSelect(item)}
                >
                  {variant === "badge" ? (
                    <div className="flex items-center justify-between w-full">
                      <Badge 
                        colorScheme="neutral" 
                        className={cn(
                          "text-xs",
                          selectedItemsArray.some((i) => i.value === item.value) && "bg-neutral-100"
                        )}
                      >
                        {item.label}
                      </Badge>
                      <Icon
                        path={mdiCheck}
                        size={0.7}
                        className={cn(
                          "ml-2",
                          selectedItemsArray.some((i) => i.value === item.value)
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </div>
                  ) : variant === "multi" ? (
                    <div
                      className={cn(
                        "border-input data-[selected=true]:border-primary data-[selected=true]:bg-primary data-[selected=true]:text-primary-foreground pointer-events-none size-4 shrink-0 rounded-[4px] border transition-all select-none *:[svg]:opacity-0 data-[selected=true]:*:[svg]:opacity-100 flex items-center justify-center",
                        selectedItemsArray.some((i) => i.value === item.value) &&
                          "border-primary bg-primary text-primary-foreground"
                      )}
                      data-selected={selectedItemsArray.some((i) => i.value === item.value)}
                    >
                      <Icon
                        path={mdiCheck}
                        size={0.7}
                        className="size-3.5 text-current"
                      />
                    </div>
                  ) : null}
                  {variant !== "badge" && item.label}
                  {variant === "single" && (
                    <Icon
                      path={mdiCheck}
                      size={0.7}
                      className={cn(
                        "ml-auto",
                        selectedItemsArray.some((i) => i.value === item.value)
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
