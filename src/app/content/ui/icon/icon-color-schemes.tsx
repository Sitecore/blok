import { Icon } from "@/components/ui/icon";
import { mdiInformationOutline } from "@mdi/js";

export default function IconColorSchemesDemo() {
  return (
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
  );
}
