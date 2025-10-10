"use client";

import { useState } from "react";
import {
  useAppContext,
  useMarketplaceClient,
} from "@/components/providers/marketplace";
import type { Xmapp } from "@sitecore-marketplace-sdk/xmc";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";

export const ListLanguagesFromClientSdk = () => {
  const client = useMarketplaceClient();
  const appContext = useAppContext();
  const [languages, setLanguages] = useState<Xmapp.Language[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLanguages = async () => {
    setLoading(true);
    setError(null);

    const contextId = appContext?.resourceAccess?.[0]?.context
      ?.preview as string;
    if (!contextId) {
      setError("No context ID available");
      setLoading(false);
      return;
    }

    const data = {
      query: {
        sitecoreContextId: contextId,
      },
    };

    try {
      const languagesResponse = await client.query("xmc.xmapp.listLanguages", {
        params: data,
      });
      console.log("languages from client", languagesResponse);
      setLanguages(languagesResponse.data?.data ?? []);
    } catch (err) {
      console.log("error from client", err);
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card style={"outline"}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Client SDK Example
          <Badge colorScheme={"primary"}>Client-side</Badge>
          <Badge colorScheme={"success"}>SDK Built-in Auth</Badge>
        </CardTitle>
        <CardDescription>
          Fetch languages using Sitecore Marketplace SDK from client component
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button
          onClick={fetchLanguages}
          disabled={loading}
          className="w-full sm:w-auto"
        >
          {loading ? "Fetching..." : "Fetch Languages"}
        </Button>

        {error && (
          <Alert variant="danger">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Languages found:</span>
            {loading ? (
              <Skeleton className="h-5 w-8" />
            ) : (
              <Badge>{languages?.length || 0}</Badge>
            )}
          </div>

          {languages.length > 0 && (
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Language names:</p>
              <div className="flex flex-wrap gap-1">
                {languages.map((language, index) => (
                  <Badge key={index}>{language.name}</Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
