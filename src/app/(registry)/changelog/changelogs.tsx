import type { ReactNode } from "react";
import May2026EditableErrorState from "./changelog-content/enhancement-editable-errorstate";
import May2026SidebarRHS from "./changelog-content/enhancement-sidebar-rhs";
import October2026MarketplaceAppIcon from "./changelog-content/feature-marketplace-app-icon";
import October2026PageHeader from "./changelog-content/feature-page-header";
import May2026VirtualizedSelect from "./changelog-content/feature-virtualized-select";
import April2026SonnerDocumentation from "./changelog-content/update-sonner-documentation";
import May2026TooltipDocumentation from "./changelog-content/update-tooltip-documentation";

export type ChangelogItem = {
  description: string;
  thumbnail: ReactNode;
};

type Changelog = {
  title: string;
  id: string;
  releaseDate: string;
  log: ChangelogItem;
};

export const changelogs: Changelog[] = [
  {
    title: "October 2026 - Page Header Added",
    id: "october-2026-page-header",
    releaseDate: "2026-10-01",
    log: October2026PageHeader,
  },
  {
    title: "October 2026 - Marketplace App Icon Added",
    id: "october-2026-marketplace-app-icon",
    releaseDate: "2026-10-01",
    log: October2026MarketplaceAppIcon,
  },
  {
    title: "May 2026 - Tooltip Installation Guide Updated",
    id: "may-2026-tooltip-installation-guide",
    releaseDate: "2026-06-01",
    log: May2026TooltipDocumentation,
  },
  {
    title: "May 2026 - Virtualized Select Added",
    id: "may-2026-virtualized-select",
    releaseDate: "2026-06-01",
    log: May2026VirtualizedSelect,
  },
  {
    title: "May 2026 - Sidebar RHS Enhancement",
    id: "may-2026-sidebar-rhs-enhancement",
    releaseDate: "2026-06-01",
    log: May2026SidebarRHS,
  },
  {
    title: "May 2026 - Editable Error State Enhancement",
    id: "may-2026-editable-error-state-enhancement",
    releaseDate: "2026-06-01",
    log: May2026EditableErrorState,
  },
  {
    title: "April 2026 - Sonner Installation Guide Updated",
    id: "april-2026-sonner-installation-guide",
    releaseDate: "2026-05-06",
    log: April2026SonnerDocumentation,
  },
];

export function getChangelogsNewestFirst(): Changelog[] {
  return [...changelogs].sort((a, b) =>
    b.releaseDate.localeCompare(a.releaseDate),
  );
}
