"use client";

import { useState } from "react";
import { useAppContext } from "@/components/providers/marketplace";
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
import { useAuth } from "@/components/providers/auth";

export const ListLanguagesFromApiRoute = () => {
  const appContext = useAppContext();
  const { getAccessTokenSilently } = useAuth();
  const [languages, setLanguages] = useState<Xmapp.Language[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLanguages = async () => {
    setLoading(true);
    setError(null);
    const accessToken = await getAccessTokenSilently();
    try {
      // /app/api/sites/languages/route.ts
      const response = await fetch(
        `/api/sites/languages?contextid=${appContext?.resourceAccess?.[0]?.context?.preview}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("languages from api", data);
      setLanguages(data.data);
    } catch (error) {
      console.error("error from api", error);
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card style={"outline"}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          API Route Example
          <Badge colorScheme={"primary"}>Server-side</Badge>
          <Badge colorScheme={"warning"}>Custom Auth</Badge>
        </CardTitle>
        <CardDescription>
          Fetch languages using Next.js API route from client component
          <br />
          User access token is passed from client component to API route
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
