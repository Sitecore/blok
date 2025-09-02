import React, { useCallback, useEffect, useState } from "react"
import { UIMessage } from "@ai-sdk/ui-utils"
import { mdiTextLong, mdiTuneVariant } from "@mdi/js"
import {
  dbMessagesToAIMessages,
  ListUserChatMessagesModelResponseV2,
  ReferenceModel,
  ToolInvocation,
  ToolInvocationUIPart,
} from "@sitecore/stream-ui-core"
import { useAtom, useAtomValue, useSetAtom } from "jotai"

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

import { useGetChatMessages } from "../../hooks/use-get-chat-messages"
import { cn } from "../../lib/utils"
import { ButtonScrollToBottom } from "./ButtonScrollToBottom"
import { Feedback } from "./Feedback"
import { useAiChatProvider } from "./hooks/useAiChatProvider"
import { useImageDropzone } from "./hooks/useImageDropzone"
import { useScrollAnchor } from "./hooks/useScrollAnchor"
import { Icon } from "./Icon"
import { PromptForm } from "./PromptForm"
import {
  brainstormingAtom,
  isAnyArtifactOpenAtom,
  messagesIdsAtom,
  sessionAtom,
} from "./store/atoms"
import { BrainstormingSearchTypeOptions } from "./store/types"
import { ToolInvocations } from "./tools/ToolInvocations"
import { MessageAnnotation } from "./types"
import { UserMessage } from "./UserMessage"

