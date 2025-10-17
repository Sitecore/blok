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
      <AlertTitle>Button link {variantProp} Alert</AlertTitle>
      <AlertDescription>
        This is a button linked alert with a title and description.
        <Button size="sm" variant="link" className="p-0">
          Click
        </Button>
      </AlertDescription>
    </Alert>
  );
}
