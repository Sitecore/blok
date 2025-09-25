import React, { FormEvent, useCallback, useRef, useState } from "react"
import {
  brief,
  FieldsModel,
  HTTPError,
  ListBriefVersionSectionFieldsResponseModel,
  ListBriefVersionSectionsModel,
} from "@sitecore/stream-ui-core"
import { useSetAtom } from "jotai"
import { cloneDeep, get, omit, pick, set } from "lodash"
import { toast } from "sonner"

import {
  PreviewAsideVersions,
  setPreviewAsideMaxVersions,
} from "../../artifacts/PreviewAside"
import { useChatProvider } from "../../hooks/useChatProvider"
import { apiQueueAtom } from "../../store/atoms"
import { HTTPValidationError } from "../../types"
import {
  copyToClipboard,
  htmlToMarkdown,
  saveToDocx,
  STRIP_TEXT_REGEX,
} from "../../utils"

export type SectionProps = ListBriefVersionSectionsModel & {
  fields: ListBriefVersionSectionFieldsResponseModel[]
}

export interface Sections {
  sections?: SectionProps[]
}

export interface UseBriefLogicProps {
  isActionPending: boolean
  versions: PreviewAsideVersions
  artifactContentRef: React.MutableRefObject<Sections>
  handleGetBriefVersions: (versionNumber?: string) => Promise<void>
  handleSetVersionOnSelect: (versionNumber: string) => Promise<void>
  handleMainContentOnInput: (
    e: FormEvent<HTMLDivElement>,
    path: string[]
  ) => void
  handleArtifactContentOnBlur: (
    e: FormEvent<HTMLDivElement>,
    {
      type,
      section,
      field,
      path,
    }: {
      type: "section" | "field"
      section: SectionProps
      field?: ListBriefVersionSectionFieldsResponseModel
      path: string[]
    }
  ) => Promise<void>
  handleCopyTextOnClick: () => void
  handleExportBriefToDocx: (markdownElement: HTMLDivElement) => void
  handleArtifactContentNewVersion: () => Promise<void>
}

