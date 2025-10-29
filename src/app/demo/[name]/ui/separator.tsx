import { Separator } from "@/components/ui/separator";

export const separator = {
  name: "separator",
  components: {
    Default: (
      <div>
        <div className="flex rounded-t-md bg-body-bg ">
          <div className="">
            <div className="flex flex-col gap-1">
              <div className="text-sm leading-none font-medium">
                Blok
              </div>
              <div className="text-muted-foreground text-sm">
                The Sitecore design system.
              </div>
            </div>
            <Separator className="my-4" />
            <div className="flex h-5 items-center gap-4 text-sm">
              <div>Blog</div>
              <Separator orientation="vertical" />
              <div>Docs</div>
              <Separator orientation="vertical" />
              <div>Source</div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
};
