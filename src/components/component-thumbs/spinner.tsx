import { mdiLoading } from "@mdi/js";

import { cn } from "@/lib/utils";

interface SpinnerThumbProps {
  className?: string;
}

const SpinnerThumb = ({ className }: SpinnerThumbProps) => (
  <div className="flex items-center justify-center w-full h-full">
    <svg
      viewBox="0 0 24 24"
      className={cn("size-12 animate-spin text-primary-600", className)}
    >
      <path d={mdiLoading} fill="currentColor" />
    </svg>
  </div>
);

export default SpinnerThumb;
