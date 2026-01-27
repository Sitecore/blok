import { Kbd, KbdGroup } from "@/components/ui/kbd";

export default function KbdDemo() {
  return (
    <div className="flex flex-col items-center gap-4 py-8 min-w-[300px]">
      <KbdGroup className="gap-2">
        <Kbd className="h-8 min-w-8 text-base bg-white dark:bg-gray-800 border rounded-md">
          ⌘
        </Kbd>
        <Kbd className="h-8 min-w-8 text-base bg-white dark:bg-gray-800 border rounded-md">
          ⇧
        </Kbd>
        <Kbd className="h-8 min-w-8 text-base bg-white dark:bg-gray-800 border rounded-md">
          ⌥
        </Kbd>
        <Kbd className="h-8 min-w-8 text-base bg-white dark:bg-gray-800 border rounded-md">
          ⌃
        </Kbd>
      </KbdGroup>
      <KbdGroup className="gap-2">
        <Kbd className="h-8 px-2 text-base bg-white dark:bg-gray-800 border rounded-md">
          Ctrl
        </Kbd>
        <span className="text-lg">+</span>
        <Kbd className="h-8 min-w-8 text-base bg-white dark:bg-gray-800 border rounded-md">
          B
        </Kbd>
      </KbdGroup>
    </div>
  );
}
