# Fumadocs Setup Guide

This document explains the Fumadocs documentation structure for the Blok component library.

## Overview

Fumadocs is a modern documentation framework for Next.js applications. It provides:
- Automatic page generation from MDX files
- Built-in sidebar navigation
- Code syntax highlighting
- Search functionality
- Mobile-responsive layouts
- Dark mode support

## File Structure

```
src/
├── content/
│   └── docs/                    # Documentation content
│       ├── index.mdx            # Documentation home page
│       ├── installation.mdx     # Installation guide
│       ├── meta.json            # Navigation metadata
│       └── components/          # Component documentation
│           ├── index.mdx        # Components overview
│           ├── button.mdx       # Button component docs
│           ├── card.mdx         # Card component docs
│           └── meta.json        # Components nav metadata
├── docs/
│   └── source.ts                # Fumadocs source configuration
├── app/
│   └── docs/
│       ├── layout.tsx           # Docs layout with sidebar
│       └── [[...slug]]/
│           └── page.tsx         # Dynamic docs page renderer
├── mdx-components.tsx           # MDX component mappings
└── source.config.ts             # MDX configuration
```

## Key Files Explained

### 1. `source.config.ts`

Configures how MDX files are loaded and processed.

```typescript
import { defineDocs, defineConfig } from "fumadocs-mdx/config";
import rehypePrettyCode from "rehype-pretty-code";

export default defineConfig({
  mdxOptions: {
    rehypePlugins: [
      [rehypePrettyCode, {
        theme: { dark: "github-dark", light: "github-light" },
        keepBackground: false,
      }],
    ],
  },
});

export const { docs, meta } = defineDocs({
  dir: "src/content/docs",
});
```

### 2. `src/docs/source.ts`

Creates the Fumadocs source loader from your MDX files.

```typescript
import { loader } from "fumadocs-core/source";
import { createMDXSource } from "fumadocs-mdx";
import { docs, meta } from "@/source.config";

export const source = loader({
  baseUrl: "/docs",
  source: createMDXSource(docs, meta),
  icon(icon) {
    // Icon mapping logic
  },
});
```

### 3. `mdx-components.tsx`

Defines custom components available in MDX files.

```typescript
import defaultComponents from "fumadocs-ui/mdx";
import { Tabs, Tab } from "fumadocs-ui/components/tabs";
import { Callout } from "fumadocs-ui/components/callout";

export function useMDXComponents(components: MDXComponents) {
  return {
    ...defaultComponents,
    ...components,
    Tabs,
    Tab,
    Callout,
    // Add your custom components here
  };
}
```

### 4. `src/app/docs/layout.tsx`

The layout wrapper for documentation pages with sidebar.

```typescript
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { source } from "@/docs/source";

export default function Layout({ children }) {
  return (
    <DocsLayout
      tree={source.pageTree}
      nav={{ title: "Blok", url: "/" }}
      sidebar={{ defaultOpenLevel: 0 }}
    >
      {children}
    </DocsLayout>
  );
}
```

## Creating Component Documentation

### Step 1: Create an MDX file

Create a new file in `src/content/docs/components/[component-name].mdx`:

```mdx
---
title: Button
description: Displays a button or a component that looks like a button.
---

import { Button } from "@/components/ui/button";

# Button

Displays a button or a component that looks like a button.

<div className="my-8">
  <Button>Click me</Button>
</div>

## Installation

...
```

### Step 2: Add to navigation

Update `src/content/docs/components/meta.json`:

```json
{
  "title": "Components",
  "pages": ["button", "card", "input", "new-component"]
}
```

### Step 3: Build and view

The page will automatically be available at `/docs/components/new-component`.

## MDX Frontmatter

Each MDX file should include frontmatter:

```mdx
---
title: Component Name
description: Brief description for SEO
icon: BookOpen
---
```

### Available Frontmatter Fields

- `title` (required): Page title
- `description` (required): Page description for SEO
- `icon` (optional): Lucide icon name for navigation
- `full` (optional): Remove default page container

## Built-in Components

Fumadocs provides several components you can use in MDX:

### Tabs

```mdx
<Tabs items={["CLI", "Manual"]}>
<Tab value="CLI">

Content for CLI tab

</Tab>
<Tab value="Manual">

Content for Manual tab

</Tab>
</Tabs>
```

### Callout

```mdx
<Callout type="info">
  This is an informational callout.
</Callout>

<Callout type="warning">
  This is a warning callout.
</Callout>

<Callout type="error">
  This is an error callout.
</Callout>
```

### Steps

```mdx
<Steps>

### Step 1: Install

Install the package.

### Step 2: Configure

Configure your app.

</Steps>
```

### Code Blocks

Code blocks support syntax highlighting and line numbers:

````mdx
```tsx title="components/button.tsx" {1,3-5}
import { Button } from "./ui/button"

export default function MyButton() {
  return <Button>Click me</Button>
}
```
````

