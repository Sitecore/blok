import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const styleVariants = ["flat", "outline", "filled"];

export default function CardStyleDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3 p-8">
        {styleVariants.map((variant) => (
            <div key={variant} className={cn("p-4", variant === "filled" && "bg-body-bg rounded-lg" )}>
                <Card style={variant as "flat" | "outline" | "filled"} elevation="base" padding="lg" className="w-[300px]">
                    <CardHeader>
                        <CardTitle>{variant} Style</CardTitle>
                    </CardHeader>
                </Card>
            </div>
        ))}
    </div>
  );
}