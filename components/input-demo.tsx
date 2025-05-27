import { Input } from "@/registry/new-york/ui/input"
import React from "react"

type InputDemoProps = React.InputHTMLAttributes<HTMLInputElement>

export function InputDemo(props: InputDemoProps) {
  return (
    <div className="flex flex-col flex-wrap gap-4 md:flex-row">
      <Input type="email" placeholder="Email" {...props} />
      <Input type="text" placeholder="Error" aria-invalid="true" {...props} />
      <Input type="password" placeholder="Password" {...props} />
      <Input type="number" placeholder="Number" {...props} />
      <Input type="file" placeholder="File" {...props} />
      <Input type="tel" placeholder="Tel" {...props} />
      <Input type="text" placeholder="Text" {...props} />
      <Input type="url" placeholder="URL" {...props} />
      <Input type="search" placeholder="Search" {...props} />
      <Input type="date" placeholder="Date" {...props} />
      <Input type="datetime-local" placeholder="Datetime Local" {...props} />
      <Input type="month" placeholder="Month" {...props} />
      <Input type="time" placeholder="Time" {...props} />
      <Input type="week" placeholder="Week" {...props} />
      <Input disabled placeholder="Disabled" {...props} />
    </div>
  )
}
