import { CollapsibleDemo } from "@/app/demo/[name]/ui/collapsibleDemo";

export const collapsible = {
  name: "Collapsible",
  defaultComponent: (
    <CollapsibleDemo />
  ),
  usage: [
    `import {\n  Collapsible,\n  CollapsibleContent,\n  CollapsibleTrigger,\n} from "@/components/ui/collapsible"`,
    `<Collapsible>\n  <CollapsibleTrigger>Can I use this in my project?</CollapsibleTrigger>\n  <CollapsibleContent>\n    Yes. Free to use for personal and commercial projects. No attribution\n    required.\n  </CollapsibleContent>\n</Collapsible>`
  ],
};
