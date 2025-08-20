'use client'

import { FC } from "react";
import CustomCodeBlock from "../label/code-block";
import { AspectRatio } from "@/registry/new-york/ui/aspect-ratio";
import Image from "next/image";

type DemoObject = {
    id: string;
    code?: string;
}

type LabelDemoProps = {
    selectedDemo: DemoObject
}

export const AspectRatioDemo: FC<LabelDemoProps> = ({ selectedDemo }) => {
    return (
        <>
            <div className="rounded-lg bg-white overflow-clip w-full flex flex-col">
                <div className="w-full py-8 min-h-[200px] flex justify-center items-center">
                    <div className="w-[40%] flex items-center space-x-2">
                        <AspectRatio ratio={16 / 9} className="bg-muted rounded-lg">
                            <Image
                                src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
                                alt="Photo by Drew Beamer"
                                fill
                                className="h-full w-full rounded-lg object-cover dark:brightness-[0.2] dark:grayscale"
                            />
                        </AspectRatio>
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