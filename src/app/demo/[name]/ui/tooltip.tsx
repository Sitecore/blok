export const tooltip = {
  name: "tooltip",
  preview: {
    defaultComponent: "tooltip",
  },
  usage: {
    usage: [
      `import {\n  TooltipProvider,\n  Tooltip,\n  TooltipTrigger,\n  TooltipContent\n} from "@/components/ui/tooltip";`,
      `<TooltipProvider>\n <Tooltip>\n   <TooltipTrigger asChild>\n    <Button variant="outline">Hover</Button>\n   </TooltipTrigger>\n   <TooltipContent side="bottom">Add to library</TooltipContent>\n  </Tooltip>\n</TooltipProvider>`,
    ],
  },
};
