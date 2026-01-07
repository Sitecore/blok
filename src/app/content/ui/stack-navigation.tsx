"use client";

import {
  StackNavigation,
  type StackNavigationElement
} from "@/components/ui/stack-navigation";
import { Icon } from "@/lib/icon";
import { 
  mdiAccountMultipleOutline, 
  mdiArchiveOutline, 
  mdiCogOutline, 
  mdiFileOutline, 
  mdiHomeVariantOutline 
} from "@mdi/js";

const navigationItems: StackNavigationElement[] = [
  {
    name: "Home",
    path: "/primitives/stack-navigation",
    icon: <Icon path={mdiHomeVariantOutline} />,
  },
  {
    name: "User management",
    path: "#user-management", 
    icon: <Icon path={mdiAccountMultipleOutline} />,
  },
  {
    name: "Documents",
    path: "#documents", 
    icon: <Icon path={mdiFileOutline} />,
  },
  {
    name: "Archive",
    path: "#archive", 
    icon: <Icon path={mdiArchiveOutline} />,
  },
  {
    name: "Settings",
    path: "#settings", 
    icon: <Icon path={mdiCogOutline} />,
  },
];

export default function StackNavigationDemo() {
  return (
    <StackNavigation items={navigationItems} />
  );
}
