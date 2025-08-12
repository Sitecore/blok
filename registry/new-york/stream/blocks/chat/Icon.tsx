import React from "react"
import { cva, VariantProps } from "class-variance-authority"

export interface IconProps
  extends React.SVGAttributes<SVGSVGElement>,
    VariantProps<typeof iconVariants> {
  path: string
  aiGradient?:
    | "50"
    | "100"
    | "200"
    | "300"
    | "400"
    | "500"
    | "600"
    | "700"
    | "800"
    | "900"
}

const iconVariants = cva("inline-block align-middle flex-shrink-0 leading-4", {
  variants: {
    size: {
      default: "w-1 h-1",
      "3xs": "w-icon-3xs h-icon-3xs",
      "2xs": "w-icon-2xs h-icon-2xs",
      xs: "w-icon-xs h-icon-xs",
      sm: "w-icon-sm h-icon-sm",
      md: "w-icon-md h-icon-md",
      lg: "w-icon-lg h-icon-lg",
      xl: "w-icon-xl h-icon-xl",
      "2xl": "w-icon-2xl h-icon-2xl",
      "3xl": "w-icon-3xl h-icon-3xl",
      "4xl": "w-icon-4xl h-icon-4xl",
      "5xl": "w-icon-5xl h-icon-5xl",
      "6xl": "w-icon-6xl h-icon-6xl",
      "7xl": "w-icon-7xl h-icon-7xl",
      "8xl": "w-icon-8xl h-icon-7xl",
    },
  },
  defaultVariants: {
    size: "default",
  },
})

export function Icon({
  path,
  size,
  className,
  aiGradient,
  ...rest
}: IconProps): React.ReactNode {
  return (
    <svg
      fill="currentColor"
      viewBox="0 0 24 24"
      {...rest}
      className={iconVariants({ size, className })}
    >
      {aiGradient && (
        <defs>
          <linearGradient id="ai-gradient" y1="100%" y2="0">
            <stop stopColor={`var(--purple-${aiGradient})`} offset="0%" />
            <stop stopColor={`var(--red-${aiGradient})`} offset="100%" />
          </linearGradient>
        </defs>
      )}
      <path fill={aiGradient ? "url(#ai-gradient)" : "currentColor"} d={path} />
    </svg>
  )
}
