"use client";

import { Icon } from "@/lib/icon";
import {
  mdiCogOutline,
  mdiContentCopy,
  mdiFileEditOutline,
  mdiPencilOutline,
  mdiPinOutline,
  mdiViewGridOutline,
} from "@mdi/js";
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
      icon: <Icon path={mdiFileEditOutline} className="h-3.5 w-3.5" />,
      label: "Page builder",
      onClick: () => console.log("Page builder clicked"),
    },
    {
      icon: <Icon path={mdiViewGridOutline} className="h-3.5 w-3.5" />,
      label: "Dashboard",
      onClick: () => console.log("Dashboard clicked"),
    },
  ];
}

export function createSiteCardDemoDropdownActions(): SiteCardDemoDropdownAction[] {
  return [
    {
      icon: <Icon path={mdiCogOutline} className="mr-2 h-4 w-4" />,
      label: "Settings",
      onClick: () => console.log("Settings clicked"),
      show: true,
    },
    {
      icon: <Icon path={mdiPinOutline} className="mr-2 h-4 w-4" />,
      label: "Pin Site",
      onClick: () => console.log("Pin clicked"),
      show: true,
    },
    {
      icon: <Icon path={mdiPencilOutline} className="mr-2 h-4 w-4" />,
      label: "Rename",
      onClick: () => console.log("Rename clicked"),
      show: true,
    },
    {
      icon: <Icon path={mdiContentCopy} className="mr-2 h-4 w-4" />,
      label: "Duplicate",
      onClick: () => console.log("Duplicate clicked"),
      show: true,
    },
  ];
}
