"use client";

import React, { type ReactNode } from "react";
import Topbar from "@/components/ui/top-bar";

function MinimalLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div id="topbar" className="pb-50">
      <main className="mt-16 flex w-full justify-center">
        <div className="container">{children}</div>
      </main>
    </div>
  );
}

export function TopbarDemo() {
  return (
    <div>
      <h2 className="font-semibold text-4xl wrap-break-words">Topbar</h2>
      <MinimalLayout>
        <Topbar />
      </MinimalLayout>
    </div>
  );
}