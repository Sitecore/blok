"use client";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Icon } from "@/lib/icon";
import { mdiInformationOutline } from "@mdi/js";
import { useId } from "react";

export default function InputGroupURLDemo() {
  const urlPrefixId = useId();

  return (
    <div className="grid w-full max-w-md gap-4">
      <InputGroup>
        <InputGroupInput
          placeholder="example.com"
          className="!pl-1"
          aria-labelledby={urlPrefixId}
          name="url"
          autoComplete="url"
        />
        <InputGroupAddon>
          <InputGroupText id={urlPrefixId}>https://</InputGroupText>
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <Tooltip>
            <TooltipTrigger asChild>
              <InputGroupButton size="icon-xs" aria-label="Information">
                <Icon path={mdiInformationOutline} size={0.9} />
              </InputGroupButton>
            </TooltipTrigger>
            <TooltipContent>This is content in a tooltip.</TooltipContent>
          </Tooltip>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}
