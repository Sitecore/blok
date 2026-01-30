import { SelectReact, type SelectReactOption } from "@/components/ui/select-react";

const productOptions: SelectReactOption[] = [
  { value: "XMCloud", label: "XM Cloud" },
  { value: "contentHub", label: "Content Hub" },
  { value: "CDP", label: "CDP" },
  { value: "Blok", label: "Blok", disabled: true },
];

export function SelectReactDemo() {

  return (
    <div>
      <h2 className="font-semibold text-4xl wrap-break-words">Select(React)</h2>

        <div id="select-react">
          <div className="p-2 w-[280px]">
            <SelectReact
              options={productOptions}
              placeholder="Select a product"
              aria-label="Select a product"
            />
          </div>
        </div>

    </div>
  );
}