import { Checkbox } from "@/registry/new-york/ui/checkbox"
import { Label } from "@/registry/new-york/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/new-york/ui/tabs"
import { FC } from "react"

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
            <div>
                <Tabs defaultValue="preview">
                    <div className="flex justify-between">
                        <div>
                            <h2 className="text-xl md:text-2xl font-semibold mb-2">{selectedDemo.title}</h2>
                            {/* <h2 className="text-xl md:text-2xl font-semibold mb-2">{alerText}</h2> */}
                            <TabsList className="mb-4">
                                <TabsTrigger value="preview">Preview</TabsTrigger>
                                <TabsTrigger value="code">Code</TabsTrigger>
                            </TabsList>
                        </div>
                    </div>

                    <TabsContent
                        value="preview"
                        className="flex justify-center bg-white p-25"
                    >
                        <div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="term" />
                                <Label htmlFor="term">Accept terms and conditions</Label>
                            </div>    
                        </div>
                    </TabsContent>

                    <TabsContent value="code" className="flex justify-start bg-white p-8">
                        <div className="w-full max-w-2xl">
                            <pre className="p-4 rounded overflow-auto text-sm">
                                <code>{selectedDemo.code}</code>
                            </pre>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </>
    )
}