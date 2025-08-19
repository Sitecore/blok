'use client'

import { Button } from "@/registry/new-york/ui/button";
import { FC, useMemo, useState } from "react";
import CustomCodeBlock from "../label/code-block";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/new-york/ui/select";
import { cn } from "@/registry/new-york/lib/utils";
import Icon from "@mdi/react";
import { mdiInformationOutline, mdiLoading } from "@mdi/js";
import { Checkbox } from "@/registry/new-york/ui/checkbox";
import { Label } from "@/registry/new-york/ui/label";

type DemoObject = {
    id: string;
    title?: string;
    description?: string;
    buttonText: string;
    variant: "default" | "ghost" | "outline" | "link" | null | undefined;
    size: "default" | "sm" | "lg" | "xs" | "icon" | "icon-lg" | "icon-sm" | "icon-xs" | null | undefined;
    sizeOption?: boolean;
    dropdowns?: DropdownConfig[];
    iconOption?: boolean;
};

type DropdownConfig = {
    id: string;
    options: DropdownOption[];
};

type ButtonDemoProps = {
    selectedDemo?: DemoObject;
};

export const ButtonDemo: FC<ButtonDemoProps> = ({ selectedDemo }) => {
    const initialDropdownValues = useMemo(() => {
        const initial: Record<string, string | undefined> = {};
        selectedDemo?.dropdowns?.forEach(({ id, options }) => {
            if (id === "variant") {
                initial[id] = selectedDemo.variant ?? options[0]?.value;
            } else {
                initial[id] = options[0]?.value ?? undefined;
            }
        });
        return initial;
    }, [selectedDemo]);

    const [size, setSize] = useState<DemoObject["size"]>(selectedDemo?.size || "default");
    const [dropdownValues, setDropdownValues] = useState<Record<string, string | undefined>>(initialDropdownValues);
    const [iconState, setIconState] = useState({ leftIcon: true, rightIcon: true });

    const currentVariant = dropdownValues["variant"] as DemoObject["variant"] || selectedDemo?.variant || "default";

    const selectedColorKey = dropdownValues["color"] || "default";
    const colorClass = selectedColorKey
        ? colorStyles[selectedColorKey]?.[currentVariant] || ""
        : "";

    const dropdownSize = dropdownValues["size"] as DemoObject["size"];
    const dropDownIconSize = dropdownValues["icon"] as DemoObject["size"];
    const currentSize = dropdownSize || dropDownIconSize || size;

    const currentState = dropdownValues["state"] || "default";
    const isDisabled = currentState === "disabled" || currentState === "loading";
    const isLoading = currentState === "loading";

    const buttonLabel =
        selectedDemo?.id === "variants"
            ? selectedDemo?.dropdowns
                ?.find((d) => d.id === "variant")
                ?.options.find((opt) => opt.value === currentVariant)?.label
        : selectedDemo?.id === "sizes"
            ? selectedDemo?.dropdowns
                ?.find((d) => d.id === "size")
                ?.options.find((opt) => opt.value === currentSize)?.label
        : selectedDemo?.id === "iconSizes"
            ? <Icon path={mdiInformationOutline} size={1} />
        : selectedDemo?.id === "colors"
            ? selectedDemo?.dropdowns
                ?.find((d) => d.id === "color")
                ?.options.find((opt) => opt.value === selectedColorKey)?.label
        : selectedDemo?.buttonText || "Click me";

    const codeSnippet = useMemo(() => {
        const variantProp = currentVariant !== "default" ? ` variant="${currentVariant}"` : "";
        const sizeProp = currentSize !== "default" ? ` size="${currentSize}"` : "";
        const classProp = colorClass ? ` className="${colorClass}"` : "";
        const disabledProp = isDisabled ? ` disabled` : "";

        let buttonContent: string;
        if (selectedDemo?.id === "iconSizes") {
            buttonContent = `<Icon path={mdiInformationOutline} size={1} />`;
        } else if (selectedDemo?.id === "states" && isLoading) {
            buttonContent = `<Icon path={mdiLoading} size={1} className="animate-spin mr-1" />\n        <p className="text-sm">Loading</p>`;
        } else if (selectedDemo?.id === "icons") {
            const left = iconState.leftIcon ? `<Icon path={mdiInformationOutline} size={1} className="mr-2" />\n        ` : "";
            const right = iconState.rightIcon ? `\n        <Icon path={mdiInformationOutline} size={1} className="ml-2" />` : "";
            const label = typeof buttonLabel === "string" ? buttonLabel : "Click me";
            buttonContent = `${left}${label}${right}`;
        } else {
            buttonContent = typeof buttonLabel === "string" ? buttonLabel : "Click me";
        }

        return `import { Button } from "@/components/ui/button"

export function ButtonDemo() {
  return (
    <div className="flex flex-wrap items-center gap-2 md:flex-row">
      <Button${variantProp}${sizeProp}${classProp}${disabledProp}>
        ${buttonContent}
      </Button>
    </div>
  )
}
`;
    }, [currentVariant, currentSize, colorClass, buttonLabel, isDisabled, isLoading, selectedDemo, iconState]);

    return (
        <>
            <p className="text-xl font-semibold mb-4">{selectedDemo?.title}</p>
            <p className="text-md font-normal mb-4">{selectedDemo?.description}</p>
            <div className="flex items-center space-x-2 mb-2">
                {selectedDemo?.dropdowns?.map((dropdown) => (
                    <DropdownSelector
                        key={dropdown.id}
                        options={dropdown.options}
                        value={dropdownValues[dropdown.id]}
                        onChange={(val) => {
                            setDropdownValues((prev) => ({ ...prev, [dropdown.id]: val }));
                        }}
                    />
                ))}

                {selectedDemo?.sizeOption && (
                    <SizeSelector
                        selectedSize={size}
                        onChange={(newSize) => setSize(newSize)}
                    />
                )}

                {selectedDemo?.iconOption && (
                    <IconSelector
                        leftIcon={iconState.leftIcon}
                        rightIcon={iconState.rightIcon}
                        onChange={(newState) => setIconState(newState)}
                    />
                )}
            </div>
            <div className="rounded-lg bg-white overflow-clip w-full flex flex-col">
                <div className="w-full py-8 min-h-[200px] flex justify-center items-center">
                    <Button
                        variant={currentVariant}
                        size={currentSize}
                        className={colorClass}
                        disabled={isDisabled}
                    >
                        {isLoading ? (
                            <>
                                <Icon path={mdiLoading} size={1} className="animate-spin mr-1" />
                                <p className="text-sm">Loading</p>
                            </>
                        ) : (
                            <>
                                {selectedDemo?.id === "icons" && iconState.leftIcon && (
                                    <Icon path={mdiInformationOutline} size={1} className="mr-2" />
                                )}
                                {buttonLabel}
                                {selectedDemo?.id === "icons" && iconState.rightIcon && (
                                    <Icon path={mdiInformationOutline} size={1} className="ml-2" />
                                )}
                            </>
                        )}
                    </Button>  
                </div>
                <CustomCodeBlock
                    code={[
                        {
                            language: "tsx",
                            filename: "LabelExample.tsx",
                            code: codeSnippet.trim() || ``
                        }
                    ]}
                    defaultValue="tsx"
                    lineNumbers={true}
                />
            </div>
        </>
    );
}


