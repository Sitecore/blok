import registry from '@/registry.json';
import navComponents from './metaData/navComponents.json'

// Registry items for UI components
const allItems = [
    ...(registry.items || []),
    ...(navComponents.items || []),
];


export const uiItems = allItems
    .filter(
        (item) => item.type === "registry:ui" &&
            item.active !== false
    )
    .map((item) => ({
        label: item.name.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
        href: `/components/${item.name}`,
    }));

// Registry items for blocks
export const blockItems = allItems
    .filter((item) => item.type === "registry:block")
    .map((item) => ({
        label: item.name.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
        href: `/blocks/${item.name}`,
    }));


export const themeItems = allItems
    .filter(
        (item) => item.type === "registry:theme" &&
            item.active !== false
    )
    .map((item) => ({
        label: item.name.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
        href: `/theming/${item.name}`,
    }));