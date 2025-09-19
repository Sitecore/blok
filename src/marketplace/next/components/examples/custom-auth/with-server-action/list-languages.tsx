"use client";

import { useState } from "react";
import { useAppContext } from "@/components/providers/marketplace";
import type { Xmapp } from "@sitecore-marketplace-sdk/xmc";
import { fetchLanguagesAction } from "./action";
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

export const ListLanguagesFromServerAction = () => {
  const appContext = useAppContext();
  const { getAccessTokenSilently } = useAuth();
  const [languages, setLanguages] = useState<Xmapp.Language[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLanguages = async () => {
    setLoading(true);
    setError(null);
    try {
      // server action
      const languages = await fetchLanguagesAction({
        sitecoreContextId:
          appContext?.resourceAccess?.[0]?.context?.preview || "",
        accessToken: await getAccessTokenSilently(),
      });

      setLanguages(languages);
    } catch (error) {
      console.error("error from server action", error);
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card style={"outline"}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Server Action Example
          <Badge colorScheme={"primary"}>Server-side</Badge>
          <Badge colorScheme={"warning"}>Custom Auth</Badge>
        </CardTitle>
        <CardDescription>
          Fetch languages using Next.js server action from client component
          <br />
          User access token is passed from client component to server action
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
              <Badge>{languages.length}</Badge>
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
