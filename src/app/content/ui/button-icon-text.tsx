import { Button } from "@/components/ui/button";
import { Icon } from "@/lib/icon";
import { mdiInformationOutline } from "@mdi/js";

export default function ButtonIconTextDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button>
        <Icon path={mdiInformationOutline} className="mr-2" />
        Icon + Text
      </Button>
      <Button colorScheme="success">
        <Icon path={mdiInformationOutline} className="mr-2" />
        Success Icon
      </Button>
      <Button colorScheme="danger">
        <Icon path={mdiInformationOutline} className="mr-2" />
        Danger Icon
      </Button>
      <Button variant="outline">
        <Icon path={mdiInformationOutline} className="mr-2" />
        Outline Icon
      </Button>
      <Button variant="ghost">
        <Icon path={mdiInformationOutline} className="mr-2" />
        Ghost Icon
      </Button>
      <Button variant="link">
        <Icon path={mdiInformationOutline} className="mr-2" />
        Link Icon
      </Button>
    </div>
  );
}
