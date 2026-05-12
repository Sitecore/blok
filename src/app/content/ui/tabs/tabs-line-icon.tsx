import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Icon } from "@/lib/icon";
import { mdiCog, mdiHome } from "@mdi/js";

export default function TabsLineVariantWithIconsDemo() {
  return (
    <Tabs defaultValue="home">
      <TabsList>
        <TabsTrigger value="home">
          <Icon path={mdiHome} size={1.2} />
          Home
        </TabsTrigger>
        <TabsTrigger value="settings">
          <Icon path={mdiCog} size={1.2} />
          Settings
        </TabsTrigger>
      </TabsList>
      <TabsContent value="home">
        <p>Home content</p>
      </TabsContent>
      <TabsContent value="settings">
        <p>Settings content</p>
      </TabsContent>
    </Tabs>
  );
}
