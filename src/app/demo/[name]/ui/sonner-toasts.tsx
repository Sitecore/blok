"use client";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { mdiInformation } from "@mdi/js";
import Icon from "@mdi/react";

export function Sonner() {
  return <Button onClick={() => toast.info("Toast")}>Normal Toast</Button>;
}

export function SuccessfulSonner() {
  return (
    <Button variant="outline" onClick={() => toast.success("Successful")}>
      Successful Toast
    </Button>
  );
}

export function WarningSonner() {
  return (
    <Button
      variant="outline"
      onClick={() => toast.warning("This is a warning")}
    >
      Warning Toast
    </Button>
  );
}

export function ErrorSonner() {
  return (
    <Button 
      variant="outline"
      onClick={() => toast.error("There was an error")}
    >
      Error Toast
    </Button>
  );
}

export function ActionSonner() {
  return (
    <Button
      variant="link"
      onClick={() =>
        toast("Toast with an Action", {
          description: (
            <span>
              A description with some more information.{' '}
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
  );
}

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

export function ClosableSonner() {
  return (
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
  );
}
