import { Toggle } from "@/components/ui/toggle";
import { Icon } from "@/lib/icon";
import { mdiFormatBold, mdiFormatItalic } from "@mdi/js";

export default function ToggleVariantsDemo() {
  return (
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
  );
}
