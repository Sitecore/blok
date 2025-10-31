"use client";

import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreVertical,
  PinOff,
} from "lucide-react";

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

interface PinnedSiteCardProps<T extends SiteData> {
  site: T;
  isDisabled?: boolean;
  onUnpin?: (siteId: string) => void;
  showPinOverlay?: boolean;
  showDropdownMenu?: boolean;
  footerButtons?: FooterButton[];
  dropdownActions?: DropdownAction[];
}

export function SiteCard<T extends SiteData>({
  site,
  isDisabled = false,
  onUnpin,
  showPinOverlay = true,
  showDropdownMenu = true,
  footerButtons = [],
  dropdownActions = [],
}: PinnedSiteCardProps<T>) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleCardClick = (e: React.MouseEvent) => {
    if (!isDisabled) {
      console.log(
        `Navigate to /collection/${site.collectionId}/sites/${site.id}/overview`
      );
    }
  };

  const handleMenuClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // Filter dropdown actions based on show property
  const visibleDropdownActions = dropdownActions.filter(action => action.show !== false);

  return (
    <Card
      elevation="sm"
      style="outline"
      className={`group relative w-full cursor-pointer transition-all overflow-hidden p-0 gap-0 h-[226px] flex flex-col${
        isDisabled ? " opacity-40 pointer-events-none" : ""
      }`}
      onClick={handleCardClick}
    >
      <CardContent className={`p-0 flex-1 min-h-0 transition-all duration-200 ease-in-out ${
        site.collectionName ? 'group-hover:flex-[0.6]' : ''
      }`}>
        <div className="relative w-full h-full bg-muted">
        <img
          src={site.thumbnail.url}
          alt={site.name}
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='160'%3E%3Crect width='320' height='160' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23999' font-family='sans-serif' font-size='16'%3ENo Image%3C/text%3E%3C/svg%3E";
          }}
        />
      
        </div>
      </CardContent>
      <CardFooter className={`relative flex-col px-4 border-t overflow-hidden transition-[height,padding-top,padding-bottom,justify-content,gap] duration-200 ease-in-out ${
        isDropdownOpen 
          ? 'h-[102px] pt-3 pb-3 items-start justify-start gap-2' 
          : site.collectionName 
            ? 'h-[68px] pt-3 pb-3 items-start justify-center gap-0 group-hover:h-[102px] group-hover:justify-start group-hover:gap-2 group-hover:flex-[0.4]'
            : 'h-[68px] pt-3 pb-3 items-start justify-center gap-0 group-hover:h-[102px] group-hover:justify-start group-hover:gap-2'
      }`}>
        {/* Site Title */}
        <div className="w-full space-y-0.5">
          <h3 className="text-sm font-semibold truncate leading-tight" title={site.displayName || site.name}>
            {site.displayName || site.name}
          </h3>
          {site.collectionName && (
            <p className="text-xs text-muted-foreground truncate leading-tight" title={site.collectionName}>
              {site.collectionName}
            </p>
          )}
        </div>

        {/* Action Buttons - Slides up on hover */}
        <div 
          className={`flex items-center gap-2 w-full transition-opacity duration-150 ease-in-out ${
            isDropdownOpen 
              ? 'opacity-100 visible' 
              : 'opacity-0 invisible group-hover:opacity-100 group-hover:visible'
          }`}
          onClick={handleMenuClick}
        >
          {footerButtons.map((button, index) => (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              className="flex-1 justify-center gap-1.5 h-8"
              onClick={(e) => {
                e.stopPropagation();
                button.onClick();
              }}
            >
              {button.icon}
              <span className="text-xs">{button.label}</span>
            </Button>
          ))}
          
          {showDropdownMenu && visibleDropdownActions.length > 0 && (
            <DropdownMenu onOpenChange={setIsDropdownOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {visibleDropdownActions.map((action, index) => (
                  <DropdownMenuItem key={index} onClick={action.onClick}>
                    {action.icon}
                    <span>{action.label}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </CardFooter>

      {!isDisabled && onUnpin && showPinOverlay && (
        <div className="absolute top-1.5 right-1.5">
          <Button
            variant="outline"
            size="icon"
            className="opacity-0 group-hover:opacity-100 h-8 w-8 bg-card hover:bg-accent" 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onUnpin(site.id);
            }}
            title="Unpin site"
          >
            <PinOff size={10} strokeWidth={0.9} absoluteStrokeWidth />
          </Button>
        </div>
      )}
    </Card>
  );
}

