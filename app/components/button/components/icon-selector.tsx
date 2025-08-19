import { Checkbox } from "@/registry/new-york/ui/checkbox";
import { Label } from "@/registry/new-york/ui/label";
import { FC } from "react";

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