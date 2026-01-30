"use client";
import * as React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";


export function AlertDemo({
  variantProp,
}: {
  variantProp: "default" | "primary" | "danger" | "warning" | "success";
}) {

  const [isOpen, setIsOpen] = React.useState(true);

  if (!isOpen) return null;
  
  return (
    <div className="grid items-start gap-4">
      <h2 className="font-semibold text-4xl wrap-break-words">Alert</h2>
      <Alert variant="primary">
        <AlertTitle>Primary Alert</AlertTitle>
        <AlertDescription>
          This is a primary alert with a title and description.
        </AlertDescription>
      </Alert>

      <Alert variant="success">
        <AlertTitle>Success Alert</AlertTitle>
        <AlertDescription>
          This is a success alert with a title and description.
        </AlertDescription>
      </Alert>

      <Alert variant="danger">
        <AlertTitle>Danger Alert</AlertTitle>
        <AlertDescription>
          This is a danger alert with a title and description.
        </AlertDescription>
      </Alert>

      <Alert variant="warning">
        <AlertTitle>Warning Alert</AlertTitle>
        <AlertDescription>
          This is a warning alert with a title and description.
        </AlertDescription>
      </Alert>

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

      <Alert variant={variantProp}>
        <AlertTitle>
          This is an extremely long alert title that spans multiple lines to
          demonstrate how the component handles very lengthy headings while
          maintaining readability and proper text wrapping behavior
        </AlertTitle>
        <AlertDescription>
          This is an equally long description that contains detailed information
          about the alert. It shows how the component can accommodate extensive
          content while preserving proper spacing, alignment, and readability
          across different screen sizes and viewport widths. This helps ensure
          the user experience remains consistent regardless of the content
          length.
          <Button size="sm" variant="link" className="p-0">
            Click
          </Button>
        </AlertDescription>
      </Alert>
      
    </div>
  )
}
