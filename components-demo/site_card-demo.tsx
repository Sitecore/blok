"use client";

import {
  createSiteCardDemoDropdownActions,
  createSiteCardDemoFooterButtons,
} from "@/app/content/bloks/site-card/site-card.demo-actions";
import { mockSite } from "@/app/content/bloks/site-card/site-card.mock-data";
import { SiteCard } from "@/components/bloks/site-card";


export function SiteCardDemo() {

  const footerButtons = createSiteCardDemoFooterButtons();
  const dropdownActions = createSiteCardDemoDropdownActions();
  
  return (

    <div className="grid gap-4">
    <h2 className="font-semibold text-4xl wrap-break-words">Site Card</h2> 

      <div id="site-card">
        <div className="flex items-center justify-center min-h-[400px] p-8">
          <div className="w-[320px]">
            <SiteCard
              site={mockSite}
              showPinOverlay={false}
              footerButtons={footerButtons}
              dropdownActions={dropdownActions}
            />
          </div>
        </div>
      </div>

    </div>

  );
}
