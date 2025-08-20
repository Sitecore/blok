'use client'

import { FC } from "react";
import CustomCodeBlock from "../label/code-block";
import { Button } from "@/registry/new-york/ui/button";
import { toast } from "sonner";

type DemoObject = {
    id: string;
    code?: string;
}

type LabelDemoProps = {
    selectedDemo: DemoObject
}

export const SonnerDemo: FC<LabelDemoProps> = ({ selectedDemo }) => {
    return (
        <>
            <div className="rounded-lg bg-white overflow-clip w-full flex flex-col">
                <div className="w-full py-8 min-h-[200px] flex justify-center items-center">
                    <div className="flex items-center space-x-2">
                        <Button
                            variant="outline"
                            onClick={() =>
                                toast("Event has been created", {
                                description: "Tuesday, August 19, 2025 at 5:00 PM",
                                action: {
                                    label: "Undo",
                                    onClick: () => console.log("Undo"),
                                },
                                })
                            }
                        >
                            Show Toast
                        </Button>
                    </div>
                </div>
                <CustomCodeBlock
                    code={[
                        {
                            language: "tsx",
                            filename: "LabelExample.tsx",
                            code: selectedDemo.code?.trim() || ``
                        }
                    ]}
                    defaultValue="tsx"
                    lineNumbers={true}
                />
            </div>
        </>
    )
}