import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SelectDemo() {
  return (
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
  );
}
