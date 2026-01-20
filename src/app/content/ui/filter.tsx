"use client"

import { useState } from "react";
import { FilterBar, type FilterDefinition } from "@/components/ui/filter";

const productOptions = [
    { value: "XMCloud", label: "XM Cloud" },
    { value: "contentHub", label: "Content Hub" },
    { value: "CDP", label: "CDP" },
    { value: "Blok", label: "Blok", disabled: true },
];

const extendedProductOptions = [
    { value: "XMCloud", label: "XM Cloud" },
    { value: "contentHub", label: "Content Hub" },
    { value: "CDP", label: "CDP" },
    { value: "Blok", label: "Blok", disabled: true },
    { value: "OrderCloud", label: "Order cloud" },
    { value: "SitecoreXP", label: "Sitecore XP" },
    { value: "SitecoreXM", label: "Sitecore XM" },
    { value: "Send", label: "Send" },
    { value: "Discover", label: "Discover" },
    { value: "Connect", label: "Connect" },
    { value: "Personalize", label: "Personalize" },
    { value: "ContentOps", label: "Content operations" },
    { value: "Commerce", label: "Sitecore commerce" },
    { value: "Forms", label: "Sitecore forms" },
    { value: "JSS", label: "JavaScript services" },
    { value: "Headless", label: "Headless CMS" },
];

export default function FilterDemo() {
    const [filterValues, setFilterValues] = useState<Record<string, unknown>>({
        search: "",
        product: "",
        products: [],
        assignedToMe: false,
    });

    const filters: FilterDefinition[] = [
        {
            type: "input",
            key: "search",
            props: {
                placeholder: "Search...",
                ariaLabel: "Search",
                width: "w-64",
            },
        },
        {
            type: "single-select",
            key: "product",
            props: {
                options: productOptions,
                placeholder: "Select a product",
                groupLabel: "Products",
                colorScheme: "primary",
            },
        },
        {
            type: "multi-select",
            key: "products",
            props: {
                options: extendedProductOptions,
                placeholder: "Select products",
                groupLabel: "Products",
                colorScheme: "primary",
            },
        },
        {
            type: "toggle",
            key: "assignedToMe",
            props: {
                label: "Assigned to me",
                colorScheme: "primary",
                showClose: true,
            },
        },
    ];

    const handleChange = (key: string, value: unknown) => {
        setFilterValues((prev) => ({ ...prev, [key]: value }));
    };

    const handleClearAll = () => {
        setFilterValues({
            search: "",
            product: "",
            products: [],
            assignedToMe: false,
        });
    };

    return (
        <FilterBar
            filters={filters}
            values={filterValues}
            onChange={handleChange}
            onClearAll={handleClearAll}
            showClearAll
            clearAllText="Clear all"
        />
    );
}

