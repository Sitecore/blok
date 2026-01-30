import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupButton,
  InputGroupText,
} from "@/components/ui/input-group";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@/lib/icon";
import { mdiMagnify, mdiInformationOutline, mdiDotsHorizontal, mdiChevronDown } from "@mdi/js";

export function InputGroupDemo() {

  return (
    <div>
      <h2 className="font-semibold text-4xl wrap-break-words">Input Group</h2>

        <div id="inputGroup-search">
          <div className="grid w-full max-w-md gap-4">
            <InputGroup>
              <InputGroupInput placeholder="Search..." aria-label="Search" />
              <InputGroupAddon>
                <Icon path={mdiMagnify} size={1} />
              </InputGroupAddon>
              <InputGroupAddon align="inline-end">12 results</InputGroupAddon>
            </InputGroup>
          </div>
        </div>
<br />
        <div id="inputGroup-url">
          <div className="grid w-full max-w-md gap-4">
            <InputGroup>
              <InputGroupInput placeholder="example.com" className="!pl-1" aria-label="Website URL" />
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
        </div>
<br />
        <div id="inputGroup-dropdown">
          <div className="grid w-full max-w-md gap-4">
            <InputGroup>
              <InputGroupInput placeholder="Enter file name" aria-label="File name" />
              <InputGroupAddon align="inline-end">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <InputGroupButton variant="ghost" aria-label="More" size="icon-xs">
                      <Icon path={mdiDotsHorizontal} size={1} />
                    </InputGroupButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem>Copy path</DropdownMenuItem>
                    <DropdownMenuItem>Open location</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </InputGroupAddon>
            </InputGroup>
            <InputGroup>
              <InputGroupInput placeholder="Enter search query" aria-label="Search query" />
              <InputGroupAddon align="inline-end">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <InputGroupButton variant="ghost" className="!pr-1.5 text-xs">
                      Search In... <Icon path={mdiChevronDown} size={0.5} />
                    </InputGroupButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Documentation</DropdownMenuItem>
                    <DropdownMenuItem>Blog Posts</DropdownMenuItem>
                    <DropdownMenuItem>Changelog</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </InputGroupAddon>
            </InputGroup>
          </div>
        </div>

    </div>
  );
}