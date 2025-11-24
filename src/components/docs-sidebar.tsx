"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  ChevronDown,
  FileText, 
  Folder, 
  FolderOpen,
  Home,
  BookOpen,
  Layers,
  Settings,
  Zap,
  Search
} from "lucide-react"

import type { source } from "@/lib/source"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

// Icon mapping for different sections
const SECTION_ICONS: Record<string, React.ElementType> = {
  "Get Started": Home,
  "Components": Layers,
  "Directory": Folder,
  "MCP Server": Settings,
  "Forms": FileText,
  "Changelog": BookOpen,
}

type TreeNode = {
  type: "folder" | "separator" | "page"
  name: string
  url?: string
  children?: TreeNode[]
  external?: boolean
}

interface SidebarItemProps {
  item: TreeNode
  level?: number
  pathname: string
}

function SidebarItem({ item, level = 0, pathname }: SidebarItemProps) {
  const [isOpen, setIsOpen] = React.useState(() => {
    // Auto-expand if current path is in this section
    if (item.type === "folder" && item.url) {
      return pathname.startsWith(item.url)
    }
    return false
  })

  React.useEffect(() => {
    // Keep section open if navigating within it
    if (item.type === "folder" && item.url && pathname.startsWith(item.url)) {
      setIsOpen(true)
    }
  }, [pathname, item.type, item.url])

  if (item.type === "separator") {
    return (
      <div className="my-2 h-px bg-border" />
    )
  }

  if (item.type === "folder") {
    const Icon = SECTION_ICONS[item.name] || Folder
    const OpenIcon = FolderOpen
    const hasChildren = item.children && item.children.length > 0
    const isActive = item.url ? pathname.startsWith(item.url) : false

    return (
      <div className="mb-1">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "group relative flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-all duration-200",
            "hover:bg-accent hover:text-accent-foreground",
            isActive && "bg-accent text-accent-foreground",
            level > 0 && "ml-4"
          )}
        >
          <div className="flex items-center gap-2">
            {isOpen ? (
              <OpenIcon className="h-4 w-4 text-primary" />
            ) : (
              <Icon className="h-4 w-4" />
            )}
            <span className="truncate">{item.name}</span>
          </div>
          {hasChildren && (
            <ChevronDown 
              className={cn(
                "h-4 w-4 shrink-0 transition-transform duration-200",
                isOpen && "rotate-180"
              )} 
            />
          )}
        </button>
        
        {hasChildren && isOpen && item.children && (
          <div className={cn(
            "ml-4 mt-1 space-y-0.5 border-l-2 border-muted pl-3 animate-in slide-in-from-top-2 duration-200"
          )}>
            {item.children.map((child: TreeNode) => (
              <SidebarItem
                key={child.url || child.name}
                item={child}
                level={level + 1}
                pathname={pathname}
              />
            ))}
          </div>
        )}
      </div>
    )
  }

  // Page/Link item
  const isActive = item.url === pathname
  const Icon = FileText

  return (
    <Link
      href={item.url || "#"}
      className={cn(
        "group relative flex w-full items-center gap-2 rounded-md px-3 py-1.5 text-sm transition-all duration-200",
        "hover:bg-accent hover:text-accent-foreground",
        isActive 
          ? "bg-primary/10 text-primary font-medium border-l-2 border-primary pl-[10px]" 
          : "text-muted-foreground hover:text-foreground",
        level > 0 && "ml-2"
      )}
    >
      <Icon className="h-3.5 w-3.5 shrink-0" />
      <span className="flex-1 truncate">{item.name}</span>
      {isActive && (
        <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary animate-pulse" />
      )}
    </Link>
  )
}

export function DocsSidebar({
  tree,
}: { tree: typeof source.pageTree }) {
  const pathname = usePathname()
  const [searchQuery, setSearchQuery] = React.useState("")
  const [filteredTree, setFilteredTree] = React.useState<TreeNode[]>(tree as unknown as TreeNode[])

  // Filter tree based on search query
  React.useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredTree(tree as unknown as TreeNode[])
      return
    }

    const filterNodes = (nodes: TreeNode[]): TreeNode[] => {
      return nodes.reduce((acc: TreeNode[], node) => {
        if (node.type === "separator") return acc

        const matchesSearch = node.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase())

        if (node.type === "folder") {
          const filteredChildren = node.children 
            ? filterNodes(node.children) 
            : []

          if (matchesSearch || filteredChildren.length > 0) {
            acc.push({
              ...node,
              children: filteredChildren,
            })
          }
        } else if (matchesSearch) {
          acc.push(node)
        }

        return acc
      }, [])
    }

    setFilteredTree(filterNodes(tree as unknown as TreeNode[]))
  }, [searchQuery, tree])

  return (
    <aside className="sticky top-0 z-30 hidden h-screen w-72 shrink-0 border-r bg-background lg:block">
      <div className="flex h-full flex-col overflow-y-auto overflow-x-hidden px-4 py-6 scrollbar-thin">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search documentation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-10 bg-muted/50 border-muted-foreground/20 focus-visible:ring-primary/50"
            />
          </div>
        </div>

        {/* Navigation Tree */}
        <div className="flex-1 space-y-4">
          <div>
            <div className="mb-2 flex items-center gap-2 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <BookOpen className="h-4 w-4" />
              Documentation
            </div>
            <nav className="space-y-1">
              {filteredTree.length > 0 ? (
                filteredTree.map((item: TreeNode) => (
                  <SidebarItem
                    key={item.url || item.name}
                    item={item}
                    pathname={pathname}
                  />
                ))
              ) : (
                <div className="px-2 py-4 text-center text-sm text-muted-foreground">
                  No results found for &ldquo;{searchQuery}&rdquo;
                </div>
              )}
            </nav>
          </div>
        </div>
        
        {/* Footer Info */}
        <div className="mt-auto border-t pt-4">
          <div className="flex items-center gap-2 px-2 py-2 text-xs text-muted-foreground">
            <Zap className="h-3 w-3" />
            <span>Press <kbd className="rounded border bg-muted px-1.5 py-0.5 text-xs">Ctrl+K</kbd> for quick search</span>
          </div>
        </div>
      </div>
    </aside>
  )
}
