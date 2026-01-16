import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function KbdDemo() {

  return (
    <div>
      <h2 className="font-semibold text-4xl wrap-break-words">Kbd</h2>

        <div id="kbd-default">
          <div className="flex flex-col items-center gap-4 py-8 min-w-[300px]">
            <KbdGroup className="gap-2">
              <Kbd className="h-8 min-w-8 text-base bg-white dark:bg-gray-800 border rounded-md">⌘</Kbd>
              <Kbd className="h-8 min-w-8 text-base bg-white dark:bg-gray-800 border rounded-md">⇧</Kbd>
              <Kbd className="h-8 min-w-8 text-base bg-white dark:bg-gray-800 border rounded-md">⌥</Kbd>
              <Kbd className="h-8 min-w-8 text-base bg-white dark:bg-gray-800 border rounded-md">⌃</Kbd>
            </KbdGroup>
            <KbdGroup className="gap-2">
              <Kbd className="h-8 px-2 text-base bg-white dark:bg-gray-800 border rounded-md">Ctrl</Kbd>
              <span className="text-lg">+</span>
              <Kbd className="h-8 min-w-8 text-base bg-white dark:bg-gray-800 border rounded-md">B</Kbd>
            </KbdGroup>
          </div>
        </div>

        <div id="kbd-groups">
          <div className="flex flex-col items-center gap-4 py-6 min-w-[400px]">
            <p className="text-muted-foreground text-sm">
              Use{" "}
              <KbdGroup>
                <Kbd>Ctrl + B</Kbd>
                <Kbd>Ctrl + K</Kbd>
              </KbdGroup>{" "}
              to open the command palette
            </p>
          </div>
        </div>

        <div id="kbd-button">
          <div className="flex flex-wrap items-center justify-center gap-4 py-6 min-w-[300px]">
            <Button variant="outline" size="sm" className="pr-2">
              Accept <Kbd>⏎</Kbd>
            </Button>
            <Button variant="outline" size="sm" className="pr-2">
              Cancel <Kbd>Esc</Kbd>
            </Button>
          </div>
        </div>

        <div id="kbd-tooltip">
          <TooltipProvider>
            <div className="flex flex-wrap justify-center gap-4 py-6 min-w-[300px]">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size="sm" variant="outline">
                    Save
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="flex items-center gap-2">
                    Save Changes{" "}
                    <KbdGroup>
                      <Kbd>⌘</Kbd>
                      <Kbd>S</Kbd>
                    </KbdGroup>
                  </div>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size="sm" variant="outline">
                    Print
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="flex items-center gap-2">
                    Print Document{" "}
                    <KbdGroup>
                      <Kbd>Ctrl</Kbd>
                      <Kbd>P</Kbd>
                    </KbdGroup>
                  </div>
                </TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
        </div>

        <div id="kbd-shortcut">
          <div className="flex justify-center py-6">
            <div className="flex flex-col gap-3 w-full max-w-[280px]">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Copy</span>
                <KbdGroup>
                  <Kbd>⌘</Kbd>
                  <Kbd>C</Kbd>
                </KbdGroup>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Paste</span>
                <KbdGroup>
                  <Kbd>⌘</Kbd>
                  <Kbd>V</Kbd>
                </KbdGroup>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Cut</span>
                <KbdGroup>
                  <Kbd>⌘</Kbd>
                  <Kbd>X</Kbd>
                </KbdGroup>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Undo</span>
                <KbdGroup>
                  <Kbd>⌘</Kbd>
                  <Kbd>Z</Kbd>
                </KbdGroup>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Redo</span>
                <KbdGroup>
                  <Kbd>⌘</Kbd>
                  <Kbd>⇧</Kbd>
                  <Kbd>Z</Kbd>
                </KbdGroup>
              </div>
            </div>
          </div>
        </div>

    </div>
  );
}