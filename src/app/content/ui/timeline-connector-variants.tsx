import { TimelineConnector, TimelineContent, TimelineItem, TimelineSeparator, TimelineTitle, TimelineIndicator, TimelineRoot } from "@/components/ui/timeline";
import { Icon } from "@/lib/icon";
import { mdiCheck } from "@mdi/js";

export default function TimelineConnectorVariantsDemo() {
    return (
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
    )
}