"use server";

import { cache } from "react";
import { experimental_createXMCClient } from "@sitecore-marketplace-sdk/xmc";
import { type Xmapp } from "@sitecore-marketplace-sdk/xmc";

type Context = {
  sitecoreContextId: string;
  accessToken: string;
};

/**
 * Creates an XMC client with per-request deduplication.
 * Uses React.cache() to ensure only one client is created per request
 * for the same access token, even if the action is called multiple times in parallel.
 * 
 * Section 3.6: Per-Request Deduplication with React.cache()
 */
const getXMCClientForToken = cache(async (accessToken: string) => {
  return await experimental_createXMCClient({
    getAccessToken: async () => {
      return accessToken;
    },
  });
});

export async function fetchLanguagesAction(
  context: Context
): Promise<Xmapp.Language[]> {
  // Use cached client creation - if called multiple times in parallel
  // with the same access token, only one client is created per request
  const client = await getXMCClientForToken(context.accessToken);

  const languages = await client.sites.listLanguages({
    query: {
      sitecoreContextId: context.sitecoreContextId,
    },
  });

  return languages?.data ?? [];
}
