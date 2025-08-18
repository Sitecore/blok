import React, { FC } from "react";

type DemoObject = {
  title: string;
  description: string;
  type: "primary";
};

type SeparatorDemoProps = {
  selectedDemo?: DemoObject;
};

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/new-york/ui/tabs"
import { Separator } from "@/registry/new-york/ui/separator"



export const SeparatorDemo: FC<SeparatorDemoProps> = ({ selectedDemo }) => {

  return (
    <>
      <div>
        <Tabs defaultValue="preview">
          <div className="flex justify-between">
            <div>
              <h2 className="text-xl md:text-2xl font-semibold mb-2">{selectedDemo?.title}</h2>
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
          </TabsContent>

          <TabsContent value="code" className="flex justify-center bg-white p-25">
            test
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};