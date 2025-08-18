import React, { FC } from "react";

type DemoObject = {
  title: string;
  description: string;
  type: "primary";
};

type AlertDialogDemoProps = {
  selectedDemo?: DemoObject;
  alerDialogText: string;
  alertDialogDescription: string;
};

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/new-york/ui/tabs"
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


export const AlertDialogDemo: FC<AlertDialogDemoProps> = ({ selectedDemo, alerDialogText }) => {

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
          </TabsContent>

          <TabsContent value="code" className="flex justify-center bg-white p-25">
            test
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};