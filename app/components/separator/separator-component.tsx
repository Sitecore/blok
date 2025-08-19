import React, { FC } from "react";
import { Separator } from "@/registry/new-york/ui/separator"
import CustomCodeBlock from "@/components/code-block";

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
type SeparatorDemoProps = {
  selectedDemo: DemoObject;
};


const generateSeparatorCode = () => `import { Separator } from "@/components/ui/separator"

export function SeparatorDemo() {
  return (
    <div>
      <div className="flex flex-col gap-1">
        <div className="text-sm leading-none font-medium">Tailwind CSS</div>
        <div className="text-muted-foreground text-sm">
          A utility-first CSS framework.
        </div>
      </div>
      <Separator className="my-4" />
      <div className="flex h-5 items-center gap-4 text-sm">
        <div>Blog</div>
        <Separator orientation="vertical" />
        <div>Docs</div>
        <Separator orientation="vertical" />
        <div>Source</div>
      </div>
    </div>
  )
}`

export const SeparatorDemo: FC<SeparatorDemoProps> = ({ selectedDemo }) => {
  const sampleCode = [
    {
      language: "jsx",
      filename: "MyComponent.jsx",
      code: generateSeparatorCode(),
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
          <div className="">
            <div className="flex flex-col gap-1">
              <div className="text-sm leading-none font-medium">Tailwind CSS</div>
              <div className="text-muted-foreground text-sm">
                A utility-first CSS framework.
              </div>
            </div>
            <Separator className="my-4" />
            <div className="flex h-5 items-center gap-4 text-sm">
              <div>Blog</div>
              <Separator orientation="vertical" />
              <div>Docs</div>
              <Separator orientation="vertical" />
              <div>Source</div>
            </div>
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
  );
};