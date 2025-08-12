import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/new-york/ui/select"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/new-york/ui/tabs"

interface componentRenderingProps {
  title: string
  variant: string
  sizes: string[]
  previewContent: React.ReactNode
  codeContent: string
}

export function ComponentRendering({
  title,
  variant,
  sizes,
  previewContent,
  codeContent,
}: componentRenderingProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">{title}</h3>
      <div className=" ">
        <Tabs defaultValue="preview">
          <div className="flex justify-between">
            <div>
              <TabsList className="mb-4">
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="code">Code</TabsTrigger>
              </TabsList>
            </div>
            {/* <div className="flex">
              <Select defaultValue={variant}>
                <SelectTrigger className="w-[180px] rounded-md">
                  <SelectValue placeholder="Select variant" />
                </SelectTrigger>
                <SelectContent className="border border-gray-200 bg-white">
                  <SelectItem
                    value="default (primary)"
                    className="text-gray-900"
                  >
                    Default (Primary)
                  </SelectItem>
                  <SelectItem value="Secondary" className="text-gray-900">
                    Secondary
                  </SelectItem>
                </SelectContent>
              </Select>
              <Tabs defaultValue={sizes[0]} className="space-x-1">
                <TabsList className="rounded-md p-1">
                  {sizes.map((size) => (
                    <TabsTrigger key={size} value={size} className="">
                      {size}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div> */}
          </div>

          <TabsContent
            value="preview"
            className="flex justify-center bg-white p-25"
          >
            <div className="">{previewContent}</div>
          </TabsContent>

          <TabsContent value="code">
            <pre className="bg-muted overflow-x-auto rounded-md p-4 text-sm">
              {codeContent}
            </pre>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
