import type { MDXComponents } from "mdx/types";
import { Tabs, Tab } from "fumadocs-ui/components/tabs";
import { Callout } from "fumadocs-ui/components/callout";
import { Step, Steps } from "fumadocs-ui/components/steps";

// This function is used by Next.js to provide components to MDX files
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    Tabs,
    Tab,
    Callout,
    Steps,
    Step,
    // Add any other custom components here
  };
}

