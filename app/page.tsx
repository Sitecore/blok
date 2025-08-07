import React from "react"

import { HeroSection } from "@/components/heroSection"

export default function page() {
  const buttons = [
    {
      text: "Get started",
      variant: "default",
      className:
        "rounded-full bg-purple-500 text-white hover:bg-purple-700 text-xs w-30",
    },
    {
      text: "Browse blocks",
      variant: "outline",
      className:
        "rounded-full border-gray-300 text-gray-600 hover:bg-gray-100 text-xs w-30",
    },
  ]

  return (
    <div>
      <div>
        <HeroSection
          title="Build better products faster"
          description="Blok is Sitecore's product design system: the UI framework and style guide we use to build great apps. It's publicly available, so that anyone can easily build software in the Sitecore product design language."
          buttons={buttons}
        />
      </div>
    </div>
  )
}
