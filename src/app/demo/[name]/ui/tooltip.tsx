import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const tooltip = {
  name: "tooltip",
  defaultComponent: (
    <TooltipProvider>
      <div className="flex gap-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">Hover</Button>
          </TooltipTrigger>
          <TooltipContent>Add to library</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  ),
  usage: [
    `import {\n  TooltipProvider,\n  Tooltip,\n  TooltipTrigger,\n  TooltipContent\n} from "@/components/ui/tooltip";`,
    `<TooltipProvider>\n <Tooltip>\n   <TooltipTrigger asChild>\n    <Button variant="outline">Hover</Button>\n   </TooltipTrigger>\n   <TooltipContent>Add to library</TooltipContent>\n  </Tooltip>\n</TooltipProvider>`,
  ],
};
