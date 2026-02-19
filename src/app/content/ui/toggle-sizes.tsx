import { Toggle } from "@/components/ui/toggle";
import { Icon } from "@/lib/icon";
import { mdiFormatBold, mdiFormatItalic } from "@mdi/js";

export default function ToggleSizesDemo() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-semibold">Default Size</h3>
        <div className="flex flex-wrap items-center gap-4">
          <Toggle aria-label="Toggle bold" size="default">
            <Icon path={mdiFormatBold} size={1.1} />
          </Toggle>
          <Toggle size="default">Text Toggle</Toggle>
          <Toggle size="default" aria-label="Toggle italic">
            <Icon path={mdiFormatItalic} size={1.1} />
            Italic
          </Toggle>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-semibold">Small Size</h3>
        <div className="flex flex-wrap items-center gap-4">
          <Toggle aria-label="Toggle bold" size="sm">
            <Icon path={mdiFormatBold} size={1.1} />
          </Toggle>
          <Toggle size="sm">Text Toggle</Toggle>
          <Toggle size="sm" aria-label="Toggle italic">
            <Icon path={mdiFormatItalic} size={1.1} />
            Italic
          </Toggle>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-semibold">Extra Small Size</h3>
        <div className="flex flex-wrap items-center gap-4">
          <Toggle aria-label="Toggle bold" size="xs">
            <Icon path={mdiFormatBold} size={1.1} />
          </Toggle>
          <Toggle size="xs">Text Toggle</Toggle>
          <Toggle size="xs" aria-label="Toggle italic">
            <Icon path={mdiFormatItalic} size={1.1} />
            Italic
          </Toggle>
        </div>
      </div>
    </div>
  );
}
