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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";  
import { Icon } from "@/lib/icon";
import { mdiCheck, mdiFerry, mdiPackageVariantClosed } from "@mdi/js";

export function TimelineDemo() {
    return (
      <div> 
        <h2 className="font-semibold text-4xl wrap-break-words">Timeline</h2>
          <div id="timeline-default">
            <TimelineRoot>
                <TimelineItem>
                <TimelineSeparator>
                    <TimelineIndicator>
                    <Icon path={mdiFerry} size={0.7} />
                    </TimelineIndicator>
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                    <TimelineTitle>Product Shipped</TimelineTitle>
                    <TimelineDescription>13th May 2021</TimelineDescription>
                    <p className="text-base text-foreground">
                    Your package has been dispatched and is <strong>on its way</strong> to the destination.
                    Estimated delivery within 5-7 business days.
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
          </div>

          <div id="timeline-variants">
          <div className="space-y-6">
            {/* Solid Variant */}
            <TimelineRoot>
                <TimelineItem>
                <TimelineSeparator>
                    <TimelineIndicator variant="solid">
                    <Avatar className="size-5">
                        <AvatarImage
                        src={"https://github.com/ChristianHahn.png"}
                        alt={"ChristianHahn avatar"}
                        />
                        <AvatarFallback>{"C"}</AvatarFallback>
                    </Avatar>
                    </TimelineIndicator>
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                    <TimelineTitle>
                    Christian created a new project
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
                    Christian changed status from
                    <Badge colorScheme="neutral">In progress</Badge>
                    to
                    <Badge colorScheme="success">Completed</Badge>
                    </TimelineTitle>
                </TimelineContent>
                </TimelineItem>
            </TimelineRoot>
            {/* Outline Variant */}
            <TimelineRoot>
                <TimelineItem>
                <TimelineSeparator>
                    <TimelineIndicator variant="outline">
                    <Avatar className="size-5">
                        <AvatarImage
                        src={"https://github.com/ChristianHahn.png"}
                        alt={"ChristianHahn avatar"}
                        />
                        <AvatarFallback>{"C"}</AvatarFallback>
                    </Avatar>
                    </TimelineIndicator>
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                    <TimelineTitle>
                    Christian created a new project
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
                    Christian changed status from
                    <Badge colorScheme="neutral">In progress</Badge>
                    to
                    <Badge colorScheme="success">Completed</Badge>
                    </TimelineTitle>
                </TimelineContent>
                </TimelineItem>
            </TimelineRoot>
            {/* Plain Variant */}
            <TimelineRoot>
                <TimelineItem>
                <TimelineSeparator>
                    <TimelineIndicator variant="plain">
                    <Avatar className="size-5">
                        <AvatarImage
                        src={"https://github.com/ChristianHahn.png"}
                        alt={"ChristianHahn avatar"}
                        />
                        <AvatarFallback>{"C"}</AvatarFallback>
                    </Avatar>
                    </TimelineIndicator>
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                    <TimelineTitle>
                    Christian created a new project
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
                    Christian changed status from
                    <Badge colorScheme="neutral">In progress</Badge>
                    to
                    <Badge colorScheme="success">Completed</Badge>
                    </TimelineTitle>
                </TimelineContent>
                </TimelineItem>
            </TimelineRoot>
            {/* Subtle Variant */}
            <TimelineRoot>
                <TimelineItem>
                <TimelineSeparator>
                    <TimelineIndicator variant="subtle">
                    <Avatar className="size-5">
                        <AvatarImage
                        src={"https://github.com/ChristianHahn.png"}
                        alt={"ChristianHahn avatar"}
                        />
                        <AvatarFallback>{"C"}</AvatarFallback>
                    </Avatar>
                    </TimelineIndicator>
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                    <TimelineTitle>
                    Christian created a new project
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
                    Christian changed status from
                    <Badge colorScheme="neutral">In progress</Badge>
                    to
                    <Badge colorScheme="success">Completed</Badge>
                    </TimelineTitle>
                </TimelineContent>
                </TimelineItem>
            </TimelineRoot>
            </div>
          </div>

          <div id="timeline-sizes">
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
          </div>

          <div id="timeline-connectors">
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
          </div>
      </div>
    );
}