import React from "react"
import { cva, type VariantProps } from "class-variance-authority"

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
      default: "stream-w-icon stream-h-icon",
      "3xs": "stream-w-icon-3xs stream-h-icon-3xs",
      "2xs": "stream-w-icon-2xs stream-h-icon-2xs",
      xs: "stream-w-icon-xs stream-h-icon-xs",
      sm: "stream-w-icon-sm stream-h-icon-sm",
      md: "stream-w-icon-md stream-h-icon-md",
      lg: "stream-w-icon-lg stream-h-icon-lg",
      xl: "stream-w-icon-xl stream-h-icon-xl",
      "2xl": "stream-w-icon-2xl stream-h-icon-2xl",
      "3xl": "stream-w-icon-3xl stream-h-icon-3xl",
      "4xl": "stream-w-icon-4xl stream-h-icon-4xl",
      "5xl": "stream-w-icon-5xl stream-h-icon-5xl",
      "6xl": "stream-w-icon-6xl stream-h-icon-6xl",
      "7xl": "stream-w-icon-7xl stream-h-icon-7xl",
      "8xl": "stream-w-icon-8xl stream-h-icon-7xl",
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
