"use client";

import { SiteCard } from "@/components/ui/site-card";

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

interface AllSitesProps<T extends SiteData> {
  allSites?: T[];
  pinnedSiteIds?: string[];
  getFooterButtons: (site: T) => FooterButton[];
  getDropdownActions?: (site: T, isPinned: boolean) => DropdownAction[];
}

export function AllSitesSection<T extends SiteData>({ 
  allSites = [],
  pinnedSiteIds = [],
  getFooterButtons,
  getDropdownActions,
}: AllSitesProps<T>) {
  const pinnedSiteIdsSet = new Set(pinnedSiteIds);

  return (
    <div className="w-full space-y-6">
      {/* All Sites Section */}
      <section className="w-full bg-subtle-bg rounded-lg p-6">
        <div className="mb-4">
          <h2 className="text-lg font-semibold">All Sites</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Browse all available sites and pin your favorites for quick access
          </p>
        </div>

        {/* Grid layout for all sites */}
        <div className="grid grid-cols-3 xl:grid-cols-4 gap-4">
          {allSites.map((site) => {
            const isPinned = pinnedSiteIdsSet.has(site.id);

            return (
              <div key={site.id}>
                <SiteCard
                  site={site}
                  showPinOverlay={false}
                  footerButtons={getFooterButtons(site)}
                  dropdownActions={getDropdownActions?.(site, isPinned) || []}
                />
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}