import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Icon } from "@/lib/icon";
import {
  mdiChartBar,
  mdiChartLine,
  mdiChartPie,
  mdiCircleOutline,
} from "@mdi/js";

export const select = {
  name: "select",
  defaultComponent: (
    <Select>
      <SelectTrigger className="w-[180px]" aria-label="Select a product">
        <SelectValue placeholder="Select a product" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Products</SelectLabel>
          <SelectItem value="XMCloud">XM Cloud</SelectItem>
          <SelectItem value="contentHub">Content Hub</SelectItem>
          <SelectItem value="CDP">CDP</SelectItem>
          <SelectItem value="Blok" disabled>
            Blok
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
  usage: [
    `import {\n  Select,\n  SelectTrigger,\n  SelectValue,\n  SelectContent,\n  SelectGroup,\n  SelectItem,\n  SelectLabel,\n} from "@/components/ui/select";`,
    `<Select>\n <SelectTrigger className="w-[180px]">\n  <SelectValue placeholder="Select a product" />\n </SelectTrigger>\n <SelectContent>\n  <SelectGroup>\n   <SelectLabel>Products</SelectLabel>\n   <SelectItem value="XMCloud">XM Cloud</SelectItem>\n   <SelectItem value="contentHub">Content Hub</SelectItem>\n   <SelectItem value="CDP">CDP</SelectItem>\n   <SelectItem value="Blok" disabled>Blok</SelectItem>\n  </SelectGroup>\n </SelectContent>\n</Select>`,
  ],
  components: {
    "Large List": (
      <Select>
        <SelectTrigger className="w-[180px]" aria-label="Select from large list">
          <SelectValue placeholder="Large List" />
        </SelectTrigger>
        <SelectContent>
          {Array.from({ length: 100 }).map((_, i) => (
            <SelectItem key={i} value={`item-${i}`}>
              Item {i}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    ),
    "With Icon": (
      <Select>
        <SelectTrigger className="w-[180px]" aria-label="Select chart type">
          <SelectValue
            placeholder={
              <>
                <Icon
                  path={mdiCircleOutline}
                  size={1.2}
                  className="text-neutral-foreground"
                />
                With Icon
              </>
            }
          />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Chart Types</SelectLabel>
            <SelectItem value="line">
              <Icon path={mdiChartLine} size={1.2} />
              Line
            </SelectItem>
            <SelectItem value="bar">
              <Icon path={mdiChartBar} size={1.2} />
              Bar
            </SelectItem>
            <SelectItem value="pie">
              <Icon path={mdiChartPie} size={1.2} />
              Pie
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    ),
    Disabled: (
      <Select disabled>
        <SelectTrigger className="w-[180px]" aria-label="Disabled select">
          <SelectValue placeholder="Disabled" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes" disabled>
            Grapes
          </SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem>
        </SelectContent>
      </Select>
    ),
  },
};
