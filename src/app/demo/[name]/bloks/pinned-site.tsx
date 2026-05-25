import { pinnedSiteCodeFiles } from "@/lib/docsite/blok-demo-code-files";

export const pinnedSite = {
  name: "pinned-site",
  preview: {
    defaultComponent: "pinned-site",
    codeFiles: pinnedSiteCodeFiles,
  },
  usage: {
    usage: [
      `import { PinnedSitesSection } from "@/components/ui/pinned-sites-section";`,
      `<PinnedSitesSection />`,
    ],
  },
};
