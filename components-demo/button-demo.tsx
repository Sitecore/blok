'use client';
import { Button } from "@/components/ui/button";
import { mdiInformationOutline } from "@mdi/js";
import { Icon } from "@/lib/icon";

export function ButtonDemo() {
  return (
    <div>
      <h2 className="font-semibold text-4xl wrap-break-words">Button</h2>
        {/* Button Variants */}
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="default">Primary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      <br />

        {/* Button Sizes */}
        <div className="flex flex-wrap items-center gap-3">
          <Button size="lg">Solid lg</Button>
          <Button size="default">Solid</Button>
          <Button size="sm">Solid sm</Button>
          <Button size="xs">Solid xs</Button>
        </div>
      <br />
        {/* Button Color Schemes */}
        <div className="flex flex-wrap items-center gap-3">
          <Button colorScheme="primary">Default</Button>
          <Button colorScheme="neutral">Secondary</Button>
          <Button colorScheme="success">Success</Button>
          <Button colorScheme="danger">Danger</Button>
        </div>
      <br />
        {/* Icon Sizing Buttons */}
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
      <br />
        {/* Icon with Text Buttons */}
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
      <br />
        {/* Disabled Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <Button disabled>Disabled Default</Button>
          <Button disabled colorScheme="success">Disabled Success</Button>
          <Button disabled colorScheme="danger">Disabled Danger</Button>
          <Button disabled variant="outline">Disabled Outline</Button>
          <Button disabled variant="ghost">Disabled Ghost</Button>
          <Button disabled variant="link">Disabled Link</Button>
        </div>
        
    </div>
  )
}    