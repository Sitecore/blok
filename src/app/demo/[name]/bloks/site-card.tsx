import { siteCardCodeFiles } from "@/lib/docsite/blok-demo-code-files";

export const siteCard = {
  name: "site-card",
  preview: {
    defaultComponent: "site-card",
    codeFiles: siteCardCodeFiles,
  },
  usage: {
    usage: [
      `import { SiteCard } from "@/components/ui/site-card";`,
      `<SiteCard />`,
    ],
  },
};
