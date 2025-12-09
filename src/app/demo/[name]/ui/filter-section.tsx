import { FilterSectionExample } from "@/app/demo/[name]/ui/filter-section-example";

export const filterSection = {
  name: "filter-section",
  defaultComponent: <FilterSectionExample />,
  usage: [
    `import { 
  FilterSection, 
  MultiSelectFilterConfig, 
  SingleSelectFilterConfig, 
  ToggleFilterConfig 
} from "@/components/bloks/filter-section"`,
    `// Project filter - multi-select with checkboxes
const projectFilter: MultiSelectFilterConfig = {
  id: "project",
  label: "Project",
  searchable: true,
  placeholder: "Search projects...",
  options: [
    { id: "website", label: "Website Redesign", value: "website" },
    { id: "mobile", label: "Mobile App", value: "mobile" },
    { id: "api", label: "API Integration", value: "api" },
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
  ],
};

// Status filter - single select
const statusFilter: SingleSelectFilterConfig = {
  id: "status",
  label: "Status",
  options: [
    { id: "all", label: "All Statuses", value: "all" },
    { id: "open", label: "Open", value: "open" },
    { id: "done", label: "Done", value: "done" },
  ],
};

// Assigned to me toggle
const assignedToMeFilter: ToggleFilterConfig = {
  id: "assigned-to-me",
  label: "Assigned to me",
};`,
    `<FilterSection
  searchPlaceholder="Search"
  showSearch={true}
  multiSelectFilters={[projectFilter]}
  singleSelectFilters={[typeFilter, statusFilter]}
  toggleFilters={[assignedToMeFilter]}
  onFilterChange={(filters) => console.log(filters)}
/>`,
  ],
};
