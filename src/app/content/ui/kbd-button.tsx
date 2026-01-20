import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";

export default function KbdButtonDemo() {
    return (
        <div className="flex flex-wrap items-center justify-center gap-4 py-6 min-w-[300px]">
            <Button variant="outline" size="sm" className="pr-2">
                Accept <Kbd>⏎</Kbd>
            </Button>
            <Button variant="outline" size="sm" className="pr-2">
                Cancel <Kbd>Esc</Kbd>
            </Button>
        </div>
    )
}