import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Icon } from "@/lib/icon";
import {
  mdiFormatBold,
  mdiFormatItalic,
  mdiFormatUnderline,
  mdiViewColumnOutline,
  mdiViewListOutline,
  mdiViewModuleOutline,
} from "@mdi/js";

export function ToggleGroupDemo() {
  return (
    <div>
      <h2 className="font-semibold text-4xl wrap-break-words">Toggle Group</h2>
      <div className="flex w-full max-w-full gap-4">
        {/* Square Toggle Group */}
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

          {/* Rounded Toggle Group */}
        <div>
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
        </div>

        {/* Sizes Toggle Group */}
        <div id="toggle-group-sizes">
          <div className="flex flex-col gap-4">
            {/* Icon-only toggle groups in descending order */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <ToggleGroup
                type="multiple"
                size="default"
                variant="default"
                className="p-0.5 gap-0.5 border border-border-color bg-transparent"
              >
                <ToggleGroupItem
                  value="bold"
                  aria-label="Toggle bold"
                  className="w-10"
                >
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
                  value="underline"
                  aria-label="Toggle underline"
                  className="w-10"
                >
                  <Icon path={mdiFormatUnderline} size={1.1} />
                </ToggleGroupItem>
              </ToggleGroup>
              <ToggleGroup
                type="multiple"
                size="sm"
                variant="default"
                className="p-0.5 gap-0.5 border border-border-color bg-transparent"
              >
                <ToggleGroupItem
                  value="bold-sm"
                  aria-label="Toggle bold"
                  className="w-10"
                >
                  <Icon path={mdiFormatBold} size={1.1} />
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="italic-sm"
                  aria-label="Toggle italic"
                  className="w-10"
                >
                  <Icon path={mdiFormatItalic} size={1.1} />
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="underline-sm"
                  aria-label="Toggle underline"
                  className="w-10"
                >
                  <Icon path={mdiFormatUnderline} size={1.1} />
                </ToggleGroupItem>
              </ToggleGroup>
              <ToggleGroup
                type="multiple"
                size="xs"
                variant="default"
                className="p-0.5 gap-0.5 border border-border-color bg-transparent"
              >
                <ToggleGroupItem
                  value="bold-xs"
                  aria-label="Toggle bold"
                  className="w-10"
                >
                  <Icon path={mdiFormatBold} size={1.1} />
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="italic-xs"
                  aria-label="Toggle italic"
                  className="w-10"
                >
                  <Icon path={mdiFormatItalic} size={1.1} />
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="underline-xs"
                  aria-label="Toggle underline"
                  className="w-10"
                >
                  <Icon path={mdiFormatUnderline} size={1.1} />
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
            {/* Text toggle groups in descending order */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <ToggleGroup
                type="single"
                size="default"
                variant="default"
                defaultValue="list"
                className="p-0.5 gap-0.5 border border-border-color bg-transparent"
              >
                <ToggleGroupItem value="grid" aria-label="Grid view">
                  <Icon path={mdiViewModuleOutline} size={1.1} />
                  Grid view
                </ToggleGroupItem>
                <ToggleGroupItem value="list" aria-label="List view">
                  <Icon path={mdiViewListOutline} size={1.1} />
                  List view
                </ToggleGroupItem>
                <ToggleGroupItem value="board" aria-label="Board view">
                  <Icon path={mdiViewColumnOutline} size={1.1} />
                  Board view
                </ToggleGroupItem>
              </ToggleGroup>
              <ToggleGroup
                type="single"
                size="sm"
                variant="default"
                defaultValue="list-sm"
                className="p-0.5 gap-0.5 border border-border-color bg-transparent"
              >
                <ToggleGroupItem value="grid-sm" aria-label="Grid view">
                  <Icon path={mdiViewModuleOutline} size={1.1} />
                  Grid view
                </ToggleGroupItem>
                <ToggleGroupItem value="list-sm" aria-label="List view">
                  <Icon path={mdiViewListOutline} size={1.1} />
                  List view
                </ToggleGroupItem>
                <ToggleGroupItem value="board-sm" aria-label="Board view">
                  <Icon path={mdiViewColumnOutline} size={1.1} />
                  Board view
                </ToggleGroupItem>
              </ToggleGroup>
              <ToggleGroup
                type="single"
                size="xs"
                variant="default"
                defaultValue="list-xs"
                className="p-0.5 gap-0.5 border border-border-color bg-transparent"
              >
                <ToggleGroupItem value="grid-xs" aria-label="Grid view">
                  <Icon path={mdiViewModuleOutline} size={1.1} />
                  Grid view
                </ToggleGroupItem>
                <ToggleGroupItem value="list-xs" aria-label="List view">
                  <Icon path={mdiViewListOutline} size={1.1} />
                  List view
                </ToggleGroupItem>
                <ToggleGroupItem value="board-xs" aria-label="Board view">
                  <Icon path={mdiViewColumnOutline} size={1.1} />
                  Board view
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}