"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { List, Hash } from "lucide-react"

interface TOCItem {
  title: string
  url: string
  depth: number
}

interface DocsRightSidebarProps {
  toc?: TOCItem[]
}

export function DocsRightSidebar({ toc = [] }: DocsRightSidebarProps) {
  const [activeId, setActiveId] = React.useState<string>("")

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: "0% 0% -80% 0%" }
    )

    const headings = document.querySelectorAll("h1, h2, h3, h4")
    headings.forEach((heading) => observer.observe(heading))

    return () => {
      headings.forEach((heading) => observer.unobserve(heading))
    }
  }, [])

  if (!toc || toc.length === 0) {
    return null
  }

  return (
    <aside className="sticky top-0 z-20 hidden h-screen w-80 shrink-0 overflow-y-auto bg-green-600 xl:block">
      <div className="flex h-full flex-col p-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2">
            <List className="h-6 w-6 text-white" />
            <h2 className="text-2xl font-bold text-white">
              Table of Contents
            </h2>
          </div>
          <p className="mt-2 text-base font-bold text-green-100">
            Jump to section
          </p>
        </div>

        {/* Table of Contents */}
        <nav className="flex-1 space-y-1">
          {toc.map((item) => {
            const isActive = activeId === item.url.slice(1)
            
            return (
              <a
                key={item.url}
                href={item.url}
                onClick={(e) => {
                  e.preventDefault()
                  const element = document.querySelector(item.url)
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth", block: "start" })
                  }
                }}
                className={cn(
                  "block rounded-lg px-4 py-2.5 text-lg font-bold transition-all duration-200",
                  isActive
                    ? "bg-white text-green-700 shadow-lg"
                    : "text-white hover:bg-green-500 hover:translate-x-1",
                  item.depth === 2 && "pl-4",
                  item.depth === 3 && "pl-8 text-base",
                  item.depth === 4 && "pl-12 text-base"
                )}
              >
                <div className="flex items-center gap-2">
                  {item.depth === 2 && <Hash className="h-4 w-4 shrink-0" />}
                  <span className="break-words">{item.title}</span>
                </div>
              </a>
            )
          })}
        </nav>

      </div>
    </aside>
  )
}

