import {
  TimelineRoot,
  TimelineItem,
  TimelineSeparator,
  TimelineIndicator,
  TimelineConnector,
  TimelineContent,
  TimelineTitle,
  TimelineDescription,
} from "@/components/ui/timeline";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/lib/icon";
import { mdiAccount, mdiCheck, mdiFerry, mdiPackageVariantClosed } from "@mdi/js";

export const timeline = {
  name: "timeline",
  defaultComponent: (
    <TimelineRoot>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineIndicator >
            <Icon path={mdiFerry} size={0.7} />
          </TimelineIndicator>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <TimelineTitle>Product Shipped</TimelineTitle>
          <TimelineDescription>13th May 2021</TimelineDescription>
          <p className="text-base text-foreground ">
            Lorem ipsum dolor sit amet, consectetur <strong> adipiscing</strong> elit,
            sed do eiusmod tempor incididunt.
          </p>
        </TimelineContent>
      </TimelineItem>

      <TimelineItem>
        <TimelineSeparator>
          <TimelineIndicator>
            <Icon path={mdiCheck} size={0.7} />
          </TimelineIndicator>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <TimelineTitle>Order Confirmed</TimelineTitle>
          <TimelineDescription>18th May 2021</TimelineDescription>
        </TimelineContent>
      </TimelineItem>

      <TimelineItem>
        <TimelineSeparator>
           <TimelineIndicator>
           <Icon path={mdiPackageVariantClosed} size={0.7} />
          </TimelineIndicator>
        </TimelineSeparator>
        <TimelineContent>
          <TimelineTitle>Order Delivered</TimelineTitle>
          <TimelineDescription>20th May 2021, 10:30am</TimelineDescription>
        </TimelineContent>
      </TimelineItem>
    </TimelineRoot>
  ),
  usage: [
    `import {
  TimelineRoot,
  TimelineItem,
  TimelineSeparator,
  TimelineIndicator,
  TimelineConnector,
  TimelineContent,
  TimelineTitle,
  TimelineDescription,
} from "@/components/ui/timeline";`,
    `<TimelineRoot>
  <TimelineItem>
    <TimelineSeparator>
      <TimelineIndicator>
        <CheckIcon className="size-4" />
      </TimelineIndicator>
      <TimelineConnector />
    </TimelineSeparator>
    <TimelineContent>
      <TimelineTitle>Step Completed</TimelineTitle>
      <TimelineDescription>Description text</TimelineDescription>
    </TimelineContent>
  </TimelineItem>
</TimelineRoot>`,
  ],
  components: {
    "Variants": (
      <div className="space-y-6">
        <TimelineRoot>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineIndicator variant="solid">
                <Icon path={mdiAccount} size={0.7} />
              </TimelineIndicator>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <TimelineTitle>          
                  Sage created a new project        
              </TimelineTitle>
            </TimelineContent>
          </TimelineItem>

          <TimelineItem>
            <TimelineSeparator>
              <TimelineIndicator variant="solid">
                <Icon path={mdiCheck} size={0.7} />
              </TimelineIndicator>
            </TimelineSeparator>
            <TimelineContent>
              <TimelineTitle className="flex items-center gap-2 flex-wrap">
                Sage changed status from
                <Badge colorScheme="neutral">
                  In progress
                </Badge>
                to
                <Badge colorScheme="success" >
                  Completed
                </Badge>
              </TimelineTitle>
            </TimelineContent>
          </TimelineItem>
        </TimelineRoot>

        <TimelineRoot>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineIndicator variant="outline">
                <Icon path={mdiAccount} size={0.7} />
              </TimelineIndicator>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <TimelineTitle>          
                  Sage created a new project        
              </TimelineTitle>
            </TimelineContent>
          </TimelineItem>

          <TimelineItem>
            <TimelineSeparator>
              <TimelineIndicator variant="outline">
                <Icon path={mdiCheck} size={0.7} />
              </TimelineIndicator>
            </TimelineSeparator>
            <TimelineContent>
              <TimelineTitle className="flex items-center gap-2 flex-wrap">
                Sage changed status from
                <Badge colorScheme="neutral">
                  In progress
                </Badge>
                to
                <Badge colorScheme="success" >
                  Completed
                </Badge>
              </TimelineTitle>
            </TimelineContent>
          </TimelineItem>
        </TimelineRoot>

        <TimelineRoot>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineIndicator variant="plain">
                <Icon path={mdiAccount} size={0.7} />
              </TimelineIndicator>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <TimelineTitle>          
                  Sage created a new project        
              </TimelineTitle>
            </TimelineContent>
          </TimelineItem>

          <TimelineItem>
            <TimelineSeparator>
              <TimelineIndicator variant="plain">
                <Icon path={mdiCheck} size={0.7} />
              </TimelineIndicator>
            </TimelineSeparator>
            <TimelineContent>
              <TimelineTitle className="flex items-center gap-2 flex-wrap">
                Sage changed status from
                <Badge colorScheme="neutral">
                  In progress
                </Badge>
                to
                <Badge colorScheme="success" >
                  Completed
                </Badge>
              </TimelineTitle>
            </TimelineContent>
          </TimelineItem>
        </TimelineRoot>

        <TimelineRoot>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineIndicator variant="subtle">
                <Icon path={mdiAccount} size={0.7} />
              </TimelineIndicator>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <TimelineTitle>          
                  Sage created a new project        
              </TimelineTitle>
            </TimelineContent>
          </TimelineItem>

          <TimelineItem>
            <TimelineSeparator>
              <TimelineIndicator variant="subtle">
                <Icon path={mdiCheck} size={0.7} />
              </TimelineIndicator>
            </TimelineSeparator>
            <TimelineContent>
              <TimelineTitle className="flex items-center gap-2 flex-wrap">
                Sage changed status from
                <Badge colorScheme="neutral">
                  In progress
                </Badge>
                to
                <Badge colorScheme="success" >
                  Completed
                </Badge>
              </TimelineTitle>
            </TimelineContent>
          </TimelineItem>
        </TimelineRoot>
      </div>
    ),

    Sizes: (
      <div className="flex gap-12 flex-wrap">
        <div>
          <p className="text-sm text-muted-foreground mb-4">Small</p>
          <TimelineRoot size="sm">
            <TimelineItem>
              <TimelineSeparator>
                <TimelineIndicator variant="outline" size="sm">
                  <Icon path={mdiFerry} size={0.7} />
                </TimelineIndicator>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <TimelineTitle>Product Shipped</TimelineTitle>
              </TimelineContent>
            </TimelineItem>

            <TimelineItem>
              <TimelineSeparator>
                <TimelineIndicator variant="outline" size="sm">
                  <Icon path={mdiFerry} size={0.7} />
                </TimelineIndicator>
              </TimelineSeparator>
              <TimelineContent>
                <TimelineTitle>Order Confirmed</TimelineTitle>
              </TimelineContent>
            </TimelineItem>
          </TimelineRoot>
        </div>

        <div>
          <p className="text-sm text-muted-foreground mb-4">Medium</p>
          <TimelineRoot size="md">
            <TimelineItem>
              <TimelineSeparator>
                <TimelineIndicator variant="outline" size="md">
                  <Icon path={mdiFerry} size={0.75} />
                </TimelineIndicator>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <TimelineTitle>Product Shipped</TimelineTitle>
              </TimelineContent>
            </TimelineItem>

            <TimelineItem>
              <TimelineSeparator>
                <TimelineIndicator variant="outline" size="md">
                  <Icon path={mdiFerry} size={0.75} />
                </TimelineIndicator>
              </TimelineSeparator>
              <TimelineContent>
                <TimelineTitle>Order Confirmed</TimelineTitle>
              </TimelineContent>
            </TimelineItem>
          </TimelineRoot>
        </div>

        <div>
          <p className="text-sm text-muted-foreground mb-4">Large</p>
          <TimelineRoot size="lg">
            <TimelineItem>
              <TimelineSeparator>
                <TimelineIndicator variant="outline" size="lg">
                  <Icon path={mdiFerry} size={0.8} />
                </TimelineIndicator>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <TimelineTitle>Product Shipped</TimelineTitle>
              </TimelineContent>
            </TimelineItem>

            <TimelineItem>
              <TimelineSeparator>
                <TimelineIndicator variant="outline" size="lg">
                  <Icon path={mdiFerry} size={0.8} />
                </TimelineIndicator>
              </TimelineSeparator>
              <TimelineContent>
                <TimelineTitle>Order Confirmed</TimelineTitle>
              </TimelineContent>
            </TimelineItem>
          </TimelineRoot>
        </div>
      </div>
    ),

    "Connector Variants": (
      <div className="flex gap-12 flex-wrap">
        <div>
          <p className="text-sm text-muted-foreground mb-4">Solid</p>
          <TimelineRoot>
            <TimelineItem>
              <TimelineSeparator>
                <TimelineIndicator variant="solid">
                  <Icon path={mdiCheck} size={0.7} />
                </TimelineIndicator>
                <TimelineConnector variant="solid" />
              </TimelineSeparator>
              <TimelineContent>
                <TimelineTitle>Step 1</TimelineTitle>
              </TimelineContent>
            </TimelineItem>

            <TimelineItem>
              <TimelineSeparator>
                <TimelineIndicator variant="solid">
                  <Icon path={mdiCheck} size={0.7} />
                </TimelineIndicator>
              </TimelineSeparator>
              <TimelineContent>
                <TimelineTitle>Step 2</TimelineTitle>
              </TimelineContent>
            </TimelineItem>
          </TimelineRoot>
        </div>

        <div>
          <p className="text-sm text-muted-foreground mb-4">Dashed</p>
          <TimelineRoot>
            <TimelineItem>
              <TimelineSeparator>
                <TimelineIndicator variant="solid">
                  <Icon path={mdiCheck} size={0.7} />
                </TimelineIndicator>
                <TimelineConnector variant="dashed" />
              </TimelineSeparator>
              <TimelineContent>
                <TimelineTitle>Step 1</TimelineTitle>
              </TimelineContent>
            </TimelineItem>

            <TimelineItem>
              <TimelineSeparator>
                <TimelineIndicator variant="solid">
                  <Icon path={mdiCheck} size={0.7} />
                </TimelineIndicator>
              </TimelineSeparator>
              <TimelineContent>
                <TimelineTitle>Step 2</TimelineTitle>
              </TimelineContent>
            </TimelineItem>
          </TimelineRoot>
        </div>

        <div>
          <p className="text-sm text-muted-foreground mb-4">Dotted</p>
          <TimelineRoot>
            <TimelineItem>
              <TimelineSeparator>
                <TimelineIndicator variant="solid">
                  <Icon path={mdiCheck} size={0.7} />
                </TimelineIndicator>
                <TimelineConnector variant="dotted" />
              </TimelineSeparator>
              <TimelineContent>
                <TimelineTitle>Step 1</TimelineTitle>
              </TimelineContent>
            </TimelineItem>

            <TimelineItem>
              <TimelineSeparator>
                <TimelineIndicator variant="solid">
                  <Icon path={mdiCheck} size={0.7} />
                </TimelineIndicator>
              </TimelineSeparator>
              <TimelineContent>
                <TimelineTitle>Step 2</TimelineTitle>
              </TimelineContent>
            </TimelineItem>
          </TimelineRoot>
        </div>
      </div>
    ),
  },
};
