'use client'

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function SuccessfulSonner() {
    return (
        <Button variant="outline" onClick={() => toast.success("Successful")}>
            Successful Toast
        </Button>
    );
}