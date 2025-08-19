import { Button } from "@/registry/new-york/ui/button";
import { FC } from "react";

type buttonSizeUI = "xs" | "sm" | "md" | "lg";
type buttonSizeValid = "xs" | "sm" | "lg" | "default" | "icon" | "icon-lg" | "icon-sm" | "icon-xs" | null;

interface SizeSelectorProps {
  selectedSize: buttonSizeValid;
  onChange: (size: buttonSizeValid) => void;
}

const sizes: buttonSizeUI[] = ["xs", "sm", "md", "lg"];

export const SizeSelector: FC<SizeSelectorProps> = ({ selectedSize, onChange }) => {
    return (
        <div className="flex space-x-1 flex-wrap border rounded-md">
            {sizes.map((size) => {
                const valueToApply = size === "md" ? "default" : size;
                const isActive = (selectedSize === "default" && size === "md") || selectedSize === size;

                return (
                    <Button
                        key={size}
                        variant="ghost"
                        className={`px-3 rounded hover:bg-primary-background hover:text-primary-fg ${isActive && "bg-primary-background text-primary-fg"}`}
                        onClick={() => onChange(valueToApply)}
                    >
                        {size}
                    </Button>
                );
            })}
        </div>
    );
};