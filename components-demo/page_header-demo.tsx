"use client";

import PageHeaderDemo from "@/app/content/bloks/page-header/page-header";
import PageHeaderSiteSummaryDemo from "@/app/content/bloks/page-header/page-header-site-summary";
import PageHeaderSiteSummaryWhiteDemo from "@/app/content/bloks/page-header/page-header-site-summary-white";
import PageHeaderTopNavMiniDemo from "@/app/content/bloks/page-header/page-header-top-nav-mini";

export function PageHeaderSectionDemo() {
  return (
    <div className="grid gap-4">
      <h2 className="font-semibold text-4xl wrap-break-words">Page Header</h2>

      <div id="page-header">
        <PageHeaderDemo />
      </div>

      <div id="page-header-site-summary">
        <PageHeaderSiteSummaryDemo />
      </div>

      <div id="page-header-top-nav-mini">
        <PageHeaderTopNavMiniDemo />
      </div>

      <div id="page-header-site-summary-white">
        <PageHeaderSiteSummaryWhiteDemo />
      </div>
    </div>
  );
}
