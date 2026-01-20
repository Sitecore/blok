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

export default function SelectWithIconDemo() {
  return (
    <div className="p-2">
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
    </div>
  );
}
