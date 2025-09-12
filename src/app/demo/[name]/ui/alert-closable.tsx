"use client";
import * as React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export function ClosableAlert() {
  const [isOpen, setIsOpen] = React.useState(true);

  if (!isOpen) return null;

  return (
    <Alert variant="danger">
      <AlertTitle>Closable Danger Alert</AlertTitle>
      <AlertDescription>This is a closable alert with a title and description.</AlertDescription>
      <Button
        size="sm"
        variant="ghost"
        className="absolute top-2.5 right-3 h-6 shadow-none"
        onClick={() => setIsOpen(false)}
      >
        ✕
      </Button>
    </Alert>
  );
}