import { xmcClient } from "@/lib/server/xmc-client"
import { Xmapp } from "@sitecore-marketplace-sdk/xmc"


export const fetchLanguagesAction = async (contextId: string): Promise<Xmapp.Language[]> => {
    const languages = await xmcClient.sites.listLanguages({
        query: {
            sitecoreContextId: contextId
        }
    })
    return languages.data ?? []
}