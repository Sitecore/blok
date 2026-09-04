"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  FilterMultiSelect,
  type FilterOption,
  FilterSingleSelect,
} from "@/components/ui/filter";
import { useCallback, useMemo, useState } from "react";

const FIRST_NAMES = [
  "Aaron",
  "Amelia",
  "Benjamin",
  "Chloe",
  "Daniel",
  "Elena",
  "Farah",
  "Gabriel",
  "Hannah",
  "Isaac",
  "Jasmine",
  "Kai",
  "Lena",
  "Marcus",
  "Nina",
  "Omar",
  "Priya",
  "Quinn",
  "Ravi",
  "Sofia",
];

const LAST_NAMES = [
  "Mousavi",
  "Puah",
  "Bennett",
  "Chen",
  "Das",
  "Ellis",
  "Foster",
  "Garcia",
  "Hughes",
  "Ibrahim",
  "Johansson",
  "Khan",
  "Lopez",
  "Moreau",
  "Nguyen",
  "Owens",
  "Patel",
  "Reyes",
  "Singh",
  "Tanaka",
];

const ALL_USERS: FilterOption[] = Array.from({ length: 197 }, (_, index) => {
  const firstName = FIRST_NAMES[index % FIRST_NAMES.length];
  const lastName =
    LAST_NAMES[
      (index + Math.floor(index / FIRST_NAMES.length)) % LAST_NAMES.length
    ];
  const suffix =
    index >= FIRST_NAMES.length * LAST_NAMES.length ? ` ${index}` : "";
  return {
    value: `user-${index + 1}`,
    label: `${firstName} ${lastName}${suffix}`,
  };
});

const PAGE_SIZE = 20;

function getInitials(label: string) {
  return label
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function renderOptionWithAvatar(option: FilterOption) {
  return (
    <span className="flex items-center gap-2 min-w-0">
      <Avatar className="size-6 shrink-0 rounded-full bg-teal-600">
        <AvatarFallback className="rounded-full bg-teal-600 text-white text-xs font-medium">
          {getInitials(option.label)}
        </AvatarFallback>
      </Avatar>
      <span className="truncate">{option.label}</span>
    </span>
  );
}

function usePagedUsers() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return ALL_USERS;
    return ALL_USERS.filter((user) => user.label.toLowerCase().includes(query));
  }, [search]);

  const options = filteredUsers.slice(0, page * PAGE_SIZE);

  const handleSearchChange = useCallback((query: string) => {
    setSearch(query);
    setPage(1);
  }, []);

  const handleLoadMore = useCallback(() => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setPage((current) => current + 1);
      setIsLoadingMore(false);
    }, 250);
  }, []);

  return {
    options,
    totalCount: filteredUsers.length,
    hasMore: options.length < filteredUsers.length,
    isLoadingMore,
    handleSearchChange,
    handleLoadMore,
  };
}

export default function FilterWithAvatarDemo() {
  const [singleValue, setSingleValue] = useState<string>("");
  const [multiValues, setMultiValues] = useState<string[]>([]);
  const singleUsers = usePagedUsers();
  const multiUsers = usePagedUsers();

  return (
    <div className="flex flex-col gap-4">
      <FilterSingleSelect
        value={singleValue}
        onChange={setSingleValue}
        options={singleUsers.options}
        placeholder="Created by"
        searchable
        searchPlaceholder="Search"
        noResultsText="No results found"
        renderOption={renderOptionWithAvatar}
        onSearchChange={singleUsers.handleSearchChange}
        onLoadMore={singleUsers.handleLoadMore}
        hasMore={singleUsers.hasMore}
        isLoadingMore={singleUsers.isLoadingMore}
        totalCount={singleUsers.totalCount}
        itemCountLabel="users"
      />

      <FilterMultiSelect
        value={multiValues}
        onChange={setMultiValues}
        options={multiUsers.options}
        placeholder="Assigned to"
        searchable
        searchPlaceholder="Search"
        noResultsText="No results found"
        renderOption={renderOptionWithAvatar}
        onSearchChange={multiUsers.handleSearchChange}
        onLoadMore={multiUsers.handleLoadMore}
        hasMore={multiUsers.hasMore}
        isLoadingMore={multiUsers.isLoadingMore}
        totalCount={multiUsers.totalCount}
        itemCountLabel="users"
      />
    </div>
  );
}
