import { PinnedSitesExample } from "@/app/demo/[name]/ui/pinned-sites-example";

export const pinnedSite = {
  name: "pinned-site",
  defaultComponent: (
    <PinnedSitesExample />
  ),
  usage: [
    `import { PinnedSitesSection } from "@/components/ui/pinned-sites-section";`,
    `<PinnedSitesSection />`,
  ],
};
