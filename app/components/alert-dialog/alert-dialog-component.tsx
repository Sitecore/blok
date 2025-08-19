import React, { FC } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/registry/new-york/ui/alert-dialog"
import { Button } from "@/registry/new-york/ui/button"
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
type AlertDialogDemoProps = {
  selectedDemo: DemoObject;
};

const generateAlertDialogCode = () => `import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

export function AlertDialogDemo() {
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline" colorScheme="neutral">Show Dialog</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}`

export const AlertDialogDemo: FC<AlertDialogDemoProps> = ({ selectedDemo }) => {
  const sampleCode = [
    {
      language: "jsx",
      filename: "MyComponent.jsx",
      code: generateAlertDialogCode(),
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
        <div>
          <div className="flex items-center justify-center rounded-t-md bg-white p-25">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" colorScheme="neutral">Show Dialog</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your
                    account and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
          <CustomCodeBlock
            code={sampleCode}
            defaultValue="jsx"
            lineNumbers
            containerClassNames="!rounded-t-none"
            bodyClassNames="bg-gray-100"
          />
        </div>
      </div>
    </>
  );
};