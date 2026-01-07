"use client"; // Remove this line if you are not using Next.js

import * as React from "react";
import { useState, useMemo } from "react";
import { mdiAccountPlusOutline, mdiMagnify, mdiPlus } from "@mdi/js";
import { Icon } from "@/lib/icon";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// ============================================================================
// Types
// ============================================================================

/** Base user interface - extend this for custom user types */
export interface User {
  id: string;
  name: string;
  avatarUrl?: string;
  email?: string;
  [key: string]: unknown; // Allow additional properties
}

export interface CollaborationProps<T extends User = User> {
  /** Currently added users */
  users: T[];
  /** Current user (shown with "You" label) */
  currentUser?: T;
  /** Available users to add (shown in dialog) - can be managed externally for API support */
  availableUsers: T[];
  /** Maximum number of avatars to display in the stack */
  maxDisplayAvatars?: number;
  /** Callback when a user is added */
  onAddUser?: (user: T) => void;
  /** Callback when a user is removed */
  onRemoveUser?: (userId: string) => void;
  /** Allow removing the current user (default: false) */
  allowRemoveCurrentUser?: boolean;
  /** Custom empty state message */
  emptyStateMessage?: string;
  /** Title for the users section */
  title?: string;
  /** Custom class name */
  className?: string;
  
  // ============================================================================
  // API & Customization Props
  // ============================================================================
  
  /** Callback when search query changes - use for API-based search */
  onSearch?: (query: string) => void;
  /** Shows loading spinner in search results */
  isSearching?: boolean;
  /** Custom search placeholder text */
  searchPlaceholder?: string;
  /** Custom function to get user's display name */
  getDisplayName?: (user: T) => string;
  /** Custom function to get user's avatar URL */
  getAvatarUrl?: (user: T) => string | undefined;
  /** Custom function to get user's unique ID */
  getUserId?: (user: T) => string;
  /** Disable built-in client-side filtering (use when doing API search) */
  disableClientFilter?: boolean;
  /** Custom empty search results message */
  emptySearchMessage?: string;
  /** Custom "all users added" message */
  allUsersAddedMessage?: string;
  /** Custom "no users available" message */
  noUsersAvailableMessage?: string;
}

// ============================================================================
// Helper Components
// ============================================================================

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function AvatarStack({
  users,
  maxDisplay = 3,
  onOpenDialog,
}: {
  users: User[];
  maxDisplay?: number;
  onOpenDialog: () => void;
}) {
  const displayUsers = users.slice(0, maxDisplay);
  const remainingCount = Math.max(0, users.length - maxDisplay);

  return (
    <div className="flex items-center gap-1">
      {users.length > 0 && (
        <div className="flex -space-x-2">
          {displayUsers.map((user) => (
            <Avatar
              key={user.id}
              className="size-8 ring-0 border-2 border-white"
            >
              <AvatarImage src={user.avatarUrl} alt={user.name} />
              <AvatarFallback className="text-xs bg-muted">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
          ))}
          {remainingCount > 0 && (
            <div className="flex size-8 items-center justify-center rounded-full border-2 border-background bg-primary text-xs font-medium text-primary-foreground">
              +{remainingCount}
            </div>
          )}
          <Button 
          variant="default" 
          size="icon-sm" 
          onClick={onOpenDialog}
          className="group relative flex items-center justify-center rounded-full bg-primary-background text-primary-foreground transition-colors hover:bg-primary hover:text-white">
            <Icon path={mdiAccountPlusOutline} className="size-3" />
        </Button>
        </div>
      )}
      {/* <Button
        variant="ghost"
        size="icon-sm"
        onClick={onOpenDialog}
        className="text-primary hover:text-primary/80"
      >
        <Icon path={mdiAccountPlusOutline} className="size-5" />
      </Button> */}
    </div>
  );
}

function UserListItem({
  user,
  isCurrentUser = false,
  isAdded = false,
  onAdd,
  onRemove,
}: {
  user: User;
  isCurrentUser?: boolean;
  isAdded?: boolean;
  onAdd?: () => void;
  onRemove?: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="flex items-center justify-between py-2 px-1 rounded-md hover:bg-neutral-bg transition-colors"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center gap-3">
        <Avatar className="size-8 bor">
          <AvatarImage src={user.avatarUrl} alt={user.name} />
          <AvatarFallback className="text-xs bg-muted">
            {getInitials(user.name)}
          </AvatarFallback>
        </Avatar>
        <span className="text-sm font-medium">
          {user.name}
          {isCurrentUser && (
            <span className="text-muted-foreground"> (You)</span>
          )}
        </span>
      </div>
      {isAdded && isHovered && onRemove && (
        <Button
          variant="link"
          size="xs"
          colorScheme="primary"
          onClick={onRemove}
          className="h-auto py-0.5 px-2 no-underline hover:no-underline font-bold"
        >
          Remove
        </Button>
      )}
      {!isAdded && onAdd && (
        <Button
          variant="ghost"
          size="icon-xs"
          onClick={onAdd}
          className="text-muted-foreground hover:text-foreground"
        >
          <Icon path={mdiPlus} className="size-4" />
        </Button>
      )}
    </div>
  );
}

// ============================================================================
// Main Component
// ============================================================================

