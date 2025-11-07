import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { CodeBlock } from "@/components/code-block";
import { ReactNode } from "react";

const code = `import { Button } from "@/components/ui/button"

export function Example() {
  return <Button variant="outline">Click me</Button>
}`

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
            <TabsContent value="demo">
                {component}
            </TabsContent>

            <TabsContent value="code">
                <CodeBlock code={code} />
            </TabsContent>
        </Tabs>
    );
}