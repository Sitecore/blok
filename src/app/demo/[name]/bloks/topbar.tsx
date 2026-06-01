import { topbarCodeFiles } from "@/lib/docsite/blok-demo-code-files";

export const topbar = {
  name: "topbar",
  preview: {
    defaultComponent: "topbar",
    codeFiles: topbarCodeFiles,
  },
  usage: {
    usage: [
      `import Topbar from "@/components/bloks/top-bar";`,
      `<Topbar
  logo={logo}
  brandName="Blok"
  navigation={navigation}
  rightSideItems={rightSideItems}
  menuButton={menuButton}
/>`,
    ],
  },
};
