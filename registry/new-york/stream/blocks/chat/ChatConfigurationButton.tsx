import React from "react"
import { mdiTextLong, mdiTuneVariant } from "@mdi/js"

import { Button } from "@/registry/new-york/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/new-york/ui/dialog"
import { Tabs, TabsList, TabsTrigger } from "@/registry/new-york/ui/tabs"

import { Icon } from "./Icon"
import { TOOL_ACTIONS, useToolDispatch } from "./store/tools"
import { BrainstormingSearchTypeOptions } from "./store/types"

export interface ChatConfigurationButtonProps {
  className?: string
}

export function ChatConfigurationButton({
  className,
}: ChatConfigurationButtonProps) {
  /* Hooks */
  const [toolState, dispatchToolAction] = useToolDispatch()

  const handleSaveToolConfigurationOnClick = (
    value: BrainstormingSearchTypeOptions
  ) => {
    dispatchToolAction({
      type: TOOL_ACTIONS.CONFIGURE_BRAINSTORMING,
      payload: { searchType: value },
    })
  }

  return (
    <Dialog>
      <DialogTrigger
        id="tour-chat-brainstorming-tools-settings"
        className={className}
        asChild
      >
        <Button
          data-testid="brainstorming_button_tool_configuration"
          variant={"ghost"}
          colorScheme={"neutral"}
          size={"icon-sm"}
          title="Tool configuration"
        >
          <Icon path={mdiTuneVariant} />
        </Button>
      </DialogTrigger>

      <DialogContent className="flex flex-col gap-4">
        <DialogHeader className="gap-2">
          <DialogTitle>Tool configuration</DialogTitle>
          <DialogDescription>
            Tune and configure how each tool handles your chats, retrieves
            information and outputs responses
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          <h2 className="text-md text-blackAlpha-600">Tools</h2>
          <div className="space-y-2 rounded-md bg-gray-50 p-2">
            <div className="flex items-center gap-2">
              <div className="bg-primary-100 inline-block rounded p-1">
                <Icon
                  path={mdiTextLong}
                  className="text-primary-600"
                  size={"xs"}
                />
              </div>
              <span className="font-bold">Brainstorming</span>
            </div>
            <div className="space-y-2 px-10">
              <h2 className="text-md text-blackAlpha-600">
                Default search type
              </h2>
              <Tabs
                className="w-fit"
                defaultValue={
                  toolState.brainstorming.data?.params?.searchType ??
                  "knowledge_web"
                }
                onValueChange={(value) =>
                  handleSaveToolConfigurationOnClick(
                    value as BrainstormingSearchTypeOptions
                  )
                }
              >
                <TabsList className="border-blackAlpha-200 rounded-md border p-1">
                  <TabsTrigger
                    className="data-[state=active]:bg-primary-100 w-fit rounded-md border-none"
                    value="knowledge_web"
                  >
                    Knowledge & web
                  </TabsTrigger>
                  <TabsTrigger
                    className="data-[state=active]:bg-primary-100 w-fit rounded-md border-none"
                    value="knowledge"
                  >
                    Knowledge search
                  </TabsTrigger>
                  <TabsTrigger
                    className="data-[state=active]:bg-primary-100 w-fit rounded-md border-none"
                    value="web"
                  >
                    Web search
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
