import { mdiLoading } from "@mdi/js";
import { type VariantProps, cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const spinnerVariants = cva("size-4 animate-spin", {
  variants: {
    variant: {
      default: "text-neutral-fg",
      primary: "text-primary-fg",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

function Spinner({
  className,
  variant,
  ...props
}: React.ComponentProps<"svg"> & VariantProps<typeof spinnerVariants>) {
  return (
    <svg
      viewBox="0 0 24 24"
      role="status"
      aria-label="Loading"
      className={cn(spinnerVariants({ variant }), className)}
      {...props}
    >
      <path d={mdiLoading} fill="currentColor" />
    </svg>
  );
}

export { Spinner, spinnerVariants };
