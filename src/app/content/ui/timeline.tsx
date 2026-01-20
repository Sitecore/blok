import {
  TimelineConnector,
  TimelineContent,
  TimelineDescription,
  TimelineIndicator,
  TimelineItem,
  TimelineRoot,
  TimelineSeparator,
  TimelineTitle,
} from "@/components/ui/timeline";
import { Icon } from "@/lib/icon";
import { mdiCheck, mdiFerry, mdiPackageVariantClosed } from "@mdi/js";

export default function TimelineDemo() {
  return (
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
          <p className="text-base text-foreground ">
            Your package has been dispatched and is <strong>on its way</strong>{" "}
            to the destination. Estimated delivery within 5-7 business days.
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
  );
}
