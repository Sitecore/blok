"use client";

import { type FilterOption, FilterSingleSelect } from "@/components/ui/filter";
import { useCallback, useMemo, useState } from "react";

const ALL_OPTIONS: FilterOption[] = Array.from({ length: 80 }, (_, index) => ({
  value: `option-${index + 1}`,
  label: `Option ${index + 1}`,
}));

const PAGE_SIZE = 15;

export default function FilterInfiniteScrollDemo() {
  const [value, setValue] = useState<string>("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const filteredOptions = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return ALL_OPTIONS;
    return ALL_OPTIONS.filter((option) =>
      option.label.toLowerCase().includes(query),
    );
  }, [search]);

  const options = filteredOptions.slice(0, page * PAGE_SIZE);

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

  return (
    <FilterSingleSelect
      value={value}
      onChange={setValue}
      options={options}
      placeholder="Paginated filter"
      searchable
      searchPlaceholder="Search"
      noResultsText="No results found"
      onSearchChange={handleSearchChange}
      onLoadMore={handleLoadMore}
      hasMore={options.length < filteredOptions.length}
      isLoadingMore={isLoadingMore}
      totalCount={filteredOptions.length}
      itemCountLabel="options"
    />
  );
}
