import React from "react"

import { cn } from "@/lib/utils"

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "xs" | "sm" | "md" | "lg" | "xl"
  variant?: "default" | "circular"
  message?: string
  withOverlay?: boolean
  fullscreen?: boolean
}

const sizeClasses = {
  xs: "w-3 h-3",
  sm: "w-4 h-4",
  md: "w-6 h-6",
  lg: "w-8 h-8",
  xl: "w-12 h-12",
}

function Spinner({
  size = "md",
  variant = "default",
  className,
  message,
  withOverlay = false,
  fullscreen = false,
  ...props
}: SpinnerProps) {
  const spinnerClasses = cn(
    "inline-block rounded-full border-4",
    "border-t-purple-600 border-r-purple-600 border-b-gray-200 border-l-gray-200",
    variant === "circular" && "animate-spin",
    sizeClasses[size],
    className
  )

  const SpinnerElement = (
    <div className="text-center">
      <div className={spinnerClasses} data-testid="spinner" {...props} />
      {message && <p className="mt-6 text-sm text-subtle-text">{message}</p>}
    </div>
  )

  if (fullscreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-body-bg/90">
        {SpinnerElement}
      </div>
    )
  }

  if (withOverlay) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-body-bg/90">
        {SpinnerElement}
      </div>
    )
  }

  return SpinnerElement
}

export { Spinner, type SpinnerProps }
