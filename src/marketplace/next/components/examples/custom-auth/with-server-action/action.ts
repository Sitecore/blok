"use server";

import { experimental_createXMCClient } from "@sitecore-marketplace-sdk/xmc";
import { type Xmapp } from "@sitecore-marketplace-sdk/xmc";

type Context = {
  sitecoreContextId: string;
  accessToken: string;
};

export async function fetchLanguagesAction(
  context: Context
): Promise<Xmapp.Language[]> {
  const client = await experimental_createXMCClient({
    getAccessToken: async () => {
      return context.accessToken;
    },
  });

  const languages = await client.sites.listLanguages({
    query: {
      sitecoreContextId: context.sitecoreContextId,
    },
  });

  console.log("languages from server action", languages);

  return languages?.data ?? [];
}
