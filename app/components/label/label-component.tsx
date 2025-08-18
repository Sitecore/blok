import { Checkbox } from "@/registry/new-york/ui/checkbox";
import { Label } from "@/registry/new-york/ui/label";
import { FC } from "react";
import CustomCodeBlock from "./code-block";

type DemoObject = {
    title: string;
    code?: string;
}

type LabelDemoProps = {
    selectedDemo: DemoObject
}

export const LabelDemo: FC<LabelDemoProps> = ({ selectedDemo }) => {
    return (
        <>
            <div className="rounded-lg bg-white overflow-clip w-full flex flex-col">
                <div className="w-full py-8 min-h-[200px] flex justify-center items-center">
                    <div className="flex items-center space-x-2">
                        <Checkbox id="term" />
                        <Label htmlFor="term">Accept terms and conditions</Label>
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