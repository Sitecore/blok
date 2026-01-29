import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Icon } from "@/lib/icon";
import { mdiCodeBraces, mdiWindowMaximize } from "@mdi/js";

export default function TabsWithIconsDemo() {
  return (
    <Tabs defaultValue="preview">
      <TabsList variant="soft-rounded">
        <TabsTrigger value="preview" variant="soft-rounded">
          <Icon path={mdiWindowMaximize} size={1.2} />
          Preview
        </TabsTrigger>
        <TabsTrigger value="code" variant="soft-rounded">
          <Icon path={mdiCodeBraces} size={1.2} />
          Code
        </TabsTrigger>
      </TabsList>
      <TabsContent value="preview">
        <p>Preview content</p>
      </TabsContent>
      <TabsContent value="code">
        <p>Code content</p>
      </TabsContent>
    </Tabs>
  );
}
