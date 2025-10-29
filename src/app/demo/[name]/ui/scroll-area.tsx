import * as React from "react";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export const works = [
  {
    artist: "Ornella Binni",
    art: "https://delivery-sitecore.sitecorecontenthub.cloud/api/public/content/235496330fe148edb446ee62d1d54d56?v=4a57ed46",
  },
  {
    artist: "Tom Byrom",
    art: "https://delivery-sitecore.sitecorecontenthub.cloud/api/public/content/6712f89819cc43f98ba707b516191919?v=b56e5265",
  },
  {
    artist: "Vladimir Malyav",
    art: "https://delivery-sitecore.sitecorecontenthub.cloud/api/public/content/0dff752591c943569243ed310d5237ca?v=cca386af",
  },
] as const;

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
);

export const scrollArea = {
  name: "scrollarea",
  components: {
    ScrollAreaVertical: (
      <div className="flex flex-col gap-6">
        <ScrollArea className="h-72 w-48 rounded-md border">
          <div className="p-4">
            <h4 className="mb-4 text-sm leading-none font-medium">Tags</h4>
            {tags.map((tag) => (
              <React.Fragment key={tag}>
                <div className="text-sm">{tag}</div>
                <Separator className="my-2" />
              </React.Fragment>
            ))}
          </div>
        </ScrollArea>
      </div>
    ),
    ScrollAreaHorizontal: (
      <ScrollArea className="w-full max-w-96 rounded-md border p-4">
        <div className="flex gap-4">
          {works.map((artwork) => (
            <figure key={artwork.artist} className="shrink-0">
              <div className="overflow-hidden rounded-md">
                <img
                  src={artwork.art}
                  alt={`Photo by ${artwork.artist}`}
                  className="aspect-[3/4] w-[300px] h-[400px] object-cover"
                />
              </div>
            </figure>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    ),
  },
};
