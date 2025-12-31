'use client'

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function ErrorSonner() {
    return (
        <Button 
            variant="outline"
            onClick={() => toast.error("There was an error")}
        >
            Error Toast
        </Button>
    );
}