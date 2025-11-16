"use client";

import {
  StackNavigation,
  StackNavigationElement
} from "@/components/ui/stack-navigation";
import { Icon } from "@/lib/icon";
import { mdiAccount, mdiCog, mdiHome, mdiViewDashboard } from "@mdi/js";

const navigationItems: StackNavigationElement[] = [
  {
    name: "Home",
    path: "/demo/stack-navigation",
    icon: <Icon path={mdiHome} />,
  },
  {
    name: "User Management",
    path: "/dashboard",
    icon: <Icon path={mdiViewDashboard} />,
  },
  {
    name: "Account",
    path: "/account",
    icon: <Icon path={mdiAccount} />,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: <Icon path={mdiCog} />,
  },
];

const StackNavigationExample = () => {

  return (
    <div className="flex flex-col gap-10">
      <StackNavigation
        items={navigationItems}
        footer={<>V1.0</>}
        orientation="horizontal"
      />
       <StackNavigation
        items={navigationItems}
        footer={<>V1.0</>}
      />
    </div>
  );
};

export default StackNavigationExample;
