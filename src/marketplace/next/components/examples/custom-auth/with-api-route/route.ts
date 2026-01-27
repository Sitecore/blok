import { experimental_createXMCClient } from "@sitecore-marketplace-sdk/xmc";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const contextId = url.searchParams.get("contextid");

  const accessToken = request.headers.get("authorization")?.split(" ")[1];

  if (!contextId) {
    return NextResponse.json(
      { error: "Context ID is required" },
      { status: 400 },
    );
  }

  if (!accessToken) {
    return NextResponse.json(
      { error: "Access token is required" },
      { status: 401 },
    );
  }

  try {
    // One client per request; each API route invocation is a single request.
    // Parallel HTTP requests correctly create separate clients.
    const xmcClient = await experimental_createXMCClient({
      getAccessToken: async () => {
        return accessToken;
      },
    });

    const languages = await xmcClient.sites.listLanguages({
      query: {
        sitecoreContextId: contextId,
      },
    });

    return NextResponse.json(languages);
  } catch (error) {
    console.error("Error fetching languages", error);
    return NextResponse.json(
      { error: "Failed to fetch languages" },
      { status: 500 },
    );
  }
}
