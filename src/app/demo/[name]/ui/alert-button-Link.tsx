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
  );
}
