import { Button } from "@/components/ui/button";
import { mdiInformationOutline } from "@mdi/js";
import Icon from "@mdi/react";

export const button = {
  name: "button",
  components: {
    Variants: (
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="default">Primary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
      </div>
    ),
    Sizing: (
      <div className="flex flex-wrap items-center gap-3">
        <Button size="lg">Solid lg</Button>
        <Button size="default">Solid</Button>
        <Button size="sm">Solid sm</Button>
        <Button size="xs">Solid xs</Button>
      </div>
    ),
    ColorSchemes: (
      <div className="flex flex-wrap items-center gap-3">
        <Button colorScheme="primary">Default</Button>
        <Button colorScheme="neutral">Secondary</Button>
        <Button colorScheme="success">Success</Button>
        <Button colorScheme="danger">Danger</Button>
      </div>
    ),
    IconSizing: (
      <div className="flex flex-wrap items-center gap-3">
        <Button size="icon-lg">
          <Icon path={mdiInformationOutline} />
        </Button>
        <Button size="icon">
          <Icon path={mdiInformationOutline} />
        </Button>
        <Button size="icon-sm">
          <Icon path={mdiInformationOutline} />
        </Button>
        <Button size="icon-xs">
          <Icon path={mdiInformationOutline} />
        </Button>
      </div>
    ),
  },
};
