"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
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
import { navItems } from "@/config/nav"
import { Button } from "@/registry/new-york/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/registry/new-york/ui/dropdown-menu"
import { Input } from "@/registry/new-york/ui/input"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/registry/new-york/ui/navigation-menu"
import { appConfig } from "@/config/config"
import registry from '@/registry.json'

interface SearchResult {
  name: string
  type: 'ui' | 'block'
  href: string
  description?: string
  categories?: string[]
}

export default function TopBar() {
  const [darkMode, setDarkMode] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const toggleDarkMode = () => setDarkMode(!darkMode)

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
      // Search through active UI components
      registry.items
        .filter(item => item.type === "registry:ui" && item.active !== false)
        .forEach(item => {
          if (
            item.name.toLowerCase().includes(query) ||
            item.description?.toLowerCase().includes(query) ||
            item.categories?.some(cat => cat.toLowerCase().includes(query))
          ) {
            results.push({
              name: item.name,
              type: 'ui',
              href: `/components/${item.name}`,
              description: item.description,
              categories: item.categories
            })
          }
        })

      // Search through blocks
      registry.items
        .filter(item => item.type === "registry:block")
        .forEach(item => {
          if (
            item.name.toLowerCase().includes(query) ||
            item.description?.toLowerCase().includes(query) ||
            item.categories?.some(cat => cat.toLowerCase().includes(query))
          ) {
            results.push({
              name: item.name,
              type: 'block',
              href: `/blocks/${item.name}`,
              description: item.description,
              categories: item.categories
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

  const getDisplayName = (name: string) => {
    const formatted = formatSearchResultName(name)
    
    // For long names
    if (formatted.length > 50) {
      const words = formatted.split(' ')
      if (words.length > 2) {
        // Take first two words and add ellipsis
        return words.slice(0, 2).join(' ') + '...'
      }
      return formatted.substring(0, 40) + '...'
    }
    
    return formatted
  }

  return (
    <header className="w-full bg-white">
      <div className="flex items-center justify-between">
        {/* Left: Logo + Navigation */}
        <div className="flex items-center gap-4">
          <Link href="/" className="h-7 w-auto object-contain hover:bg-primary-background hover:text-primary-fg active:bg-primary-background active:text-primary-fg rounded p-1 transition-colors">
            <img
              src={externalLinks?.Block_Logo || ""}
              alt="Logo"
              className="h-7 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList className="flex gap-3">
              {navItems.map((item) => (
                <NavigationMenuItem key={item.name}>
                  <Link href={item.href} className={`${navigationMenuTriggerStyle()} hover:bg-primary-background hover:text-primary-fg active:bg-primary-background active:text-primary-fg`}>
                    {item.name}
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Mobile Nav Dropdown */}
          <div className="lg:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Icon path={mdiMenu} size={1} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {navItems.map((item) => (
                  <DropdownMenuItem asChild key={item.name}>
                    <Link href={item.href} className="hover:bg-primary-background hover:text-primary-fg active:bg-primary-background active:text-primary-fg">{item.name}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex w-full items-center justify-end gap-3 lg:w-auto">
          <div className="relative w-full max-w-md" ref={searchRef}>
            <Icon
              path={mdiMagnify}
              size={0.9}
              className="absolute top-2.5 left-3 text-gray-400"
            />
            <Input 
              placeholder="Search Blok (⌘K)" 
              className="py-2 pr-3 pl-10" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => searchQuery.trim() && setShowSearchResults(true)}
              onKeyDown={handleKeyDown}
              ref={inputRef}
            />
            
            {showSearchResults && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto animate-in fade-in-0 slide-in-from-top-2 duration-200 min-w-[300px] max-w-[90vw] sm:min-w-[350px] sm:max-w-[600px] lg:min-w-[400px] lg:max-w-[700px] xl:max-w-[800px]">
                {searchResults.length > 0 ? (
                  <div className="p-2">
                    <div className="px-3 py-2 text-xs font-medium text-gray-500 border-b border-gray-100 mb-2">
                      {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} found
                    </div>
                    {searchResults.map((result, index) => (
                      <Link
                        key={`${result.type}-${result.name}`}
                        href={result.href}
                        onClick={handleSearchResultClick}
                        className={`flex items-start gap-3 p-3 rounded-md transition-colors ${
                          index === selectedIndex 
                            ? 'bg-blue-50 border border-blue-200' 
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        <Icon
                          path={result.type === 'ui' ? mdiCodeBraces : mdiCubeOutline}
                          size={1}
                          className={`${
                            result.type === 'ui' ? 'text-blue-500' : 'text-green-500'
                          } flex-shrink-0 mt-0.5`}
                        />
                        <div className="flex-1 min-w-0 space-y-2">
                          <div className="flex items-start gap-2 flex-wrap">
                            <div className="flex-1 min-w-0">
                              <span 
                                className="font-medium text-gray-900 break-words leading-tight block"
                                title={formatSearchResultName(result.name)}
                              >
                                {getDisplayName(result.name)}
                              </span>
                              {result.name.length > 40 && (
                                <span className="text-xs text-gray-500 block mt-1 break-all">
                                  {result.name}
                                </span>
                              )}
                            </div>
                            <span className={`px-2 py-1 text-xs rounded-full flex-shrink-0 ${
                              result.type === 'ui' 
                                ? 'bg-blue-100 text-blue-700' 
                                : 'bg-green-100 text-green-700'
                            }`}>
                              {result.type === 'ui' ? 'Component' : 'Block'}
                            </span>
                          </div>
                          {result.description && (
                            <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
                              {result.description}
                            </p>
                          )}
                          {result.categories && result.categories.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {result.categories.slice(0, 3).map((category, catIndex) => (
                                <span
                                  key={catIndex}
                                  className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded flex-shrink-0"
                                >
                                  {category}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        {index === selectedIndex && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1"></div>
                        )}
                      </Link>
                    ))}
                  </div>
                ) : searchQuery.trim() ? (
                  <div className="p-4 text-center text-gray-500">
                    <p className="mb-2">No results found for &quot;{searchQuery}&quot;</p>
                    <p className="text-sm text-gray-400">Try searching for a different term</p>
                  </div>
                ) : null}
              </div>
            )}
          </div>

          <Button variant="ghost" className="hidden items-center gap-1 sm:flex hover:bg-primary-background hover:text-primary-fg active:bg-primary-background active:text-primary-fg">
            <a
              href={externalLinks?.Block_site || ""}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1"
            >
              <Icon path={mdiOpenInNew} size={0.9} />
              {appConfig?.blockVersion}
            </a>
          </Button>

          <Button variant="ghost" size="icon" asChild className="hover:bg-primary-background hover:text-primary-fg active:bg-primary-background active:text-primary-fg">
            <a
              href={externalLinks?.Block_github || ""}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon path={mdiGithub} size={1} />
            </a>
          </Button>

          <Button variant="ghost" size="icon" onClick={toggleDarkMode} className="hover:bg-primary-background hover:text-primary-fg active:bg-primary-background active:text-primary-fg">
            <Icon path={mdiCircleHalfFull} size={1} />
          </Button>
        </div>
      </div>
    </header>
  );
}
