import { useState } from "react";
import { useAppContext } from "@/components/providers/marketplace";
import { CardTitle } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronRight } from "lucide-react";

export const ApplicationContext = () => {
  const appContext = useAppContext();
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <Collapsible
      open={isExpanded}
      onOpenChange={setIsExpanded}
      className="border-[1px] rounded-lg"
    >
      <CollapsibleTrigger asChild>
        <div className="flex items-center justify-between cursor-pointer hover:bg-muted/50  p-6 rounded-t-lg transition-colors">
          <div className="flex items-center gap-2">
            <CardTitle className="flex items-center gap-2">
              Application Context
            </CardTitle>
            <Badge colorScheme="primary">Client-side</Badge>
            <Badge colorScheme={"success"}>SDK Built-in Auth</Badge>
          </div>
          {isExpanded ? (
            <ChevronDown className="h-4 w-4 transition-transform" />
          ) : (
            <ChevronRight className="h-4 w-4 transition-transform" />
          )}
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <pre className="bg-muted p-4 rounded-md text-sm overflow-auto">
          {JSON.stringify(appContext, null, 2)}
        </pre>
      </CollapsibleContent>
    </Collapsible>
  );
};
