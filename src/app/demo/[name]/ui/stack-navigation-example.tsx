"use client";

import {
  StackNavigation,
  StackNavigationElement
} from "@/components/ui/stack-navigation";
import { Icon } from "@/lib/icon";
import { mdiAccount, mdiAccountMultipleOutline, mdiArchiveOutline, mdiCog, mdiCogOutline, mdiFileOutline, mdiHome, mdiHomeVariantOutline, mdiViewDashboard } from "@mdi/js";

const navigationItems: StackNavigationElement[] = [
  {
    name: "Home",
    path: "/demo/stack-navigation",
    icon: <Icon path={mdiHomeVariantOutline} />,
  },
  {
    name: "User management",
    path: "/user",
    icon: <Icon path={mdiAccountMultipleOutline} />,
  },
  {
    name: "Documents",
    path: "/documents",
    icon: <Icon path={mdiFileOutline} />,
  },
  {
    name: "Archive",
    path: "/archive",
    icon: <Icon path={mdiArchiveOutline} />,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: <Icon path={mdiCogOutline} />,
  },
];

const StackNavigationExample = () => {

  return (
    <div>
       <StackNavigation
        items={navigationItems}
      />
    </div>
  );
};

export default StackNavigationExample;
