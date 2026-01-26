import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SelectLargeListDemo() {
  return (
    <div className="p-2">
      <Select>
        <SelectTrigger
          className="w-[180px]"
          aria-label="Select from large list"
        >
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
  );
}
