export const searchInput = {
  name: "search-input",
  preview: {
    defaultComponent: "search-input",
  },
  usage: {
    usage: [
      `import {\n  SearchInput,\n  SearchInputLeftElement,\n  SearchInputField,\n  SearchInputRightElement,\n  SearchInputClearButton,\n} from "@/components/ui/search-input";`,
      `<SearchInput>\n  <SearchInputLeftElement>\n    <Icon path={mdiMagnify} /> // You can use any icon from the icon library\n  </SearchInputLeftElement>\n  <SearchInputField placeholder="Search" />\n</SearchInput>`,
    ],
  },
};
