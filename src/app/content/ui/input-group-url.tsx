import { InputGroup, InputGroupButton, InputGroupAddon, InputGroupText, InputGroupInput } from "@/components/ui/input-group";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Icon } from "@/lib/icon";
import { mdiInformationOutline } from "@mdi/js";

export default function InputGroupURLDemo() {
    return (
        <div className="grid w-full max-w-md gap-4">
            <InputGroup>
                <InputGroupInput
                    placeholder="example.com"
                    className="!pl-1"
                    aria-label="Website URL"
                />
                <InputGroupAddon>
                    <InputGroupText>https://</InputGroupText>
                </InputGroupAddon>
                <InputGroupAddon align="inline-end">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <InputGroupButton size="icon-xs">
                                <Icon path={mdiInformationOutline} size={0.9} />
                            </InputGroupButton>
                        </TooltipTrigger>
                        <TooltipContent>This is content in a tooltip.</TooltipContent>
                    </Tooltip>
                </InputGroupAddon>
            </InputGroup>
        </div>
    )
}