// Size Selector
type buttonSizeUI = "xs" | "sm" | "md" | "lg";
type buttonSizeValid = "xs" | "sm" | "lg" | "default" | "icon" | "icon-lg" | "icon-sm" | "icon-xs" | null | undefined;

interface SizeSelectorProps {
  selectedSize: buttonSizeValid;
  onChange: (size: buttonSizeValid) => void;
}

const sizes: buttonSizeUI[] = ["xs", "sm", "md", "lg"];

const SizeSelector: FC<SizeSelectorProps> = ({ selectedSize, onChange }) => {
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

// Dropdown Options
type ColorValue = Record<string, string>;

const colorStyles: Record<string, ColorValue> = {
  primary: {
    default: "bg-primary text-white",
    ghost: "hover:bg-primary hover:text-white",
    outline: "border border-primary text-primary hover:bg-primary hover:text-white",
    link: "text-primary"
  },
  secondary: {
    default: "bg-secondary text-black hover:text-white",
    ghost: "hover:bg-secondary hover:text-black",
    outline: "border border-secondary text-secondary hover:bg-secondary hover:text-black",
    link: "text-secondary"
  }
};

interface DropdownOption {
    label: string;
    value: string;
}

interface DropdownProps {
    options: DropdownOption[];
    value?: string;
    onChange: (value: string) => void;
    className?: string;
}

export const DropdownSelector: FC<DropdownProps> = ({
    options,
    value,
    onChange,
    className = ""
}) => {
    return (
        <Select value={value} onValueChange={onChange}>
            <SelectTrigger className={cn('bg-transparent border border-border-color', className)}>
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                {options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}

// Icon Selector
interface IconSelectorProps {
    leftIcon?: boolean;
    rightIcon?: boolean;
    onChange: (state: { leftIcon: boolean; rightIcon: boolean }) => void;
}

export const IconSelector: FC<IconSelectorProps> = ({
    leftIcon = false,
    rightIcon = false,
    onChange,
}) => {
    const handleToggle = (icon: "leftIcon" | "rightIcon", checked: boolean) => {
        onChange({
            leftIcon: icon === "leftIcon" ? checked : leftIcon,
            rightIcon: icon === "rightIcon" ? checked : rightIcon,
        });
    };

    return (
        <div className="flex items-center gap-4">
            <div className="flex items-center space-x-2">
                <Checkbox id="leftIcon" checked={leftIcon} onCheckedChange={(checked) => handleToggle("leftIcon", !!checked)} />
                <Label htmlFor="leftIcon">Left Icon</Label>
            </div>

            <div className="flex items-center space-x-2">
                <Checkbox id="rightIcon" checked={rightIcon} onCheckedChange={(checked) => handleToggle("rightIcon", !!checked)} />
                <Label htmlFor="rightIcon">Right Icon</Label>
            </div>
        </div>
    );
};