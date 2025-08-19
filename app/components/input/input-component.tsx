"use client"
import React, { FC, useState } from "react"
import CustomCodeBlock from "@/components/code-block"
import { Input } from "@/registry/new-york/ui/input"
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
  description?: string
  type: "email" | "password" | "number" | "file",
  showTitle?: boolean
  codeContent?: CodeItem[]
}

type InputDemoProps = {
  selectedDemo: DemoObject
}

const generateInputCode = (type: "email" | "password" | "number" | "file") => {
  const placeholderMap = {
    email: "Email",
    password: "Password",
    number: "Number",
    file: "File",
  }
  return `import { Input } from "@/components/ui/input"

export function InputDemo() {
  return <Input type="${type}" placeholder="${placeholderMap[type]}" />
}`
}

export const InputDemo: FC<InputDemoProps> = ({ selectedDemo }) => {
  const [inputType, setInputType] = useState<"email" | "password" | "number" | "file">(selectedDemo.type)

  const inputOptions = [
    { value: "email", label: "Email" },
    { value: "password", label: "Password" },
    { value: "number", label: "Number" },
    { value: "file", label: "File" },
  ]

  const handleInputTypeChange = (value: string) => {
    if (["email", "password", "number", "file"].includes(value)) {
      setInputType(value as "email" | "password" | "number" | "file")
    }
  }

  const sampleCode = [
    {
      language: "jsx",
      filename: "InputDemo.jsx",
      code: generateInputCode(inputType),
    },
  ]

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
            key={inputType ?? "reset"}
            value={inputType}
            onValueChange={handleInputTypeChange}
          >
            <SelectTrigger className="bg-secondary border border-gray-200 text-black [&>svg]:text-black w-[180px]">
              <SelectValue placeholder="Select input type" className="[&>span]:text-black" />
            </SelectTrigger>
            <SelectContent className="bg-secondary">
              {inputOptions.map(opt => (
                <SelectItem key={opt.value} value={opt.value} className="text-black">
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-center rounded-t-md bg-white p-25">
          <div className="w-75">
            <Input
              type={inputType}
              placeholder={inputOptions.find(opt => opt.value === inputType)?.label || "Input"}
            />
          </div>
        </div>
        <CustomCodeBlock
          code={sampleCode}
          defaultValue="jsx"
          lineNumbers
          containerClassNames="!rounded-t-none"
          bodyClassNames="bg-gray-100"
        />
      </div>
    </>
  )
}