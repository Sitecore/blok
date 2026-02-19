import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Icon } from "@/lib/icon";
import {
  mdiViewColumnOutline,
  mdiViewListOutline,
  mdiViewModuleOutline,
} from "@mdi/js";

export default function ToggleOutlineGroupDemo() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-semibold">Outline Variant</h3>
        <div className="flex flex-wrap items-center gap-4">
          <Toggle variant="outline" aria-label="Grid view">
            <Icon path={mdiViewModuleOutline} size={1.1} />
            Grid view
          </Toggle>
          <Toggle variant="outline" defaultPressed aria-label="List view">
            <Icon path={mdiViewListOutline} size={1.1} />
            List view
          </Toggle>
          <Toggle variant="outline" aria-label="Board view">
            <Icon path={mdiViewColumnOutline} size={1.1} />
            Board view
          </Toggle>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-semibold">Toggle Group</h3>
        <div className="flex flex-col gap-4">
          <ToggleGroup
            type="single"
            variant="outline"
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
