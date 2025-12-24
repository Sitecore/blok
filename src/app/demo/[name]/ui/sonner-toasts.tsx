"use client";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { mdiInformation } from "@mdi/js";
import Icon from "@mdi/react";

export function CustomToastSonner() {
  return (
    <Button 
      variant="outline" 
      onClick={() => toast.custom((t) => (
        <div className="w-96 p-4 bg-info-bg rounded-xl shadow flex items-start space-x-2">
          <Icon path={mdiInformation} className="mt-1 size-5 text-body-text" />
          <div className="flex-1 flex flex-col space-y-2">
            <p className="text-sm">
              Thing created: Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
            <Button
              size="xs"
              variant="link"
              className="self-start px-0"
              onClick={() => {
                toast.dismiss(t);
              }}
            >
              Undo
            </Button>
          </div>
        </div>
      ))}>
      Custom Toast
    </Button>
  );
}
