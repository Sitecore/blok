import { useCallback, useEffect, useState } from "react"

import { useChatProvider } from "../chat/hooks/useChatProvider"

export interface GetDocumentProxyUrlProps {
  url: string
  item: (url: string) => React.ReactNode
}

export function GetDocumentProxyUrl({ url, item }: GetDocumentProxyUrlProps) {
  /* Atoms */
  const { session } = useChatProvider()

  /* Hooks */
  const [objectUrl, setObjectUrl] = useState<string | undefined>(undefined)

  const getDocumentProxyUrl = useCallback(
    async (url: string): Promise<string | undefined> => {
      if (!url?.startsWith("https://mms-delivery")) return url

      try {
        const res = await fetch(url, {
          headers: {
            Authorization: `Bearer ${session?.token}`,
          },
        })

        if (!res.ok) return undefined

        setObjectUrl(URL.createObjectURL(await res.blob()))
      } catch (error) {
        return undefined
      }
    },
    [session?.token]
  )

  const renderItem = () => item(objectUrl || url)

  useEffect(() => {
    if (session?.token) getDocumentProxyUrl(url)
  }, [getDocumentProxyUrl, session?.token, url])

  useEffect(() => {
    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl)
    }
  }, [objectUrl])

  return <>{renderItem()}</>
}
