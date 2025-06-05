"use client"

import * as React from "react"
import {
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts"

import { ChartConfig, ChartContainer } from "@/registry/new-york/ui/chart"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const circularProgressVariants = cva("", {
  variants: {
    variant: {
      default: "",
      animated: "animate-spin",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

interface CircularProgressProps extends VariantProps<typeof circularProgressVariants> {
  value?: number
  className?: string
}

export function CircularProgress({ value = 0, className, variant }: CircularProgressProps) {
  // Calculate the end angle based on the progress value (0-100 maps to 0-360 degrees)
  const endAngle = variant === "animated" ? 216 : (value / 100) * 360 // 216 degrees is 60% of 360

  const chartData = [
    { progress: variant === "animated" ? 100 : value, fill: "var(--color-primary-500)" },
  ]

  const chartConfig = {
    progress: {
      label: "Progress",
      color: "var(--color-primary-500)",
    },
  } satisfies ChartConfig

  return (
    <ChartContainer
      config={chartConfig}
      className={cn("mx-auto aspect-square max-h-[250px]", className)}
    >
      <RadialBarChart
        data={chartData}
        startAngle={0}
        endAngle={endAngle}
        innerRadius={80}
        outerRadius={110}
      >
        <PolarGrid
          gridType="circle"
          radialLines={false}
          stroke="none"
          className="first:fill-neutral-50 last:fill-background"
          polarRadius={[86, 74]}
        />
        <RadialBar 
          dataKey="progress" 
          background 
          cornerRadius={10} 
          fill="var(--color-primary-500)"
          className={cn(
            "origin-center",
            variant === "animated" && "animate-[spin_2s_linear_infinite]"
          )}
        />
        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false} />
      </RadialBarChart>
    </ChartContainer>
  )
} 