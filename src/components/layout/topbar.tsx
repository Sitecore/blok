"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  mdiCircleHalfFull,
  mdiGithub,
  mdiMagnify,
  mdiMenu,
  mdiOpenInNew,
  mdiCodeBraces,
  mdiCubeOutline,
} from "@mdi/js"
import Icon from "@mdi/react"
import { externalLinks } from "@/config/links"
import { navItems, searchableItems } from "@/config/nav"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { appConfig } from "@/config/config"
import registry from '@/registry'
import { getRegistryItem } from "@/lib/registry"

interface SearchResult {
  name: string
  type: 'ui' | 'block' | 'theming' | 'graphics' | 'page'
  href: string
  description?: string
  categories?: string[]
  title?: string
}

export default function TopBar() {
  const pathname = usePathname()
  const [isDark, setIsDark] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [clickedHref, setClickedHref] = useState<string | null>(null)
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Sync clickedHref with pathname when it updates
  useEffect(() => {
    if (clickedHref && pathname.startsWith(clickedHref)) {
      setClickedHref(null)
    }
  }, [pathname, clickedHref])

  // Check initial theme and listen for changes
  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"))
    }
    
    checkTheme()
    
    // Watch for theme changes
    const observer = new MutationObserver(checkTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })
    
    return () => observer.disconnect()
  }, [])

  const toggleDarkMode = () => {
    const newTheme = !isDark
    setIsDark(newTheme)

    const themeStr = newTheme ? "dark" : "light"

    if (newTheme) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }

    // change theme inside iframe
    const iframe = document.getElementById(
      "iframe",
    ) as HTMLIFrameElement | null

    if (iframe?.contentWindow) {
      iframe.contentWindow.postMessage(
        { type: "theme", theme: themeStr },
        window.location.origin,
      )
    }
  }

  // Filter registry items based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([])
      setShowSearchResults(false)
      setSelectedIndex(-1)
      return
    }

    const query = searchQuery.toLowerCase()
    const results: SearchResult[] = []

    try {
      // Search through UI components
      registry.items
        .filter(item => item.type === "registry:ui")
        .forEach(item => {
          const name = item.name || ""
          const title = (item as any).title || name
          const description = item.description || ""
          const categories = (item as any).categories || []
          
          if (
            name.toLowerCase().includes(query) ||
            title.toLowerCase().includes(query) ||
            description.toLowerCase().includes(query) ||
            categories.some((cat: string) => cat.toLowerCase().includes(query))
          ) {
            results.push({
              name: item.name,
              type: 'ui',
              href: `/primitives/${item.name}`,
              description: item.description,
              categories: categories,
              title: title
            })
          }
        })

      // Search through blocks
      registry.items
        .filter(item => item.type === "registry:block")
        .forEach(item => {
          const name = item.name || ""
          const title = (item as any).title || name
          const description = item.description || ""
          const categories = (item as any).categories || []
          
          if (
            name.toLowerCase().includes(query) ||
            title.toLowerCase().includes(query) ||
            description.toLowerCase().includes(query) ||
            categories.some((cat: string) => cat.toLowerCase().includes(query))
          ) {
            results.push({
              name: item.name,
              type: 'block',
              href: `/bloks/${item.name}`,
              description: item.description,
              categories: categories,
              title: title
            })
          }
        })

      // Search through searchable items (theming, graphics, MCP server, etc.)
      searchableItems.forEach(item => {
        const title = item.title || ""
        const description = item.description || ""
        
        if (
          title.toLowerCase().includes(query) ||
          description.toLowerCase().includes(query)
        ) {
          results.push({
            name: title,
            type: item.type,
            href: item.href,
            description: description,
            title: title
          })
        }
      })

      setSearchResults(results.slice(0, 8))
      setShowSearchResults(results.length > 0)
      setSelectedIndex(-1)
    } catch (error) {
      console.error('Search error:', error)
      setSearchResults([])
      setShowSearchResults(false)
    }
  }, [searchQuery])

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchResults(false)
        setSelectedIndex(-1)
      }
    }

    // Add keyboard shortcut (Cmd/Ctrl + K) to focus search
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault()
        inputRef.current?.focus()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSearchResults || searchResults.length === 0) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex(prev => 
          prev < searchResults.length - 1 ? prev + 1 : 0
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : searchResults.length - 1
        )
        break
      case 'Enter':
        e.preventDefault()
        if (selectedIndex >= 0 && selectedIndex < searchResults.length) {
          const result = searchResults[selectedIndex]
          window.location.href = result.href
          handleSearchResultClick()
        }
        break
      case 'Escape':
        e.preventDefault()
        setShowSearchResults(false)
        setSelectedIndex(-1)
        inputRef.current?.blur()
        break
    }
  }

  const handleSearchResultClick = () => {
    setShowSearchResults(false)
    setSearchQuery("")
    setSelectedIndex(-1)
  }

  const formatSearchResultName = (name: string) => {
    // Convert kebab-case to Title Case
    const formatted = name.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    
    // If the name is very long, try to make it more readable
    if (formatted.length > 30) {
      // Try to break at common separators
      const parts = formatted.split(/(?<=[a-z])(?=[A-Z])|(?<=[A-Z])(?=[A-Z][a-z])|(?<=[0-9])(?=[A-Z])|(?<=[a-z])(?=[0-9])/)
      if (parts.length > 1) {
        return parts.join(' ')
      }
    }
    
    return formatted
  }

  const truncateName = (name: string, maxLength: number = 25) => {
    if (name.length <= maxLength) return name
    return name.substring(0, maxLength) + '...'
  }

  const getDisplayName = (result: SearchResult) => {
    // Use title if available, otherwise format the name
    const displayName = result.title || formatSearchResultName(result.name)
    
    // For long names
    if (displayName.length > 50) {
      const words = displayName.split(' ')
      if (words.length > 2) {
        // Take first two words and add ellipsis
        return words.slice(0, 2).join(' ') + '...'
      }
      return displayName.substring(0, 40) + '...'
    }
    
    return displayName
  }

  return (
    <header className="w-full bg-background border-b border-border">
      <div className="flex items-center justify-between h-12 px-4">
        {/* Left: Logo + Navigation */}
        <div className="flex items-center gap-4">
          <Link href="/" className="h-7 w-auto object-contain active:bg-primary-background active:text-primary-fg rounded p-1 transition-colors">
            <img
              src={isDark ? (externalLinks?.Block_Logo_Dark || "") : (externalLinks?.Block_Logo || "")}
              alt="Logo"
              className="w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList className="flex gap-3">
              {navItems.map((item) => {
                const normalizedPathname = pathname.replace(/\/$/, "") || "/"
                const normalizedHref = item.href.replace(/\/$/, "") || "/"
                let isActive = normalizedPathname === normalizedHref || 
                                 (normalizedHref !== "/" && normalizedPathname.startsWith(normalizedHref + "/")) ||
                                 clickedHref === item.href
                
                // Special handling for registry pages
                if (pathname.startsWith("/registry/")) {
                  const segments = pathname.split("/").filter(Boolean);
                  const itemName = segments[segments.length - 1];
                  
                  if (itemName) {
                    const registryItem = getRegistryItem(itemName);
                    
                    if (registryItem) {
                      // If this is a UI component and we're checking "Primitives"
                      if (item.name === "Primitives" && registryItem.type === "registry:ui") {
                        isActive = true;
                      }
                      // If this is a block/component and we're checking "Bloks"
                      else if (item.name === "Bloks" && 
                               (registryItem.type === "registry:block" || registryItem.type === "registry:component")) {
                        isActive = true;
                      }
                    }
                  }
                }
                
                return (
                  <NavigationMenuItem key={item.name}>
                    <Link 
                      href={item.href}
                      onClick={() => setClickedHref(item.href)}
                      className={`${navigationMenuTriggerStyle()} ${
                        isActive ? "active" : ""
                      }`}
                    >
                      {item.name}
                    </Link>
                  </NavigationMenuItem>
                )
              })}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Mobile Nav Dropdown */}
          <div className="lg:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open navigation menu">
                  <Icon path={mdiMenu} size={1} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {navItems.map((item) => {
                  const normalizedPathname = pathname.replace(/\/$/, "") || "/"
                  const normalizedHref = item.href.replace(/\/$/, "") || "/"
                  let isActive = normalizedPathname === normalizedHref || 
                                   (normalizedHref !== "/" && normalizedPathname.startsWith(normalizedHref + "/")) ||
                                   clickedHref === item.href
                  
                  // Special handling for registry pages
                  if (pathname.startsWith("/registry/")) {
                    const segments = pathname.split("/").filter(Boolean);
                    const itemName = segments[segments.length - 1];
                    
                    if (itemName) {
                      const registryItem = getRegistryItem(itemName);
                      
                      if (registryItem) {
                        // If this is a UI component and we're checking "Primitives"
                        if (item.name === "Primitives" && registryItem.type === "registry:ui") {
                          isActive = true;
                        }
                        // If this is a block/component and we're checking "Bloks"
                        else if (item.name === "Bloks" && 
                                 (registryItem.type === "registry:block" || registryItem.type === "registry:component")) {
                          isActive = true;
                        }
                      }
                    }
                  }
                  
                  return (
                    <DropdownMenuItem asChild key={item.name}>
                      <Link 
                        href={item.href}
                        onClick={() => setClickedHref(item.href)}
                        className={`${
                          isActive 
                            ? "bg-primary-background text-primary-fg hover:bg-primary-background hover:text-primary-fg" 
                            : "hover:bg-muted hover:text-foreground"
                        }`}
                      >
                        {item.name}
                      </Link>
                    </DropdownMenuItem>
                  )
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex w-full items-center justify-end gap-3 lg:w-auto">
          <div className="relative w-full max-w-md" role="search" ref={searchRef}>
            <Icon
              path={mdiMagnify}
              size={0.9}
              className="absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
            />
            <Input 
              placeholder="Search Blok" 
              className="h-9 pr-3 pl-10" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => searchQuery.trim() && setShowSearchResults(true)}
              onKeyDown={handleKeyDown}
              ref={inputRef}
            />
            
            {showSearchResults && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-lg z-50 max-h-96 overflow-y-auto animate-in fade-in-0 slide-in-from-top-2 duration-200 min-w-[300px] max-w-[90vw] sm:min-w-[350px] sm:max-w-[600px] lg:min-w-[400px] lg:max-w-[700px] xl:max-w-[800px]">
                {searchResults.length > 0 ? (
                  <div className="p-2">
                    <div className="px-3 py-2 text-xs font-medium text-muted-foreground border-b border-border mb-2">
                      {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} found
                    </div>
                    {searchResults.map((result, index) => (
                      <Link
                        key={`${result.type}-${result.name}`}
                        href={result.href}
                        onClick={handleSearchResultClick}
                        className={`flex items-start gap-3 p-3 rounded-md transition-colors ${
                          index === selectedIndex 
                            ? 'bg-primary-background border border-primary' 
                            : 'hover:bg-muted'
                        }`}
                      >
                        <div className="flex-1 min-w-0 space-y-2">
                          <div className="flex items-start gap-2 flex-wrap">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span 
                                  className="font-medium text-foreground break-words leading-tight block"
                                  title={result.title || formatSearchResultName(result.name)}
                                >
                                  {getDisplayName(result)}
                                </span>
                                <Badge 
                                  variant="default" 
                                  colorScheme="neutral"
                                  size="sm"
                                  className="text-xs capitalize flex-shrink-0"
                                >
                                  {result.type === 'ui' ? 'Primitive' : 
                                   result.type === 'block' ? 'Blok' :
                                   result.type === 'theming' ? 'Theming' :
                                   result.type === 'graphics' ? 'Graphics' :
                                   result.type === 'page' ? 'Page' : result.type}
                                </Badge>
                              </div>
                              {result.name.length > 40 && (
                                <span className="text-xs text-muted-foreground block mt-1 break-all">
                                  {result.name}
                                </span>
                              )}
                            </div>
                          </div>
                          {result.description && (
                            <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                              {result.description}
                            </p>
                          )}
                          {result.categories && result.categories.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {result.categories.slice(0, 3).map((category, catIndex) => (
                                <span
                                  key={catIndex}
                                  className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded flex-shrink-0"
                                >
                                  {category}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        {index === selectedIndex && (
                          <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-1"></div>
                        )}
                      </Link>
                    ))}
                  </div>
                ) : searchQuery.trim() ? (
                  <div className="p-4 text-center text-muted-foreground">
                    <p className="mb-2">No results found for &quot;{searchQuery}&quot;</p>
                    <p className="text-sm text-muted-foreground/70">Try searching for a different term</p>
                  </div>
                ) : null}
              </div>
            )}
          </div>
          {/* TODO: Hidden till migration is complete */}
          <Button variant="ghost" className="hidden items-center gap-1 sm:flex hover:bg-muted active:bg-muted">
            <a
              href={externalLinks?.Block_site_old || ""}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1"
            >
              <Icon path={mdiOpenInNew} size={0.9} />
              {appConfig?.blockVersion}
            </a>
          </Button>

          <Button variant="ghost" size="icon" asChild className="hover:bg-muted active:bg-muted">
            <a
              href={externalLinks?.Block_github || ""}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View GitHub repository"
            >
              <Icon path={mdiGithub} size={1} />
            </a>
          </Button>

          <Button variant="ghost" size="icon" onClick={toggleDarkMode} className="hover:bg-muted active:bg-muted" aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}>
            <Icon path={mdiCircleHalfFull} size={1} />
          </Button>
        </div>
      </div>
    </header>
  );
}

