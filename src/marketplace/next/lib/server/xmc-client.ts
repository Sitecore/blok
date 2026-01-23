import { cache } from "react";
import { experimental_createXMCClient } from "@sitecore-marketplace-sdk/xmc";
import { auth0 } from "@/lib/auth0";

/**
 * Creates an XMC client with per-request deduplication.
 * Uses React.cache() to ensure only one client is created per request,
 * even if this module is imported multiple times in parallel.
 * 
 * Section 3.6: Per-Request Deduplication with React.cache()
 */
const getXMCClient = cache(async () => {
  const client = await experimental_createXMCClient({
    getAccessToken: async () => {
      const session = await auth0.getSession();
      if (!session || !session.tokenSet) {
        throw new Error("No session or token set found");
      }
      return session.tokenSet.accessToken;
    },
  });
  return client;
});

/**
 * Get the XMC client. The client is cached per request,
 * so multiple calls within the same request return the same instance.
 */
export async function getXMCClientInstance() {
  return await getXMCClient();
}