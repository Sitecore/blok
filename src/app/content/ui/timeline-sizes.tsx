import {
  TimelineConnector,
  TimelineContent,
  TimelineIndicator,
  TimelineItem,
  TimelineRoot,
  TimelineSeparator,
  TimelineTitle,
} from "@/components/ui/timeline";
import { Icon } from "@/lib/icon";
import { mdiFerry } from "@mdi/js";

export default function TimelineSizesDemo() {
  return (
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
  );
}
