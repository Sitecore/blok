import React from "react"

import CustomCodeBlock from "@/components/code-block"
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

  const installcationCode = [
    {
      language: "cmd",
      filename: "cmd",
      code: `import {component} from “@components/ui/{componentName}`,
    },
  ]

  const sampleCode = [
    {
      language: "jsx",
      filename: "MyComponent.jsx",
      code: `<Hello world> 
<Hello world>
<Hello world>
<Hello world>
<Hello world>
<Hello world>`,
    },
  ]
  return (
    <div className="overflow-y-auto ">
      <div>
        <HeroSection
          title="Build better products faster"
          description="Blok is Sitecore's product design system: the UI framework and style guide we use to build great apps. It's publicly available, so that anyone can easily build software in the Sitecore product design language."
          buttons={buttons}
        />
      </div>

      <div className="mt-15 min-h-screen w-full bg-gray-50 md:mt-10">
        <div className="mx-6 flex flex-col space-y-2 pt-4 md:mx-12 md:pt-8 lg:mx-40">
          <h1 className="text-lg font-semibold md:text-xl">Add registry</h1>
          <p>
            Start by adding all Blok components from the registry to your
            codebase.
          </p>
          <div className="w-full sm:w-3/4 md:w-170">
            <CustomCodeBlock code={installcationCode} defaultValue="code" />
          </div>
        </div>
        <div className="mx-6 flex flex-col space-y-2 pt-4 md:mx-12 md:pt-8 lg:mx-40">
          <h1 className="text-lg font-semibold md:text-xl">
            Add component to page
          </h1>
          <p>
            The command above will add the components to your project. You can
            then import component onto pages like this
          </p>
          <p className="text-muted-foreground">(example used: button):</p>
          <div className="w-full sm:w-3/4 md:w-170">
            <CustomCodeBlock code={sampleCode} defaultValue="jsx" lineNumbers />
          </div>
        </div>
      </div>
    </div>
  )
}
