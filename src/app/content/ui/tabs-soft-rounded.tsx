import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function TabsSoftRoundedVariantDemo() {
  return (
    <Tabs defaultValue="home">
      <TabsList variant="soft-rounded">
        <TabsTrigger value="home" variant="soft-rounded">
          Home
        </TabsTrigger>
        <TabsTrigger value="settings" variant="soft-rounded">
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
