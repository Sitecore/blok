import { Kbd, KbdGroup } from "@/components/ui/kbd";

export default function KbdGroupDemo() {
  return (
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
  );
}
