import React, { FC } from "react";

type DemoObject = {
  title: string;
  description: string;
  type: "success" | "warning" | "primary" | "default" | "danger";
};

type AlertDemoProps = {
  selectedDemo: DemoObject;
  alerText: string;
  alertDescription: string;
};

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/new-york/ui/tabs"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/registry/new-york/ui/alert"

export const AlertDemo: FC<AlertDemoProps> = ({ selectedDemo, alerText }) => {

  return (
    <>
      <div>
        <Tabs defaultValue="preview">
          <div className="flex justify-between">
            <div>
              <h2 className="text-xl md:text-2xl font-semibold mb-2">{selectedDemo.title}</h2>
              {/* <h2 className="text-xl md:text-2xl font-semibold mb-2">{alerText}</h2> */}
              <TabsList className="mb-4">
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="code">Code</TabsTrigger>
              </TabsList>
            </div>
          </div>

          <TabsContent
            value="preview"
            className="flex justify-center bg-white p-25"
          >
            <div className="">
              <Alert variant={selectedDemo.type}>
                <AlertTitle>{selectedDemo.title}</AlertTitle>
                <AlertDescription>
                  {selectedDemo.description}
                </AlertDescription>
              </Alert>

            </div>
          </TabsContent>

          <TabsContent value="code" className="flex justify-center bg-white p-25">
            test
          </TabsContent>
        </Tabs>
      </div>
      {/* <div className="grid max-w-xl items-start gap-4">

        <Alert variant="primary">
          <AlertDescription>
            This is a default (primary) alert. No title, only description.
          </AlertDescription>
        </Alert>
        <Alert variant="primary">
          <AlertTitle>Primary Alert</AlertTitle>
          <AlertDescription>
            This is a primary alert with a title and description.
          </AlertDescription>
        </Alert>
        <Alert variant="danger">
          <AlertTitle>Danger Alert</AlertTitle>
          <AlertDescription>
            This is a danger alert with a title and description.
          </AlertDescription>
        </Alert>
        <Alert variant="warning">
          <AlertTitle>Warning Alert</AlertTitle>
          <AlertDescription>
            This is a warning alert with a title and description.
          </AlertDescription>
        </Alert>
        <Alert variant="success">
          <AlertTitle>Success Alert</AlertTitle>
          <AlertDescription>
            This is a success alert with a title and description.
          </AlertDescription>
        </Alert>
        <Alert variant="primary">
          <AlertTitle>Closable Alert</AlertTitle>
          <AlertDescription>
            This is a primary alert with a title and description and even a close button.
          </AlertDescription>
          <Button
            size="sm"
            variant="link"
            className="absolute top-2.5 right-3 h-6 shadow-none"
          >
            Click
          </Button>
        </Alert>
        <Alert variant="primary">
          <AlertTitle>
            This is an extremely long alert title that spans multiple lines to
            demonstrate how the component handles very lengthy headings while
            maintaining readability and proper text wrapping behavior
          </AlertTitle>
          <AlertDescription>
            This is an equally long description that contains detailed information
            about the alert. It shows how the component can accommodate extensive
            content while preserving proper spacing, alignment, and readability
            across different screen sizes and viewport widths. This helps ensure
            the user experience remains consistent regardless of the content
            length.
          </AlertDescription>
        </Alert>
      </div> */}
    </>
  );
};