"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function SonnerWarningDemo() {
  return (
    <Button
      variant="outline"
      onClick={() => toast.warning("This is a warning")}
    >
      Warning Toast
    </Button>
  );
}
