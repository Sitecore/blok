import { experimental_createXMCClient } from "@sitecore-marketplace-sdk/xmc";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const contextId = url.searchParams.get("contextid");

  const accessToken = request.headers.get("authorization")?.split(" ")[1];

  if (!contextId) {
    return NextResponse.json(
      { error: "Context ID is required" },
      { status: 400 }
    );
  }

  if (!accessToken) {
    return NextResponse.json(
      { error: "Access token is required" },
      { status: 401 }
    );
  }

  const xmcClient = await experimental_createXMCClient({
    getAccessToken: async () => {
      return accessToken;
    },
  });

  try {
    const languages = await xmcClient.sites.listLanguages({
      query: {
        sitecoreContextId: contextId,
      },
    });

    console.log("languages from API", languages);
    return NextResponse.json(languages);
  } catch (error) {
    console.error("Error fetching languages", error);
    return NextResponse.json(
      { error: "Failed to fetch languages" },
      { status: 500 }
    );
  }
}