export function Collaboration<T extends User = User>({
  users,
  currentUser,
  availableUsers,
  maxDisplayAvatars = 3,
  onAddUser,
  onRemoveUser,
  allowRemoveCurrentUser = false,
  emptyStateMessage = "No users yet",
  title = "Users",
  className,
  // API & Customization Props
  onSearch,
  isSearching = false,
  searchPlaceholder = "Search",
  getDisplayName = (user: T) => user.name,
  getAvatarUrl = (user: T) => user.avatarUrl,
  getUserId = (user: T) => user.id,
  disableClientFilter = false,
  emptySearchMessage,
  allUsersAddedMessage = "All available users have been added",
  noUsersAvailableMessage = "No users available to add",
}: CollaborationProps<T>) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter out already added users from available users for the dialog
  const addedUserIds = useMemo(() => new Set(users.map((u) => getUserId(u as T))), [users, getUserId]);

  const filteredAvailableUsers = useMemo(() => {
    // First filter out already added users
    let filtered = availableUsers.filter((u) => !addedUserIds.has(getUserId(u)));
    
    // Apply client-side search filter only if not disabled (for API search)
    if (!disableClientFilter && searchQuery) {
      filtered = filtered.filter((u) => {
        const name = getDisplayName(u).toLowerCase();
        const email = (u.email || "").toLowerCase();
        const query = searchQuery.toLowerCase();
        return name.includes(query) || email.includes(query);
      });
    }
    
    return filtered;
  }, [availableUsers, addedUserIds, searchQuery, disableClientFilter, getDisplayName, getUserId]);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    // Call onSearch callback for API-based search
    onSearch?.(query);
  };

  const handleAddUser = (user: T) => {
    onAddUser?.(user);
  };

  const handleRemoveUser = (userId: string) => {
    onRemoveUser?.(userId);
  };

  const userCount = users.length;
  const isEmpty = userCount === 0;
  const hasAvailableUsers = filteredAvailableUsers.length > 0;

  return (
    <div className={`w-fit min-w-[368px] ${className ?? ""} `}>
      {/* Avatar stack - positioned outside the card */}
      <div className="flex justify-end mb-3 ">
        <AvatarStack
          users={users}
          maxDisplay={maxDisplayAvatars}
          onOpenDialog={() => setIsDialogOpen(true)}
        />
      </div>

      {/* Users Card */}
      <Card 
        style="outline" 
        padding="md" 
        className="inline-flex flex-col items-start gap-4 min-w-[368px] min-h-[167px] p-6"
      >
        <CardHeader className="pb-2 p-0 w-full">
          <CardTitle className="text-[18px] font-semibold leading-[1.2] flex items-baseline gap-1">
            <span>{title}</span>
            <span className="text-muted-foreground text-sm">{userCount}</span>
          </CardTitle>
        </CardHeader>

        <CardContent className="p-0 w-full">
          {/* User Details Section - shows added users */}
          {isEmpty ? (
            <div className="text-sm text-muted-foreground py-2">
              {emptyStateMessage}
            </div>
          ) : (
            <div className="space-y-1">
              {users.map((user) => {
                const userId = getUserId(user as T);
                const currentUserId = currentUser ? getUserId(currentUser as T) : undefined;
                const isCurrentUserItem = currentUserId === userId;
                const canRemove = !isCurrentUserItem || allowRemoveCurrentUser;
                return (
                  <UserListItem
                    key={userId}
                    user={user}
                    isCurrentUser={isCurrentUserItem}
                    isAdded={true}
                    onRemove={canRemove ? () => handleRemoveUser(userId) : undefined}
                  />
                );
              })}
            </div>
          )}

          {/* Add users button */}
          <Button
            variant="ghost"
            size="default"
            onClick={() => setIsDialogOpen(true)}
            className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground mt-2 px-4"
          >
            <Icon path={mdiAccountPlusOutline} className="size-4" />
            <span className=" font-semibold leading-[1.2]">Add users</span>
          </Button>
        </CardContent>
      </Card>

      {/* Dialog - only shows available users to add */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent
            size="sm"
            className="max-h-[80vh] overflow-hidden flex flex-col"
          >
            {/* Hidden DialogClose to suppress default close button */}
            <DialogClose className="hidden" />
            
            <DialogHeader className="pb-0">
              <DialogTitle className="text-base text-[18px] font-semibold pb-2">
                Add users
              </DialogTitle>
            </DialogHeader>

            {/* Search Input */}
            <div className="mb-3">
              <InputGroup>
                <InputGroupAddon>
                  <Icon path={mdiMagnify} size={0.9} />
                </InputGroupAddon>
                <InputGroupInput
                  type="text"
                  placeholder={searchPlaceholder}
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </InputGroup>
            </div>

            {/* Available Users List - only users not yet added */}
            <div className="space-y-1 max-h-64 overflow-y-auto">
              {/* Loading state for API search */}
              {isSearching && (
                <div className="text-sm text-muted-foreground py-4 text-center">
                  Searching...
                </div>
              )}
              
              {/* User list */}
              {!isSearching && filteredAvailableUsers.map((user) => (
                <UserListItem
                  key={getUserId(user)}
                  user={user}
                  isAdded={false}
                  onAdd={() => handleAddUser(user)}
                />
              ))}
              
              {/* Empty states */}
              {!isSearching && filteredAvailableUsers.length === 0 && searchQuery && (
                <div className="text-sm text-muted-foreground py-4 text-center">
                  {emptySearchMessage || `No users found matching "${searchQuery}"`}
                </div>
              )}
              {!isSearching && filteredAvailableUsers.length === 0 &&
                !searchQuery &&
                availableUsers.length > 0 && (
                  <div className="text-sm text-muted-foreground py-4 text-center">
                    {allUsersAddedMessage}
                  </div>
                )}
              {!isSearching && availableUsers.length === 0 && (
                <div className="text-sm text-muted-foreground py-4 text-center">
                  {noUsersAvailableMessage}
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
    </div>
  );
}

export default Collaboration;
