import { Toggle } from "@/components/ui/toggle";
import { Icon } from "@/lib/icon";
import {
  mdiFormatBold,
  mdiFormatItalic,
  mdiViewColumnOutline,
  mdiViewListOutline,
  mdiViewModuleOutline,
} from "@mdi/js";

export default function ToggleCheckIconDemo() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-semibold">Text Toggles</h3>
        <div className="flex flex-wrap items-center gap-4">
          <Toggle>Grid view</Toggle>
          <Toggle defaultPressed>List view</Toggle>
          <Toggle>Board view</Toggle>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-semibold">Text Toggles with Left Icon</h3>
        <div className="flex flex-wrap items-center gap-4">
          <Toggle aria-label="Grid view">
            <Icon path={mdiViewModuleOutline} size={1.1} />
            Grid view
          </Toggle>
          <Toggle defaultPressed aria-label="List view">
            <Icon path={mdiViewListOutline} size={1.1} />
            List view
          </Toggle>
          <Toggle aria-label="Board view">
            <Icon path={mdiViewColumnOutline} size={1.1} />
            Board view
          </Toggle>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-semibold">Icon-Only Toggles</h3>
        <div className="flex flex-wrap items-center gap-4">
          <Toggle aria-label="Toggle bold">
            <Icon path={mdiFormatBold} size={1.1} />
          </Toggle>
          <Toggle defaultPressed aria-label="Toggle italic">
            <Icon path={mdiFormatItalic} size={1.1} />
          </Toggle>
        </div>
      </div>
    </div>
  );
}
