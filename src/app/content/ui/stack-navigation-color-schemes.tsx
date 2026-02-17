"use client";

import {
  StackNavigation,
  type StackNavigationElement,
} from "@/components/ui/stack-navigation";
import { Icon } from "@/lib/icon";
import {
  mdiAccountMultipleOutline,
  mdiArchiveOutline,
  mdiCogOutline,
  mdiFileOutline,
  mdiHomeVariantOutline,
} from "@mdi/js";

const navigationItems: StackNavigationElement[] = [
  {
    name: "Home",
    path: "/primitives/stack-navigation",
    icon: <Icon path={mdiHomeVariantOutline} />,
  },
  {
    name: "Users",
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

export default function StackNavigationColorSchemesDemo() {
  return (
    <div className="flex gap-8">
      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-medium text-muted-foreground">
          Neutral (default)
        </h3>
        <StackNavigation
          items={navigationItems}
          pathname="/primitives/stack-navigation"
          colorScheme="neutral"
        />
      </div>
      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-medium text-muted-foreground">Primary</h3>
        <StackNavigation
          items={navigationItems}
          pathname="/primitives/stack-navigation"
          colorScheme="primary"
        />
      </div>
    </div>
  );
}
