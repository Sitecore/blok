import { useCallback, useEffect, useState } from "react"
import { useAtomValue } from "jotai"

import { sessionAtom } from "./store/atoms"

export interface GetDocumentProxyUrlProps {
  url: string
  item: (url: string) => React.ReactNode
}

export function GetDocumentProxyUrl({ url, item }: GetDocumentProxyUrlProps) {
  /* Atoms */
  const session = useAtomValue(sessionAtom)

  /* Hooks */
  const [objectUrl, setObjectUrl] = useState<string | undefined>(undefined)

  const getDocumentProxyUrl = useCallback(
    async (url: string): Promise<string | undefined> => {
      if (!url?.startsWith("https://mms-delivery")) return url

      const res = await fetch(url, {
        credentials: "include",
        headers: {
          ...(session?.token
            ? { Authorization: `Bearer ${session?.token}` }
            : {}),
        },
      })

      if (!res.ok) return undefined

      setObjectUrl(URL.createObjectURL(await res.blob()))
    },
    [session?.token]
  )

  const renderItem = () => item(objectUrl || url)

  useEffect(() => {
    getDocumentProxyUrl(url)
  }, [getDocumentProxyUrl, url])

  useEffect(() => {
    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl)
    }
  }, [objectUrl])

  return <>{renderItem()}</>
}
