import { atom } from "jotai"
import { isEmpty } from "lodash"

import { ExtractSourceRecordProps } from "../types"
import {
  Artifacts,
  ArtifactsProperties,
  BrainstormingOptions,
  BrandKitDetailsModalStateOptions,
  IsMessageAlreadyGeneratedProps,
  Session,
} from "./types"

export const sessionAtom = atom<Session>({
  chatId: "",
  brandkitId: "",
  orgId: "",
  userId: "",
  env: "dev",
  region: "euw",
  token: "",
})

export const brandkitIdAtom = atom<string>("")

export const currentStreamingChatIdAtom = atom<string>("")

export const apiQueueAtom = atom<{ [key: string]: string }>()

export const selectedChatWithIdAtom = atom<string>("")

export const isApiQueueFullAtom = atom<boolean>(function (get) {
  return !isEmpty(get(apiQueueAtom))
})

export const artifactsAtom = atom(
  {} as Artifacts,
  function (_get, set, artifact: Artifacts) {
    const prev = _get(artifactsAtom) as Artifacts

    const resetPrev: Artifacts = Object.fromEntries(
      Object.entries(prev).map(([key, value]) => [
        key,
        { ...value, open: false },
      ])
    )

    set(artifactsAtom, { ...resetPrev, ...artifact })
  }
)

export const postChatGenerateBodyAtom = atom({})

export const messagesIdsAtom = atom<string[]>([])

export const brainstormingAtom = atom<BrainstormingOptions>()

export const isBrainstormingActiveAtom = atom<boolean>(false)

export const isNewChatAtom = atom<boolean>(true)

export const isChatActionPendingAtom = atom<boolean>(false)

export const hasErrorAtom = atom<boolean>(false)

export const brandKitDetailsModalStateAtom =
  atom<BrandKitDetailsModalStateOptions>("idle")

export const isAnyArtifactOpenAtom = atom(function (get) {
  const artifacts = get(artifactsAtom)

  return Object.values(artifacts).some(
    (isOpen) => (isOpen as ArtifactsProperties).open
  )
})

export const isMessageAlreadyGeneratedAtom =
  atom<IsMessageAlreadyGeneratedProps>(function (get) {
    return function (messageId: string = ""): boolean {
      return !get(messagesIdsAtom).includes(messageId) && get(isLoadingAtom)
    }
  })

export const isLoadingAtom = atom<boolean>(false)

export const extractSourcesFromDataAtom = atom<
  Record<string, ExtractSourceRecordProps>
>({})
