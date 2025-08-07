import registry from '@/registry.json';

export const uiItems = registry.items
    .filter((item) => item.type === "registry:ui")
    .map((item) => ({
        label: item.name.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
        href: `/components/${item.name}`,
    }));

export const blockItems = registry.items
    .filter((item) => item.type === "registry:block")
    .map((item) => ({
        label: item.name.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
        href: `/blocks/${item.name}`,
    }));