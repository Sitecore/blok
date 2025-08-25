import React, { useEffect, useMemo, useRef, useState } from "react"
import Image from "next/image"
import {
  mdiClose,
  mdiPaperclip,
  mdiPlus,
  mdiSend,
  mdiStop,
  mdiStopCircleOutline,
  mdiTextLong,
} from "@mdi/js"
import { chat as chatApi, HTTPError } from "@sitecore/stream-ui-core"
import { UseChatHelpers } from "ai/react"
import { useAtom, useAtomValue, useSetAtom } from "jotai"
import Textarea from "react-textarea-autosize"
import { toast } from "sonner"

import { cn } from "@/lib/utils"
import { useBrandkitById } from "@/registry/new-york/stream/hooks/use-brandkit-by-id"
import { Button } from "@/registry/new-york/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/new-york/ui/popover"

import {
  brainstormingAtom,
  isBrainstormingActiveAtom,
  isChatActionPendingAtom,
  isLoadingAtom,
  postChatGenerateBodyAtom,
} from "../chat/store/atoms"
import { useEnterSubmit } from "./hooks/useEnterSubmit"
import { useLocalStorage } from "./hooks/useLocalStorage"
import { Icon } from "./Icon"
import { ReferencesBuilder } from "./utils/referencesBuilder"

export type PromptFormProps = {
  orgId: string
  userId: string
  brandkitId: string
  chatId: string
  uploadedFiles?: File[]
  onFileRemove?: (file: File) => void
  onFileUpload?: (files: File[]) => void
  onClearFiles?: () => void
  chat: UseChatHelpers & {
    addToolResult: ({
      toolCallId,
      result,
    }: {
      toolCallId: string
      result: unknown
    }) => void
  }
}

async function fileToDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = () => reject(reader.error)
    reader.onload = () => resolve(String(reader.result))
    reader.readAsDataURL(file)
  })
}

