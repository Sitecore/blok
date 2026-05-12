import { Icon } from "@/components/ui/icon";
import { mdiInformationOutline } from "@mdi/js";

export default function FilledIconVariantsDemo() {
  return (
    <div className="flex items-center justify-center gap-4">
      <Icon
        path={mdiInformationOutline}
        variant="filled"
        colorScheme="primary"
      />
      <Icon
        path={mdiInformationOutline}
        variant="filled"
        colorScheme="neutral"
      />
      <Icon
        path={mdiInformationOutline}
        variant="filled"
        colorScheme="success"
      />
      <Icon
        path={mdiInformationOutline}
        variant="filled"
        colorScheme="danger"
      />
      <Icon
        path={mdiInformationOutline}
        variant="filled"
        colorScheme="warning"
      />
      <Icon
        path={mdiInformationOutline}
        variant="filled"
        colorScheme="yellow"
      />
      <Icon path={mdiInformationOutline} variant="filled" colorScheme="teal" />
      <Icon path={mdiInformationOutline} variant="filled" colorScheme="cyan" />
      <Icon path={mdiInformationOutline} variant="filled" colorScheme="blue" />
      <Icon
        path={mdiInformationOutline}
        variant="filled"
        colorScheme="purple"
      />
      <Icon path={mdiInformationOutline} variant="filled" colorScheme="pink" />
    </div>
  );
}
