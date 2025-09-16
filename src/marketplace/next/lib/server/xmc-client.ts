import { experimental_createXMCClient } from "@sitecore-marketplace-sdk/xmc";
import { auth0 } from "@/lib/auth0";


const getXMCClient = async () => {
    const client = await experimental_createXMCClient({
        getAccessToken: async () => {
            const session = await auth0.getSession()
            return session?.accessToken
        }
    })
    return client
}

export const xmcClient = await getXMCClient()