"use client"

import { useState } from "react"
import Link from "next/link"
import {
  mdiCircleHalfFull,
  mdiGithub,
  mdiMagnify,
  mdiMenu,
  mdiOpenInNew,
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
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/registry/new-york/ui/navigation-menu"
import { appConfig } from "@/config/config"

export default function TopBar() {
  const [darkMode, setDarkMode] = useState(false)
  const toggleDarkMode = () => setDarkMode(!darkMode)

  return (
    <header className="w-full bg-white">
      <div className="flex items-center justify-between">
        {/* Left: Logo + Navigation */}
        <div className="flex items-center gap-4">
          <Link href="/">
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
                  <Link href={item.href} passHref legacyBehavior>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      {item.name}
                    </NavigationMenuLink>
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
                    <Link href={item.href}>{item.name}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex w-full items-center justify-end gap-3 lg:w-auto">
          <div className="relative w-full max-w-xs">
            <Icon
              path={mdiMagnify}
              size={0.9}
              className="absolute top-2.5 left-3 text-gray-400"
            />
            <Input placeholder="Search Block" className="py-2 pr-3 pl-10" />
          </div>

          <Button variant="ghost" className="hidden items-center gap-1 sm:flex">
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

          <Button variant="ghost" size="icon" asChild>
            <a
              href={externalLinks?.Block_github || ""}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon path={mdiGithub} size={1} />
            </a>
          </Button>

          <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
            <Icon path={mdiCircleHalfFull} size={1} />
          </Button>
        </div>
      </div>
    </header>
  )
}
