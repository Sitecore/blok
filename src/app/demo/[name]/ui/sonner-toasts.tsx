"use client";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import Icon from "@mdi/react";
import { mdiInformation } from "@mdi/js";

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
    <Button variant="outline" onClick={() => toast.error("There was an error")}>
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
          description: `A description with some more information ${<a href="#">link</a>}`,
          icon: <Icon path={mdiInformation} />,
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
