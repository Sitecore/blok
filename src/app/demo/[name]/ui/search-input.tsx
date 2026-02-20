export const searchInput = {
  name: "search-input",
  preview: {
    defaultComponent: "search-input",
  },
  usage: {
    usage: [
      `import { SearchInput, SearchInputLeftElement, SearchInputField, SearchInputRightElement, SearchInputClearButton } from "@/components/ui/search-input";`,
      `<SearchInput>
  <SearchInputLeftElement>
    <Icon path={mdiMagnify} /> // You can use any icon from the icon library
  </SearchInputLeftElement>
  <SearchInputField placeholder="Search" />
</SearchInput>`,
    ],
  },
};
