"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import * as React from "react";

export default function ClosableAlertDemo() {
  return <ClosableAlert variantProp="primary" />;
}

function ClosableAlert({
  variantProp,
}: {
  variantProp: "default" | "primary" | "danger" | "warning" | "success";
}) {
  const [isOpen, setIsOpen] = React.useState(true);

  if (!isOpen) return null;

  return (
    <Alert variant={variantProp}>
      <AlertTitle>Closable {variantProp} Alert</AlertTitle>
      <AlertDescription>
        This is a closable alert with a title and description.
      </AlertDescription>
      <Button
        size="icon-xs"
        variant="ghost"
        className="absolute top-2.5 right-3 h-6 shadow-none dark:hover:bg-accent-foreground/10"
        onClick={() => setIsOpen(false)}
        aria-label="Close alert"
      >
        ✕
      </Button>
    </Alert>
  );
}
