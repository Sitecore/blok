"use client"
import React, { FC, useState } from "react"
import { Bold, Italic, Underline } from "lucide-react"
import CustomCodeBlock from "@/components/code-block"
import { Toggle } from "@/registry/new-york/ui/toggle"
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
  description: string
  type: "bold" | "italic" | "underline"
  showTitle?: boolean
  codeContent?: CodeItem[]
}

type ToggleDemoProps = {
  selectedDemo: DemoObject
}

const generateToggleCode = (type: "bold" | "italic" | "underline", variant: "rounded" | "square") => {
  const iconMap = {
    bold: "Bold",
    italic: "Italic",
    underline: "Underline",
  }
  return `import { ${iconMap[type]} } from "lucide-react"
import { Toggle } from "@/components/ui/toggle"

export function ToggleDemo() {
  return (
    <Toggle aria-label="Toggle ${type}" variant="${variant}">
      <${iconMap[type]} className="h-4 w-4" />
    </Toggle>
  )
}`
}

export const ToggleDemo: FC<ToggleDemoProps> = ({ selectedDemo }) => {
  const [toggleType, setToggleType] = useState<"bold" | "italic" | "underline">(selectedDemo.type)
  const [variant, setVariant] = useState<"rounded" | "square">("rounded")

  const toggleOptions = [
    { value: "bold", label: "Bold" },
    { value: "italic", label: "Italic" },
    { value: "underline", label: "Underline" },
  ]

  const variantOptions = [
    { value: "rounded", label: "Rounded" },
    { value: "square", label: "Square" },
  ]

  const handleToggleTypeChange = (value: string) => {
    if (["bold", "italic", "underline"].includes(value)) {
      setToggleType(value as "bold" | "italic" | "underline")
    }
  }

  const handleVariantChange = (value: string) => {
    if (["rounded", "square"].includes(value)) {
      setVariant(value as "rounded" | "square")
    }
  }

  const sampleCode = [
    {
      language: "jsx",
      filename: "ToggleDemo.jsx",
      code: generateToggleCode(toggleType, variant),
    },
  ]

  const renderToggle = () => {
    if (toggleType === "bold") {
      return (
        <Toggle aria-label="Toggle bold" variant={variant}>
          <Bold className="h-4 w-4" />
        </Toggle>
      )
    }
    if (toggleType === "italic") {
      return (
        <Toggle aria-label="Toggle italic" variant={variant}>
          <Italic className="h-4 w-4" />
        </Toggle>
      )
    }
    if (toggleType === "underline") {
      return (
        <Toggle aria-label="Toggle underline" variant={variant}>
          <Underline className="h-4 w-4" />
        </Toggle>
      )
    }
    return null
  }

  return (
    <>
      <div>
        {selectedDemo.showTitle !== false && (
          <h2 className="mb-2 text-xl font-semibold md:text-2xl">
            {selectedDemo.title}
          </h2>
        )}

        <div className="mb-4 flex space-x-4">
          {["Icon", "Main"].includes(selectedDemo.title) && (
            <Select
              key={toggleType ?? "reset"}
              value={toggleType}
              onValueChange={handleToggleTypeChange}
            >
              <SelectTrigger className="bg-secondary border border-gray-200 text-black [&>svg]:text-black w-[180px]">
                <SelectValue placeholder="Select toggle type" className="[&>span]:text-black" />
              </SelectTrigger>
              <SelectContent className="bg-secondary">
                {toggleOptions.map(opt => (
                  <SelectItem key={opt.value} value={opt.value} className="text-black">
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {["Variant", "Main"].includes(selectedDemo.title) && (
            <Select
              key={variant ?? "reset"}
              value={variant}
              onValueChange={handleVariantChange}
            >
              <SelectTrigger className="bg-secondary border border-gray-200 text-black [&>svg]:text-black w-[180px]">
                <SelectValue placeholder="Select variant" className="[&>span]:text-black" />
              </SelectTrigger>
              <SelectContent className="bg-secondary">
                {variantOptions.map(opt => (
                  <SelectItem key={opt.value} value={opt.value} className="text-black">
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        <div className="flex items-center justify-center rounded-t-md bg-white p-25">
          <div>{renderToggle()}</div>
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