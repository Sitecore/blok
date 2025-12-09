"use client";

import { useState } from "react";
import {
  FilterSection,
  FilterState,
  MultiSelectFilterConfig,
  SingleSelectFilterConfig,
  ToggleFilterConfig,
} from "@/components/bloks/filter-section";

// Project filter - multi-select with checkboxes
const projectFilter: MultiSelectFilterConfig = {
  id: "project",
  label: "Project",
  searchable: true,
  placeholder: "Search projects...",
  options: [
    { id: "website", label: "Website Redesign", value: "website" },
    { id: "mobile", label: "Mobile App", value: "mobile" },
    { id: "api", label: "API Integration", value: "api" },
    { id: "dashboard", label: "Analytics Dashboard", value: "dashboard" },
    { id: "marketing", label: "Marketing Campaign", value: "marketing" },
  ],
};

// Type filter - single select
const typeFilter: SingleSelectFilterConfig = {
  id: "type",
  label: "Type",
  options: [
    { id: "all", label: "All Types", value: "all" },
    { id: "task", label: "Task", value: "task" },
    { id: "bug", label: "Bug", value: "bug" },
    { id: "feature", label: "Feature", value: "feature" },
    { id: "improvement", label: "Improvement", value: "improvement" },
  ],
};

// Status filter - single select
const statusFilter: SingleSelectFilterConfig = {
  id: "status",
  label: "Status",
  options: [
    { id: "all", label: "All Statuses", value: "all" },
    { id: "open", label: "Open", value: "open" },
    { id: "in-progress", label: "In Progress", value: "in-progress" },
    { id: "review", label: "In Review", value: "review" },
    { id: "done", label: "Done", value: "done" },
  ],
};

// Assigned to me toggle
const assignedToMeFilter: ToggleFilterConfig = {
  id: "assigned-to-me",
  label: "Assigned to me",
};

export function FilterSectionExample() {
  const [filters, setFilters] = useState<FilterState | null>(null);

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    console.log("Filters changed:", newFilters);
  };

  return (
    <div className="space-y-6 p-4">
      <FilterSection
        searchPlaceholder="Search"
        showSearch={true}
        multiSelectFilters={[projectFilter]}
        singleSelectFilters={[typeFilter, statusFilter]}
        toggleFilters={[assignedToMeFilter]}
        onFilterChange={handleFilterChange}
      />

      {/* Debug Output */}
      {filters && (
        <div className="text-xs text-muted-foreground p-3 bg-muted rounded-md">
          <pre>{JSON.stringify(filters, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