export function Messages(): React.ReactNode {
  /* Atoms */
  const isAnyArtifactOpen = useAtomValue(isAnyArtifactOpenAtom)
  const [brainstormingData, setBrainstormingData] = useAtom(brainstormingAtom)
  const { orgId, userId, chatId } = useAtomValue(sessionAtom)
  const setMessageIds = useSetAtom(messagesIdsAtom)

  /* Hooks */
  const { messages, setMessages } = useAiChatProvider()
  const getChatMessages = useGetChatMessages(orgId, userId)
  const { messagesRef, scrollRef, isAtBottom, scrollToBottom } =
    useScrollAnchor(messages)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])

  const initMessages = useCallback(async (): Promise<void> => {
    /* Get messages for a specific chat */
    const messages: ListUserChatMessagesModelResponseV2[] =
      await getChatMessages(chatId)

    const dbMessages = dbMessagesToAIMessages(messages) as UIMessage[]

    setMessages(dbMessages)
    setMessageIds(
      dbMessages.map((message) => {
        return (message?.annotations?.[0] as unknown as MessageAnnotation)?.id
      })
    )
  }, [chatId, getChatMessages, setMessageIds, setMessages])

  const handleSaveToolConfigurationOnClick = (
    value: BrainstormingSearchTypeOptions
  ) => {
    setBrainstormingData({
      mode: "brainstorming",
      params: { searchType: value },
    })
  }

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setUploadedFiles((prevFiles) => [...prevFiles, ...acceptedFiles])
  }, [])

  const onClearFiles = useCallback(() => {
    setUploadedFiles([])
  }, [])

  // Remaining upload slots; note: react-dropzone treats maxFiles=0 as "unlimited",
  // so we clamp to at least 1 and explicitly disable when no slots remain.
  const remainingSlots = Math.max(0, 10 - uploadedFiles.length)

  // Keep dropzone enabled even when no slots remain so we can surface validation errors.
  // Use a validator to force a "too-many-files" reject when remainingSlots === 0.
  const fileValidator = useCallback(() => {
    if (remainingSlots === 0) {
      return {
        code: "too-many-files",
        message: "You can only upload up to 10 files.",
      }
    }
    return null
  }, [remainingSlots])

  const { getRootProps, getInputProps, isDragActive } = useImageDropzone({
    enabled: true,
    currentCount: uploadedFiles.length,
    maxTotal: 10,
    maxSizeBytes: 5 * 1024 * 1024,
    onFilesAccepted: (files) => onDrop(files),
  })

  useEffect(() => {
    if (!messages.length) initMessages()
  }, [initMessages, messages.length])

  return (
    <div
      className="relative flex max-w-full overflow-hidden"
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      {isDragActive && (
        <div className="pointer-events-none absolute inset-0 z-20 grid place-items-center bg-white/40 backdrop-blur-sm">
          <div className="text-center">
            <div className="relative mx-auto h-24 w-32">
              <img
                src="https://delivery-sitecore.sitecorecontenthub.cloud/api/public/content/spot-drag-items"
                alt="Drag items illustration"
                width={400}
                height={400}
              />
            </div>
            <h2 className="text-2xl font-bold">Drag & drop</h2>
            <p className="text-subtle-text text-lg">
              Drop your assets to use them as context
            </p>
          </div>
        </div>
      )}
      <div className="relative flex flex-1 basis-1/2 flex-col gap-4">
        <Dialog>
          <DialogTrigger
            id="tour-chat-brainstorming-tools-settings"
            className="absolute top-[17px] right-[16px] z-10"
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
                      brainstormingData?.params?.searchType ?? "knowledge_web"
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
        <div
          className="relative flex basis-[29%] flex-col gap-4 overflow-auto"
          ref={scrollRef}
          data-testid="scroll-contain-base-chat"
        >
          <div className="space-y-4" ref={messagesRef}>
            {messages?.map((message, messageIndex, messagesArray) => {
              /* The message ID is found in the annotation array. The id you see in the response object is the db id */
              const messageId = (
                message?.annotations?.[0] as unknown as MessageAnnotation
              )?.id

              const isLastMessage = messageIndex === messagesArray.length - 1

              const toolInvocations = (
                message.parts as ToolInvocationUIPart[] | undefined
              )
                ?.filter(
                  (part: ToolInvocationUIPart) =>
                    part.type === "tool-invocation"
                )
                .map(
                  (part: ToolInvocationUIPart) => part.toolInvocation
                ) as (ToolInvocation & {
                reference: ReferenceModel
              })[]

              const areToolInvocationsAvailable = !!toolInvocations?.length

              return (
                <div
                  key={`${message.id}_${messageIndex}`}
                  className={cn("stream-chat-container space-y-4", {
                    "pb-4": messageIndex % 2 !== 0 && !isLastMessage,
                  })}
                >
                  {message.role === "user" && (
                    <UserMessage>{message.content}</UserMessage>
                  )}
                  {message.role === "assistant" && (
                    <>
                      {areToolInvocationsAvailable && (
                        <>
                          <ToolInvocations
                            messageId={messageId}
                            message={message}
                            toolInvocations={toolInvocations}
                            isLastMessage={isLastMessage}
                          />
                          <Feedback
                            messageId={messageId}
                            message={message}
                            isLastMessage={isLastMessage}
                          />
                        </>
                      )}
                    </>
                  )}
                </div>
              )
            })}
          </div>
        </div>
        <div className="relative flex flex-col gap-4">
          <ButtonScrollToBottom
            isAtBottom={isAtBottom}
            scrollToBottom={scrollToBottom}
          />
          <div className="stream-chat-container">
            <PromptForm
              uploadedFiles={uploadedFiles}
              onFileRemove={(file) => {
                setUploadedFiles((prevFiles) =>
                  prevFiles.filter((f) => f !== file)
                )
              }}
              onFileUpload={(files) => {
                setUploadedFiles((prevFiles) => [...prevFiles, ...files])
              }}
              onClearFiles={onClearFiles}
            />
          </div>
        </div>
      </div>
      <aside
        id="artifactsPortalPlaceholder"
        className={cn(
          "z-10 basis-1/2 overflow-hidden transition-all duration-300",
          {
            "mr-0": isAnyArtifactOpen,
            "-mr-[50%]": !isAnyArtifactOpen,
          }
        )}
      />
    </div>
  )
}
