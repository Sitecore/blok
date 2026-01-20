export const tabs = {
  name: "tabs",
  preview: {
    defaultComponent: "tabs",
  },
  usage: {
    usage: [
      `import {\n Tabs,\n TabsContent,\n TabsList,\n TabsTrigger\n} from "@/components/ui/tabs";`,
      `<Tabs defaultValue="account" className="max-w-[400px]">\n <TabsList>\n  <TabsTrigger value="account">Account</TabsTrigger>\n  <TabsTrigger value="password">Password</TabsTrigger>\n </TabsList>\n <TabsContent value="account">Make changes to your account here.</TabsContent>\n <TabsContent value="password">Change your password here.</TabsContent>\n</Tabs>`,
    ]
  },
  components: {
    "Line Variant": { component: "tabs-line", },
    "Line Variant with Icons": { component: "tabs-line-icon", },
    "Soft Rounded Variant": { component: "tabs-soft-rounded", },
    "With Icons": { component: "tabs-icons", },
  },
};
