import {
  type DemoCodeFileSource,
  demoCodeFile,
} from "@/lib/docsite/demo-code-files";

/**
 * Virtual tree paths mirror `@/` import paths (e.g. `@/components/bloks/site-card`
 * → `components/bloks/site-card.tsx`).
 */
export const allSiteCodeFiles: DemoCodeFileSource[] = [
  demoCodeFile(
    "app/content/bloks/all-site-section/all-site-section.tsx",
    "src/app/content/bloks/all-site-section/all-site-section.tsx",
    { default: true },
  ),
  demoCodeFile(
    "app/content/bloks/all-site-section/all-site-section.mock-data.ts",
    "src/app/content/bloks/all-site-section/all-site-section.mock-data.ts",
  ),
  demoCodeFile(
    "components/bloks/all-sites-section.tsx",
    "src/components/bloks/all-sites-section.tsx",
  ),
];

export const pinnedSiteCodeFiles: DemoCodeFileSource[] = [
  demoCodeFile(
    "app/content/bloks/pinned-site-section/pinned-site-section.tsx",
    "src/app/content/bloks/pinned-site-section/pinned-site-section.tsx",
    { default: true },
  ),
  demoCodeFile(
    "app/content/bloks/all-site-section/all-site-section.mock-data.ts",
    "src/app/content/bloks/all-site-section/all-site-section.mock-data.ts",
  ),
  demoCodeFile(
    "components/bloks/pinned-sites-section.tsx",
    "src/components/bloks/pinned-sites-section.tsx",
  ),
  demoCodeFile(
    "components/bloks/all-sites-section.tsx",
    "src/components/bloks/all-sites-section.tsx",
  ),
];

export const siteCardCodeFiles: DemoCodeFileSource[] = [
  demoCodeFile(
    "app/content/bloks/site-card/site-card.tsx",
    "src/app/content/bloks/site-card/site-card.tsx",
    { default: true },
  ),
  demoCodeFile(
    "app/content/bloks/site-card/site-card.mock-data.ts",
    "src/app/content/bloks/site-card/site-card.mock-data.ts",
  ),
  demoCodeFile(
    "app/content/bloks/site-card/site-card.demo-actions.tsx",
    "src/app/content/bloks/site-card/site-card.demo-actions.tsx",
  ),
  demoCodeFile(
    "components/bloks/site-card.tsx",
    "src/components/bloks/site-card.tsx",
  ),
];

const sidebarRhsSharedCodeFiles: DemoCodeFileSource[] = [
  demoCodeFile(
    "app/content/bloks/sidebar-rhs/sidebar-rhs-tab-content.tsx",
    "src/app/content/bloks/sidebar-rhs/sidebar-rhs-tab-content.tsx",
  ),
  demoCodeFile(
    "app/content/bloks/sidebar-rhs/sidebar-rhs.mock-data.ts",
    "src/app/content/bloks/sidebar-rhs/sidebar-rhs.mock-data.ts",
  ),
  demoCodeFile(
    "components/bloks/sidebar-rhs.tsx",
    "src/components/bloks/sidebar-rhs.tsx",
  ),
];

export const sidebarRhsCodeFiles: DemoCodeFileSource[] = [
  demoCodeFile(
    "app/content/bloks/sidebar-rhs/sidebar-rhs.tsx",
    "src/app/content/bloks/sidebar-rhs/sidebar-rhs.tsx",
    { default: true },
  ),
  demoCodeFile(
    "app/content/bloks/sidebar-rhs/sidebar-rhs-fixed.tsx",
    "src/app/content/bloks/sidebar-rhs/sidebar-rhs-fixed.tsx",
  ),
  ...sidebarRhsSharedCodeFiles,
];

export const sidebarRhsFixedCodeFiles: DemoCodeFileSource[] = [
  demoCodeFile(
    "app/content/bloks/sidebar-rhs/sidebar-rhs-fixed.tsx",
    "src/app/content/bloks/sidebar-rhs/sidebar-rhs-fixed.tsx",
    { default: true },
  ),
  ...sidebarRhsSharedCodeFiles,
];

const promptInputSharedCodeFiles: DemoCodeFileSource[] = [
  demoCodeFile(
    "app/content/bloks/prompt-input/prompt-input-attach-menu.demo.tsx",
    "src/app/content/bloks/prompt-input/prompt-input-attach-menu.demo.tsx",
  ),
  demoCodeFile(
    "app/content/bloks/prompt-input/prompt-input-attach-menu.mock-data.ts",
    "src/app/content/bloks/prompt-input/prompt-input-attach-menu.mock-data.ts",
  ),
  demoCodeFile(
    "components/bloks/prompt-input.tsx",
    "src/components/bloks/prompt-input.tsx",
  ),
];

