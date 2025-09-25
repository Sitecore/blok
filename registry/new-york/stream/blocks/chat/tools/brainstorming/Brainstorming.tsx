import React, { useCallback, useEffect, useRef } from "react"
import { useAtomValue, useSetAtom } from "jotai"
import { isEmpty } from "lodash"

import { Reveal } from "../../artifacts/Reveal"
import { useChatProvider } from "../../hooks/useChatProvider"
import {
  chatIdAtom,
  extractSourcesFromDataAtom,
  isLoadingAtom,
  isMessageAlreadyGeneratedAtom,
} from "../../store/atoms"
import { ToolProps } from "../../types"
import { extractBrandkitSourcesFromWorkflow } from "../../utils"
import { Workflow, type WorkflowItem } from "../../Workflow"
import { Tool } from "../Tool"
import { Blog } from "./Blog"
import {
  getWorkflowRenderBrandkitSectionItemsSources,
  withIsLoading,
  withUpdatedSearchItems,
} from "./utils"

export function Brainstorming(props: ToolProps): React.ReactNode {
  const {
    messageId,
    toolInvocation: { args },
  } = props

  /* IDs */
  const brainstormId = args?.data?.id

  /* Hooks */
  const { session } = useChatProvider()
  const mounted = useRef<boolean>(false)
  const workflowItems = useRef<WorkflowItem[]>([])

  /* Atoms */
  const isMessageAlreadyGenerated = useAtomValue(isMessageAlreadyGeneratedAtom)(
    messageId
  )
  const isLoading = useAtomValue(isLoadingAtom)
  const setExtractSourcesFromData = useSetAtom(extractSourcesFromDataAtom)
  const chatId = useAtomValue(chatIdAtom)

  /* Computed */
  const isWorkflowAvailable = !!args?.result?.workflow?.length
  const isBlogAvailable = !!args?.result?.output?.length
  const canRender =
    !!chatId.length && !mounted.current && !isEmpty(args?.result)
  const hasLatestData = !isLoading && brainstormId && messageId

  const handleAddBrandkitSectionsSourcesToWorkflow = useCallback(async () => {
    const updatedWorkflowItems =
      await getWorkflowRenderBrandkitSectionItemsSources({
        workflow: workflowItems.current,
        organizationId: session.orgId,
      })
    // Chat might have more than one brainstorming; therefore, we need to ID the sources
    setExtractSourcesFromData((prev) => ({
      ...prev,
      [messageId]: extractBrandkitSourcesFromWorkflow,
    }))
    workflowItems.current = updatedWorkflowItems as WorkflowItem[]
  }, [messageId, session.orgId, setExtractSourcesFromData])

  useEffect(() => {
    if (canRender) {
      // Streaming
      workflowItems.current = withUpdatedSearchItems(
        withIsLoading(args?.result?.workflow, isLoading)
      )

      if (hasLatestData) {
        mounted.current = true
        workflowItems.current = withUpdatedSearchItems(
          withIsLoading(args?.result?.workflow, isLoading)
        )
        handleAddBrandkitSectionsSourcesToWorkflow()
      }
    }
  }, [
    args?.result?.workflow,
    canRender,
    handleAddBrandkitSectionsSourcesToWorkflow,
    hasLatestData,
    isLoading,
  ])

  return (
    <>
      {isWorkflowAvailable && (
        <Reveal
          isGenerating={isMessageAlreadyGenerated}
          titleStreamStart="Thinking"
          titleStreamEnd="Thinking"
          id="brainstorming_tools"
          isExpandable
        >
          <Tool className="rounded-lg border border-[#F7F7F7] bg-white p-2 py-3">
            <Workflow items={workflowItems.current} />
          </Tool>
        </Reveal>
      )}
      {isBlogAvailable && <Blog {...props} />}
    </>
  )
}
