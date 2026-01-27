import { Toggle } from "@/components/ui/toggle";
import { Icon } from "@/lib/icon";
import {
  mdiBookmark,
  mdiFormatBold,
  mdiFormatItalic,
  mdiFormatUnderline,
} from "@mdi/js";

export default function RoundedToggleDemo() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <Toggle aria-label="Toggle bold" variant="rounded">
        <Icon path={mdiFormatBold} size={1.1} />
      </Toggle>
      <Toggle aria-label="Toggle underline" variant="rounded">
        <Icon path={mdiFormatUnderline} size={1.1} />
      </Toggle>
      <Toggle variant="rounded" disabled>
        Disabled
      </Toggle>
      <Toggle variant="rounded" aria-label="Toggle italic italic">
        <Icon path={mdiFormatItalic} size={1.1} />
        Italic
      </Toggle>
      <Toggle
        aria-label="Toggle book"
        variant="rounded"
        className="data-[state=on]:[&_svg]:fill-accent-foreground"
      >
        <Icon path={mdiBookmark} size={1.1} />
      </Toggle>
    </div>
  );
}
