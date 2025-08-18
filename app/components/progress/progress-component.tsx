import React, { FC } from "react";

type DemoObject = {
  title: string;
  description: string;
  type: "primary";
};

type ProgressDemoProps = {
  selectedVariant?: DemoObject;
};

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/new-york/ui/tabs"

import { Progress } from "@/registry/new-york/ui/progress";

export const ProgressDemo: FC<ProgressDemoProps> = ({ selectedVariant }) => {

  return (
    <>
      <div className=" ">
        <Tabs defaultValue="preview">
          <div className="flex justify-between">
            <div>
               <h2 className="text-xl md:text-2xl font-semibold mb-2">{selectedVariant?.title}</h2>
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
            <div className="w-full">
              {/* <Alert variant={selectedVariant.type}>
                <AlertTitle>{selectedVariant.title}</AlertTitle>
                <AlertDescription>
                  {selectedVariant.description}
                </AlertDescription>
              </Alert> */}

              <Progress value={80} />

            </div>
          </TabsContent>

          <TabsContent value="code" className="flex justify-center bg-white p-25">
            test
          </TabsContent>
        </Tabs>
      </div>
      
    </>
  );
};