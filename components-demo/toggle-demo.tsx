import { Toggle } from "@/components/ui/toggle";
import { Icon } from "@/lib/icon";
import {
  mdiBookmark,
  mdiFormatBold,
  mdiFormatItalic,
  mdiFormatUnderline,
  mdiViewModuleOutline,
} from "@mdi/js";

export function ToggleDemo() {
  return (
    <div>
      <h2 className="font-semibold text-4xl wrap-break-words">Toggle</h2>
      <div className="flex w-full max-w-full gap-4">

        {/* default Toggle */}
        <div id="toggle-default">
          <div className="flex flex-wrap items-center gap-6">
            <Toggle aria-label="Toggle bold" variant="square">
              <Icon path={mdiFormatBold} size={1.1} />
            </Toggle>
            <Toggle aria-label="Toggle underline" variant="square">
              <Icon path={mdiFormatUnderline} size={1.1} />
            </Toggle>
            <Toggle variant="square" disabled>
              Disabled
            </Toggle>
            <Toggle variant="square" aria-label="Toggle italic italic">
              <Icon path={mdiFormatItalic} size={1.1} />
              Italic
            </Toggle>
            <Toggle
              aria-label="Toggle book"
              variant="square"
              className="data-[state=on]:[&_svg]:fill-accent-foreground"
            >
              <Icon path={mdiBookmark} size={1.1} />
            </Toggle>
          </div>
        </div>

        {/* Size Toggle */}
        <div id="toggle-size">
          <div className="flex flex-col gap-4">
            {/* Icon-only toggles in descending order */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Toggle aria-label="Toggle bold" size="default">
                <Icon path={mdiFormatBold} />
              </Toggle>
              <Toggle aria-label="Toggle bold" size="sm">
                <Icon path={mdiFormatBold} />
              </Toggle>
              <Toggle aria-label="Toggle bold" size="xs">
                <Icon path={mdiFormatBold} />
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
                <Icon path={mdiViewModuleOutline} />
                Grid view
              </Toggle>
              <Toggle aria-label="Grid view" size="sm">
                <Icon path={mdiViewModuleOutline} />
                Grid view
              </Toggle>
              <Toggle aria-label="Grid view" size="xs">
                <Icon path={mdiViewModuleOutline} />
                Grid view
              </Toggle>
            </div>
          </div>
        </div>

        {/* Variant Toggle */}
        <div id="toggle-variant">
          <div className="flex flex-col gap-8">
            <div className="flex flex-wrap items-center gap-4">
              <Toggle aria-label="Toggle bold" variant="default">
                <Icon path={mdiFormatBold} />
              </Toggle>
              <Toggle variant="default">Text Toggle</Toggle>
              <Toggle variant="default" aria-label="Toggle italic">
                <Icon path={mdiFormatItalic} />
                Italic
              </Toggle>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Toggle aria-label="Toggle bold" variant="outline">
                <Icon path={mdiFormatBold} />
              </Toggle>
              <Toggle variant="outline">Text Toggle</Toggle>
              <Toggle variant="outline" aria-label="Toggle italic">
                <Icon path={mdiFormatItalic} />
                Italic
              </Toggle>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Toggle aria-label="Toggle bold" variant="rounded">
                <Icon path={mdiFormatBold} />
              </Toggle>
              <Toggle variant="rounded">Text Toggle</Toggle>
              <Toggle variant="rounded" aria-label="Toggle italic">
                <Icon path={mdiFormatItalic} />
                Italic
              </Toggle>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}