Features:
- `title="..."`: Show filename
- `{1,3-5}`: Highlight lines 1, 3-5
- `showLineNumbers`: Show line numbers

## Directory Structure Best Practices

### Organize by Category

```
src/content/docs/
├── index.mdx
├── installation.mdx
├── components/
│   ├── index.mdx
│   ├── button.mdx
│   ├── card.mdx
│   └── meta.json
├── hooks/
│   ├── index.mdx
│   ├── use-toast.mdx
│   └── meta.json
└── examples/
    ├── index.mdx
    ├── forms.mdx
    └── meta.json
```

### Meta Files

Each directory should have a `meta.json` file:

```json
{
  "title": "Section Title",
  "pages": ["page1", "page2", "page3"]
}
```

Or use arrays for more control:

```json
{
  "title": "Components",
  "pages": [
    {
      "title": "UI Components",
      "pages": ["button", "card", "input"]
    },
    {
      "title": "Form Components",
      "pages": ["checkbox", "select", "radio"]
    }
  ]
}
```

## Component Documentation Template

Here's a template for documenting components:

```mdx
---
title: Component Name
description: Brief description of the component
---

import { ComponentName } from "@/components/ui/component-name";

# Component Name

Brief description and live example.

<div className="my-8">
  <ComponentName>Example</ComponentName>
</div>

## Installation

<Tabs items={["CLI", "Manual"]}>
<Tab value="CLI">

\`\`\`bash
npx blok-ui@latest add component-name
\`\`\`

</Tab>
<Tab value="Manual">

<Steps>

### Install dependencies

\`\`\`bash
npm install package-name
\`\`\`

### Copy component code

\`\`\`tsx title="components/ui/component-name.tsx"
// Component code here
\`\`\`

</Steps>

</Tab>
</Tabs>

## Usage

\`\`\`tsx
import { ComponentName } from "@/components/ui/component-name"

export default function MyComponent() {
  return <ComponentName>Content</ComponentName>
}
\`\`\`

## Examples

### Basic Example

Description of example.

<div className="my-6">
  <ComponentName>Basic example</ComponentName>
</div>

\`\`\`tsx
<ComponentName>Basic example</ComponentName>
\`\`\`

### Advanced Example

More complex example.

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `prop1` | `string` | `undefined` | Description |
| `prop2` | `boolean` | `false` | Description |

## Accessibility

- Keyboard navigation details
- ARIA attributes
- Screen reader support

## Best Practices

1. Best practice 1
2. Best practice 2
3. Best practice 3
```

## Development

### Running the dev server

```bash
npm run dev
```

Visit `http://localhost:3000/docs` to view your documentation.

### Building for production

```bash
npm run build
```

The MDX files will be compiled during the build process.

## Advanced Configuration

### Custom Theme

Customize the documentation theme in `src/app/docs/layout.tsx`:

```typescript
<DocsLayout
  tree={source.pageTree}
  nav={{
    title: "Your Brand",
    url: "/",
  }}
  sidebar={{
    defaultOpenLevel: 0,
    banner: <CustomBanner />,
  }}
  links={[
    { text: "Components", url: "/docs/components" },
    { text: "GitHub", url: "https://github.com/..." },
  ]}
>
  {children}
</DocsLayout>
```

### Search

Add search to your documentation:

```bash
npm install fumadocs-core/search
```

Then configure in your layout.

### Custom MDX Components

Add custom components in `mdx-components.tsx`:

```typescript
export function useMDXComponents(components: MDXComponents) {
  return {
    ...defaultComponents,
    ...components,
    // Add custom components
    CustomComponent: () => <div>Custom</div>,
  };
}
```

Use in MDX:

```mdx
<CustomComponent />
```

## Troubleshooting

### MDX not rendering

1. Check that `fumadocs-mdx` is installed
2. Verify `source.config.ts` points to correct directory
3. Ensure `next.config.ts` includes `withMDX()`

### Sidebar not showing

1. Check that `meta.json` files exist
2. Verify page names match file names (without `.mdx`)
3. Check `source.pageTree` is passed to `DocsLayout`

### Styles not working

1. Import Fumadocs styles in your global CSS:

```css
@import 'fumadocs-ui/style.css';
```

2. Configure Tailwind to include Fumadocs:

```js
content: [
  './node_modules/fumadocs-ui/dist/**/*.js',
]
```

## Resources

- [Fumadocs Documentation](https://fumadocs.vercel.app)
- [MDX Documentation](https://mdxjs.com)
- [Next.js Documentation](https://nextjs.org/docs)

## Next Steps

1. **Add more component documentation**: Follow the template above
2. **Customize theme**: Update colors and styling in layout
3. **Add search**: Install and configure search functionality
4. **Add examples**: Create interactive code playgrounds
5. **Deploy**: Deploy to Vercel or your preferred platform

