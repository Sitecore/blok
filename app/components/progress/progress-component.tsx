import React, { FC } from "react";

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

type ProgressDemoProps = {
  selectedDemo: DemoObject;
};

import { Progress } from "@/registry/new-york/ui/progress";
import CustomCodeBlock from "@/components/code-block";

const generateProgressCode = () => `import { Progress } from "@/components/ui/progress"

export function ProgressDemo() {
  return <Progress value={80} /> 
}`

export const ProgressDemo: FC<ProgressDemoProps> = ({ selectedDemo }) => {
  const sampleCode = [
    {
      language: "jsx",
      filename: "MyComponent.jsx",
      code: generateProgressCode(),
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
          <Progress value={80} />
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