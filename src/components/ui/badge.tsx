import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center px-2 justify-center rounded w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default: "font-normal",
        bold: "uppercase font-bold",
      },
      size: {
        sm: "text-sm h-4",
        md: "text-md h-5",
        lg: "text-md h-6",
      },
      colorScheme: {
        neutral: "bg-neutral-bg text-neutral-fg",
        primary: "bg-primary-bg text-primary-fg",
        danger: "bg-danger-bg text-danger-fg",
        success: "bg-success-bg text-success-fg",
        warning: "bg-warning-bg text-warning-fg",
        yellow: "bg-warning-bg text-warning-fg",
        teal: "bg-success-bg text-success-fg",
        cyan: "bg-info-bg text-info-fg",
        blue: "bg-info-bg text-info-fg",
        pink: "bg-danger-bg text-danger-fg",
      },
    },
    defaultVariants: {
      colorScheme: "neutral",
      size: "md",
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  colorScheme,
  size = "md",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant, colorScheme, size }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
