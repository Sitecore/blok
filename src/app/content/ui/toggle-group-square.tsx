import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Icon } from "@/lib/icon";
import { mdiFormatBold, mdiFormatItalic, mdiFormatUnderline } from "@mdi/js";

export default function SquareToggleGroupDemo() {
  return (
    <div className="p-2">
      <ToggleGroup
        type="multiple"
        variant="square"
        className="p-0.5 gap-0.5 border border-border-color bg-transparent"
      >
        <ToggleGroupItem value="bold" aria-label="Toggle bold" className="w-10">
          <Icon path={mdiFormatBold} size={1.1} />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="italic"
          aria-label="Toggle italic"
          className="w-10"
        >
          <Icon path={mdiFormatItalic} size={1.1} />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="strikethrough"
          aria-label="Toggle strikethrough"
          className="w-10"
        >
          <Icon path={mdiFormatUnderline} size={1.1} />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
