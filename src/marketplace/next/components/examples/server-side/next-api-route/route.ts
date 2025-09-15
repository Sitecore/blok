import { xmcClient } from "@/lib/server/xmc-client";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const contextId = url.searchParams.get("contextid");

  if (!contextId) {
    return NextResponse.json(
      { error: "Context ID is required" },
      { status: 400 }
    );
  }

  try {
    const languages = await xmcClient.sites.listLanguages({
      query: {
        sitecoreContextId: contextId,
      },
    });

    console.log("languages", languages);
    return NextResponse.json(languages);
  } catch (error) {
    console.error("Error fetching languages", error);
    return NextResponse.json(
      { error: "Failed to fetch languages" },
      { status: 500 }
    );
  }
}
