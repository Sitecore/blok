import { mdiCodeBraces, mdiCog, mdiHome, mdiWindowMaximize } from "@mdi/js";
import Icon from "@mdi/react";

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
  components: {
    LineVariant: (
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
                Make changes to your account here. Click save when you're done.
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
                Change your password here. After saving, you'll be logged out.
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
    ),
    LineVariantWithIcons: (
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
    ),
    SoftRoundedVariant: (
      <Tabs defaultValue="home">
        <TabsList variant="soft-rounded">
          <TabsTrigger value="home" variant="soft-rounded">
            Home
          </TabsTrigger>
          <TabsTrigger value="settings" variant="soft-rounded">
            Settings
          </TabsTrigger>
        </TabsList>
      </Tabs>
    ),
    WithIcons: (
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
    ),
  },
};
