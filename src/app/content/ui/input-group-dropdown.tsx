import { DropdownMenuContent, DropdownMenuTrigger, DropdownMenu, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group";
import { Icon } from "@/lib/icon";
import { mdiChevronDown, mdiDotsHorizontal } from "@mdi/js";

export default function InputGroupDropdownDemo() {
    return (
        <div className="grid w-full max-w-md gap-4">
            <InputGroup>
                <InputGroupInput placeholder="Enter file name" aria-label="File name" />
                <InputGroupAddon align="inline-end">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <InputGroupButton
                                variant="ghost"
                                aria-label="More"
                                size="icon-xs"
                            >
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
                                Search In... <Icon path={mdiChevronDown} size={1} />
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
    )
}