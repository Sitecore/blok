import React, { useCallback, useRef, useState, type FormEvent } from "react"
import {
  mdiMagicStaff,
  mdiReload,
  mdiStarFourPoints,
  mdiStop,
  mdiText,
  mdiTextLong,
} from "@mdi/js"
import {
  abTesting,
  brainstorming,
  HTTPError,
  type AbRecommendations,
} from "@sitecore/stream-ui-core"
import { useSetAtom } from "jotai"
import { omit } from "lodash"
import { toast } from "sonner"

import { Button } from "@/registry/new-york/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/new-york/ui/popover"

import {
  setPreviewAsideMaxVersions,
  type PreviewAsideVersions,
} from "../../artifacts/PreviewAside"
import { useChatProvider } from "../../hooks/useChatProvider"
import { Icon } from "../../Icon"
import { apiQueueAtom } from "../../store/atoms"
import { type HTTPValidationError } from "../../types"
import {
  copyToClipboard,
  htmlToMarkdown,
  markdownToPlainText,
  STRIP_TEXT_REGEX,
} from "../../utils"
import { ReferencesBuilder } from "../../utils/referencesBuilder"

export type QuickActionOptionsProps = {
  icon: React.ReactNode
  description: string
  predefinedPrompt: AbRecommendations["predefinedPrompt"]
}[]

const quickActionOptions: QuickActionOptionsProps = [
  {
    icon: <Icon aiGradient="400" path={mdiTextLong} />,
    description: "Make Longer",
    predefinedPrompt: 40,
  },
  {
    icon: <Icon aiGradient="400" path={mdiText} />,
    description: "Make Shorter",
    predefinedPrompt: 30,
  },
  {
    icon: <Icon aiGradient="400" path={mdiMagicStaff} />,
    description: "Simplify",
    predefinedPrompt: 62,
  },
  {
    icon: <Icon aiGradient="400" path={mdiReload} />,
    description: "Rephrase",
    predefinedPrompt: 10,
  },
]

export interface UseBlogLogicProps {
  isActionPending: boolean
  versions: PreviewAsideVersions
  artifactContentRef: React.MutableRefObject<string>
  isPopoverOpen: boolean
  isQuickActionLoading: boolean
  setIsQuickActionLoading: React.Dispatch<React.SetStateAction<boolean>>
  setIsPopoverOpen: React.Dispatch<React.SetStateAction<boolean>>
  setUnSavedArtifactContent: React.Dispatch<React.SetStateAction<string>>
  handleGetBrainstorm: (brainstormId: string) => Promise<void>
  handlePatchBrainstorm: (
    brainstormId: string,
    patchData: string
  ) => Promise<void>
  handleSetVersionOnSelect: (
    brainstormId: string,
    versionNumber: string
  ) => Promise<void>
  handleMainContentOnInput: (e: FormEvent<HTMLDivElement>) => void
  handleCopyTextOnClick: () => void
  handleArtifactPanelOnClose: (brainstormId: string) => Promise<void>
  handleQuickActionOnSelect: (
    predefinedPrompt: AbRecommendations["predefinedPrompt"],
    chatId: string,
    messageId: string,
    brainstormId: string
  ) => Promise<void>
  handleStopQuickAction: () => Promise<void>
  handleOnSelectNewVersion: () => Promise<void>
  quickActions: (
    chatId: string,
    messageId: string,
    brainstormId: string
  ) => React.ReactNode
}

