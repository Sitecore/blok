import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import Icon from "@mdi/react";
import { mdiFormatBold, mdiFormatItalic, mdiFormatUnderline } from "@mdi/js";

export const toggleGroup = {
  name: "toggle-group",
  components: {
    square: (
      <ToggleGroup
        type="multiple"
        variant="square"
        className="p-0.5 gap-0.5 border border-border-color bg-transparent"
      >
        <ToggleGroupItem value="bold" aria-label="Toggle bold" className="w-10">
          <Icon path={mdiFormatBold} size={0.8} />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="italic"
          aria-label="Toggle italic"
          className="w-10"
        >
          <Icon path={mdiFormatItalic} size={0.8} />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="strikethrough"
          aria-label="Toggle strikethrough"
          className="w-10"
        >
          <Icon path={mdiFormatUnderline} size={0.8} />
        </ToggleGroupItem>
      </ToggleGroup>
    ),
    rounded: (
      <ToggleGroup
        variant="rounded"
        type="single"
        defaultValue="all"
        className="p-0.5 gap-0.5 border border-border-color bg-transparent"
      >
        <ToggleGroupItem value="all" aria-label="Toggle all" className="w-20">
          All
        </ToggleGroupItem>
        <ToggleGroupItem
          value="missed"
          aria-label="Toggle missed"
          className="w-20"
        >
          Missed
        </ToggleGroupItem>
      </ToggleGroup>
    ),
  },
};
