import { useEffect, useRef } from "react"

/**
 * Provides a utility method for fetching a document from a URL and transforming it into a proxy URL using a blob object.
 * The proxy URLs generated are automatically revoked when the component unmounts.
 *
 * @return {function(string): (string | undefined)} A function that takes a document URL as input and returns a string representing the proxy URL,
 * or undefined if the URL is invalid or the request fails.
 */
export function useGetDocumentProxyUrl(): (arg0: string) => string | undefined {
  /* Hooks */
  const objectUrlsRef = useRef<string[]>([])

  /* Atoms */
  async function _getDocument(url: string): Promise<string | undefined> {
    if (!url?.startsWith("https://mms-delivery")) return url

    const res = await fetch(url, {
      credentials: "include",
    })

    if (!res.ok) return undefined

    const objectUrl = URL.createObjectURL(await res.blob())
    objectUrlsRef.current = [...objectUrlsRef.current, objectUrl]

    return objectUrl
  }

  function getDocumentProxyUrl(url: string): string | undefined {
    let objectUrl: string | undefined = ""
    _getDocument(url).then((res) => (objectUrl = res))

    return objectUrl
  }

  useEffect(function () {
    return function () {
      objectUrlsRef.current.forEach((objectUrl) => {
        URL.revokeObjectURL(objectUrl)
      })
      objectUrlsRef.current = []
    }
  }, [])

  return getDocumentProxyUrl
}
