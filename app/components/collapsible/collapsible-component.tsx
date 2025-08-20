"use client"
import React, { FC } from "react";
import { ChevronsUpDown } from "lucide-react"
import { Button } from "@/registry/new-york/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/registry/new-york/ui/collapsible"
import CustomCodeBlock from "../label/code-block";

interface CodeItem {
  language: string
  filename: string
  code: string
}
type DemoObject = {
  title: string;
  showTitle?: boolean
  codeContent: CodeItem[]
};

type CollapsibleDemoProps = {
  selectedDemo: DemoObject;
};


const generateCollapsibleCode = () => `"use client"

import * as React from "react"
import { ChevronsUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

export function CollapsibleDemo() {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="flex w-full flex-col gap-2 md:w-[350px]"
    >
      <div className="flex items-center justify-between gap-4 px-4">
        <h4 className="line-clamp-1 text-sm font-semibold">
          @peduarte starred 3 repositories
        </h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" colorScheme={"neutral"} size="icon">
            <ChevronsUpDown className="h-4 w-4" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-xs">
        @radix-ui/primitives
      </div>
      <CollapsibleContent className="flex flex-col gap-2">
        <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-xs">
          @radix-ui/colors
        </div>
        <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-xs">
          @stitches/react
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}`

export const CollapsibleDemo: FC<CollapsibleDemoProps> = ({ selectedDemo }) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const sampleCode = [
    {
      language: "jsx",
      filename: "MyComponent.jsx",
      code: generateCollapsibleCode(),
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

        <div className="flex items-center justify-center rounded-t-md bg-white p-25">
          <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className="flex w-full flex-col gap-2 md:w-[350px]"
          >
            <div className="flex items-center justify-between gap-4 px-4">
              <h4 className="line-clamp-1 text-sm font-semibold">
                @peduarte starred 3 repositories
              </h4>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" colorScheme={"neutral"} size="icon">
                  <ChevronsUpDown className="h-4 w-4" />
                  <span className="sr-only">Toggle</span>
                </Button>
              </CollapsibleTrigger>
            </div>
            <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-xs">
              @radix-ui/primitives
            </div>
            <CollapsibleContent className="flex flex-col gap-2">
              <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-xs">
                @radix-ui/colors
              </div>
              <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-xs">
                @stitches/react
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
        <CustomCodeBlock
          code={sampleCode}
          defaultValue="jsx"
          lineNumbers
        />
      </div>

    </>
  );
};