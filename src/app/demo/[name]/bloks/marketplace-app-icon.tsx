import {
  marketplaceAppIconCodeFiles,
  marketplaceAppIconFallbackCodeFiles,
  marketplaceAppIconSizesCodeFiles,
} from "@/lib/docsite/blok-demo-code-files";

export const marketplaceAppIcon = {
  name: "marketplace-app-icon",
  preview: {
    defaultComponent: "marketplace-app-icon",
    codeFiles: marketplaceAppIconCodeFiles,
  },
  usage: {
    usage: [
      `import { MarketplaceAppIcon } from "@/components/bloks/marketplace-app-icon";`,
      `<MarketplaceAppIcon
  name="Sitecore Search"
  src={app.iconUrl}
  size="sm"
  colorSeed={app.id}
/>`,
    ],
  },
  components: {
    Sizes: {
      component: "marketplace-app-icon-sizes",
      codeFiles: marketplaceAppIconSizesCodeFiles,
    },
    Fallback: {
      component: "marketplace-app-icon-fallback",
      codeFiles: marketplaceAppIconFallbackCodeFiles,
    },
  },
};
