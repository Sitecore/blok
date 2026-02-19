import { Toggle } from "@/components/ui/toggle";
import { Icon } from "@/lib/icon";
import { mdiFormatBold, mdiFormatItalic } from "@mdi/js";

export default function ToggleVariantsDemo() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-semibold">Default Variant</h3>
        <div className="flex flex-wrap items-center gap-4">
          <Toggle aria-label="Toggle bold" variant="default">
            <Icon path={mdiFormatBold} size={1.1} />
          </Toggle>
          <Toggle variant="default">Text Toggle</Toggle>
          <Toggle variant="default" aria-label="Toggle italic">
            <Icon path={mdiFormatItalic} size={1.1} />
            Italic
          </Toggle>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-semibold">Outline Variant</h3>
        <div className="flex flex-wrap items-center gap-4">
          <Toggle aria-label="Toggle bold" variant="outline">
            <Icon path={mdiFormatBold} size={1.1} />
          </Toggle>
          <Toggle variant="outline">Text Toggle</Toggle>
          <Toggle variant="outline" aria-label="Toggle italic">
            <Icon path={mdiFormatItalic} size={1.1} />
            Italic
          </Toggle>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-semibold">Rounded Variant</h3>
        <div className="flex flex-wrap items-center gap-4">
          <Toggle aria-label="Toggle bold" variant="rounded">
            <Icon path={mdiFormatBold} size={1.1} />
          </Toggle>
          <Toggle variant="rounded">Text Toggle</Toggle>
        </div>
      </div>
    </div>
  );
}