export function PromptForm({
  orgId,
  userId,
  brandkitId,
  chatId,
  uploadedFiles,
  onFileRemove,
  onFileUpload,
  onClearFiles,
  chat,
}: PromptFormProps) {
  const { formRef, onKeyDown } = useEnterSubmit()
  const [isMultiline, setIsMultiline] = useState(false)
  const { brandkit } = useBrandkitById(brandkitId, {
    organizationId: orgId,
    includeDeleted: true,
  })
  const isBrandkitDelete = useMemo(() => !!brandkit?.deletedAt, [brandkit])
  const [isProcessing] = useState<{ [key: string]: boolean }>({})
  const btnRef = useRef<HTMLButtonElement>(null)

  /* Atoms */
  const [brainstormingData, setBrainstormingData] = useAtom(brainstormingAtom)
  const [isChatActionPending, setIsChatActionPending] = useAtom(
    isChatActionPendingAtom
  )
  const isLoading = useAtomValue(isLoadingAtom)
  const [isBrainstormingActive, setIsBrainstormingActive] = useAtom(
    isBrainstormingActiveAtom
  )
  const setChatBodyAtom = useSetAtom(postChatGenerateBodyAtom)

  /* Computed */
  const isProcessingAllChanges = Object.values(isProcessing).some((v) => v)

  const referencesArr = useRef<never[]>([])

  const [, setLocalStorageRefs] = useLocalStorage(
    "promptFormRefs",
    referencesArr.current
  )

  const isBrandkitIdAvailable = !!brandkitId?.length
  const isPromptDisabled =
    !isBrandkitIdAvailable ||
    isLoading ||
    isBrandkitDelete ||
    isChatActionPending

  const onHeight = () => {
    setIsMultiline(true)
  }

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!brandkitId || !chat.input) return

    if (!chatId) {
      setLocalStorageRefs(referencesArr.current)
      setIsChatActionPending(true)

      try {
        await chatApi.createUserChatV2ApiChatsV2OrganizationsOrganizationIdUsersUserIdChatsPost(
          {
            path: {
              userId,
              organizationId: orgId,
            },
            body: {
              title: chat.input,
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-expect-error
              references: ReferencesBuilder({ orgId, userId })
                .addBrandkit({ id: brandkitId, isArtefact: false })
                .build(),
            },
          }
        )
      } catch (error: unknown) {
        const { response } = error as HTTPError
        toast.error(response.statusText)
      } finally {
        setIsChatActionPending(false)
      }

      return
    }

    const filesToUpload = await Promise.all(
      (uploadedFiles || []).map(async (file) => {
        const dataUrl = await fileToDataURL(file)
        return {
          type: "image_base64",
          value: dataUrl,
        }
      })
    )

    // Now that all files are uploaded and we have their IDs, call handleSubmit
    const data = {
      content: chat.input,
      references: [
        ...ReferencesBuilder({ orgId, userId })
          .addBrandkit({ id: brandkitId!, isArtefact: false })
          .build(),
        ...referencesArr.current,
      ],
      ...brainstormingData,
      addedContext: filesToUpload,
    }

    setChatBodyAtom(data)

    chat.handleSubmit?.()

    referencesArr.current = []
    onClearFiles?.()
  }

  const handleFileUpload = async () => {
    // Open file picker dialog for multiplefiles for JPEG, PNG
    const fileInput = document.createElement("input")
    fileInput.type = "file"
    fileInput.multiple = true
    fileInput.accept = "image/jpeg, image/png"
    fileInput.click()

    const files = await new Promise<File[]>((resolve) => {
      fileInput.onchange = () => {
        resolve(fileInput.files ? Array.from(fileInput.files) : [])
      }
    })

    // Filter files that are 5MB or smaller
    const validFiles = files.filter((file) => file.size <= 5 * 1024 * 1024)
    const rejectedFiles = files.filter((file) => file.size > 5 * 1024 * 1024)

    if (rejectedFiles.length > 0) {
      toast.error(
        `${rejectedFiles.length} file(s) were rejected: Maximum file size is 5MB`
      )
    }

    // Check if adding these files would exceed 10 image limit
    const currentFileCount = uploadedFiles?.length || 0
    const totalFiles = currentFileCount + validFiles.length

    if (totalFiles > 10) {
      const allowedCount = 10 - currentFileCount
      const filesToAdd = validFiles.slice(0, allowedCount)
      const rejectedCount = validFiles.length - filesToAdd.length

      if (rejectedCount > 0) {
        toast.error(
          `${rejectedCount} file(s) were rejected: Maximum 10 images allowed`
        )
      }

      onFileUpload?.(filesToAdd)
    } else {
      onFileUpload?.(validFiles)
    }
  }

  const onStopGeneration = () => {
    if (!chatId) return
  }

  const handleBrainstormingOnClick = () => {
    setIsBrainstormingActive((prev) => !prev)
    setHasClickedBrainstormingButton(true)
    setBrainstormingData((prev) =>
      !isBrainstormingActive
        ? {
            ...prev,
            mode: "brainstorming",
            params: {
              searchType: "knowledge_web",
            },
          }
        : undefined
    )
  }

  const [_, setHasClickedBrainstormingButton] = useLocalStorage<boolean>(
    "hasClickedBrainstormingButton"
  )

  // Memoize object URLs for previews so typing doesn't recreate them every render
  const filePreviews = useMemo(
    () =>
      (uploadedFiles || []).map((file, index) => {
        const isImage = file.type.startsWith("image/")
        // Only create a blob URL for images; non-images use a static icon path
        const url = isImage ? URL.createObjectURL(file) : "/icons/file-icon.svg"
        const key = `${file.name}-${file.size}-${file.lastModified}-${index}`
        return { key, file, isImage, url } as const
      }),
    [uploadedFiles]
  )

  // Revoke previous object URLs on change/unmount to prevent leaks and reloads
  useEffect(() => {
    return () => {
      for (const p of filePreviews) {
        if (p.isImage) {
          URL.revokeObjectURL(p.url)
        }
      }
    }
  }, [filePreviews])

  return (
    <form ref={formRef} className="w-full space-y-2" onSubmit={handleOnSubmit}>
      <div
        className={cn(
          "stream-bg-ai-400 w-full rounded-full p-[2px]",
          isMultiline ? "rounded-2xl" : "rounded-full"
        )}
      >
        <div
          className={cn(
            "relative flex w-full flex-col gap-1.5 rounded-full bg-white p-2",
            {
              "ai-textbox-expanded-border-radius": isMultiline,
              "rounded-full": !isMultiline,
              "bg-gray-50": isPromptDisabled || isChatActionPending,
            }
          )}
        >
          <Textarea
            data-testid="prompt_form_textarea"
            disabled={isPromptDisabled || isChatActionPending}
            tabIndex={0}
            onKeyDown={onKeyDown}
            onHeightChange={onHeight}
            placeholder="Ask anything"
            className={cn(
              "ai-textbox-scrollbar sm:text-md w-full flex-grow resize-none bg-transparent px-3 py-2 text-sm focus-within:outline-none"
            )}
            autoFocus
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            maxRows={7}
            name="prompt"
            value={chat.input}
            onChange={(e) => {
              if (isProcessingAllChanges) {
                e.preventDefault()
              }
              chat.handleInputChange?.(e)
            }}
          />
          <div
            className={cn(
              "flex items-end justify-between bg-transparent focus-visible:outline-none",
              isMultiline ? "bottom-2" : "top-[50%] translate-y-[-50%]"
            )}
          >
            <div className="flex flex-grow flex-wrap gap-1">
              {!isBrainstormingActive && (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="tour-chat-brainstorming-tools"
                      variant="ghost"
                      colorScheme="neutral"
                    >
                      <Icon path={mdiPlus} /> <span>Tools</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    side="top"
                    align="start"
                    className="flex w-56 flex-col gap-2 p-2"
                  >
                    <button
                      className="flex gap-2 rounded-md p-2 text-left transition-colors hover:bg-gray-50"
                      onClick={handleBrainstormingOnClick}
                    >
                      <Icon
                        path={mdiTextLong}
                        size={"2xs"}
                        className="text-blackAlpha-500"
                      />
                      <div>
                        <h3 className="text-sm font-semibold">Brainstorming</h3>
                        <p className="text-blackAlpha-300 text-sm">
                          Create long form content (e.g. blogs, articles)
                        </p>
                      </div>
                    </button>
                    <p className="text-muted-fg px-2 py-0.5 text-sm">
                      More tools coming soon
                    </p>
                  </PopoverContent>
                </Popover>
              )}
              {isBrainstormingActive && (
                <Button
                  onClick={handleBrainstormingOnClick}
                  variant={"outline"}
                >
                  <Icon path={mdiTextLong} size={"2xs"} />{" "}
                  <span>Brainstorming</span>
                </Button>
              )}
              <div className="mr-1 flex flex-grow items-center justify-end gap-2">
                {filePreviews.slice(0, 2).map((p) => {
                  return (
                    <div
                      key={p.key}
                      className="group relative flex h-8 max-w-44 items-center justify-center gap-2 rounded border p-1"
                      title={p.file.name}
                    >
                      <div className="relative size-6 shrink-0 overflow-hidden rounded-sm bg-gray-100 ring-1 ring-black/5">
                        {p.isImage ? (
                          <>
                            <Image
                              src={p.url}
                              alt=""
                              fill
                              className="scale-110 object-cover opacity-50 blur-sm"
                              unoptimized
                              sizes="28px"
                              aria-hidden
                            />
                            <Image
                              src={p.url}
                              alt={p.file.name}
                              fill
                              className="object-contain"
                              unoptimized
                              sizes="28px"
                            />
                          </>
                        ) : (
                          <Image
                            src="/icons/file-icon.svg"
                            alt=""
                            fill
                            className="object-contain"
                            sizes="28px"
                          />
                        )}
                      </div>
                      <span className="truncate">{p.file.name}</span>
                      <div
                        className="absolute top-1/2 right-2 hidden size-5 -translate-y-1/2 cursor-pointer place-items-center bg-white group-hover:grid"
                        onClick={() => onFileRemove?.(p.file)}
                      >
                        <Icon
                          path={mdiClose}
                          className="text-blackAlpha-500 hover:text-blackAlpha-700"
                          size={"2xs"}
                        />
                      </div>
                    </div>
                  )
                })}

                {filePreviews && filePreviews.length > 2 && (
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="grid h-8 w-9 place-items-center rounded border">
                        +{filePreviews.length - 2}
                      </button>
                    </PopoverTrigger>

                    <PopoverContent align="end" className="w-80 space-y-2 p-2">
                      {filePreviews.slice(2).map((p) => {
                        return (
                          <div
                            key={p.key}
                            className="group relative flex h-8 w-full items-center gap-2 rounded border p-1"
                            title={p.file.name}
                          >
                            <div className="relative size-6 shrink-0 overflow-hidden rounded-sm bg-gray-100 ring-1 ring-black/5">
                              {p.isImage ? (
                                <>
                                  <Image
                                    src={p.url}
                                    alt=""
                                    fill
                                    className="scale-110 object-cover opacity-50 blur-sm"
                                    unoptimized
                                    sizes="28px"
                                    aria-hidden
                                  />
                                  <Image
                                    src={p.url}
                                    alt={p.file.name}
                                    fill
                                    className="object-contain"
                                    unoptimized
                                    sizes="28px"
                                  />
                                </>
                              ) : (
                                <Image
                                  src="/icons/file-icon.svg"
                                  alt=""
                                  fill
                                  className="object-contain"
                                  sizes="28px"
                                />
                              )}
                            </div>

                            <span className="truncate text-sm">
                              {p.file.name}
                            </span>

                            {/* remove button (hover) */}
                            <div
                              className="absolute top-1/2 right-2 hidden size-5 -translate-y-1/2 cursor-pointer place-items-center bg-white group-hover:grid"
                              onClick={() => onFileRemove?.(p.file)}
                            >
                              <Icon
                                path={mdiClose}
                                className="text-blackAlpha-500 hover:text-blackAlpha-700"
                                size={"2xs"}
                              />
                            </div>
                          </div>
                        )
                      })}
                    </PopoverContent>
                  </Popover>
                )}
              </div>
            </div>

            <div className="flex">
              <div className="flex items-center gap-1">
                <Button
                  size={"icon"}
                  variant="ghost"
                  colorScheme="neutral"
                  onClick={() => handleFileUpload()}
                >
                  <Icon path={mdiPaperclip} />
                </Button>
                {uploadedFiles && uploadedFiles.length > 0 && (
                  <span
                    className={cn(
                      "rounded px-1 py-0.5 text-xs",
                      uploadedFiles.length >= 8
                        ? "bg-orange-100 text-orange-600"
                        : "text-gray-500",
                      uploadedFiles.length >= 10
                        ? "bg-red-100 text-red-600"
                        : ""
                    )}
                  >
                    {uploadedFiles.length}/10
                  </span>
                )}
              </div>

              {isLoading || isChatActionPending ? (
                <Button
                  data-testid="prompt_form_stop_button"
                  disabled={isPromptDisabled || isChatActionPending}
                  size="icon"
                  variant="outline"
                  colorScheme="neutral"
                  className="text-neutral-fg text-md sm:border-color h-10 w-auto gap-2 rounded-3xl border-transparent p-2 font-semibold sm:px-4"
                  onClick={onStopGeneration}
                >
                  <span className="hidden sm:block">Stop</span>
                  <Icon
                    path={mdiStop}
                    className="neutral-fg text-primary-500 sm:hidden"
                  />
                  <Icon
                    path={mdiStopCircleOutline}
                    className="neutral-fg hidden sm:block"
                  />
                </Button>
              ) : (
                <Button
                  data-testid="prompt_form_submit_button"
                  ref={btnRef}
                  disabled={
                    !isBrandkitIdAvailable ||
                    chat.input.trim().length === 0 ||
                    isLoading ||
                    isProcessingAllChanges ||
                    Object.values(isProcessing).some((v) => v) ||
                    isBrandkitDelete
                  }
                  type="submit"
                  variant="ghost"
                  colorScheme="neutral"
                  size="icon"
                  className="h-10 w-10 rounded-full"
                >
                  <Icon path={mdiSend} aiGradient="600" />
                  <span className="sr-only">Chat with your brand</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      <p className="text-blackAlpha-300 text-center text-sm font-semibold">
        Stream AI can make mistakes. Check important info.
      </p>
    </form>
  )
}
