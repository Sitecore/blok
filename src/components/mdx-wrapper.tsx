"use client";

import { Tabs, Tab } from "fumadocs-ui/components/tabs";
import { Step, Steps } from "fumadocs-ui/components/steps";
import { Callout } from "./callout";

// MDX components that will be available in all MDX files
export const mdxComponents = {
  Tabs,
  Tab,
  Callout,
  Steps,
  Step,
};

// Simple wrapper component
export function MDXWrapper({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

