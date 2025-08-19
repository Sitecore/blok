import registry from '@/registry.json';

// Registry items for UI components
export const uiItems = registry.items
    .filter(
        (item) => item.type === "registry:ui" &&
        item.active !== false
    )
    .map((item) => ({
        label: item.name.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
        href: `/components/${item.name}`,
    }));

// Registry items for blocks
export const blockItems = registry.items
    .filter((item) => item.type === "registry:block")
    .map((item) => ({
        label: item.name.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
        href: `/blocks/${item.name}`,
    }));