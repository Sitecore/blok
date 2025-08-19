import { cn } from "@/registry/new-york/lib/utils";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/registry/new-york/ui/select";
import { FC } from "react";

export interface DropdownOption {
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