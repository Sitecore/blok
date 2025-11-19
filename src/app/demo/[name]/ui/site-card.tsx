import { SiteCardsExample } from "@/app/demo/[name]/ui/site-cards-example";

export const siteCard = {
  name: "pinned-site",
  defaultComponent: (
    <SiteCardsExample />
  ),
  usage: [
    `import { SiteCard } from "@/components/ui/site-card";`,
    `<SiteCard />`,
  ],
};
