import React, { useMemo, useState } from "react"
import { ToolInvocationUIPart, UIMessage } from "@ai-sdk/ui-utils"
import { mdiThumbDownOutline, mdiThumbUpOutline } from "@mdi/js"
import {
  chat,
  ContentModelRead,
  FeedbackModel,
  ListUserChatMessagesModelResponseV2,
  UpdateUserChatMessageModelResponseV2,
} from "@sitecore/stream-ui-core"
import { useAtomValue } from "jotai"
import { isEmpty } from "lodash"
import { toast } from "sonner"

import { Button } from "@/registry/new-york/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/registry/new-york/ui/tooltip"

import { cn } from "../../lib/utils"
import { StreamIcon } from "../../ui/stream-icon"
import { ActionModal } from "./ActionModal"
import { SourceItem } from "./SourceItem"
import { extractSourcesFromDataAtom, sessionAtom } from "./store/atoms"
import { ExtractSourceProps, HTTPValidationError } from "./types"
import {
  createSources,
  extractSourcesFromBrainstorming,
  extractSourcesFromParts,
} from "./utils"

export interface MessageFeedbackProps {
  message: UIMessage &
    Pick<ListUserChatMessagesModelResponseV2, "feedback"> & {
      content?: string | Array<ContentModelRead>
    }
  messageId: string
}

const feedbackConfig = [
  { type: "good", activeColor: "text-green-300", icon: mdiThumbUpOutline },
  { type: "bad", activeColor: "text-red-300", icon: mdiThumbDownOutline },
]

export function MessageFeedback({
  messageId,
  message,
}: MessageFeedbackProps): React.ReactNode {
  const [rollbackFeedback, setRollbackFeedback] =
    useState<FeedbackModel | null>(message?.feedback ?? null)
  const [feedback, setFeedback] = useState<FeedbackModel | null>(
    message?.feedback ?? null
  )

  /* Atoms */
  const extractSourcesFromData = useAtomValue(extractSourcesFromDataAtom)
  const session = useAtomValue(sessionAtom)

  /* Computed */
  const parts = message?.parts as ToolInvocationUIPart[]
  const allSources = useMemo(
    () =>
      createSources(
        extractSourcesFromData?.[messageId] ?? {},
        extractSourcesFromBrainstorming(parts),
        extractSourcesFromParts(parts)
      ),
    [extractSourcesFromData, messageId, parts]
  )
  const allSourcesTotalAmount = useMemo(
    () =>
      allSources?.reduce(
        (acc: number, cur: ExtractSourceProps) => acc + cur[1].length,
        0
      ),
    [allSources]
  )

  const onFeedbackClick = async (
    type: FeedbackModel["type"]
  ): Promise<void> => {
    const hasFeedback = feedback?.type === type
    let updatedMessage: UpdateUserChatMessageModelResponseV2 | undefined

    setFeedback((prev) => (hasFeedback ? null : { ...prev, type }))

    try {
      const { data } =
        await chat.getUserChatMessageV2ApiChatsV2OrganizationsOrganizationIdUsersUserIdChatsChatIdMessagesMessageIdGet(
          {
            path: {
              messageId,
              userId: session.userId,
              chatId: session.chatId,
              organizationId: session.orgId,
            },
          }
        )

      const patchMessageRes = await fetch(
        `https://ai-chat-api-${session.apiEnv}/api/chats/v2/organizations/${session.orgId}/users/${session.userId}/chats/${session.chatId}/messages/${messageId}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            content: data?.content ?? null,
            feedback: hasFeedback ? null : { type },
          }),
          headers: {
            "Content-Type": "application/json",
            ...(session?.token
              ? { Authorization: `Bearer ${session?.token}` }
              : {}),
          },
        }
      )

      if (!patchMessageRes.ok) {
        throw patchMessageRes
      }

      updatedMessage = await patchMessageRes.json()
      setRollbackFeedback(updatedMessage?.feedback ?? null)
      setFeedback(updatedMessage?.feedback ?? null)
    } catch (error) {
      const { detail } = error as HTTPValidationError
      setFeedback(rollbackFeedback)
      toast.error(detail[0]?.msg)
    }
  }

  return (
    <div className="flex gap-1">
      {feedbackConfig.map((btn, index) => (
        <Tooltip key={`${btn.type}_${index}`}>
          <TooltipTrigger asChild>
            <Button
              data-testid={`feedback_button_${btn.type}`}
              variant="ghost"
              colorScheme="neutral"
              className={cn(
                feedback?.type === btn.type ? btn.activeColor : "gray"
              )}
              size="icon"
              disabled={!message?.id}
              onClick={() => onFeedbackClick(btn.type as FeedbackModel["type"])}
            >
              <StreamIcon path={btn.icon} />
            </Button>
          </TooltipTrigger>
          <TooltipContent className="text-inverse-text max-w-[200px] bg-gray-700 text-sm shadow-md">
            Tell us whether you got a quality result. This will be logged for
            review to help us improve our AI
          </TooltipContent>
        </Tooltip>
      ))}
      {/* TODO might re-visit */}
      {/*<Button variant="ghost" colorScheme="gray" size="icon" disabled>
        <Icon path={mdiRestart} />
      </Button>*/}
      {!isEmpty(allSources) && (
        <ActionModal
          ctaTitle="Sources"
          modalTitle={`Sources (${allSourcesTotalAmount})`}
        >
          {allSources?.map((sources, index: number) => (
            <SourceItem
              key={`sources_item_${index}_${message.id}`}
              sources={sources}
            />
          ))}
        </ActionModal>
      )}
    </div>
  )
}
