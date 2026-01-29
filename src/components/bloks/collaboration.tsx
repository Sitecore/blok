"use client"; // Remove this line if you are not using Next.js

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Icon } from "@/lib/icon";
import { mdiAccountPlusOutline, mdiClose, mdiMagnify, mdiPlus } from "@mdi/js";
import type * as React from "react";
import { useMemo, useState } from "react";

// Types

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

  // API & Customization Props

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

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

/** Avatar trigger that opens the popover - shows user avatars + add button */
function AvatarTrigger({
  users,
  maxDisplay = 3,
}: {
  users: User[];
  maxDisplay?: number;
}) {
  const displayUsers = users.slice(0, maxDisplay);
  const remainingCount = Math.max(0, users.length - maxDisplay);
  const hasOverflow = remainingCount > 0;

  return (
    <div className="flex items-center -space-x-2 cursor-pointer">
      {users.length > 0 &&
        displayUsers.map((user) => (
          <Avatar key={user.id} className="size-8 ring-0 border-2 border-white">
            <AvatarImage src={user.avatarUrl} alt={user.name} />
            <AvatarFallback className="text-xs bg-muted">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
        ))}
      {/* Show +n count when overflow, otherwise show add user icon */}
      {hasOverflow ? (
        <div className="flex size-8 items-center justify-center rounded-full bg-primary-background text-primary-foreground border-2 border-white transition-colors hover:bg-primary hover:text-white">
          <span className="text-xs font-medium">+{remainingCount}</span>
        </div>
      ) : (
        <div className="flex size-8 items-center justify-center rounded-full bg-primary-background text-primary-foreground transition-colors hover:bg-primary hover:text-white border-2 border-white">
          <Icon path={mdiAccountPlusOutline} className="size-4" />
        </div>
      )}
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
        <Avatar className="size-8">
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

// Main Component

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getAvatarUrl: _getAvatarUrl = (user: T) => user.avatarUrl,
  getUserId = (user: T) => user.id,
  disableClientFilter = false,
  emptySearchMessage,
  allUsersAddedMessage = "All available users have been added",
  noUsersAvailableMessage = "No users available to add",
}: CollaborationProps<T>) {
  const [isUsersOpen, setIsUsersOpen] = useState(false);
  const [isAddUsersOpen, setIsAddUsersOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter out already added users from available users
  const addedUserIds = useMemo(
    () => new Set(users.map((u) => getUserId(u as T))),
    [users, getUserId],
  );

  const filteredAvailableUsers = useMemo(() => {
    let filtered = availableUsers.filter(
      (u) => !addedUserIds.has(getUserId(u)),
    );

    if (!disableClientFilter && searchQuery) {
      filtered = filtered.filter((u) => {
        const name = getDisplayName(u).toLowerCase();
        const email = (u.email || "").toLowerCase();
        const query = searchQuery.toLowerCase();
        return name.includes(query) || email.includes(query);
      });
    }

    return filtered;
  }, [
    availableUsers,
    addedUserIds,
    searchQuery,
    disableClientFilter,
    getDisplayName,
    getUserId,
  ]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch?.(query);
  };

  const handleAddUser = (user: T) => {
    onAddUser?.(user);
  };

  const handleRemoveUser = (userId: string) => {
    onRemoveUser?.(userId);
  };

  const handleUsersOpenChange = (open: boolean) => {
    setIsUsersOpen(open);
    if (!open) {
      // Close add users popover when users popover closes
      setIsAddUsersOpen(false);
      setSearchQuery("");
    }
  };

  const handleAddUsersOpenChange = (open: boolean) => {
    setIsAddUsersOpen(open);
    if (!open) {
      setSearchQuery("");
    }
  };

  const userCount = users.length;
  const isEmpty = userCount === 0;

  return (
    <div className={`w-fit ${className ?? ""}`}>
      {/* First Popover: Avatar -> Users Card */}
      <Popover open={isUsersOpen} onOpenChange={handleUsersOpenChange}>
        <PopoverTrigger asChild>
          <button className="focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full">
            <AvatarTrigger users={users} maxDisplay={maxDisplayAvatars} />
          </button>
        </PopoverTrigger>

        <PopoverContent
          align="end"
          sideOffset={8}
          className="w-[368px] p-0 border-0 bg-transparent shadow-none"
        >
          {/* Users Panel */}
          <Card style="outline" padding="md" elevation="md" className="gap-0">
            <div className="pb-2">
              <div className="text-[18px] font-semibold leading-[1.2] flex items-baseline gap-1">
                <span>{title}</span>
                <span className="text-muted-foreground text-sm">
                  {userCount}
                </span>
              </div>
            </div>

            <div className="pb-2">
              {isEmpty ? (
                <div className="text-sm text-muted-foreground py-2">
                  {emptyStateMessage}
                </div>
              ) : (
                <div className="space-y-1 max-h-48 overflow-y-auto">
                  {users.map((user) => {
                    const userId = getUserId(user as T);
                    const currentUserId = currentUser
                      ? getUserId(currentUser as T)
                      : undefined;
                    const isCurrentUserItem = currentUserId === userId;
                    const canRemove =
                      !isCurrentUserItem || allowRemoveCurrentUser;
                    return (
                      <UserListItem
                        key={userId}
                        user={user}
                        isCurrentUser={isCurrentUserItem}
                        isAdded={true}
                        onRemove={
                          canRemove ? () => handleRemoveUser(userId) : undefined
                        }
                      />
                    );
                  })}
                </div>
              )}

              {/* Second Popover: Add users button -> Add Users Card */}
              <Popover
                open={isAddUsersOpen}
                onOpenChange={handleAddUsersOpenChange}
              >
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    size="default"
                    className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground mt-2 px-1"
                  >
                    <Icon path={mdiAccountPlusOutline} className="size-4" />
                    <span className="font-semibold leading-[1.2]">
                      Add users
                    </span>
                  </Button>
                </PopoverTrigger>

                <PopoverContent
                  side="bottom"
                  align="center"
                  sideOffset={-8}
                  alignOffset={26}
                  className="w-[420px] p-0 border-0 bg-transparent shadow-none"
                >
                  {/* Add Users Panel */}
                  <Card
                    style="outline"
                    padding="md"
                    elevation="md"
                    className="gap-0"
                  >
                    <div className="pb-2">
                      <div className="flex items-center justify-between">
                        <div className="text-[18px] font-semibold leading-[1.2]">
                          Add users
                        </div>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => setIsAddUsersOpen(false)}
                          className="text-muted-foreground hover:text-foreground -mr-1"
                        >
                          <Icon path={mdiClose} className="size-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="pb-2">
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
                            autoFocus
                          />
                        </InputGroup>
                      </div>

                      <div className="space-y-1 max-h-48 overflow-y-auto">
                        {isSearching && (
                          <div className="text-sm text-muted-foreground py-4 text-center">
                            Searching...
                          </div>
                        )}

                        {!isSearching &&
                          filteredAvailableUsers.map((user) => (
                            <UserListItem
                              key={getUserId(user)}
                              user={user}
                              isAdded={false}
                              onAdd={() => handleAddUser(user)}
                            />
                          ))}

                        {!isSearching &&
                          filteredAvailableUsers.length === 0 &&
                          searchQuery && (
                            <div className="text-sm text-muted-foreground py-4 text-center">
                              {emptySearchMessage ||
                                `No users found matching "${searchQuery}"`}
                            </div>
                          )}
                        {!isSearching &&
                          filteredAvailableUsers.length === 0 &&
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
                    </div>
                  </Card>
                </PopoverContent>
              </Popover>
            </div>
          </Card>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default Collaboration;
