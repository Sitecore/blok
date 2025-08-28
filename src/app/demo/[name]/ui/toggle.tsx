import { Toggle } from "@/components/ui/toggle";
import Icon from "@mdi/react";
import {
  mdiBookmark,
  mdiFormatBold,
  mdiFormatItalic,
  mdiFormatUnderline,
} from "@mdi/js";

export const toggle = {
  name: "toggle",
  components: {
    default: (
      <div className="flex flex-wrap items-center gap-6">
        <Toggle aria-label="Toggle bold">
          <Icon path={mdiFormatBold} size={0.8} />
        </Toggle>
        <Toggle aria-label="Toggle underline" variant="default">
          <Icon path={mdiFormatUnderline} size={0.8} />
        </Toggle>
        <Toggle aria-label="Toggle italic" variant="default" disabled>
          Disabled
        </Toggle>
        <Toggle variant="default" aria-label="Toggle italic">
          <Icon path={mdiFormatItalic} size={0.8} />
          Italic
        </Toggle>
        <Toggle
          aria-label="Toggle book"
          className="data-[state=on]:[&_svg]:fill-accent-foreground"
        >
          <Icon path={mdiBookmark} size={0.8} />
        </Toggle>
      </div>
    ),
    rounded: (
      <div className="flex flex-wrap items-center gap-6">
        <Toggle aria-label="Toggle bold" variant="rounded">
          <Icon path={mdiFormatBold} size={0.8} />
        </Toggle>
        <Toggle aria-label="Toggle underline" variant="rounded">
          <Icon path={mdiFormatUnderline} size={0.8} />
        </Toggle>
        <Toggle aria-label="Toggle italic" variant="rounded" disabled>
          Disabled
        </Toggle>
        <Toggle variant="rounded" aria-label="Toggle italic">
          <Icon path={mdiFormatItalic} size={0.8} />
          Italic
        </Toggle>
        <Toggle
          aria-label="Toggle book"
          variant="rounded"
          className="data-[state=on]:[&_svg]:fill-accent-foreground"
        >
          <Icon path={mdiBookmark} size={0.8} />
        </Toggle>
      </div>
    ),
  },
};
