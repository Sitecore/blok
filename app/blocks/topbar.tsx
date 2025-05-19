"use client"

import TopBar from "@/registry/new-york/blocks/topbar/page"

export function TopBarBlocks() {
  return (
    <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
      <div className="h-40 rounded-lg border p-4">
        <p className="text-muted-foreground mb-4 text-sm">
          A navigation bar with dropdown menus, user profile, and logo
        </p>
        <TopBar />
      </div>
    </div>
  )
}
