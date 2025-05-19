import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/new-york/ui/tabs"

import { TopBarBlocks } from "./topbar"

export default function BlocksPage() {
  return (
    <div className="container py-6">
      <div className="flex flex-col gap-4 px-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Blocks</h1>
          <p className="text-muted-foreground">
            A collection of reusable blocks for your application.
          </p>
        </div>
        <Tabs defaultValue="topBar" className="w-full">
          <TabsList>
            <TabsTrigger value="topBar">TopBar</TabsTrigger>
          </TabsList>
          <TabsContent value="topBar" className="mt-4">
            <TopBarBlocks />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
