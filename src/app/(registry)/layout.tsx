import { SidebarProvider, SidebarInset } from "@/components/docsite/docsite-sidebar";
import React, { type ReactNode } from "react";

import {
  MobileSidebarTrigger,
  RegistrySidebar,
  REGISTRY_SIDEBAR_WIDTH,
} from "@/components/layout/registry-sidebar";
import { Toaster } from "@/components/ui/sonner";
import TopBar from "@/components/layout/topbar";
import { DynamicRightSidebar } from "@/components/layout/dynamic-right-sidebar";

export default function RegistryLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      <div className="flex min-h-screen flex-col w-full bg-sidebar">
      <header className="fixed top-0 left-0 right-0 z-50 border-b bg-background border-border w-full" style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}>
          <TopBar />
        </header>

        <div className="flex flex-1 relative mt-12 bg-sidebar">
          <SidebarProvider 
            className="flex flex-1 w-full"
            style={{ "--sidebar-width": REGISTRY_SIDEBAR_WIDTH } as React.CSSProperties}
          >
            <RegistrySidebar />
            
            <SidebarInset className="flex flex-col">
              <MobileSidebarTrigger />
              <div className="flex flex-1 w-full">
                <main id="main-content" className="flex flex-1 justify-center">
                  {children}
                </main>
                <DynamicRightSidebar />
              </div>
            </SidebarInset>
          </SidebarProvider>
        </div>
        <Toaster />
      </div>
    </>
  );
}
