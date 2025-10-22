import { Button } from "@/components/ui/button";
import { mdiInformationOutline } from "@mdi/js";
import { Icon } from "@/lib/icon";

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
    ),
    
    // Icon with Text
    IconWithText: (
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
      </div>
    ),
    
    // Disabled States
    DisabledStates: (
      <div className="flex flex-wrap items-center gap-3">
        <Button disabled>Disabled Default</Button>
        <Button disabled colorScheme="success">Disabled Success</Button>
        <Button disabled colorScheme="danger">Disabled Danger</Button>
        <Button disabled variant="outline">Disabled Outline</Button>
        <Button disabled variant="ghost">Disabled Ghost</Button>
        <Button disabled variant="link">Disabled Link</Button>
      </div>
    ),
    
    // Success Color Scheme
    SuccessColorScheme: (
      <div className="flex flex-wrap items-center gap-3">
        <Button colorScheme="success">Normal Success</Button>
        <Button colorScheme="success" disabled>Disabled Success</Button>
        <Button colorScheme="success" size="lg">Large Success</Button>
        <Button colorScheme="success" size="sm">Small Success</Button>
      </div>
    ),
    
    // Danger Color Scheme
    DangerColorScheme: (
      <div className="flex flex-wrap items-center gap-3">
        <Button colorScheme="danger">Normal Danger</Button>
        <Button colorScheme="danger" disabled>Disabled Danger</Button>
        <Button colorScheme="danger" size="lg">Large Danger</Button>
        <Button colorScheme="danger" size="sm">Small Danger</Button>
      </div>
    ),
    
    // Icon with Different Colors
    IconColors: (
      <div className="flex flex-wrap items-center gap-3">
        <Button size="icon" colorScheme="primary" aria-label="Contact support">
          <Icon path={mdiInformationOutline} />
        </Button>
        <Button size="icon" colorScheme="success" aria-label="View documentation">
          <Icon path={mdiInformationOutline} />
        </Button>
        <Button size="icon" colorScheme="danger" aria-label="Report issue">
          <Icon path={mdiInformationOutline} />
        </Button>
        <Button size="icon" colorScheme="neutral" aria-label="Learn more">
          <Icon path={mdiInformationOutline} />
        </Button>
      </div>
    ),
    
    // Size Variations
    SizeVariations: (
      <div className="flex flex-wrap items-center gap-3">
        <Button size="lg">Large Button</Button>
        <Button size="default">Default Button</Button>
        <Button size="sm">Small Button</Button>
        <Button size="xs">Extra Small Button</Button>
      </div>
    ),
    
    // Color Scheme Variations
    ColorSchemeVariations: (
      <div className="flex flex-wrap items-center gap-3">
        <Button colorScheme="primary">Primary</Button>
        <Button colorScheme="success">Success</Button>
        <Button colorScheme="danger">Danger</Button>
        <Button colorScheme="neutral">Neutral</Button>
      </div>
    ),
  },
};
