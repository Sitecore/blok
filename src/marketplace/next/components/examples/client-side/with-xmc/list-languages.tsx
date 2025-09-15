"use client"

import { useState } from "react"
import { useAppContext, useMarketplaceClient } from "@/components/providers/marketplace"
import type { Xmapp } from "@sitecore-marketplace-sdk/xmc"

export const ListLanguagesFromClientSdk = () => {
    const client = useMarketplaceClient()
    const appContext = useAppContext()  
    const [languages, setLanguages] = useState<Xmapp.Language[]>([])

    const fetchLanguages = async () => {
        const contextId = appContext?.resourceAccess?.[0]?.context?.preview as string
        if (!contextId) {
          return
        }

        const data = {
          query: {
            sitecoreContextId: contextId,
          },
        }

        try {
          const languagesResponse = await client.query("xmc.xmapp.listLanguages", {params: data})
          console.log('languages from client', languagesResponse)
          setLanguages(languagesResponse.data?.data ?? [])
        } catch (err) {
          console.log('error from client', err)
        }
      }
      
  return (
    <div>
      <h1>Client API Request</h1>
      <button onClick={fetchLanguages}>Fetch Languages</button>
      <div>Languages: {languages.length}</div>
      <div>{languages.map((language) => language.name)}</div>
    </div>
  )
}