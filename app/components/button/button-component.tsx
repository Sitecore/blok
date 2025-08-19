'use client'

import { Button } from "@/registry/new-york/ui/button";
import { FC, JSX, useMemo, useState } from "react";
import CustomCodeBlock from "../label/code-block";
import Icon from "@mdi/react";
import { mdiInformationOutline, mdiLoading } from "@mdi/js";
import { SizeSelector } from "./components/size-selector";
import { IconSelector } from "./components/icon-selector";
import { DropdownOption, DropdownSelector } from "./components/dropdown-selector";

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

export const ButtonDemo: FC<ButtonDemoProps> = ({ selectedDemo }) => {
    const {
        variant = "default",
        size: initialSize = "default",
        dropdowns = [],
        id: demoId,
        buttonText
    } = selectedDemo || {};

    const [size, setSize] = useState(initialSize);
    const [iconState, setIconState] = useState({ leftIcon: true, rightIcon: true });

    const initialDropdownValues = useMemo(() => {
        return dropdowns.reduce((acc, { id, options }) => {
            acc[id] = id === "variant" ? variant ?? options[0]?.value : options[0]?.value;
            return acc;
        }, {} as Record<string, string | undefined>);
    }, [selectedDemo]);
    
    const [dropdownValues, setDropdownValues] = useState(initialDropdownValues);

    // Derived values
    const currentVariant = dropdownValues["variant"] as DemoObject["variant"] ?? "default";
    const selectedColorKey = dropdownValues["color"] ?? "default";
    const dropdownSize = dropdownValues["size"] as DemoObject["size"];
    const dropDownIconSize = dropdownValues["icon"] as DemoObject["size"];
    const currentSize = dropdownSize || dropDownIconSize || size;
    const currentState = dropdownValues["state"] ?? "default";
    const isLoading = currentState === "loading";
    const isDisabled = ["disabled", "loading"].includes(currentState);

    const colorClass = selectedColorKey ? colorStyles[selectedColorKey]?.[currentVariant] ?? "" : "";

    // Get button content
    const getButtonLabel = (): string | JSX.Element => {
        switch (demoId) {
            case "variants":
            case "sizes":
            case "colors":
                const dropdown = dropdowns.find((d) => d.id === demoId.slice(0, -1));
                const label = dropdown?.options.find((opt) => opt.value === dropdownValues[dropdown?.id])?.label;
                return label ?? buttonText ?? "Click me";
            case "iconSizes":
                return <Icon path={mdiInformationOutline} size={1} />;
            default:
                return buttonText ?? "Click me";
        }
    };

    const buttonLabel = getButtonLabel();

    // Generate code snippet
    const codeSnippet = useMemo(() => {
        const props = [
            currentVariant !== "default" && `variant="${currentVariant}"`,
            currentSize !== "default" && `size="${currentSize}"`,
            colorClass && `className="${colorClass}"`,
            isDisabled && `disabled`
        ]
            .filter(Boolean)
            .join(" ");

        let content: string;

        if (demoId === "iconSizes") {
            content = `<Icon path={mdiInformationOutline} size={1} />`;
        } else if (demoId === "states" && isLoading) {
            content = `<Icon path={mdiLoading} size={1} className="animate-spin mr-1" />\n        <p className="text-sm">Loading</p>`;
        } else if (demoId === "icons") {
            const left = iconState.leftIcon ? `<Icon path={mdiInformationOutline} size={1} className="mr-2" />\n        ` : "";
            const right = iconState.rightIcon ? `\n        <Icon path={mdiInformationOutline} size={1} className="ml-2" />` : "";
            content = `${left}${typeof buttonLabel === "string" ? buttonLabel : "Click me"}${right}`;
        } else {
            content = typeof buttonLabel === "string" ? buttonLabel : "Click me";
        }

        return `import { Button } from "@/components/ui/button"

export function ButtonDemo() {
  return (
    <div className="flex flex-wrap items-center gap-2 md:flex-row">
      <Button ${props}>
        ${content}
      </Button>
    </div>
  )
}
`;
    }, [currentVariant, currentSize, colorClass, buttonLabel, isDisabled, isLoading, selectedDemo, iconState]);

    // Render icons for the "icons" demo
    const renderIcons = (position: "left" | "right") =>
        demoId === "icons" && iconState[`${position}Icon` as keyof typeof iconState] ? (
            <Icon
                path={mdiInformationOutline}
                size={1}
                className={position === "left" ? "mr-2" : "ml-2"}
            />
    ) : null;


    return (
        <>
            <p className="text-xl font-semibold mb-4">{selectedDemo?.title}</p>
            <p className="font-normal mb-4">{selectedDemo?.description}</p>
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
                                {renderIcons("left")}
                                {buttonLabel}
                                {renderIcons("right")}
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