"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function SonnerDemo() {
  return <Button onClick={() => toast.info("Toast")}>Normal Toast</Button>;
}
