"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function SonnerSuccessDemo() {
  return (
    <Button variant="outline" onClick={() => toast.success("Successful")}>
      Successful Toast
    </Button>
  );
}