export function useBlogLogic(): UseBlogLogicProps {
  /* Hooks */
  const { session } = useChatProvider()
  const [versions, setVersions] = useState<PreviewAsideVersions>({
    selected: "",
    available: [],
  })
  const [unSavedArtifactContent, setUnSavedArtifactContent] =
    useState<string>("")
  const [isActionPending, setIsActionPending] = useState(false)
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const [isQuickActionLoading, setIsQuickActionLoading] = useState(false)
  const artifactContentRef = useRef<string>("")
  const [abortController, setAbortController] =
    useState<AbortController | null>(null)

  /* Atoms */
  const setApiQueue = useSetAtom(apiQueueAtom)

  async function handleGetBrainstorm(brainstormId: string): Promise<void> {
    setIsActionPending(true)
    setApiQueue((prev) => ({ ...prev, getBrainstorm: brainstormId }))

    try {
      const { data } =
        await brainstorming.getBrainstormApiBrainstormsV1BrainstormsBrainstormIdGet(
          {
            path: {
              brainstormId,
            },
          }
        )

      artifactContentRef.current = data?.output ?? ""
      setVersions({
        selected: String(data?.version),
        available: setPreviewAsideMaxVersions(String(data?.version)),
      })
      setUnSavedArtifactContent(data?.output ?? "")
    } catch (error: unknown) {
      const { response } = error as HTTPError
      toast.error(response.statusText)
    } finally {
      setIsActionPending(false)
      setApiQueue((prev) => omit(prev, ["getBrainstorm"]))
    }
  }

  const handlePatchBrainstorm = useCallback(
    async function (brainstormId: string, patchData: string): Promise<void> {
      setIsActionPending(true)

      try {
        const patchBrainstormRes = await fetch(
          `https://ai-brainstorming-api-${session.apiEnv}/api/brainstorms/v1/brainstorms/${brainstormId}`,
          {
            method: "PATCH",
            body: JSON.stringify({
              output: patchData,
            }),
            headers: {
              "Content-Type": "application/json",
              ...(session?.token
                ? { Authorization: `Bearer ${session?.token}` }
                : {}),
            },
          }
        )

        if (!patchBrainstormRes.ok) {
          throw patchBrainstormRes
        }

        const data = await patchBrainstormRes.json()

        artifactContentRef.current = data?.output ?? ""
        setVersions({
          selected: String(data?.version),
          available: setPreviewAsideMaxVersions(String(data?.version)),
        })
        setUnSavedArtifactContent(data?.output ?? "")
      } catch (error: unknown) {
        const { detail } = error as HTTPValidationError
        toast.error(detail[0]?.msg)
      } finally {
        setIsActionPending(false)
      }
    },
    [session.apiEnv, session?.token]
  )

  const handleQuickActionOnSelect = useCallback(
    async function (
      predefinedPrompt: AbRecommendations["predefinedPrompt"],
      chatId: string,
      messageId: string,
      brainstormId: string
    ): Promise<void> {
      setIsPopoverOpen(false)
      setIsQuickActionLoading(true)
      setIsActionPending(true)

      const references = ReferencesBuilder({
        orgId: session.orgId,
        userId: session.userId,
      })
        .addChatMessage({ id: chatId, messageId })
        .build()

      try {
        const { data } =
          await abTesting.generateAbRecommendationsVariantsApiRecommendationsV2OrganizationsOrganizationIdVariantsPost(
            {
              body: {
                fields: [
                  {
                    name: "Quick Action",
                    value: artifactContentRef.current,
                  },
                ],
                predefinedPrompt,
                numberOfVariants: 1,
                references: references as never,
              },
              path: {
                organizationId: session.orgId,
              },
            }
          )

        handlePatchBrainstorm(
          brainstormId,
          data?.variants?.[0].fields?.[0].value ?? ""
        )
      } catch (error: unknown) {
        const { response } = error as HTTPError
        toast.error(response.statusText)
      } finally {
        setIsActionPending(false)
        setIsQuickActionLoading(false)
        setAbortController(null)
      }
    },
    [handlePatchBrainstorm, session.orgId, session.userId]
  )

  async function handleStopQuickAction(): Promise<void> {
    if (abortController) {
      abortController.abort()
      setAbortController(null)
      setIsQuickActionLoading(false)
    }
  }

  async function handleSetVersionOnSelect(
    brainstormId: string,
    versionNumber: string
  ): Promise<void> {
    setVersions((prev) => ({ ...prev, selected: versionNumber }))
    setIsActionPending(true)

    try {
      const { data } =
        await brainstorming.getBrainstormApiBrainstormsV1BrainstormsBrainstormIdVersionsVersionNumberGet(
          {
            path: {
              brainstormId,
              versionNumber,
            },
          }
        )

      artifactContentRef.current = data?.output ?? ""
      setUnSavedArtifactContent(data?.output ?? "")
    } catch (error: unknown) {
      const { response } = error as HTTPError
      toast.error(response.statusText)
    } finally {
      setIsActionPending(false)
    }
  }

  async function handleOnSelectNewVersion(): Promise<void> {}

  async function handleArtifactPanelOnClose(
    brainstormId: string
  ): Promise<void> {
    if (
      unSavedArtifactContent?.replace(STRIP_TEXT_REGEX, "") !==
      artifactContentRef.current?.replace(STRIP_TEXT_REGEX, "")
    ) {
      await handlePatchBrainstorm(brainstormId, artifactContentRef.current)
    }
  }

  function handleMainContentOnInput(e: FormEvent<HTMLDivElement>): void {
    const parent = e.target as HTMLDivElement
    artifactContentRef.current = htmlToMarkdown(String(parent?.innerHTML))
  }

  function handleCopyTextOnClick(): void {
    copyToClipboard(markdownToPlainText(artifactContentRef.current))
  }

  function quickActions(
    chatId: string,
    messageId: string,
    brainstormId: string
  ): React.ReactNode {
    return isQuickActionLoading ? (
      <Button
        data-testid={`blog_quick_actions_stop_generation`}
        variant={"ghost"}
        colorScheme="neutral"
        onClick={handleStopQuickAction}
      >
        <Icon path={mdiStop} className="animate-pulse" />
        <span className="ml-2 flex items-center">
          Generating
          <span className="ml-1 animate-pulse">...</span>
        </span>
      </Button>
    ) : (
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>
          <Button
            data-testid={`blog_quick_actions_button}`}
            variant={"ghost"}
            colorScheme="neutral"
            disabled={isActionPending || isQuickActionLoading}
          >
            <Icon path={mdiStarFourPoints} /> Quick Actions
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="flex w-min flex-col items-start space-y-2"
          sideOffset={16}
          align="start"
        >
          {quickActionOptions.map((option, index) => (
            <Button
              data-testid={`blog_quick_actions_select_${index}`}
              key={option.description}
              variant={"ghost"}
              onClick={() =>
                handleQuickActionOnSelect(
                  option.predefinedPrompt,
                  chatId,
                  messageId,
                  brainstormId
                )
              }
            >
              {option.icon}
              <span className="text-md text-blackAlpha-900 font-normal">
                {option.description}
              </span>
            </Button>
          ))}
        </PopoverContent>
      </Popover>
    )
  }

  return {
    isActionPending,
    versions,
    artifactContentRef,
    isPopoverOpen,
    isQuickActionLoading,
    setIsQuickActionLoading,
    setIsPopoverOpen,
    setUnSavedArtifactContent,
    handleGetBrainstorm,
    handlePatchBrainstorm,
    handleSetVersionOnSelect,
    handleMainContentOnInput,
    handleCopyTextOnClick,
    handleArtifactPanelOnClose,
    handleQuickActionOnSelect,
    handleStopQuickAction,
    handleOnSelectNewVersion,
    quickActions,
  }
}
