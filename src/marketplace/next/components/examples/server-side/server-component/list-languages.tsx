import { xmcClient } from "@/lib/server/xmc-client"
import { ApplicationContext } from "@sitecore-marketplace-sdk/client"

// Server component
export async function ListLanguagesFromServerComponent({ appContext }: { appContext: ApplicationContext }) {
    const languages = await xmcClient.sites.listLanguages({
        query: {
            sitecoreContextId: appContext?.resourceAccess?.[0]?.context?.preview
        }
    })

    console.log('languages from server component', languages)

    return (
        <div>
            <h1>List Languages as a server component</h1>
            <div>Languages: {languages?.data?.length}</div>
            <div>{languages?.data?.map((language) => language.name)}</div>
        </div>
    )
}