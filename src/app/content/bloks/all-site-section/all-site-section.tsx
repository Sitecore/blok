"use client";

import {
  type SiteFavoritesResponse,
  initialPinnedSiteIds,
  mockAllSites,
} from "@/app/content/bloks/shared/site-mock-data";
import { AllSitesSection } from "@/components/bloks/all-sites-section";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Copy,
  Edit,
  FileEdit,
  LayoutGrid,
  Pin,
  PinOff,
  Settings,
} from "lucide-react";
import { useCallback, useState } from "react";

export default function AllSitesSectionDemo() {
  const [pinnedSiteIds, setPinnedSiteIds] =
    useState<string[]>(initialPinnedSiteIds);

  // Dialog states
  const [renameDialogOpen, setRenameDialogOpen] = useState(false);
  const [duplicateDialogOpen, setDuplicateDialogOpen] = useState(false);
  const [currentSiteId, setCurrentSiteId] = useState<string>("");
  const [newSiteName, setNewSiteName] = useState("");
  const [duplicateSiteName, setDuplicateSiteName] = useState("");

  const handlePin = useCallback((siteId: string) => {
    setPinnedSiteIds((prev) => [...prev, siteId]);

    // TODO: Add your API call here to persist to database
    // Example:
    // await fetch('/api/pinned-sites', {
    //   method: 'POST',
    //   body: JSON.stringify({ siteId }),
    // });

    console.log(`Pinned site: ${siteId}`);
  }, []);

  const handleUnpin = useCallback((siteId: string) => {
    setPinnedSiteIds((prev) => prev.filter((id) => id !== siteId));

    // TODO: Add your API call here to remove from database
    // Example:
    // await fetch(`/api/pinned-sites/${siteId}`, {
    //   method: 'DELETE',
    // });

    console.log(`Unpinned site: ${siteId}`);
  }, []);

  // Handlers for page builder action
  const handlePageBuilder = useCallback((site: SiteFavoritesResponse) => {
    console.log(
      `Opening page builder for site: ${site.displayName} (${site.id})`,
    );

    // TODO: Add your navigation logic here
    // Example with Next.js router:
    // router.push(`/collection/${site.collectionId}/sites/${site.id}/page-builder`);

    // Or with window.location:
    // window.location.href = `/collection/${site.collectionId}/sites/${site.id}/page-builder`;
  }, []);

  // Handlers for dashboard action
  const handleDashboard = useCallback((site: SiteFavoritesResponse) => {
    console.log(`Opening dashboard for site: ${site.displayName} (${site.id})`);

    // TODO: Add your navigation logic here
    // Example with Next.js router:
    // router.push(`/collection/${site.collectionId}/sites/${site.id}/dashboard`);
  }, []);

  // Handlers for settings action
  const handleSettings = useCallback((site: SiteFavoritesResponse) => {
    console.log(`Opening settings for site: ${site.displayName} (${site.id})`);

    // TODO: Add your navigation logic here
    // Example with Next.js router:
    // router.push(`/collection/${site.collectionId}/sites/${site.id}/settings`);
  }, []);

  // Handlers for rename action
  const handleRename = useCallback((siteId: string, currentName: string) => {
    setCurrentSiteId(siteId);
    setNewSiteName(currentName);
    setRenameDialogOpen(true);
  }, []);

  const handleRenameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Renaming site ${currentSiteId} to: ${newSiteName}`);

    // TODO: Add your API call here
    // await fetch(`/api/sites/${currentSiteId}`, {
    //   method: 'PATCH',
    //   body: JSON.stringify({ displayName: newSiteName }),
    // });

    setRenameDialogOpen(false);
  };

  // Handlers for duplicate action
  const handleDuplicate = useCallback(
    (siteId: string, suggestedName: string) => {
      setCurrentSiteId(siteId);
      setDuplicateSiteName(suggestedName);
      setDuplicateDialogOpen(true);
    },
    [],
  );

  const handleDuplicateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Duplicating site ${currentSiteId} as: ${duplicateSiteName}`);

    // TODO: Add your API call here
    // await fetch(`/api/sites/${currentSiteId}/duplicate`, {
    //   method: 'POST',
    //   body: JSON.stringify({ displayName: duplicateSiteName }),
    // });

    setDuplicateDialogOpen(false);
  };

  // Footer buttons factory
  const getFooterButtons = useCallback(
    (site: SiteFavoritesResponse) => [
      {
        icon: <FileEdit className="h-3.5 w-3.5" />,
        label: "Page builder",
        onClick: () => handlePageBuilder(site),
      },
      {
        icon: <LayoutGrid className="h-3.5 w-3.5" />,
        label: "Dashboard",
        onClick: () => handleDashboard(site),
      },
    ],
    [handlePageBuilder, handleDashboard],
  );

  // Dropdown actions factory
  const getDropdownActions = useCallback(
    (site: SiteFavoritesResponse, isPinned: boolean) => [
      {
        icon: <Settings className="mr-2 h-4 w-4" />,
        label: "Settings",
        onClick: () => handleSettings(site),
        show: true,
      },
      {
        icon: isPinned ? (
          <PinOff className="mr-2 h-4 w-4" />
        ) : (
          <Pin className="mr-2 h-4 w-4" />
        ),
        label: isPinned ? "Unpin Site" : "Pin Site",
        onClick: () => (isPinned ? handleUnpin(site.id) : handlePin(site.id)),
        show: true,
      },
      {
        icon: <Edit className="mr-2 h-4 w-4" />,
        label: "Rename",
        onClick: () => handleRename(site.id, site.displayName || site.name),
        show: site.permissions.canRename,
      },
      {
        icon: <Copy className="mr-2 h-4 w-4" />,
        label: "Duplicate",
        onClick: () =>
          handleDuplicate(site.id, `${site.displayName || site.name} (Copy)`),
        show: site.permissions.canCreate,
      },
    ],
    [handleSettings, handlePin, handleUnpin, handleRename, handleDuplicate],
  );

  return (
    <>
      <AllSitesSection
        allSites={mockAllSites}
        pinnedSiteIds={pinnedSiteIds}
        getFooterButtons={getFooterButtons}
        getDropdownActions={getDropdownActions}
      />

      {/* Rename Dialog */}
      <Dialog open={renameDialogOpen} onOpenChange={setRenameDialogOpen}>
        <DialogContent>
          <form onSubmit={handleRenameSubmit}>
            <DialogHeader>
              <DialogTitle>Rename Site</DialogTitle>
              <DialogDescription>
                Enter a new name for your site. This will update the display
                name.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-3">
                <Label htmlFor="site-name">Site Name</Label>
                <Input
                  id="site-name"
                  name="siteName"
                  value={newSiteName}
                  onChange={(e) => setNewSiteName(e.target.value)}
                  placeholder="Enter site name"
                  autoComplete="off"
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="ghost" colorScheme="neutral">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">Rename</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Duplicate Dialog */}
      <Dialog open={duplicateDialogOpen} onOpenChange={setDuplicateDialogOpen}>
        <DialogContent>
          <form onSubmit={handleDuplicateSubmit}>
            <DialogHeader>
              <DialogTitle>Duplicate Site</DialogTitle>
              <DialogDescription>
                Create a copy of this site with a new name. All content and
                settings will be duplicated.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-3">
                <Label htmlFor="duplicate-name">New Site Name</Label>
                <Input
                  id="duplicate-name"
                  name="newSiteName"
                  value={duplicateSiteName}
                  onChange={(e) => setDuplicateSiteName(e.target.value)}
                  placeholder="Enter new site name"
                  autoComplete="off"
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="ghost" colorScheme="neutral">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">Duplicate</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
