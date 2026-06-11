"use client";

import { Copy, Edit, FileEdit, LayoutGrid, Pin, Settings } from "lucide-react";
import type { ReactNode } from "react";

export type SiteCardDemoFooterButton = {
  icon: ReactNode;
  label: string;
  onClick: () => void;
};

export type SiteCardDemoDropdownAction = {
  icon: ReactNode;
  label: string;
  onClick: () => void;
  show?: boolean;
};

export function createSiteCardDemoFooterButtons(): SiteCardDemoFooterButton[] {
  return [
    {
      icon: <FileEdit className="h-3.5 w-3.5" />,
      label: "Page builder",
      onClick: () => console.log("Page builder clicked"),
    },
    {
      icon: <LayoutGrid className="h-3.5 w-3.5" />,
      label: "Dashboard",
      onClick: () => console.log("Dashboard clicked"),
    },
  ];
}

export function createSiteCardDemoDropdownActions(): SiteCardDemoDropdownAction[] {
  return [
    {
      icon: <Settings className="mr-2 h-4 w-4" />,
      label: "Settings",
      onClick: () => console.log("Settings clicked"),
      show: true,
    },
    {
      icon: <Pin className="mr-2 h-4 w-4" />,
      label: "Pin Site",
      onClick: () => console.log("Pin clicked"),
      show: true,
    },
    {
      icon: <Edit className="mr-2 h-4 w-4" />,
      label: "Rename",
      onClick: () => console.log("Rename clicked"),
      show: true,
    },
    {
      icon: <Copy className="mr-2 h-4 w-4" />,
      label: "Duplicate",
      onClick: () => console.log("Duplicate clicked"),
      show: true,
    },
  ];
}
