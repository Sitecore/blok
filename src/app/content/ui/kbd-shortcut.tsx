import { Kbd, KbdGroup } from "@/components/ui/kbd";

export default function KbdShortcutDemo() {
    return (
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
    )
}