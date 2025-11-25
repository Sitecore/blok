import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { CodeBlock } from "@/components/code-block";
import { ReactNode } from "react";

interface DemoTabProps {
    code: string;
    component: ReactNode;
    defaultTab?: "demo" | "code";
}

export default function DemoTab({ code, component, defaultTab = "demo" }: DemoTabProps) {
    return (
        <Tabs defaultValue={defaultTab}>
            <TabsList>
                <TabsTrigger value="demo">Demo</TabsTrigger>
                <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>
            <TabsContent value="demo" className="min-h-[200px] py-8 bg-subtle-bg flex items-center justify-center">
                {component}
            </TabsContent>

            <TabsContent value="code" className="min-h-[200px]">
                <CodeBlock code={code} />
            </TabsContent>
        </Tabs>
    );
}