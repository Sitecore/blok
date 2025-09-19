import React, { type ReactNode } from "react";

import { BrandHeader } from "@/components/brand-header";
import { BrandSidebar } from "@/components/brand-sidebar";
import { SidebarProvider } from "@/components/registry/docsite-sidebar";
import { Toaster } from "@/components/ui/sonner";

export default function ShellLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <SidebarProvider>
      <BrandHeader />
      <BrandSidebar />
      <main className="flex w-full justify-center">
        <div className="container">{children}</div>
      </main>
      <Toaster />
    </SidebarProvider>
  );
}
