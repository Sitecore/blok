"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { mdiInformation } from "@mdi/js";
import Icon from "@mdi/react";

export function SonnerDemo() {
  return (
    <div>
      <h2 className="font-semibold text-4xl wrap-break-words">Sonner</h2>
    <div className="flex w-full max-w-full gap-4">
      <div id="toast-normal">
        <Button onClick={() => toast.info("Toast")}>
            Normal Toast
        </Button>
      </div>

      {/* Successful Toast */}
      <div id="toast-successful">
        <Button variant="outline" onClick={() => toast.success("Successful")}>
          Successful Toast
        </Button>
      </div>

      {/* Warning Toast */}
      <div id="toast-warning">
        <Button
          variant="outline"
          onClick={() => toast.warning("This is a warning")}
        >
          Warning Toast
        </Button>
      </div>

      {/* Error Toast */}
      <div id="toast-error">
        <Button 
          variant="outline"
          onClick={() => toast.error("There was an error")}
        >
          Error Toast
        </Button>
      </div>

      {/* Action Toast */}
      <div id="toast-action">
        <Button
          variant="link"
          onClick={() =>
            toast("Toast with an Action", {
              description: (
                <span>
                  A description with some more information.{" "}
                  <a href="#" className="text-primary">link</a>
                </span>
              ),
              icon: <Icon path={mdiInformation} className="size-5 text-info" />,
              action: {
                label: "Action",
                onClick: () => console.log("Action!"),
              },
            })
          }
        >
          Action Toast
        </Button>
      </div>

      {/* Closable Toast */}
      <div id="toast-closable">
        <Button
          variant="outline"
          onClick={() =>
            toast("This toast is closable", {
              closeButton: true,
            })
          }
        >
          Closable Toast
        </Button>
      </div>  
    </div>
    </div>
)
}