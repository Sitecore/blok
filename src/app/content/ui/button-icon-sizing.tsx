import { Button } from "@/components/ui/button";
import { Icon } from "@/lib/icon";
import { mdiInformationOutline } from "@mdi/js";

export default function ButtonIconSizingDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="icon-lg" aria-label="Help and support">
        <Icon path={mdiInformationOutline} />
      </Button>
      <Button size="icon" aria-label="Get help">
        <Icon path={mdiInformationOutline} />
      </Button>
      <Button size="icon-sm" aria-label="Help">
        <Icon path={mdiInformationOutline} />
      </Button>
      <Button size="icon-xs" aria-label="Info">
        <Icon path={mdiInformationOutline} />
      </Button>
    </div>
  );
}
