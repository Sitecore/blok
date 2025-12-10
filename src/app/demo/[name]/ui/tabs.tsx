import { mdiCodeBraces, mdiCog, mdiHome, mdiWindowMaximize } from "@mdi/js";
import { Icon } from "@/lib/icon";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const tabs = {
  name: "tabs",
  defaultComponent: (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription className="wrap-break-words">
              Make changes to your account here. Click save when you&apos;re done.
            </CardDescription>
          </CardHeader>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, you'll be logged out.
            </CardDescription>
          </CardHeader>
        </Card>
      </TabsContent>
    </Tabs>
  ),
  usage: [
    `import {\n Tabs,\n TabsContent,\n TabsList,\n TabsTrigger\n} from "@/components/ui/tabs";`,
    `<Tabs defaultValue="account" className="max-w-[400px]">\n <TabsList>\n  <TabsTrigger value="account">Account</TabsTrigger>\n  <TabsTrigger value="password">Password</TabsTrigger>\n </TabsList>\n <TabsContent value="account">Make changes to your account here.</TabsContent>\n <TabsContent value="password">Change your password here.</TabsContent>\n</Tabs>`,
  ],
  components: {
    "Line Variant": (
      <Tabs defaultValue="account" className="max-w-[400px]">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription className="wrap-break-words">
                Make changes to your account here. Click save when you're done.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-name">Name</Label>
                <Input id="tabs-demo-name" defaultValue="Liz" autoComplete="name" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-username">Username</Label>
                <Input id="tabs-demo-username" defaultValue="@liz" autoComplete="username" />
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
                Change your password here. After saving, you'll be logged out.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-current">Current password</Label>
                <Input id="tabs-demo-current" type="password" autoComplete="current-password" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-new">New password</Label>
                <Input id="tabs-demo-new" type="password" autoComplete="new-password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    ),
    "Line Variant with Icons": (
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
    ),
    "Soft Rounded Variant": (
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
    ),
    "With Icons": (
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
    ),
  },
};
