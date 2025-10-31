"use client";

import { SiteCard } from "@/components/ui/site-card";
import EmptyPin from "@/lib/empty-pin.svg";


const getSvgUrl = (svg: unknown): string => {
  if (typeof svg === "string") {
    return svg;
  }
  if (svg && typeof svg === "object") {
    const svgObj = svg as Record<string, unknown>;
    return (svgObj.src as string) || (svgObj.default as string) || String(svg);
  }
  return String(svg || "");
};

interface SiteData {
  id: string;
  name: string;
  displayName: string;
  collectionName?: string;
  thumbnail: {
    url: string;
  };
  permissions: {
    canRename?: boolean;
    canCreate?: boolean;
  };
  hosts: Array<{
    targetHostname?: string;
  }>;
  collectionId: string;
}

interface FooterButton {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

interface DropdownAction {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  show?: boolean;
}

interface PinnedSitesProps<T extends SiteData> {
  allSites?: T[];
  pinnedSiteIds?: string[];
  onUnpin?: (siteId: string) => void;
  getFooterButtons: (site: T) => FooterButton[];
  getDropdownActions?: (site: T) => DropdownAction[];
}

export function PinnedSitesSection<T extends SiteData>({
  allSites = [],
  pinnedSiteIds = [],
  onUnpin,
  getFooterButtons,
  getDropdownActions,
}: PinnedSitesProps<T>) {
  const pinnedSiteIdsSet = new Set(pinnedSiteIds);
  const pinnedSites = allSites.filter((site) => pinnedSiteIdsSet.has(site.id));

  return (
    <div className="w-full space-y-6">
      {/* Pinned Sites Section */}
      <section className="w-full bg-subtle-bg rounded-lg p-6">
        {/* Header */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Pinned Sites</h2>
        </div>

        {/* Horizontal scrollable container */}
        {pinnedSites.length > 0 ? (
          <div className="overflow-x-auto -mx-6 px-6">
            <div className="flex gap-4 pb-4">
              {pinnedSites.map((site) => (
                <div key={site.id} >
                  <SiteCard
                    site={site}
                    onUnpin={onUnpin}
                    showDropdownMenu={!!getDropdownActions}
                    footerButtons={getFooterButtons(site)}
                    dropdownActions={getDropdownActions?.(site) || []}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 px-6">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <img
                src={getSvgUrl(EmptyPin)}
                alt="Pin icon"
                width={80}
                height={80}
                className="object-contain"
              />
            </div>
            <h3 className="text-base font-semibold text-foreground mb-2">
              Keep what matters close
            </h3>
            <p className="text-sm text-muted-foreground text-center mb-4">
              Pin the sites you work on most to keep them front and center, making it easier to switch, manage, and stay productive
            </p>
            <button className="text-sm font-semibold text-primary hover:underline">
              Start pinning sites
            </button>
          </div>
        )}
      </section>
    </div>
  );
}