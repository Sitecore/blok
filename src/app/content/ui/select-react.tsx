import {
  SelectReact,
  type SelectReactOption,
} from "@/components/ui/select-react";

const productOptions: SelectReactOption[] = [
  { value: "XMCloud", label: "XM Cloud" },
  { value: "contentHub", label: "Content Hub" },
  { value: "CDP", label: "CDP" },
  { value: "Blok", label: "Blok", disabled: true },
];

export default function SelectReactDemo() {
  return (
    <div className="p-2 w-[280px]">
      <SelectReact
        options={productOptions}
        placeholder="Select a product"
        aria-label="Select a product"
      />
    </div>
  );
}
