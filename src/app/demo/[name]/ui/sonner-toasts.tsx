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
          icon: <Icon path={mdiInformation} className="text-body-text" />,
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
        <div className="w-full p-4 bg-info-bg rounded-md shadow flex flex-col space-y-2">
          <div>
            <p className="font-medium text-gray-900 dark:text-white">Form submitted</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Your form was submitted successfully.
            </p>
          </div>
          <div className="self-start">
            <Button
              onClick={() => {
                toast.dismiss(t);
                console.log("Undo clicked");
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
