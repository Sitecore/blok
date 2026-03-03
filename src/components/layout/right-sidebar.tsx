"use client";

import { TELEMETRY_EVENTS, track } from "@/lib/telemetry";
import { cn } from "@/lib/utils";
import { mdiOpenInNew } from "@mdi/js";
import Icon from "@mdi/react";
import Link from "next/link";
import { useEffect, useState } from "react";

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

type PageType = "primitive" | "blok";

interface RightSidebarProps {
  sections?: TocSection[];
  links?: RightSidebarLinks;
  children?: React.ReactNode;
  /** Component/blok slug when on a detail page (e.g. "button", "alert"). */
  pageName?: string;
  /** Whether this is a primitive or blok detail page. */
  pageType?: PageType;
}

function buildPageContext(pageName?: string, pageType?: PageType) {
  if (!pageName || !pageType) return {};
  return {
    page_name: pageName,
    page_type: pageType,
    ...(pageType === "primitive" && { component_name: pageName }),
    ...(pageType === "blok" && { block_name: pageName }),
  };
}

export function RightSidebar({
  sections = [],
  links,
  children,
  pageName,
  pageType,
}: RightSidebarProps) {
  const [activeId, setActiveId] = useState<string>("");
  const pageContext = buildPageContext(pageName, pageType);

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
      { rootMargin: "0% 0% -80% 0%" },
    );

    const elements = sections.flatMap((section) => {
      const mainElement = document.getElementById(section.id);
      const childElements = section.children?.map((child) =>
        document.getElementById(child.id),
      );
      return [mainElement, ...(childElements || [])].filter(Boolean);
    });

    elements.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  const scrollToSection = (id: string, title: string) => {
    track(TELEMETRY_EVENTS.right_sidebar_toc_click, {
      section_id: id,
      title,
      ...pageContext,
    });
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
    <aside className="hidden xl:block xl:sticky xl:top-12 xl:h-[calc(100vh-48px)] xl:w-[250px] xl:overflow-y-auto xl:shrink-0 p-10 space-y-8 bg-transparent">
      {/* Links Section */}
      {links && Object.keys(links).length > 0 && (
        <div className="space-y-2.5">
          {links.shadcn && (
            <Link
              href={links.shadcn}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-md font-semibold text-muted-foreground hover:text-foreground transition-colors"
              onClick={() =>
                track(TELEMETRY_EVENTS.right_sidebar_link_click, {
                  type: "shadcn",
                  href: links.shadcn,
                  ...pageContext,
                })
              }
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
              onClick={() =>
                track(TELEMETRY_EVENTS.right_sidebar_link_click, {
                  type: "rules",
                  href: links.rules,
                  ...pageContext,
                })
              }
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
              onClick={() =>
                track(TELEMETRY_EVENTS.right_sidebar_link_click, {
                  type: "github",
                  href: links.github,
                  ...pageContext,
                })
              }
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
              onClick={() =>
                track(TELEMETRY_EVENTS.right_sidebar_link_click, {
                  type: "documentation",
                  href: links.documentation,
                  ...pageContext,
                })
              }
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
              onClick={() =>
                track(TELEMETRY_EVENTS.right_sidebar_link_click, {
                  type: "figma",
                  href: links.figma,
                  ...pageContext,
                })
              }
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
              onClick={() =>
                track(TELEMETRY_EVENTS.right_sidebar_link_click, {
                  type: "confluence",
                  href: links.confluence,
                  ...pageContext,
                })
              }
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
              onClick={() =>
                track(TELEMETRY_EVENTS.right_sidebar_link_click, {
                  type: "v1Docs",
                  href: links.v1Docs,
                  ...pageContext,
                })
              }
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
              onClick={() =>
                track(TELEMETRY_EVENTS.right_sidebar_link_click, {
                  type: "website",
                  href: links.website,
                  ...pageContext,
                })
              }
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
        <nav>
          <ul className="space-y-2">
            {sections.map((section) => (
              <li key={section.id}>
                <button
                  type="button"
                  onClick={() => scrollToSection(section.id, section.title)}
                  className={cn(
                    "block w-full text-start text-md font-semibold transition-colors hover:text-foreground",
                    activeId === section.id
                      ? "text-foreground"
                      : "text-muted-foreground",
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
                          onClick={() => scrollToSection(child.id, child.title)}
                          className={cn(
                            "block w-full text-start text-md font-semibold transition-colors hover:text-foreground",
                            activeId === child.id
                              ? "text-foreground"
                              : "text-muted-foreground",
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
