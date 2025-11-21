// Create a simple in-memory source for documentation pages
const pages = [
  {
    type: "page" as const,
    data: {
      title: "Introduction",
      description: "Welcome to Blok documentation",
    },
    url: "/docs",
  },
  {
    type: "page" as const,
    data: {
      title: "Installation", 
      description: "How to install Blok",
    },
    url: "/docs/installation",
  },
  {
    type: "page" as const,
    data: {
      title: "Components",
      description: "Browse all components",
    },
    url: "/docs/components",
  },
  {
    type: "page" as const,
    data: {
      title: "Button",
      description: "Button component documentation",
    },
    url: "/docs/components/button",
  },
  {
    type: "page" as const,
    data: {
      title: "Card",
      description: "Card component documentation",
    },
    url: "/docs/components/card",
  },
];

export const source = {
  getPage: (slug: string | string[] | undefined) => {
    const slugArray = Array.isArray(slug) ? slug : slug ? [slug] : [];
    const url = slugArray.length === 0 ? "/docs" : `/docs/${slugArray.join("/")}`;
    
    const page = pages.find(p => p.url === url);
    if (!page) return null;
    
    return {
      data: {
        ...page.data,
        body: null as any, // Will be loaded dynamically
      },
    };
  },
  
  generateParams: () => {
    return [
      { slug: [] }, // /docs
      { slug: ["installation"] },
      { slug: ["components"] },
      { slug: ["components", "button"] },
      { slug: ["components", "card"] },
    ];
  },
};

