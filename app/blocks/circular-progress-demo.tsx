"use client"

import * as React from "react"
import { CircularProgress } from "./circular-progress"
import { Input } from "@/registry/new-york/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/new-york/ui/card"

export const description = "A circular progress indicator"

export function CircularProgressDemo() {
  const [progress, setProgress] = React.useState(0)
  const [inputValue, setInputValue] = React.useState("0")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)
    
    // Convert to number and validate
    const numValue = Number(value)
    if (!isNaN(numValue)) {
      const clampedValue = Math.min(Math.max(numValue, 0), 100)
      setProgress(clampedValue)
    }
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Circular Progress</CardTitle>
          <CardDescription>Progress indicator in a circular format</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-8">
          <div className="flex items-center gap-4">
            <Input
              type="number"
              min={0}
              max={100}
              value={inputValue}
              onChange={handleInputChange}
              className="w-24"
              placeholder="0-100"
            />
            <span className="text-sm text-muted-foreground">%</span>
          </div>
          <div className="w-full max-w-[250px]">
            <CircularProgress value={progress} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Animated Progress</CardTitle>
          <CardDescription>Spinning progress indicator</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <div className="w-full max-w-[250px]">
            <CircularProgress variant="animated" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 