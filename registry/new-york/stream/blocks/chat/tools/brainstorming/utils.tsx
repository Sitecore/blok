import React from "react"
import { mdiCheckboxMarkedCircleOutline } from "@mdi/js"
import {
  ChunkModelV2,
  documents,
  ListChunksModelResponseV2,
} from "@sitecore/stream-ui-core"
import { pick } from "lodash"

import { Markdown } from "../../Markdown"
import { MessageSubtitle } from "../../MessageSubtitle"
import { Source } from "../../types"
import {
  extractBrandkitSourcesFromWorkflow,
  firstCharToUpperCase,
  removeDuplicatesFromArray,
  TOOLS_SOURCES_TITLES,
} from "../../utils"
import {
  SearchContentProps,
  WorkflowBrandkitSection,
  WorkflowItem,
} from "../../Workflow"
import { Sources } from "../Sources"

export interface WorkflowBrandkitSectionItemsProps {
  workflow: WorkflowItem[]
  organizationId: string
}

export function withIsLoading(
  items: WorkflowItem[] = [],
  isLoading: boolean = false
): WorkflowItem[] {
  return items.map((item: WorkflowItem) => {
    return { ...item, isLoading }
  })
}

export function withUpdatedSearchItems(
  items: WorkflowItem[] = []
): WorkflowItem[] {
  return items.map((item: WorkflowItem) => {
    if (item.name === "search") {
      return workflowRenderSearchItems(item)
    }
    return item
  })
}

function workflowRenderSearchItems(item: WorkflowItem): WorkflowItem {
  return !Array.isArray(item.content) // Content could be a string
    ? item
    : {
        ...item,
        content: (item.content as SearchContentProps[]).map(
          (cont, index: number) => {
            const keys = Object.keys(cont) as (keyof SearchContentProps)[]

            return keys.map((key, idx: number) => {
              const sources = cont[key]

              return (
                <div
                  key={`${key}_${index}_${idx}`}
                  className="mb-4 flex flex-col"
                >
                  {key === "question" ? (
                    <div className="flex flex-col space-y-2">
                      <h3 className="text-2xl font-semibold">
                        {firstCharToUpperCase(key)}
                      </h3>
                      <p className="text-[16px]">{cont[key]}</p>
                    </div>
                  ) : (
                    <div className="flex flex-col space-y-2">
                      <h4 className="text-lg font-semibold">
                        {TOOLS_SOURCES_TITLES[
                          key as keyof typeof TOOLS_SOURCES_TITLES
                        ] ?? key}
                      </h4>
                      <Sources sources={sources as Source[]} />
                    </div>
                  )}
                </div>
              )
            })
          }
        ),
      }
}

export async function getWorkflowRenderBrandkitSectionItemsSources({
  workflow,
  organizationId,
}: WorkflowBrandkitSectionItemsProps): Promise<unknown[]> {
  return Promise.all(
    workflow.map(async (item: WorkflowItem) => {
      return await new Promise(async (resolve) => {
        if (item.data?.brandkitSections) {
          // Merge all fields from all sections
          const fields =
            item?.data?.brandkitSections.reduce(
              (acc: string[], cur: WorkflowBrandkitSection) => {
                return [...acc, ...cur.fields]
              },
              [] as string[]
            ) ?? []

          // Get chunks for every id
          const brandkitSections = (
            await Promise.allSettled(
              fields.map(async (fieldId) => {
                return await documents.listChunksV2ApiDocumentsV2OrganizationsOrganizationIdChunksGet(
                  {
                    path: {
                      organizationId,
                    },
                    query: {
                      pageNumber: 1,
                      referenceId: fieldId,
                      referenceType: "brandkitField",
                    },
                  }
                )
              })
            )
          )
            .filter((res) => res.status === "fulfilled")
            .map((item) => item.value)

          // Get images from chunks
          const sourcesImages: (Source & ChunkModelV2)[] =
            removeDuplicatesFromArray(
              (brandkitSections
                ?.map(
                  (section) =>
                    (section as unknown as ListChunksModelResponseV2).data ?? []
                )
                .flat()
                .map((source) => ({
                  ...source,
                  type: "image",
                  url: source.imageUrl,
                })) as unknown as (Source & ChunkModelV2)[]) ?? [],
              "url"
            )

          // Properties with the parent_ prefix are our PDFs. They are possible duplicates that we clear here
          const sourcesPdfs: Source[] = removeDuplicatesFromArray(
            sourcesImages
              .filter((source: ChunkModelV2) => !!source?.parent_url?.length)
              .map((source) => pick(source, ["parent_title", "parent_url"]))
              .map((source) => ({
                ...source,
                type: "pdf",
                url: source.parent_url,
                title: source.parent_title,
              })) as unknown as Source[],
            "url"
          )

          const sources = [...sourcesImages, ...sourcesPdfs]

          extractBrandkitSourcesFromWorkflow["Brand Kit section sources"] =
            removeDuplicatesFromArray(
              [
                ...extractBrandkitSourcesFromWorkflow[
                  "Brand Kit section sources"
                ],
                ...sourcesPdfs,
              ],
              "url"
            )

          const content = sources?.length ? (
            <div className="mt-4 flex flex-col space-y-2">
              <MessageSubtitle
                icon={mdiCheckboxMarkedCircleOutline}
                title="Used brand kit sections"
              />
              <Sources sources={sources} />
            </div>
          ) : null

          resolve({
            ...item,
            content: (
              <>
                {typeof item.content === "string" ? (
                  <Markdown text={item.content} />
                ) : (
                  item.content
                )}
                {content}
              </>
            ),
          })
        }
        resolve(item)
      })
    })
  )
}
