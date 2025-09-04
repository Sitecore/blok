import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const tooltip = {
  name: "tooltip",
  components: {
    side: (
      <TooltipProvider>
        <div className="flex mt-10 gap-4">
          {/* Top Tooltip */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">Hover Top</Button>
            </TooltipTrigger>
            <TooltipContent side="top">Add to library (Top)</TooltipContent>
          </Tooltip>
          {/* Bottom Tooltip */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">Hover Bottom</Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              Add to library (Bottom)
            </TooltipContent>
          </Tooltip>
          {/* Right Tooltip */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">Hover Right</Button>
            </TooltipTrigger>
            <TooltipContent side="right">Add to library (Right)</TooltipContent>
          </Tooltip>
          {/* Left Tooltip */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">Hover Left</Button>
            </TooltipTrigger>
            <TooltipContent side="left">Add to library (Left)</TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    ),
  },
};
