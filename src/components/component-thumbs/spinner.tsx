import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface SpinnerThumbProps {
  className?: string;
}

const SpinnerThumb = ({ className }: SpinnerThumbProps) => (
  <div className="flex items-center justify-center w-full h-full">
    <Loader2 className={cn("size-12 text-primary-600", className)} />
  </div>
);

export default SpinnerThumb;
