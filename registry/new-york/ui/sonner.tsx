"use client"

import {
  mdiAlertCircle,
  mdiCheckCircle,
  mdiClose,
  mdiInformation,
} from "@mdi/js"
import Icon from "@mdi/react"
import { useTheme } from "next-themes"
import { Toaster as Sonner, ToasterProps } from "sonner"

import { Loader } from "./loader"

const Toaster = ({ className = "bg-info-100", ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      position="bottom-left"
      expand={true}
      toastOptions={{
        unstyled: true,
        className:
          "rounded-md p-4 flex items-center gap-2 !w-[clamp(300px,400px,560px)]",
        classNames: {
          toast: "border-none",
          success: "bg-success-100",
          error: "bg-red-100",
          info: "bg-info-100",
          warning: "bg-warning-100",
          default: "bg-info-100",
          title: "text-sm text-black font-normal",
          description: "text-sm !text-black",
          closeButton:
            "!bg-transparent border-none order-1 cursor-pointer relative ml-auto",
          loading: "text-primary-500",
          actionButton:
            "text-sm text-primary-500 cursor-pointer hover:underline",
        },
      }}
      {...props}
      icons={{
        loading: (
          <div className="text-primary">
            <Loader size="sm" />
          </div>
        ),
        success: (
          <div className="text-success">
            <Icon path={mdiCheckCircle} size={0.9} />
          </div>
        ),
        error: (
          <div className="text-danger">
            <Icon path={mdiAlertCircle} size={0.9} />
          </div>
        ),
        info: (
          <div className="text-info">
            <Icon path={mdiInformation} size={0.9} />
          </div>
        ),
        warning: (
          <div className="text-warning">
            <Icon path={mdiAlertCircle} size={0.9} />
          </div>
        ),
        close: (
          <div className="text-neutral-fg rounded-full p-1 hover:bg-neutral-200 dark:hover:bg-neutral-700">
            <Icon path={mdiClose} size={0.7} />
          </div>
        ),
      }}
    />
  )
}

export { Toaster }
