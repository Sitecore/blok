"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function SonnerLoadingDemo() {
  return (
    <Button variant="outline" onClick={() => toast.loading("Loading")}>
      Loading Toast
    </Button>
  );
}
