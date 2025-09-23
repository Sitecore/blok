"use client";

import { ApplicationContext } from "@/components/examples/build-in-auth/application-context";

function Examples() {
  return (
    <div className="container mx-auto p-6 space-y-8 max-w-3xl">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">
          Marketplace SDK Demo
        </h1>
        <p className="text-muted-foreground">
          Marketplace SDK with build-in authentication
        </p>
      </div>

      <ApplicationContext />
    </div>
  );
}

export default Examples;
