import React, { useEffect, useMemo, useRef } from "react"
import { useAtomValue } from "jotai"

import { Button } from "@/registry/new-york/ui/button"

import { PreviewAside } from "../../artifacts/PreviewAside"
import EditCommands from "../../EditCommands"
import { Markdown } from "../../Markdown"
import { chatIdAtom, isLoadingAtom } from "../../store/atoms"
import { type ToolProps } from "../../types"
import { markdownToPlainText, replaceNewLines, saveToDocx } from "../../utils"
import { useBlogLogic } from "./useBlogLogic"

export function Blog({
  messageId,
  toolInvocation,
}: ToolProps): React.ReactNode {
  const { args } = toolInvocation
  const mainContent = useMemo(
    () => args?.result?.output ?? {},
    [args?.result?.output]
  )

  /* IDs */
  const brainstormId = args?.data?.id

  /* Hooks */
  const {
    isActionPending,
    versions,
    artifactContentRef,
    setUnSavedArtifactContent,
    handleGetBrainstorm,
    handleCopyTextOnClick,
    handleSetVersionOnSelect,
    handleArtifactPanelOnClose,
    handleMainContentOnInput,
    handleOnSelectNewVersion,
    quickActions,
  } = useBlogLogic()
  const mounted = useRef<boolean>(false)

  /* Atoms */
  const isLoading = useAtomValue(isLoadingAtom)
  const chatId = useAtomValue(chatIdAtom)

  /* Flags */
  const isMainContentAvailable = !!mainContent?.length
  const canRender =
    !!chatId?.length && !mounted.current && isMainContentAvailable
  const hasLatestData = !isLoading && brainstormId && messageId

  /* Effects */
  /* Init */
  useEffect(() => {
    if (canRender) {
      // Streaming
      artifactContentRef.current = replaceNewLines(mainContent)
      setUnSavedArtifactContent(replaceNewLines(mainContent))

      /* Get the latest version if using chat history */
      if (hasLatestData) {
        // History
        mounted.current = true
        artifactContentRef.current = replaceNewLines(mainContent)
        handleGetBrainstorm(brainstormId)
      }
    }
  }, [
    artifactContentRef,
    brainstormId,
    canRender,
    handleGetBrainstorm,
    hasLatestData,
    mainContent,
    setUnSavedArtifactContent,
  ])

  return (
    <section className="flex flex-col space-y-5">
      <PreviewAside
        id="blog"
        versions={versions}
        buttonTitle={markdownToPlainText(replaceNewLines(mainContent)).slice(
          0,
          100
        )}
        isActionPending={isActionPending}
        onSelectVersion={(value) =>
          handleSetVersionOnSelect(brainstormId, value)
        }
        onSelectNewVersion={handleOnSelectNewVersion}
        onClose={() => handleArtifactPanelOnClose(brainstormId)}
        footerContent={{
          start: <>{quickActions(chatId, messageId, brainstormId)}</>,
          end: (
            <>
              <EditCommands>
                <EditCommands.Copy
                  onClick={handleCopyTextOnClick}
                ></EditCommands.Copy>
              </EditCommands>
              <Button
                onClick={() => saveToDocx(artifactContentRef.current, "blog")}
              >
                Export
              </Button>
            </>
          ),
        }}
      >
        {isMainContentAvailable && (
          <div
            className="stream-chat-editable"
            contentEditable={!isActionPending}
            suppressContentEditableWarning
            onInput={handleMainContentOnInput}
          >
            <Markdown id="blog" text={artifactContentRef.current} />
          </div>
        )}
      </PreviewAside>
    </section>
  )
}
