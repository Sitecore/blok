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
  components: {
    Default: (
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="blueberry">Blueberry</SelectItem>
            <SelectItem value="grapes" disabled>
              Grapes
            </SelectItem>
            <SelectItem value="pineapple">Pineapple</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    ),
    largeList: (
      <Select>
        <SelectTrigger className="w-[180px]">
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
    withIcon: (
      <Select>
        <SelectTrigger className="w-[180px]">
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
    disabled: (
      <Select disabled>
        <SelectTrigger className="w-[180px]">
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
