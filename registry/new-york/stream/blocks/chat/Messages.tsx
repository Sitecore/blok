import React, { useCallback, useEffect, useState } from "react"
import {
  type ReferenceModel,
  type ToolInvocation,
  type ToolInvocationUIPart,
} from "@sitecore/stream-ui-core"
import { useAtomValue } from "jotai"

import { cn } from "../../lib/utils"
import { ButtonScrollToBottom } from "./ButtonScrollToBottom"
import { EmptyScreen } from "./EmptyScreen"
import { Feedback } from "./Feedback"
import { useAiChatProvider } from "./hooks/useAiChatProvider"
import { useImageDropzone } from "./hooks/useImageDropzone"
import { useScrollAnchor } from "./hooks/useScrollAnchor"
import { PromptForm } from "./PromptForm"
import { isAnyArtifactOpenAtom } from "./store/atoms"
import { ToolInvocations } from "./tools/ToolInvocations"
import { type MessageAnnotation } from "./types"
import { UserMessage } from "./UserMessage"

export function Messages(): React.ReactNode {
  /* Atoms */
  const isAnyArtifactOpen = useAtomValue(isAnyArtifactOpenAtom)

  /* Hooks */
  const { messages } = useAiChatProvider()
  const { messagesRef, scrollRef, isAtBottom, scrollToBottom } =
    useScrollAnchor(messages)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setUploadedFiles((prevFiles) => [...prevFiles, ...acceptedFiles])
  }, [])

  const onClearFiles = useCallback(() => {
    setUploadedFiles([])
  }, [])

  // Remaining upload slots; note: react-dropzone treats maxFiles=0 as "unlimited",
  // so we clamp to at least 1 and explicitly disable when no slots remain.
  const remainingSlots = Math.max(0, 10 - uploadedFiles.length)

  const { getRootProps, getInputProps, isDragActive } = useImageDropzone({
    enabled: true,
    currentCount: uploadedFiles.length,
    maxTotal: 10,
    maxSizeBytes: 5 * 1024 * 1024,
    onFilesAccepted: (files) => onDrop(files),
  })

  /* Will run when scroll changes */
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, scrollRef])

  const shouldShowExamplePrompts = !messages?.length

  return (
    <div
      className="relative flex h-screen flex-1 overflow-hidden bg-[#FBFBFB]"
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
      <div className="relative flex h-screen flex-1 flex-col gap-4 px-6 pt-6">
        <div
          className="relative z-0 flex min-h-0 flex-grow flex-col gap-4 overflow-auto"
          ref={scrollRef}
          data-testid="scroll-contain-base-chat"
        >
          {shouldShowExamplePrompts && <EmptyScreen />}
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

              const previousMessageContent = Array.isArray(
                messages[messages.length - 2]?.content
              )
                ? (
                    messages[messages.length - 2]?.content as unknown as {
                      value: string
                    }[]
                  )?.[0]?.value
                : messages[messages.length - 2]?.content

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
                            previousMessageContent={previousMessageContent}
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
        <div className="relative z-10 mb-[125px] flex flex-shrink-0 flex-col gap-4 bg-[#FBFBFB]">
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
