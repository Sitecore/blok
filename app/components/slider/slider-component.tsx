'use client'

import { FC } from "react";
import CustomCodeBlock from "../label/code-block";
import { Button } from "@/registry/new-york/ui/button";
import { toast } from "sonner";
import { Slider } from "@/registry/new-york/ui/slider";
import { cn } from "@/registry/new-york/lib/utils";

type DemoObject = {
    id: string;
    code?: string;
}

type LabelDemoProps = {
    selectedDemo: DemoObject
}

export const SliderDemo: FC<LabelDemoProps> = ({ selectedDemo }) => {
    return (
        <>
            <div className="rounded-lg bg-white overflow-clip w-full flex flex-col">
                <div className="w-full py-8 min-h-[200px] flex justify-center items-center">
                    <Slider
                        defaultValue={[50]}
                        max={100}
                        step={1}
                        className={"w-[40%]"}
                    />
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