"use client"
import React, { FC, useState } from "react"
import CustomCodeBlock from "@/components/code-block"
import { Button } from "@/registry/new-york/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/registry/new-york/ui/tooltip"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/new-york/ui/select"

interface CodeItem {
  language: string
  filename: string
  code: string
}

type DemoObject = {
  title: string
  showTitle?: boolean
  description: string
  type: "top" | "bottom" | "right" | "left"
  tooltipContent: string
  codeContent: CodeItem[]
}

type TooltipDemoProps = {
  selectedDemo: DemoObject
}

const generateHoverTooltipCode = (side: "top" | "bottom" | "right" | "left") => `import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function TooltipDemo() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">${side.charAt(0).toUpperCase() + side.slice(1)}</Button>
      </TooltipTrigger>
      <TooltipContent side="${side}">
        <p>Add to library</p>
      </TooltipContent>
    </Tooltip>
  )
}`

export const TooltipDemo: FC<TooltipDemoProps> = ({ selectedDemo }) => {
  const [position, setPosition] = useState<"top" | "bottom" | "right" | "left">(selectedDemo.type)

  const positionOptions = [
    { value: "top", label: "Top" },
    { value: "bottom", label: "Bottom" },
    { value: "right", label: "Right" },
    { value: "left", label: "Left" },
  ]

  const handlePositionChange = (value: string) => {
    if (["top", "bottom", "right", "left"].includes(value)) {
      setPosition(value as "top" | "bottom" | "right" | "left")
    }
  }

  const sampleCode = [
    {
      language: "jsx",
      filename: "MyComponent.jsx",
      code: generateHoverTooltipCode(position),
    },
  ]

  // Capitalize the position for display
  const displayPosition = position.charAt(0).toUpperCase() + position.slice(1)

  return (
    <>
      <div>
        {selectedDemo.showTitle !== false && (
          <h2 className="mb-2 text-xl font-semibold md:text-2xl">
            {selectedDemo.title}
          </h2>
        )}

        <div className="mb-4">
          <Select
            key={position ?? "reset"}
            value={position}
            onValueChange={handlePositionChange}
          >
            <SelectTrigger className="bg-secondary border border-gray-200 text-black [&>svg]:text-black">
              <SelectValue placeholder="Select position" className="[&>span]:text-black" />
            </SelectTrigger>
            <SelectContent className="bg-secondary">
              {positionOptions.map(opt => (
                <SelectItem key={opt.value} value={opt.value} className="text-black">
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-center rounded-t-md bg-white p-25">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">{displayPosition}</Button>
            </TooltipTrigger>
            <TooltipContent side={position}>
              <p>{selectedDemo.tooltipContent}</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <CustomCodeBlock
          code={sampleCode}
          defaultValue="jsx"
          lineNumbers
          bgColor="bg-gray-100"
        />
      </div>
    </>
  )
}