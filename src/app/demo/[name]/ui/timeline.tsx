export const timeline = {
  name: "timeline",
  preview: {
    defaultComponent: "timeline",
  },
  usage: {
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
} from "@/components/ui/timeline";
import { Icon } from "@/lib/icon";
import { mdiCheck } from "@mdi/js";`,
      `<TimelineRoot>
  <TimelineItem>
    <TimelineSeparator>
      <TimelineIndicator>
        <Icon path={mdiCheck} size={0.7} />
      </TimelineIndicator>
      <TimelineConnector />
    </TimelineSeparator>
    <TimelineContent>
      <TimelineTitle>Step Completed</TimelineTitle>
      <TimelineDescription>Description text</TimelineDescription>
    </TimelineContent>
  </TimelineItem>
</TimelineRoot>`,
    ]
  },
  components: {
    "Variants": { component: "timeline-variants", },
    "Sizes": { component: "timeline-sizes", },
    "Connector Variants": { component: "timeline-connector-variants", },
  }
};
