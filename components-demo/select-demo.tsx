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
  
  export function SelectDemo() {
    return (
      <div>
        <h2 className="font-semibold text-4xl wrap-break-words">Select</h2>
      <div className="flex w-full max-w-full gap-4">
        {/* Default Select */}
        <div id="select-default">
        <div className="p-2">
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
        </div>
        </div>

        {/* Large List Select */}
        <div id="select-large-list">
        <div className="p-2">
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
        </div>
        </div>

        {/* With Icon Select */}
        <div id="select-with-icon">
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
        </div>

        {/* Disabled Select */}
        <div id="select-disabled">
        <div className="p-2">
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
        </div>
        </div>
      </div>
      </div>  
    );
  }