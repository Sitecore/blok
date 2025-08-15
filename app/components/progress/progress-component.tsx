import React, { FC } from "react";

type VariantObject = {
  title: string;
  description: string;
  type: "primary" | "ai" | "indeterminate" | "indeterminateAi";
};

type ProgressDemoProps = {
  selectedVariant: VariantObject;
};

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/new-york/ui/tabs"

import { Progress } from "@/registry/new-york/ui/progress";
import { Button } from "@/registry/new-york/ui/button";

export const ProgressDemo: FC<ProgressDemoProps> = ({ selectedVariant }) => {

  return (
    <>
      <div className=" ">
        <Tabs defaultValue="preview">
          <div className="flex justify-between">
            <div>
               <h2 className="text-xl md:text-2xl font-semibold mb-2">{selectedVariant.title}</h2>
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

              <Progress  />
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