import { iconContentHubOne, iconOrdercloud, iconPersonalize, iconXmCloud } from "@/app/(registry)/graphics/icons/logo-icons";
import { Alert } from "@/components/ui/alert";
import { Icon } from "@/components/ui/icon";
import { mdiInformationOutline } from "@mdi/js";
import Link from "next/link";

export default function IconDemo() {
  return (
    <Icon path={mdiInformationOutline} variant="default" />
  );
}

export const icon = {
  name: "icon",
  preInformation: (
    <Alert>
      <span className="inline text-md [&_p]:leading-relaxed">Looking for the right icon to use? See <Link href="/graphics/icons" className="text-primary hover:text-primary/80 no-underline"> icons</Link>.</span>
    </Alert>
  ),
  defaultComponent: (
    <Icon path={mdiInformationOutline} variant="default" />
  ),
  usage: [
    `import { Icon } from "@/components/ui/icon";`,
    `<Icon path={mdiInformationOutline} />`,
  ],
  components: {
    Variants: (
        <div className="flex items-center justify-center gap-4">
            <Icon path={mdiInformationOutline} variant="default" />
            <Icon path={mdiInformationOutline} variant="subtle" />
            <Icon path={mdiInformationOutline} variant="filled" />
        </div>
    ),
    Sizing: (
      <div className="flex items-center justify-center gap-4">
        <Icon path={mdiInformationOutline} size="sm" />
        <Icon path={mdiInformationOutline} size="md" />
        <Icon path={mdiInformationOutline} size="default" />
        <Icon path={mdiInformationOutline} size="lg" />
        <Icon path={mdiInformationOutline} size="xl" />
        <Icon path={mdiInformationOutline} size="xxl" />
      </div>
    ),
    "Color Schemes": (
      <div className="flex items-center justify-center gap-4">
        <Icon path={mdiInformationOutline} colorScheme="primary" />
        <Icon path={mdiInformationOutline} colorScheme="neutral" />
        <Icon path={mdiInformationOutline} colorScheme="danger" />
        <Icon path={mdiInformationOutline} colorScheme="warning" />
        <Icon path={mdiInformationOutline} colorScheme="yellow" />
        <Icon path={mdiInformationOutline} colorScheme="success" />
        <Icon path={mdiInformationOutline} colorScheme="teal" />
        <Icon path={mdiInformationOutline} colorScheme="cyan" />
        <Icon path={mdiInformationOutline} colorScheme="blue" />
        <Icon path={mdiInformationOutline} colorScheme="purple" />
        <Icon path={mdiInformationOutline} colorScheme="pink" />
      </div>
    ),
    "Subtle Variants": (
        <div className="flex items-center justify-center gap-4">
            <Icon path={mdiInformationOutline} variant="subtle" colorScheme="primary" />
            <Icon path={mdiInformationOutline} variant="subtle" colorScheme="neutral" />
            <Icon path={mdiInformationOutline} variant="subtle" colorScheme="success" />
            <Icon path={mdiInformationOutline} variant="subtle" colorScheme="danger" />
            <Icon path={mdiInformationOutline} variant="subtle" colorScheme="warning" />
            <Icon path={mdiInformationOutline} variant="subtle" colorScheme="yellow" />
            <Icon path={mdiInformationOutline} variant="subtle" colorScheme="teal" />
            <Icon path={mdiInformationOutline} variant="subtle" colorScheme="cyan" />
            <Icon path={mdiInformationOutline} variant="subtle" colorScheme="blue" />
            <Icon path={mdiInformationOutline} variant="subtle" colorScheme="purple" />
            <Icon path={mdiInformationOutline} variant="subtle" colorScheme="pink" />
        </div>
    ),
    "Filled Variants": (
        <div className="flex items-center justify-center gap-4">
            <Icon path={mdiInformationOutline} variant="filled" colorScheme="primary" />
            <Icon path={mdiInformationOutline} variant="filled" colorScheme="neutral" />
            <Icon path={mdiInformationOutline} variant="filled" colorScheme="success" />
            <Icon path={mdiInformationOutline} variant="filled" colorScheme="danger" />
            <Icon path={mdiInformationOutline} variant="filled" colorScheme="warning" />
            <Icon path={mdiInformationOutline} variant="filled" colorScheme="yellow" />
            <Icon path={mdiInformationOutline} variant="filled" colorScheme="teal" />
            <Icon path={mdiInformationOutline} variant="filled" colorScheme="cyan" />
            <Icon path={mdiInformationOutline} variant="filled" colorScheme="blue" />
            <Icon path={mdiInformationOutline} variant="filled" colorScheme="purple" />
            <Icon path={mdiInformationOutline} variant="filled" colorScheme="pink" />
        </div>
    ),
    "Sitecore Logos": (
      <div className="flex items-center justify-center gap-4">
        <Icon path={"https://delivery-sitecore.sitecorecontenthub.cloud/api/public/content/mark-xm_cloud_content"} variant="default" colorScheme="neutral" />
        <Icon path={"https://delivery-sitecore.sitecorecontenthub.cloud/api/public/content/mark-content_hub_one"} variant="subtle" colorScheme="primary" />
        <Icon path={"https://delivery-sitecore.sitecorecontenthub.cloud/api/public/content/mark-personalize"} variant="subtle" colorScheme="danger" />
        <Icon path={"https://delivery-sitecore.sitecorecontenthub.cloud/api/public/content/mark-ordercloud"} variant="filled" colorScheme="cyan" />
      </div>
    )
  },
};
