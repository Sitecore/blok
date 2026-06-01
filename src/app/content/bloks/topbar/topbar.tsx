"use client";

import Topbar from "@/components/bloks/top-bar";

import { createTopbarDemoRightSideItems } from "./topbar.demo-right-side";
import {
  TOPBAR_DEMO_BRAND_NAME,
  mockTopbarLogo,
  mockTopbarMenuButton,
  mockTopbarNavigation,
} from "./topbar.mock-data";

export default function TopbarDemo() {
  return (
    <Topbar
      logo={mockTopbarLogo}
      brandName={TOPBAR_DEMO_BRAND_NAME}
      navigation={mockTopbarNavigation}
      rightSideItems={createTopbarDemoRightSideItems()}
      menuButton={mockTopbarMenuButton}
    />
  );
}
