import React, { useEffect, useMemo, useRef } from "react"
import { type ListBriefVersionSectionFieldsResponseModel } from "@sitecore/stream-ui-core"
import { useAtomValue } from "jotai"

import { Button } from "@/registry/new-york/ui/button"

import { PreviewAside } from "../../artifacts/PreviewAside"
import EditCommands from "../../EditCommands"
import { Markdown } from "../../Markdown"
import { chatIdAtom, isLoadingAtom } from "../../store/atoms"
import { type ToolProps } from "../../types"
import { useBriefLogic } from "./useBriefLogic"

export function Brief({
  messageId,
  toolInvocation,
}: ToolProps): React.ReactNode {
  const { args } = toolInvocation
  const mainContent = useMemo(() => args?.result ?? {}, [args?.result])

  /* IDs */
  const briefId = mainContent?.id

  /* Hooks */
  const {
    isActionPending,
    versions,
    artifactContentRef,
    handleGetBriefVersions,
    handleMainContentOnInput,
    handleSetVersionOnSelect,
    handleArtifactContentOnBlur,
    handleCopyTextOnClick,
    handleExportBriefToDocx,
    handleArtifactContentNewVersion,
  } = useBriefLogic(briefId)
  const mounted = useRef<boolean>(false)
  const exportMarkdownRef = useRef<HTMLDivElement>(null)

  /* Atoms */
  const isLoading = useAtomValue(isLoadingAtom)
  const chatId = useAtomValue(chatIdAtom)

  /* Flags */
  const isMainContentAvailable = !!Object.keys(mainContent).length
  const canRender =
    !!chatId?.length && !mounted.current && isMainContentAvailable
  const hasLatestData = !isLoading && briefId && messageId

  /* Effects */
  /* Init */
  useEffect(() => {
    if (canRender) {
      // Streaming
      artifactContentRef.current = mainContent

      /* Get the latest version if using chat history */
      if (hasLatestData) {
        // History
        mounted.current = true
        artifactContentRef.current = mainContent
        handleGetBriefVersions()
      }
    }
  }, [
    artifactContentRef,
    handleGetBriefVersions,
    hasLatestData,
    canRender,
    mainContent,
  ])

  return (
    <section className="flex flex-col space-y-5">
      <h4 className="text-md text-blackAlpha-900">Here is your brief...</h4>
      <PreviewAside
        id="brief"
        versions={versions}
        buttonTitle={mainContent?.name}
        isActionPending={isActionPending}
        onSelectVersion={handleSetVersionOnSelect}
        onSelectNewVersion={handleArtifactContentNewVersion}
        footerContent={{
          end: (
            <>
              <EditCommands>
                <EditCommands.Copy
                  onClick={handleCopyTextOnClick}
                ></EditCommands.Copy>
              </EditCommands>
              <Button
                onClick={() =>
                  handleExportBriefToDocx(exportMarkdownRef.current!)
                }
              >
                Export
              </Button>
            </>
          ),
        }}
      >
        {isMainContentAvailable && (
          <div
            ref={exportMarkdownRef}
            data-testid={`brief_content`}
            className="flex w-full flex-col"
          >
            {artifactContentRef.current?.sections?.map(
              (section, index: number) => {
                /* Skip the first section */
                if (index === 0) return null

                const {
                  id: sectionId,
                  name: sectionName,
                  fields,
                } = section ?? {}

                return (
                  <div key={`section_${sectionId}_${index}`}>
                    <div className="mt-4 flex flex-col">
                      {sectionName && (
                        <h2
                          contentEditable={!isActionPending}
                          suppressContentEditableWarning
                          onChange={(e) =>
                            handleMainContentOnInput(e, [
                              "sections",
                              String(index),
                              "name",
                            ])
                          }
                          onBlur={(e) =>
                            handleArtifactContentOnBlur(e, {
                              type: "section",
                              section,
                              path: ["sections", String(index), "name"],
                            })
                          }
                          className="stream-chat-editable text-3xl font-semibold text-black"
                        >
                          {sectionName}
                        </h2>
                      )}
                      {fields?.map(
                        (
                          field: ListBriefVersionSectionFieldsResponseModel,
                          idx: number
                        ) => {
                          const { id: fieldId, name: fieldName } = field
                          const value = Array.isArray(field.value)
                            ? field.value
                                .map((val) => (val as { name: string }).name)
                                .join(" ")
                            : (field.value as string)

                          return (
                            <div
                              key={`field_${fieldId}_${idx}`}
                              className="mt-4 flex flex-col"
                            >
                              {fieldName && (
                                <h3
                                  contentEditable={!isActionPending}
                                  suppressContentEditableWarning
                                  onChange={(e) =>
                                    handleMainContentOnInput(e, [
                                      "sections",
                                      String(index),
                                      "fields",
                                      String(idx),
                                      "name",
                                    ])
                                  }
                                  onBlur={(e) =>
                                    handleArtifactContentOnBlur(e, {
                                      type: "field",
                                      section,
                                      field,
                                      path: [
                                        "sections",
                                        String(index),
                                        "fields",
                                        String(idx),
                                        "name",
                                      ],
                                    })
                                  }
                                  className="stream-chat-editable text-xl font-semibold text-black"
                                >
                                  {fieldName}
                                </h3>
                              )}
                              {fieldName && (
                                <div
                                  contentEditable={!isActionPending}
                                  suppressContentEditableWarning
                                  onChange={(e) =>
                                    handleMainContentOnInput(e, [
                                      "sections",
                                      String(index),
                                      "fields",
                                      String(idx),
                                      "value",
                                    ])
                                  }
                                  onBlur={(e) =>
                                    handleArtifactContentOnBlur(e, {
                                      type: "field",
                                      section,
                                      field,
                                      path: [
                                        "sections",
                                        String(index),
                                        "fields",
                                        String(idx),
                                        "value",
                                      ],
                                    })
                                  }
                                  className="stream-chat-editable text-blackAlpha-600 text-md mt-4 font-normal"
                                >
                                  <Markdown id="brief" text={value} />
                                </div>
                              )}
                            </div>
                          )
                        }
                      )}
                    </div>
                  </div>
                )
              }
            )}
          </div>
        )}
      </PreviewAside>
    </section>
  )
}
