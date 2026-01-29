import { Icon } from "@/components/ui/icon";
import { mdiInformationOutline } from "@mdi/js";

export default function IconSizingDemo() {
  return (
    <div className="flex items-center justify-center gap-4">
      <Icon path={mdiInformationOutline} size="sm" />
      <Icon path={mdiInformationOutline} size="md" />
      <Icon path={mdiInformationOutline} size="default" />
      <Icon path={mdiInformationOutline} size="lg" />
      <Icon path={mdiInformationOutline} size="xl" />
      <Icon path={mdiInformationOutline} size="xxl" />
    </div>
  );
}
