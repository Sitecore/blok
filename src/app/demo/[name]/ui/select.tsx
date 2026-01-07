export const select = {
  name: "select",
  preview: {
    defaultComponent: "select",
  },
  usage: {
    usage: [
      `import {\n  Select,\n  SelectTrigger,\n  SelectValue,\n  SelectContent,\n  SelectGroup,\n  SelectItem,\n  SelectLabel,\n} from "@/components/ui/select";`,
      `<Select>\n <SelectTrigger className="w-[180px]">\n  <SelectValue placeholder="Select a product" />\n </SelectTrigger>\n <SelectContent>\n  <SelectGroup>\n   <SelectLabel>Products</SelectLabel>\n   <SelectItem value="XMCloud">XM Cloud</SelectItem>\n   <SelectItem value="contentHub">Content Hub</SelectItem>\n   <SelectItem value="CDP">CDP</SelectItem>\n   <SelectItem value="Blok" disabled>Blok</SelectItem>\n  </SelectGroup>\n </SelectContent>\n</Select>`,
    ]
  },
  components: {
    "Large List": { component: "select-large-list", },
    "With Icon": { component: "select-icon", },
    Disabled: { component: "select-disabled", },
  },
};
