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
        neutral: "bg-neutral-100 text-neutral-800",
        primary: "bg-primary-100 text-primary-800",
        danger: "bg-danger-100 text-danger-800",
        success: "bg-success-100 text-success-800",
        warning: "bg-warning-100 text-warning-800",
        yellow: "bg-yellow-100 text-yellow-800",
        teal: "bg-teal-100 text-teal-800",
        cyan: "bg-cyan-100 text-cyan-800",
        blue: "bg-blue-100 text-blue-800",
        pink: "bg-pink-100 text-pink-800",
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
