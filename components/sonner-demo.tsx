"use client"

import * as React from "react"
import { toast, type ExternalToast } from "sonner"

import { Button } from "@/registry/new-york/ui/button"
import { Toaster } from "@/registry/new-york/ui/sonner"

type CustomToast = ExternalToast & {
  colorScheme?: "info" | "success" | "warning" | "danger"
}

const promiseCode = "`${data.name} toast has been added`"

const allTypes = [
  {
    name: "Default",
    snippet: `toast('Event has been created', {
  colorScheme: 'info'
})`,
    action: () => toast("Event has been created", { colorScheme: "info" } as CustomToast),
  },
  {
    name: "Description",
    snippet: `toast.message('Event has been created', {
  description: 'Monday, January 3rd at 6:00pm',
  colorScheme: 'info'
})`,
    action: () =>
      toast("Event has been created", {
        description: "Monday, January 3rd at 6:00pm",
        colorScheme: "info",
      } as CustomToast),
  },
  {
    name: "Success",
    snippet: `toast.success('Event has been created')`,
    action: () => toast.success("Event has been created"),
  },
  {
    name: "Info",
    snippet: `toast.info('Be at the area 10 minutes before the event time')`,
    action: () => toast.info("Be at the area 10 minutes before the event time"),
  },
  {
    name: "Warning",
    snippet: `toast.warning('Event start time cannot be earlier than 8am')`,
    action: () => toast.warning("Event start time cannot be earlier than 8am"),
  },
  {
    name: "Danger",
    snippet: `toast.error('Event has not been created')`,
    action: () => toast.error("Event has not been created"),
  },
  {
    name: "Action",
    action: () =>
      toast.message("Event has been created", {
        colorScheme: "info",
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
          component: () => (
            <Button size="xs" colorScheme="primary" variant="default">
              Undo
            </Button>
          ),
        },
      } as CustomToast),
  },
  {
    name: "Close Button",
    snippet: `toast('Event has been created', {
  closeButton: true,
  colorScheme: 'info'
})`,
    action: () =>
      toast("Event has been created", {
        closeButton: true,
        colorScheme: "info",
      } as CustomToast),
  },
  {
    name: "Promise",
    snippet: `const promise = () => new Promise((resolve) => setTimeout(() => resolve({ name: 'Sonner' }), 2000));

toast.promise(promise, {
  loading: 'Loading...',
  success: (data) => {
    return ${promiseCode};
  },
  error: 'Error',
  colorScheme: 'success'
});`,
    action: () =>
      toast.promise<{ name: string }>(
        () =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve({ name: "Sonner" })
            }, 2000)
          }),
        {
          loading: "Loading...",
          success: (data: { name: string }) => {
            return `${data.name} toast has been added`
          },
          error: "Error",
          colorScheme: "success",
        } as CustomToast
      ),
  },
]

export function SonnerDemo() {
  const [activeType, setActiveType] = React.useState(allTypes[0])
  return (
    <>
      <div className="flex flex-wrap gap-4">
        {/* <Button onClick={() => toast("My first toast", { colorScheme: "info" } as CustomToast)} variant="outline" colorScheme="neutral">
          Give me a toast
        </Button> */}
        {/* <Button
          variant="outline"
          colorScheme="neutral"
          onClick={() =>
            toast("Event has been created", {
              description: "Sunday, December 03, 2023 at 9:00 AM",
              colorScheme: "info",
              action: {
                label: "Undo",
                onClick: () => console.log("Undo"),
              },
            } as CustomToast)
          }
        >
          Show Toast
        </Button> */}
        {allTypes.map((type) => (
          <Button
            variant="outline"
            colorScheme="neutral"
            data-active={activeType.name === type.name}
            onClick={() => {
              type.action()
              setActiveType(type)
            }}
            key={type.name}
          >
            {type.name}
          </Button>
        ))}
      </div>
      <Toaster />
    </>
  )
}
