import React from "react";
import { mdiHome, mdiCog, mdiWindowMaximize, mdiCodeBraces } from "@mdi/js";
import Icon from "@mdi/react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/new-york/ui/tabs";

type TabsVariant = "line" | "soft-rounded";
type TabsStyle = "default" | "with-icons" | "content";

interface TabsExampleProps {
  variant: TabsVariant;
  style: TabsStyle;
  tabsContent: string;
}

export const TabsExample: React.FC<TabsExampleProps> = ({ variant, style, tabsContent }) => {
  if (style === "with-icons") {
    return (
      <Tabs defaultValue="home" className="max-w-[400px]">
        <TabsList variant={variant}>
          <TabsTrigger value="home" variant={variant}>
            <Icon path={mdiHome} size={0.8} />
            Home
          </TabsTrigger>
          <TabsTrigger value="settings" variant={variant}>
            <Icon path={mdiCog} size={0.8} />
            Settings
          </TabsTrigger>
        </TabsList>
      </Tabs>
    );
  }

  if (style === "content") {
    return (
      <Tabs defaultValue="preview" className="max-w-[400px]">
        <TabsList variant={variant}>
          <TabsTrigger value="preview" variant={variant}>
            <Icon path={mdiWindowMaximize} size={0.8} />
            Preview
          </TabsTrigger>
          <TabsTrigger value="code" variant={variant}>
            <Icon path={mdiCodeBraces} size={0.8} />
            Code
          </TabsTrigger>
        </TabsList>
      </Tabs>
    );
  }

  // Default style
  return (
    <Tabs defaultValue="tab1" className="max-w-[400px]">
      <TabsList variant={variant}>
        <TabsTrigger value="tab1" variant={variant}>
          {tabsContent}
        </TabsTrigger>
        <TabsTrigger value="tab2" variant={variant}>
          Tab 2
        </TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">Content for {tabsContent}</TabsContent>
      <TabsContent value="tab2">Content for Tab 2</TabsContent>
    </Tabs>
  );
};
