'use client'

import { FC } from "react";
import CustomCodeBlock from "../label/code-block";
import { ContextMenu, ContextMenuCheckboxItem, ContextMenuContent, ContextMenuItem, ContextMenuLabel, ContextMenuRadioGroup, ContextMenuRadioItem, ContextMenuSeparator, ContextMenuShortcut, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuTrigger } from "@/registry/new-york/ui/context-menu";

type DemoObject = {
    id: string;
}

type LabelDemoProps = {
    selectedDemo: DemoObject
}

export const ContextMenuDemo: FC<LabelDemoProps> = ({ selectedDemo }) => {
    const code = `import {
    ContextMenu,
    ContextMenuCheckboxItem,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuLabel,
    ContextMenuRadioGroup,
    ContextMenuRadioItem,
    ContextMenuSeparator,
    ContextMenuShortcut,
    ContextMenuSub,
    ContextMenuSubContent,
    ContextMenuSubTrigger,
    ContextMenuTrigger,
} from "@/components/ui/context-menu"

export function ContextMenuDemo() {
    return (
        <ContextMenu>
            <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
                Right click here
            </ContextMenuTrigger>
            <ContextMenuContent className="w-52">
                <ContextMenuItem inset>
                    Back
                    <ContextMenuShortcut>⌘[</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuItem inset disabled>
                    Forward
                    <ContextMenuShortcut>⌘]</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuItem inset>
                    Reload
                    <ContextMenuShortcut>⌘R</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuSub>
                    <ContextMenuSubTrigger inset>More Tools</ContextMenuSubTrigger>
                    <ContextMenuSubContent className="w-44">
                        <ContextMenuItem>Save Page...</ContextMenuItem>
                        <ContextMenuItem>Create Shortcut...</ContextMenuItem>
                        <ContextMenuItem>Name Window...</ContextMenuItem>
                        <ContextMenuSeparator />
                        <ContextMenuItem>Developer Tools</ContextMenuItem>
                        <ContextMenuSeparator />
                        <ContextMenuItem variant="destructive">Delete</ContextMenuItem>
                    </ContextMenuSubContent>
                </ContextMenuSub>
                <ContextMenuSeparator />
                <ContextMenuCheckboxItem checked>
                    Show Bookmarks
                </ContextMenuCheckboxItem>
                <ContextMenuCheckboxItem>Show Full URLs</ContextMenuCheckboxItem>
                <ContextMenuSeparator />
                <ContextMenuRadioGroup value="pedro">
                    <ContextMenuLabel inset>People</ContextMenuLabel>
                    <ContextMenuRadioItem value="pedro">
                        Pedro Duarte
                    </ContextMenuRadioItem>
                    <ContextMenuRadioItem value="colm">Colm Tuite</ContextMenuRadioItem>
                </ContextMenuRadioGroup>
            </ContextMenuContent>
        </ContextMenu>
    )
}
`;

    return (
        <>
            <div className="rounded-lg bg-white overflow-clip w-full flex flex-col">
                <div className="w-full py-8 min-h-[200px] flex justify-center items-center">
                    <div className="w-[40%] flex items-center justify-center">
                        <ContextMenu>
                            <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
                                Right click here
                            </ContextMenuTrigger>
                            <ContextMenuContent className="w-52">
                                <ContextMenuItem inset>
                                    Back
                                    <ContextMenuShortcut>⌘[</ContextMenuShortcut>
                                </ContextMenuItem>
                                <ContextMenuItem inset disabled>
                                    Forward
                                    <ContextMenuShortcut>⌘]</ContextMenuShortcut>
                                </ContextMenuItem>
                                <ContextMenuItem inset>
                                    Reload
                                    <ContextMenuShortcut>⌘R</ContextMenuShortcut>
                                </ContextMenuItem>
                                <ContextMenuSub>
                                    <ContextMenuSubTrigger inset>More Tools</ContextMenuSubTrigger>
                                    <ContextMenuSubContent className="w-44">
                                        <ContextMenuItem>Save Page...</ContextMenuItem>
                                        <ContextMenuItem>Create Shortcut...</ContextMenuItem>
                                        <ContextMenuItem>Name Window...</ContextMenuItem>
                                        <ContextMenuSeparator />
                                        <ContextMenuItem>Developer Tools</ContextMenuItem>
                                        <ContextMenuSeparator />
                                        <ContextMenuItem variant="destructive">Delete</ContextMenuItem>
                                    </ContextMenuSubContent>
                                </ContextMenuSub>
                                <ContextMenuSeparator />
                                <ContextMenuCheckboxItem checked>
                                    Show Bookmarks
                                </ContextMenuCheckboxItem>
                                <ContextMenuCheckboxItem>Show Full URLs</ContextMenuCheckboxItem>
                                <ContextMenuSeparator />
                                <ContextMenuRadioGroup value="pedro">
                                    <ContextMenuLabel inset>People</ContextMenuLabel>
                                    <ContextMenuRadioItem value="pedro">Pedro Duarte</ContextMenuRadioItem>
                                    <ContextMenuRadioItem value="colm">Colm Tuite</ContextMenuRadioItem>
                                </ContextMenuRadioGroup>
                            </ContextMenuContent>
                        </ContextMenu>
                    </div>
                </div>
                <CustomCodeBlock
                    code={[
                        {
                            language: "tsx",
                            filename: "LabelExample.tsx",
                            code: code.trim() || ``
                        }
                    ]}
                    defaultValue="tsx"
                    lineNumbers={true}
                />
            </div>
        </>
    )
}