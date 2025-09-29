"use client";
import * as React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export function ButtonLinkAlert({
  variantProp,
}: {
  variantProp: "default" | "primary" | "danger" | "warning" | "success";
}) {
  return (
    <Alert variant={variantProp}>
      <AlertTitle>Closable Alert</AlertTitle>
      <AlertDescription>
        This is a primary alert with a title and description and even a close
        button.
        <Button size="sm" variant="link" className="p-0">
          Click
        </Button>
      </AlertDescription>
    </Alert>
  );
}
