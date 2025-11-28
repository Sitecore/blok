import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { CodeBlock } from "@/components/code-block";
import { ReactNode } from "react";

interface DemoTabProps {
    code: string;
    component: ReactNode;
    defaultTab?: "preview" | "code";
}

export default function DemoTab({ code, component, defaultTab = "preview" }: DemoTabProps) {
    return (
        <Tabs defaultValue={defaultTab} className="gap-0">
            <TabsList className="w-full rounded-none justify-start">
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="code">Code</TabsTrigger>
                <TabsTrigger value="" className="w-full pointer-events-none"></TabsTrigger>

            </TabsList>
            <TabsContent value="preview" className="min-h-[200px] p-8 bg-subtle-bg flex items-center justify-center rounded-b-md">
                {component}
            </TabsContent>

            <TabsContent value="code" className="min-h-[200px] rounded-b-md">
                <CodeBlock code={code} className="rounded-t-none rounded-b-md" />
            </TabsContent>
        </Tabs>
    );
}