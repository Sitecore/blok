
// Build page tree from docs and meta
export const pageTree = {
  name: "Docs",
  children: [
    {
      type: "page" as const,
      name: "Introduction",
      url: "/docs",
    },
    {
      type: "page" as const,
      name: "Installation",
      url: "/docs/installation",
    },
    {
      type: "folder" as const,
      name: "Components",
      index: {
        type: "page" as const,
        name: "Components",
        url: "/docs/components",
      },
      children: [
        {
          type: "page" as const,
          name: "Button",
          url: "/docs/components/button",
        },
        {
          type: "page" as const,
          name: "Card",
          url: "/docs/components/card",
        },
      ],
    },
  ],
};

