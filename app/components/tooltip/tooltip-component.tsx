import React, { FC } from "react"

import CustomCodeBlock from "@/components/code-block"
import { Button } from "@/registry/new-york/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/registry/new-york/ui/tooltip"

interface CodeItem {
  language: string
  filename: string
  code: string
}

type DemoObject = {
  title: string
  description: string
  type: "top" | "bottom" | "right" | "left"
  tooltipContent: string
  codeContent: CodeItem[]
}

type TooltipDemoProps = {
  selectedDemo: DemoObject
}

export const TooltipDemo: FC<TooltipDemoProps> = ({ selectedDemo }) => {
  return (
    <>
      <div>
        <h2 className="mb-2 text-xl font-semibold md:text-2xl">
          {selectedDemo.title}
        </h2>

        <div className="flex items-center justify-center rounded-t-md bg-white p-25">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">{selectedDemo.title}</Button>
            </TooltipTrigger>
            <TooltipContent side={selectedDemo.type}>
              <p>{selectedDemo.tooltipContent}</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <CustomCodeBlock
          code={selectedDemo.codeContent}
          defaultValue="jsx"
          lineNumbers
          bgColor="bg-gray-100"
        />
      </div>
    </>
  )
}
