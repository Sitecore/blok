import React, { MouseEvent, useState } from "react"
import { upperFirst } from "lodash"

import { cn } from "@/lib/utils"
import { Button } from "@/registry/new-york/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/new-york/ui/dialog"

export type ActionModalProps = {
  ctaElement?: React.ReactNode
  dialogClassName?: string
  ctaTitle?: string
  ctaClassName?: string
  modalTitle?: string
  contentClassName?: string
  children?: React.ReactNode | React.ReactNode[]
  footerContent?: React.ReactNode | React.ReactNode[]
  interactiveOutside?: boolean
  "data-testid"?: string
} & (
  | {
      isOpen: boolean
      onOpenChange: (open: boolean) => void
    }
  | {
      isOpen?: undefined
      onOpenChange?: undefined
    }
)

export function ActionModal({
  children,
  ctaElement,
  dialogClassName,
  ctaTitle = "Action",
  ctaClassName = "",
  modalTitle = "Modal",
  contentClassName = "",
  footerContent,
  interactiveOutside = true,
  isOpen,
  onOpenChange,
  "data-testid": dataTestId,
  ...otherProps
}: ActionModalProps) {
  const [open, setOpen] = useState(false)

  const handleOnInteractiveOutside = (e: Event) => {
    e.preventDefault()
  }

  const handleOpenModalOnAction = (e: MouseEvent) => {
    e.preventDefault()
    setOpen(true)
  }

  const dialogTestId = dataTestId || `action_modal_${ctaTitle?.toLowerCase()}`
  const ctaTitleTestId = ctaTitle?.toLowerCase()

  return (
    <Dialog
      open={isOpen === undefined ? open : isOpen}
      onOpenChange={
        onOpenChange === undefined ? () => setOpen(false) : onOpenChange
      }
      {...otherProps}
    >
      <DialogTrigger asChild>
        {ctaElement ? (
          <div
            data-testid={`action_modal_button_${ctaTitleTestId}`}
            className="m-0 border-none bg-none p-0"
          >
            {ctaElement}
          </div>
        ) : (
          <Button
            variant="ghost"
            className={cn(
              "text-neutral-fg text-md px-2 py-0 font-semibold hover:bg-transparent active:bg-transparent",
              ctaClassName
            )}
            data-testid={`action_modal_button_${ctaTitleTestId}`}
            onClick={handleOpenModalOnAction}
          >
            {ctaTitle}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent
        className={cn("max-w-2xl p-4", dialogClassName)}
        onInteractOutside={
          interactiveOutside ? undefined : handleOnInteractiveOutside
        }
        data-testid={dialogTestId}
      >
        <DialogHeader>
          <DialogTitle
            data-testid={`action_modal_header_${ctaTitleTestId}`}
            className="body-text text-xl"
          >
            {upperFirst(modalTitle)}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {upperFirst(modalTitle)} dialog content
          </DialogDescription>
        </DialogHeader>
        <div
          data-testid={`action_modal_content_${ctaTitleTestId}`}
          className={cn("max-h-[650px] overflow-y-auto", contentClassName)}
        >
          {children}
        </div>
        <DialogFooter>{footerContent}</DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
