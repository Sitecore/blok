"use client"

import React, { FC } from "react"

import CustomCodeBlock from "@/components/code-block"
import { Button } from "@/registry/new-york/ui/button"

import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/registry/new-york/ui/hover-card"
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/new-york/ui/avatar"

interface CodeItem {
  language: string
  filename: string
  code: string
}

type DemoObject = {
  title: string
  showTitle?: boolean
  description: string
  codeContent: CodeItem[]
}

type HoverCardDemoProps = {
  selectedDemo: DemoObject
}

const generatePopoverCode = `import { CalendarIcon } from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

export function HoverCardDemo() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">@nextjs</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between gap-4">
          <Avatar>
            <AvatarImage src="https://github.com/vercel.png" />
            <AvatarFallback>VC</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">@nextjs</h4>
            <p className="text-sm">
              The React Framework – created and maintained by @vercel.
            </p>
            <div className="text-muted-foreground text-xs">
              Joined December 2021
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}`

export const HoverCardDemo: FC<HoverCardDemoProps> = ({ selectedDemo }) => {
  const sampleCode = [
    {
      language: "jsx",
      filename: "MyComponent.jsx",
      code: generatePopoverCode,
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
          <HoverCard>
                <HoverCardTrigger asChild>
                  <Button variant="link">@nextjs</Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="flex justify-between gap-4">
                    <Avatar>
                      <AvatarImage src="https://github.com/vercel.png" />
                      <AvatarFallback>VC</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <h4 className="text-sm font-semibold">@nextjs</h4>
                      <p className="text-sm">
                        The React Framework – created and maintained by @vercel.
                      </p>
                      <div className="text-muted-foreground text-xs">
                        Joined December 2021
                      </div>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
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
