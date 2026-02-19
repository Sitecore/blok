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

export default function ToggleGroupSizesDemo() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-semibold">Default Size</h3>
        <div className="flex flex-col gap-4">
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
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-semibold">Small Size</h3>
        <div className="flex flex-col gap-4">
          <ToggleGroup
            type="multiple"
            size="sm"
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
            type="single"
            size="sm"
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
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-semibold">Extra Small Size</h3>
        <div className="flex flex-col gap-4">
          <ToggleGroup
            type="multiple"
            size="xs"
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
            type="single"
            size="xs"
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
        </div>
      </div>
    </div>
  );
}
