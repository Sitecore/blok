import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/new-york/ui/tabs"

import { TopBarBlocks } from "./topbar"
import { FilterDemo } from "@/components/filter-demo"
import { SidebarBlocks } from "./sidebar-demo"
import { CircularProgressDemo } from "./circular-progress-demo"

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
            <TabsTrigger value="filter">Filter</TabsTrigger>
            <TabsTrigger value="sidebar">Sidebar</TabsTrigger>
            <TabsTrigger value="circularProgress">Circular Progress</TabsTrigger>
          </TabsList>
          <TabsContent value="topBar" className="mt-4">
            <TopBarBlocks />
          </TabsContent>
          <TabsContent value="filter" className="mt-4">
            <FilterDemo />
          </TabsContent>
          <TabsContent value="sidebar" className="mt-4">
            <SidebarBlocks />
          </TabsContent>
          <TabsContent value="circularProgress" className="mt-4">
            <CircularProgressDemo />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
