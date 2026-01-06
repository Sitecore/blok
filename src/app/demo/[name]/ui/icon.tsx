import { Alert } from "@/components/ui/alert";
import Link from "next/link";

export const icon = {
  name: "icon",
  preInformation: (
    <Alert>
      <span className="inline text-md [&_p]:leading-relaxed">Looking for the right icon to use? See <Link href="/graphics/icons" className="text-primary hover:text-primary/80 no-underline"> icons</Link>.</span>
    </Alert>
  ),
  defaultComponent: "icon",
  usage: [
    `import { Icon } from "@/components/ui/icon";`,
    `<Icon path={mdiInformationOutline} />`,
  ],
  components: {
    Variants: "icon-variants",
    Sizing: "icon-sizing",
    "Color Schemes": "icon-color-schemes",
    "Subtle Variants": "icon-subtle",
    "Filled Variants": "icon-filled",
    "Sitecore Logos": "icon-sitecore-logos",
  },
};