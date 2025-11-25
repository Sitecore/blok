"use client";

import { ApplicationContext } from "@/components/examples/built-in-auth/application-context";
import { ListLanguagesFromClientSdk } from "@/components/examples/built-in-auth/with-xmc/list-languages";
import { ListLanguagesFromApiRoute } from "@/components/examples/custom-auth/with-api-route/list-languages";
import { ListLanguagesFromServerAction } from "@/components/examples/custom-auth/with-server-action/list-languages";
import { Separator } from "@/components/ui/separator";

function ServerSideExamples() {
  return (
    <div className="container mx-auto p-6 space-y-8 max-w-3xl">
      <div className="space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight">
          Marketplace SDK Demo
        </h1>
        <p className="text-muted-foreground">
          Marketplace SDK with custom authentication and XMC API server-side
          examples
        </p>
      </div>

      <ApplicationContext />

      <Separator />

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Built-in Auth Examples</h2>
        <div className="grid gap-6">
          <ListLanguagesFromClientSdk />
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Custom Auth Examples</h2>
        <div className="grid gap-6">
          <ListLanguagesFromApiRoute />
          <ListLanguagesFromServerAction />
        </div>
      </div>
    </div>
  );
}

export default ServerSideExamples;
