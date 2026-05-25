"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function SonnerClosableDemo() {
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
