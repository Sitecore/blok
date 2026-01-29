import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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
import { mdiCheck } from "@mdi/js";

export default function TimelineVariantsDemo() {
  return (
    <div className="space-y-6">
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
            <TimelineTitle>Christian created a new project</TimelineTitle>
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
            <TimelineTitle>Christian created a new project</TimelineTitle>
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
            <TimelineTitle>Christian created a new project</TimelineTitle>
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
            <TimelineTitle>Christian created a new project</TimelineTitle>
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
  );
}
