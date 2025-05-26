"use client"

import * as React from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion"

import { cn } from "@/registry/new-york/lib/utils"

export function ComponentWrapper({
  className,
  name,
  children,
  ...props
}: React.ComponentPropsWithoutRef<"div"> & { name: string }) {
  return (
    <ComponentErrorBoundary name={name}>
      <Accordion type="single" collapsible defaultValue={name}>
        <div
          id={name}
          data-name={name.toLowerCase()}
          className={cn(
            "flex w-full scroll-mt-16 flex-col rounded-lg border",
            className
          )}
          {...props}
        >
          <AccordionItem key={name} value={name}>
            <AccordionTrigger className="flex w-full cursor-pointer items-center justify-between border-b py-2">
              <div className="px-4 py-3">
                <div className="text-sm font-medium">
                  {getComponentName(name)}
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="py-2 text-sm">
              <div className="flex flex-1 items-center gap-2 p-4">
                {children}
              </div>
            </AccordionContent>
          </AccordionItem>
        </div>
      </Accordion>
    </ComponentErrorBoundary>
  )
}

class ComponentErrorBoundary extends React.Component<
  { children: React.ReactNode; name: string },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; name: string }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error(`Error in component ${this.props.name}:`, error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 text-red-500">
          Something went wrong in component: {this.props.name}
        </div>
      )
    }

    return this.props.children
  }
}

function getComponentName(name: string) {
  // convert kebab-case to title case
  return name.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())
}
