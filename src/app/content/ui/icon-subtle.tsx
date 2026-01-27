import { Icon } from "@/components/ui/icon";
import { mdiInformationOutline } from "@mdi/js";

export default function SubtleIconVariantsDemo() {
  return (
    <div className="flex items-center justify-center gap-4">
      <Icon
        path={mdiInformationOutline}
        variant="subtle"
        colorScheme="primary"
      />
      <Icon
        path={mdiInformationOutline}
        variant="subtle"
        colorScheme="neutral"
      />
      <Icon
        path={mdiInformationOutline}
        variant="subtle"
        colorScheme="success"
      />
      <Icon
        path={mdiInformationOutline}
        variant="subtle"
        colorScheme="danger"
      />
      <Icon
        path={mdiInformationOutline}
        variant="subtle"
        colorScheme="warning"
      />
      <Icon
        path={mdiInformationOutline}
        variant="subtle"
        colorScheme="yellow"
      />
      <Icon path={mdiInformationOutline} variant="subtle" colorScheme="teal" />
      <Icon path={mdiInformationOutline} variant="subtle" colorScheme="cyan" />
      <Icon path={mdiInformationOutline} variant="subtle" colorScheme="blue" />
      <Icon
        path={mdiInformationOutline}
        variant="subtle"
        colorScheme="purple"
      />
      <Icon path={mdiInformationOutline} variant="subtle" colorScheme="pink" />
    </div>
  );
}
