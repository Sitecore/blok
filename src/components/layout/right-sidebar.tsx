"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Icon from '@mdi/react';
import { mdiOpenInNew } from '@mdi/js';

export interface TocSection {
  id: string;
  title: string;
  children?: TocSection[];
}

export interface RightSidebarLinks {
  shadcn?: string;
  rules?: string;
  figma?: string;
  confluence?: string;
  v1Docs?: string;
  github?: string;
  documentation?: string;
  website?: string;
  [key: string]: string | undefined;
}

interface RightSidebarProps {
  sections?: TocSection[];
  links?: RightSidebarLinks;
  children?: React.ReactNode;
}

export function RightSidebar({
  sections = [],
  links,
  children,
}: RightSidebarProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0% 0% -80% 0%" }
    );

    const elements = sections.flatMap((section) => {
      const mainElement = document.getElementById(section.id);
      const childElements = section.children?.map((child) =>
        document.getElementById(child.id)
      );
      return [mainElement, ...(childElements || [])].filter(Boolean);
    });

    elements.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    } else {
      console.warn(`Element with id "${id}" not found on the page`);
    }
  };

  const hasContent = links || sections.length > 0 || children;

  if (!hasContent) return null;

  return (
    <aside
      className="hidden xl:block xl:sticky xl:top-12 xl:h-[calc(100vh-48px)] xl:w-[250px] xl:overflow-y-auto xl:shrink-0 p-10 space-y-8 bg-transparent"
    >
        {/* Links Section */}
        {links && Object.keys(links).length > 0 && (
          <div className="space-y-2.5">
            {links.shadcn && (
              <Link
                href={links.shadcn}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-md font-semibold text-muted-foreground hover:text-foreground transition-colors"
              >
                <Icon path={mdiOpenInNew} size={0.8} />
                <span>Shadcn docs</span>
              </Link>
            )}
            {links.rules && (
              <Link
                href={links.rules}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-md font-semibold text-muted-foreground hover:text-foreground transition-colors"
              >
                <Icon path={mdiOpenInNew} size={0.8} />
                <span>Rules</span>
              </Link>
            )}
            {links.github && (
              <Link
                href={links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-md font-semibold text-muted-foreground hover:text-foreground transition-colors"
              >
                <Icon path={mdiOpenInNew} size={0.8} />
                <span>GitHub</span>
              </Link>
            )}
            {links.documentation && (
              <Link
                href={links.documentation}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-md font-semibold text-muted-foreground hover:text-foreground transition-colors"
              >
                <Icon path={mdiOpenInNew} size={0.8} />
                <span>Documentation</span>
              </Link>
            )}
            {links.figma && (
              <Link
                href={links.figma}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-md font-semibold text-muted-foreground hover:text-foreground transition-colors"
              >
                <Icon path={mdiOpenInNew} size={0.8} />
                <span>Open in Figma</span>
              </Link>
            )}
            {links.confluence && (
              <Link
                href={links.confluence}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-md font-semibold text-muted-foreground hover:text-foreground transition-colors"
              >
                <Icon path={mdiOpenInNew} size={0.8} />
                <span>Confluence docs</span>
              </Link>
            )}
            {links.v1Docs && (
              <Link
                href={links.v1Docs}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-md font-semibold text-muted-foreground hover:text-foreground transition-colors"
              >
                <Icon path={mdiOpenInNew} size={0.8} />
                <span>Blok v1 docs</span>
              </Link>
            )}
            {links.website && (
              <Link
                href={links.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-md font-semibold text-muted-foreground hover:text-foreground transition-colors"
              >
                <Icon path={mdiOpenInNew} size={0.8} />
                <span>Website</span>
              </Link>
            )}
          </div>
        )}

        {/* Custom Children */}
        {children}

        {/* Navigation Section */}
        {sections.length > 0 && (
          <nav >
            <ul className="space-y-2">
              {sections.map((section) => (
                <li key={section.id}>
                  <button
                    type="button"
                    onClick={() => scrollToSection(section.id)}
                    className={cn(
                      "block w-full text-start text-md font-semibold transition-colors hover:text-foreground",
                      activeId === section.id
                        ? "text-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    {section.title}
                  </button>
                  {section.children && (
                    <ul className="mt-2 space-y-2 ps-4">
                      {section.children.map((child) => (
                        <li key={child.id}>
                          <button
                            type="button"
                            onClick={() => scrollToSection(child.id)}
                            className={cn(
                              "block w-full text-start text-md font-semibold transition-colors hover:text-foreground",
                              activeId === child.id
                                ? "text-foreground"
                                : "text-muted-foreground"
                            )}
                          >
                            {child.title}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        )}
    </aside>
  );
}

