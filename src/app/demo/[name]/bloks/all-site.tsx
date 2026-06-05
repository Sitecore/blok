import { allSiteCodeFiles } from "@/lib/docsite/blok-demo-code-files";

export const allSite = {
  name: "all-site",
  preview: {
    defaultComponent: "all-site",
    codeFiles: allSiteCodeFiles,
  },
  usage: {
    usage: [
      `import { AllSitesSection } from "@/components/bloks/all-sites-section";`,
      `<AllSitesSection />`,
    ],
  },
};
