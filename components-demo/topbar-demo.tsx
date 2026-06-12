"use client";

import Topbar from "@/components/bloks/top-bar";
import { createTopbarDemoRightSideItems } from "@/app/content/bloks/topbar/topbar.demo-right-side";
import {
  TOPBAR_DEMO_BRAND_NAME,
  mockTopbarLogo,
  mockTopbarMenuButton,
  mockTopbarNavigation,
} from "@/app/content/bloks/topbar/topbar.mock-data";


export function TopbarDemo() {
  return (
    <div id="topbar" className="min-h-[250px]">
      <h2 className="font-semibold text-4xl wrap-break-words">Topbar</h2>
      
      <Topbar
        logo={mockTopbarLogo}
        brandName={TOPBAR_DEMO_BRAND_NAME}
        navigation={mockTopbarNavigation}
        rightSideItems={createTopbarDemoRightSideItems()}
        menuButton={mockTopbarMenuButton}
      />
    </div>
    
  );
}