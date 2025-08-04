import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/new-york/ui/tabs"

import { StreamHooks } from "./stream-hooks"

export default function HooksPage() {
  return (
    <div className="container py-6">
      <div className="flex flex-col gap-4 px-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Hooks</h1>
          <p className="text-muted-foreground">
            A collection of reusable hooks for your application.
          </p>
        </div>
        <Tabs defaultValue="stream" className="w-full">
          <TabsList>
            <TabsTrigger value="stream">Stream</TabsTrigger>
          </TabsList>
          <TabsContent value="stream" className="mt-4">
            <StreamHooks />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
