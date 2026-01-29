import { Alert } from "@/components/ui/alert";
import Link from "next/link";

export const icon = {
  name: "icon",
  preview: {
    pre: (
      <Alert>
        <span className="inline text-md [&_p]:leading-relaxed">
          Looking for the right icon to use? See{" "}
          <Link
            href="/graphics/icons"
            className="text-primary hover:text-primary/80 no-underline"
          >
            {" "}
            icons
          </Link>
          .
        </span>
      </Alert>
    ),
    defaultComponent: "icon",
  },
  usage: {
    usage: [
      `import { Icon } from "@/components/ui/icon";`,
      `<Icon path={mdiInformationOutline} />`,
    ],
  },
  components: {
    Variants: { component: "icon-variants" },
    Sizing: { component: "icon-sizing" },
    "Color Schemes": { component: "icon-color-schemes" },
    "Subtle Variants": { component: "icon-subtle" },
    "Filled Variants": { component: "icon-filled" },
    // "Sitecore Logos": { component: "icon-sitecore-logos", },
  },
};
