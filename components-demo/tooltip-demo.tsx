import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function TooltipDemo() {
  return (
    <div id="tooltip">
      <h2 className="font-semibold text-4xl wrap-break-words">Tooltip</h2>
      <TooltipProvider>
        <div className="flex gap-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">Hover</Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">Add to library</TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </div>
  );
}