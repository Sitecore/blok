import { useCallback, useEffect, useRef, useState } from "react"

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
  const currentObjectUrlRef = useRef<string | undefined>(undefined)

  const getDocumentProxyUrl = useCallback(
    async (url: string): Promise<string | undefined> => {
      // Clean up previous object URL
      if (currentObjectUrlRef.current) {
        URL.revokeObjectURL(currentObjectUrlRef.current)
        currentObjectUrlRef.current = undefined
      }

      // If URL is falsy, clear the state and return
      if (!url) {
        setObjectUrl(undefined)
        return undefined
      }

      if (!url.startsWith("https://mms-delivery")) return url

      try {
        const res = await fetch(url, {
          headers: {
            Authorization: `Bearer ${session?.token}`,
          },
        })

        if (!res.ok) {
          setObjectUrl(undefined)
          return undefined
        }

        const newObjectUrl = URL.createObjectURL(await res.blob())
        currentObjectUrlRef.current = newObjectUrl
        setObjectUrl(newObjectUrl)
      } catch (error) {
        setObjectUrl(undefined)
        return undefined
      }
    },
    [session?.token]
  )

  const renderItem = () => item(objectUrl || url)

  useEffect(() => {
    if (session?.token || !url) {
      getDocumentProxyUrl(url)
    }
  }, [getDocumentProxyUrl, session?.token, url])

  useEffect(() => {
    return () => {
      if (currentObjectUrlRef.current) {
        URL.revokeObjectURL(currentObjectUrlRef.current)
      }
    }
  }, [])

  return <>{renderItem()}</>
}
