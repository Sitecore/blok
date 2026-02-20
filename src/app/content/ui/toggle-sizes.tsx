import { Toggle } from "@/components/ui/toggle";
import { Icon } from "@/lib/icon";
import { mdiFormatBold, mdiViewModuleOutline } from "@mdi/js";

export default function ToggleSizesDemo() {
  return (
    <div className="flex flex-col gap-4">
      {/* Icon-only toggles in descending order */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Toggle aria-label="Toggle bold" size="default">
          <Icon path={mdiFormatBold} size={1.1} />
        </Toggle>
        <Toggle aria-label="Toggle bold" size="sm">
          <Icon path={mdiFormatBold} size={1.1} />
        </Toggle>
        <Toggle aria-label="Toggle bold" size="xs">
          <Icon path={mdiFormatBold} size={1.1} />
        </Toggle>
      </div>

      {/* Text toggles in descending order */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Toggle size="default">Text Toggle</Toggle>
        <Toggle size="sm">Text Toggle</Toggle>
        <Toggle size="xs">Text Toggle</Toggle>
      </div>

      {/* Icon+text toggles in descending order */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Toggle aria-label="Grid view" size="default">
          <Icon path={mdiViewModuleOutline} size={1.1} />
          Grid view
        </Toggle>
        <Toggle aria-label="Grid view" size="sm">
          <Icon path={mdiViewModuleOutline} size={1.1} />
          Grid view
        </Toggle>
        <Toggle aria-label="Grid view" size="xs">
          <Icon path={mdiViewModuleOutline} size={1.1} />
          Grid view
        </Toggle>
      </div>
    </div>
  );
}
