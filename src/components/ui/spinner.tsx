import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const spinnerVariants = cva(
  [
    "inline-block",
    "rounded-full",
    "border-solid",
    "animate-spin",
  ].join(" "),
  {
    variants: {
      size: {
        xs: "size-3",
        sm: "size-4",
        md: "size-6",
        lg: "size-8",
        xl: "size-12",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

interface SpinnerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "color">,
    VariantProps<typeof spinnerVariants> {
  /**
   * The color of the spinner. Can be any valid CSS color or Tailwind color class.
   * @default "currentColor"
   */
  color?: string
  /**
   * The color of the empty area in the spinner.
   * @default "transparent"
   */
  emptyColor?: string
  /**
   * The thickness of the spinner border.
   * Overrides the default thickness from size variant.
   */
  thickness?: string
  /**
   * The speed of the spinner animation.
   * @default "0.65s"
   */
  speed?: string
  /**
   * For accessibility, it is important to add a fallback loading text.
   * This text will be visible to screen readers.
   * @default "Loading..."
   */
  label?: string
}

function Spinner({
  className,
  size,
  color = "currentColor",
  emptyColor = "transparent",
  thickness,
  speed = "0.65s",
  label = "Loading...",
  style,
  ...props
}: SpinnerProps) {
  // Default border widths based on size (matching Chakra v2 defaults)
  const defaultThickness = thickness || 
    (size === "xs" ? "2px" :
     size === "sm" ? "2px" :
     size === "md" ? "2px" :
     size === "lg" ? "3px" :
     size === "xl" ? "4px" : "2px")

  const spinnerStyle: React.CSSProperties = {
    borderWidth: defaultThickness,
    borderTopColor: color,
    borderRightColor: emptyColor,
    borderBottomColor: emptyColor,
    borderLeftColor: emptyColor,
    animationDuration: speed,
    // Ensure rounded edges with border-radius
    borderRadius: "9999px",
    ...style,
  }

  return (
    <div
      role="status"
      aria-label={label}
      className={cn(spinnerVariants({ size }), className)}
      style={spinnerStyle}
      {...props}
    />
  )
}

export { Spinner, spinnerVariants }

