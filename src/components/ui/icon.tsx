import { cn } from "@/lib/utils";
import Icon from "@mdi/react";
import { cva, type VariantProps } from "class-variance-authority";

const iconVariants = cva("", {
    variants: {
        variant: {
            default: "",
            filled: "p-0.5 rounded-md bg-primary-bg",
        },
        size: {
            default: "size-6",
            sm: "size-4",
            md: "size-5",
            lg: "size-7",
        },
        colorScheme: {
            primary: "text-primary-fg",
            neutral: "text-neutral-fg",
            success: "text-success-fg",
            danger: "text-danger-fg",
            warning: "text-warning-fg",
            yellow: "text-yellow-800 dark:text-yellow-200",
            teal: "text-teal-800 dark:text-teal-200",
            cyan: "text-cyan-800 dark:text-cyan-200",
            blue: "text-info-fg",
            pink: "text-pink-800 dark:text-pink-200",
        }
    },
    compoundVariants: [
        {
            variant: "filled",
            colorScheme: "primary",
            class: "bg-primary-bg",
        },
        {
            variant: "filled",
            colorScheme: "neutral",
            class: "bg-neutral-bg",
        },
        {
            variant: "filled",
            colorScheme: "success",
            class: "bg-success-bg",
        },
        {
            variant: "filled",
            colorScheme: "danger",
            class: "bg-danger-bg",
        },
        {
            variant: "filled",
            colorScheme: "warning",
            class: "bg-warning-bg",
        },
        {
            variant: "filled",
            colorScheme: "yellow",
            class: "bg-yellow-100 dark:text-yellow-800",
        },
        {
            variant: "filled",
            colorScheme: "teal",
            class: "bg-teal-100 dark:bg-teal-800",
        },
        {
            variant: "filled",
            colorScheme: "cyan",
            class: "bg-cyan-100 dark:bg-cyan-800",
        },
        {
            variant: "filled",
            colorScheme: "blue",
            class: "bg-info-bg",
        },
        {
            variant: "filled",
            colorScheme: "pink",
            class: "bg-pink-100 dark:bg-pink-800",
        },
    ],
    defaultVariants: {
        variant: "default",
        size: "default",
        colorScheme: "primary",
    }
})

type IconsProps = {
    path: React.ComponentProps<typeof Icon>["path"],
    className?: string,
} & VariantProps<typeof iconVariants> & 
React.ComponentProps<typeof Icon>

function Icons({ 
    path,
    variant,
    size,
    colorScheme,
    className,
    ...props
}: IconsProps) {
    return (
        <Icon 
            path={path} 
            className={cn(
                iconVariants({
                    variant,
                    size,
                    colorScheme,
                }),
                className,
            )}
            {...props}
        />
    )
}

export { Icons, iconVariants }