export function useBriefLogic(briefId: string): UseBriefLogicProps {
  /* Hooks */
  const { session } = useChatProvider()
  const [versions, setVersions] = useState<PreviewAsideVersions>({
    selected: "",
    available: [],
  })
  const [initialSectionsLength, setInitialSectionsLength] = useState<number>(0)
  const [unSavedArtifactContent, setUnSavedArtifactContent] =
    useState<Sections>()
  const [isActionPending, setIsActionPending] = useState(false)
  const artifactContentRef = useRef<Sections>({})

  /* Atoms */
  const setApiQueue = useSetAtom(apiQueueAtom)

  const getInitialSectionsLength = useCallback(async () => {
    setApiQueue((prev) => ({ ...prev, getBriefVersionSections: briefId }))
    try {
      const { data = [] } =
        await brief.listBriefVersionSectionsApiBrandsV1OrganizationsOrganizationIdBriefsBriefIdVersionsVersionNumberSectionsGet(
          {
            path: {
              briefId,
              versionNumber: "1",
              organizationId: session.orgId,
            },
          }
        )

      setInitialSectionsLength(data.length)
    } catch (error: unknown) {
      const { response } = error as HTTPError
      toast.error(response.statusText)
      setIsActionPending(false)
    } finally {
      setApiQueue((prev) => omit(prev, ["getBriefVersionSections"]))
    }
  }, [briefId, session.orgId, setApiQueue])

  const handleGetBriefVersions = useCallback(
    async (versionNumber?: string) => {
      setIsActionPending(true)

      /* Create the brief from scratch */
      if (versionNumber) {
        setApiQueue((prev) => ({ ...prev, getBriefVersionSections: briefId }))

        let sectionsData = null

        try {
          const { data } =
            await brief.listBriefVersionSectionsApiBrandsV1OrganizationsOrganizationIdBriefsBriefIdVersionsVersionNumberSectionsGet(
              {
                path: {
                  briefId,
                  versionNumber,
                  organizationId: session.orgId,
                },
              }
            )
          sectionsData = data
        } catch (error: unknown) {
          const { response } = error as HTTPError
          toast.error(response.statusText)
          setIsActionPending(false)
        }

        setApiQueue((prev) => omit(prev, ["getBriefVersionSections"]))
        setApiQueue((prev) => ({
          ...prev,
          getBriefSectionVersionFields: briefId,
        }))

        const sections = await Promise.all(
          // The BE is returning all the sections, even the previous ones. We only need the last ones.
          sectionsData?.slice(-initialSectionsLength).map(async (section) => {
            let fields = null

            try {
              const { data } =
                await brief.listBriefVersionSectionFieldsApiBrandsV2OrganizationsOrganizationIdBriefsBriefIdVersionsVersionNumberSectionsSectionIdFieldsGet(
                  {
                    path: {
                      briefId,
                      versionNumber,
                      organizationId: session.orgId,
                      sectionId: section.id,
                    },
                  }
                )
              fields = data
            } catch (error: unknown) {
              const { response } = error as HTTPError
              toast.error(response.statusText)
              setIsActionPending(false)
            }

            setApiQueue((prev) => omit(prev, ["getBriefSectionVersionFields"]))

            return {
              ...section,
              fields: fields ?? [],
            }
          }) ?? []
        )

        artifactContentRef.current = {
          ...artifactContentRef.current,
          sections,
        }

        setUnSavedArtifactContent((prev) => ({ ...prev, sections }))
        setIsActionPending(false)
      } else {
        setApiQueue((prev) => ({ ...prev, getBrief: briefId }))
        try {
          const { data } =
            await brief.getBriefApiBrandsV1OrganizationsOrganizationIdBriefsBriefIdGet(
              {
                path: {
                  briefId,
                  organizationId: session.orgId,
                },
              }
            )

          setVersions({
            selected: data?.version ?? "",
            available: setPreviewAsideMaxVersions(data?.version ?? ""),
          })
          if (!initialSectionsLength) await getInitialSectionsLength()
          await handleGetBriefVersions(data?.version)
        } catch (error: unknown) {
          const { response } = error as HTTPError
          toast.error(response.statusText)
          setIsActionPending(false)
        } finally {
          setApiQueue((prev) => omit(prev, ["getBrief"]))
        }
      }
    },
    [
      briefId,
      getInitialSectionsLength,
      initialSectionsLength,
      session.orgId,
      setApiQueue,
    ]
  )

  const handleSetVersionOnSelect = async (
    versionNumber: string
  ): Promise<void> => {
    setVersions((prev) => ({ ...prev, selected: versionNumber }))
    await handleGetBriefVersions(versionNumber)
  }

  const handleMainContentOnInput = (
    e: FormEvent<HTMLDivElement>,
    path: string[]
  ): void => {
    const parent = e.target as HTMLDivElement
    const contentValue = htmlToMarkdown(String(parent?.innerHTML))

    artifactContentRef.current = set(
      cloneDeep(artifactContentRef.current) as Sections,
      path,
      contentValue
    )
  }

  const handleArtifactContentOnBlur = async (
    e: FormEvent<HTMLDivElement>,
    {
      type,
      section,
      field,
      path,
    }: {
      type: "section" | "field"
      section: SectionProps
      field?: ListBriefVersionSectionFieldsResponseModel
      path: string[]
    }
  ): Promise<void> => {
    const parent = e.target as HTMLDivElement
    const contentValue = htmlToMarkdown(String(parent?.innerHTML)) ?? ""

    /* If unchanged, do not update */
    if (type === "field") {
      const fieldValue = get(unSavedArtifactContent, path)
      const value = Array.isArray(fieldValue)
        ? fieldValue.map((val: FieldsModel) => val.name).join("")
        : fieldValue

      if (
        value.replace(STRIP_TEXT_REGEX, "") ===
        contentValue.replace(STRIP_TEXT_REGEX, "")
      ) {
        return
      }
    }
    if (type === "section") {
      if (
        get(unSavedArtifactContent, path)?.replace(STRIP_TEXT_REGEX, "") ===
        contentValue?.replace(STRIP_TEXT_REGEX, "")
      ) {
        return
      }
    }

    setIsActionPending(true)

    switch (type) {
      case "section":
        try {
          const patchSectionRes = await fetch(
            `https://ai-brief-api-${session.apiEnv}/api/brands/v1/organizations/${session.orgId}/briefs/${briefId}/sections/${section.id}`,
            {
              method: "PATCH",
              body: JSON.stringify(
                pick({ ...section, name: contentValue }, [
                  "deletable",
                  "name",
                  "order",
                ])
              ),
              headers: {
                "Content-Type": "application/json",
                ...(session?.token
                  ? { Authorization: `Bearer ${session?.token}` }
                  : {}),
              },
            }
          )

          if (!patchSectionRes.ok) {
            throw patchSectionRes
          }

          await handleGetBriefVersions()
        } catch (error: unknown) {
          const { detail } = error as HTTPValidationError
          toast.error(detail[0]?.msg)
        } finally {
          setIsActionPending(false)
        }
        break
      case "field": {
        let fieldValue = {}

        if (path.includes("name")) {
          const value = Array.isArray(field?.value)
            ? field.value.map((val) => (val as { name: string }).name).join("")
            : field?.value

          fieldValue = {
            ...field,
            name: contentValue,
            value,
          }
        }

        if (path.includes("value")) {
          fieldValue = {
            ...field,
            value: contentValue,
          }
        }

        try {
          const patchFieldRes = await fetch(
            `https://ai-brief-api-${session.apiEnv}/api/brands/v2/organizations/${session.orgId}/briefs/${briefId}/sections/${section.id}/fields/${field?.id ?? ""}`,
            {
              method: "PATCH",
              body: JSON.stringify(
                pick(fieldValue, [
                  "deletable",
                  "name",
                  "order",
                  "value",
                  "intent",
                  "aiEditable",
                  "verified",
                ]) as FieldsModel
              ),
              headers: {
                "Content-Type": "application/json",
                ...(session?.token
                  ? { Authorization: `Bearer ${session?.token}` }
                  : {}),
              },
            }
          )

          if (!patchFieldRes.ok) {
            throw patchFieldRes
          }

          await handleGetBriefVersions()
        } catch (error: unknown) {
          const { detail } = error as HTTPValidationError
          toast.error(detail[0]?.msg)
        } finally {
          setIsActionPending(false)
        }
        break
      }
    }
  }

  const handleArtifactContentNewVersion = async (): Promise<void> => {
    setIsActionPending(true)

    const section = artifactContentRef.current?.sections?.[1]
    const { id, name } = section as SectionProps

    try {
      const patchSectionRes = await fetch(
        `https://ai-brief-api-${session.apiEnv}/api/brands/v1/organizations/${session.orgId}/briefs/${briefId}/sections/${id}`,
        {
          method: "PATCH",
          body: JSON.stringify(
            pick({ ...section, name }, ["deletable", "name", "order"])
          ),
          headers: {
            "Content-Type": "application/json",
            ...(session?.token
              ? { Authorization: `Bearer ${session?.token}` }
              : {}),
          },
        }
      )

      if (!patchSectionRes.ok) {
        throw patchSectionRes
      }

      await handleGetBriefVersions()
    } catch (error: unknown) {
      const { detail } = error as HTTPValidationError
      toast.error(detail[0]?.msg)
    } finally {
      setIsActionPending(false)
    }
  }

  const handleCopyTextOnClick = (): void => {
    const text = artifactContentRef?.current?.sections?.reduce(
      (acc: string, cur: SectionProps, index: number) => {
        if (index === 0) return ""

        const fieldText =
          cur?.fields?.reduce(
            (acc: string, cur: ListBriefVersionSectionFieldsResponseModel) => {
              const value = Array.isArray(cur.value)
                ? cur.value
                    .map((val) => (val as { name: string }).name)
                    .join(" ")
                : (cur.value as string)
              return acc.concat(cur.name, "\n", value, "\n")
            },
            ""
          ) ?? ""

        return acc.concat(cur.name, "\n", fieldText, "\n")
      },
      ""
    )

    copyToClipboard(text as string)
  }

  function handleExportBriefToDocx(markdownElement: HTMLDivElement): void {
    const markdownText = htmlToMarkdown(markdownElement.innerHTML)
    saveToDocx(markdownText, "brief")
  }

  return {
    isActionPending,
    versions,
    artifactContentRef,
    handleGetBriefVersions,
    handleSetVersionOnSelect,
    handleMainContentOnInput,
    handleArtifactContentOnBlur,
    handleCopyTextOnClick,
    handleExportBriefToDocx,
    handleArtifactContentNewVersion,
  } as UseBriefLogicProps
}
