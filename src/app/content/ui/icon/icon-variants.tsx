import { Icon } from "@/components/ui/icon";
import { mdiInformationOutline } from "@mdi/js";

export default function IconVariantsDemo() {
  return (
    <div className="flex items-center justify-center gap-4">
      <Icon path={mdiInformationOutline} variant="default" />
      <Icon path={mdiInformationOutline} variant="subtle" />
      <Icon path={mdiInformationOutline} variant="filled" />
    </div>
  );
}
