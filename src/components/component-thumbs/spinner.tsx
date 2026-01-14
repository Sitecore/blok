import * as React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SpinnerThumbProps {
  className?: string;
}

const SpinnerThumb = ({ className }: SpinnerThumbProps) => (
  <div className="flex items-center justify-center w-full h-full">
    <Loader2
      className={cn("size-12 text-primary-600", className)}
    />
  </div>
);

export default SpinnerThumb;