function promptInputVariantCodeFiles(
  id: string,
  path: string,
): DemoCodeFileSource[] {
  return [
    demoCodeFile(id, path, { default: true }),
    ...promptInputSharedCodeFiles,
  ];
}

export const promptInputCodeFiles: DemoCodeFileSource[] =
  promptInputVariantCodeFiles(
    "app/content/bloks/prompt-input/prompt-input.tsx",
    "src/app/content/bloks/prompt-input/prompt-input.tsx",
  );

export const promptInputFloatingCodeFiles: DemoCodeFileSource[] =
  promptInputVariantCodeFiles(
    "app/content/bloks/prompt-input/prompt-input-floating.tsx",
    "src/app/content/bloks/prompt-input/prompt-input-floating.tsx",
  );

export const promptInputQueuedCodeFiles: DemoCodeFileSource[] =
  promptInputVariantCodeFiles(
    "app/content/bloks/prompt-input/prompt-input-queued.tsx",
    "src/app/content/bloks/prompt-input/prompt-input-queued.tsx",
  );

export const promptInputQuestionsCodeFiles: DemoCodeFileSource[] =
  promptInputVariantCodeFiles(
    "app/content/bloks/prompt-input/prompt-input-questions.tsx",
    "src/app/content/bloks/prompt-input/prompt-input-questions.tsx",
  );

export const collaborationCodeFiles: DemoCodeFileSource[] = [
  demoCodeFile(
    "app/content/bloks/collaboration/collaboration.tsx",
    "src/app/content/bloks/collaboration/collaboration.tsx",
    { default: true },
  ),
  demoCodeFile(
    "app/content/bloks/collaboration/collaboration.mock-data.ts",
    "src/app/content/bloks/collaboration/collaboration.mock-data.ts",
  ),
  demoCodeFile(
    "components/bloks/collaboration.tsx",
    "src/components/bloks/collaboration.tsx",
  ),
];

const dashboardWidgetComponentCodeFiles: DemoCodeFileSource[] = [
  demoCodeFile(
    "components/bloks/dashboard-widget.tsx",
    "src/components/bloks/dashboard-widget.tsx",
  ),
];

export const dashboardWidgetCodeFiles: DemoCodeFileSource[] = [
  demoCodeFile(
    "app/content/bloks/dashboard-widget/dashboard-widget.tsx",
    "src/app/content/bloks/dashboard-widget/dashboard-widget.tsx",
    { default: true },
  ),
  ...dashboardWidgetComponentCodeFiles,
];

export const dashboardWidgetWhiteBgLargeCodeFiles: DemoCodeFileSource[] = [
  demoCodeFile(
    "app/content/bloks/dashboard-widget/dashboard-widget-white-bg-large.tsx",
    "src/app/content/bloks/dashboard-widget/dashboard-widget-white-bg-large.tsx",
    { default: true },
  ),
  demoCodeFile(
    "app/content/bloks/dashboard-widget/dashboard-widget.mock-data.ts",
    "src/app/content/bloks/dashboard-widget/dashboard-widget.mock-data.ts",
  ),
  ...dashboardWidgetComponentCodeFiles,
];

export const dashboardWidgetGrayBgLargeCodeFiles: DemoCodeFileSource[] = [
  demoCodeFile(
    "app/content/bloks/dashboard-widget/dashboard-widget-gray-bg-large.tsx",
    "src/app/content/bloks/dashboard-widget/dashboard-widget-gray-bg-large.tsx",
    { default: true },
  ),
  ...dashboardWidgetComponentCodeFiles,
];

export const topbarCodeFiles: DemoCodeFileSource[] = [
  demoCodeFile(
    "app/content/bloks/topbar/topbar.tsx",
    "src/app/content/bloks/topbar/topbar.tsx",
    { default: true },
  ),
  demoCodeFile(
    "app/content/bloks/topbar/topbar.mock-data.ts",
    "src/app/content/bloks/topbar/topbar.mock-data.ts",
  ),
  demoCodeFile(
    "app/content/bloks/topbar/topbar.demo-right-side.tsx",
    "src/app/content/bloks/topbar/topbar.demo-right-side.tsx",
  ),
  demoCodeFile(
    "components/bloks/top-bar.tsx",
    "src/components/bloks/top-bar.tsx",
  ),
];

/** Map blok registry name → code file sources for the Code tab explorer. */
export const blokDemoCodeFilesByName: Record<string, DemoCodeFileSource[]> = {
  "all-site": allSiteCodeFiles,
  "pinned-site": pinnedSiteCodeFiles,
  "site-card": siteCardCodeFiles,
  "sidebar-rhs": sidebarRhsCodeFiles,
  "prompt-input": promptInputCodeFiles,
  collaboration: collaborationCodeFiles,
  "dashboard-widget": dashboardWidgetCodeFiles,
  topbar: topbarCodeFiles,
};
