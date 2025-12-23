'use client'

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function SonnerDefault() {
    return (
        <Button onClick={() => toast.info("Toast")}>
            Normal Toast
        </Button>
    );
}