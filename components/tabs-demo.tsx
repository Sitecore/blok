import { mdiHome, mdiCog, mdiWindowMaximize, mdiCodeBraces } from "@mdi/js"
import Icon from "@mdi/react"

import { Button } from "@/registry/new-york/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/new-york/ui/card"
import { Input } from "@/registry/new-york/ui/input"
import { Label } from "@/registry/new-york/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/new-york/ui/tabs"

function TabsDemo() {
  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Line Variant (Default)</h3>
        <Tabs defaultValue="account" className="max-w-[400px]">
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account</CardTitle>
                <CardDescription>
                  Make changes to your account here. Click save when you&apos;re
                  done.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="tabs-demo-name">Name</Label>
                  <Input id="tabs-demo-name" defaultValue="Pedro Duarte" />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="tabs-demo-username">Username</Label>
                  <Input id="tabs-demo-username" defaultValue="@peduarte" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="password">
            <Card>
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>
                  Change your password here. After saving, you&apos;ll be logged
                  out.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="tabs-demo-current">Current password</Label>
                  <Input id="tabs-demo-current" type="password" />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="tabs-demo-new">New password</Label>
                  <Input id="tabs-demo-new" type="password" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save password</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Line Variant with Icons</h3>
        <Tabs defaultValue="home">
          <TabsList>
            <TabsTrigger value="home">
              <Icon path={mdiHome} size={0.8} />
              Home
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Icon path={mdiCog} size={0.8} />
              Settings
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Soft-rounded Variant</h3>
        <Tabs defaultValue="home">
          <TabsList variant="soft-rounded">
            <TabsTrigger value="home" variant="soft-rounded">Home</TabsTrigger>
            <TabsTrigger value="settings" variant="soft-rounded">Settings</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">With Icons</h3>
        <Tabs defaultValue="preview">
          <TabsList variant="soft-rounded">
            <TabsTrigger value="preview" variant="soft-rounded">
              <Icon path={mdiWindowMaximize} size={0.8} />
              Preview
            </TabsTrigger>
            <TabsTrigger value="code" variant="soft-rounded">
              <Icon path={mdiCodeBraces} size={0.8} />
              Code
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  )
}

export { TabsDemo }
