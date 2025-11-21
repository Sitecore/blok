# Blok Component Documentation Structure

## 📖 Overview

This document provides a complete overview of the Fumadocs-based documentation system for Blok.

## ✅ What Has Been Set Up

### 1. Fumadocs Framework
- ✅ Installed Fumadocs dependencies (`fumadocs-core`, `fumadocs-mdx`, `fumadocs-ui`)
- ✅ Configured MDX support with rehype-pretty-code for syntax highlighting
- ✅ Set up source loader to generate pages from MDX files
- ✅ Integrated with Next.js App Router

### 2. File Structure

```
blok/
├── src/
│   ├── content/
│   │   └── docs/                          # Documentation content
│   │       ├── index.mdx                  # Documentation home page
│   │       ├── installation.mdx           # Installation guide
│   │       ├── meta.json                  # Root navigation config
│   │       └── components/                # Component documentation
│   │           ├── index.mdx              # Components overview
│   │           ├── button.mdx             # Button component (example)
│   │           ├── card.mdx               # Card component (example)
│   │           └── meta.json              # Components navigation
│   │
│   ├── docs/
│   │   └── source.ts                      # Fumadocs source loader
│   │
│   ├── app/
│   │   ├── globals.css                    # Global styles (includes Fumadocs CSS)
│   │   └── docs/
│   │       ├── layout.tsx                 # Docs layout with sidebar
│   │       └── [[...slug]]/
│   │           └── page.tsx               # Dynamic page renderer
│   │
│   └── components/
│       └── ui/                            # Your UI components
│
├── mdx-components.tsx                     # MDX component mappings
├── source.config.ts                       # MDX build configuration
├── next.config.ts                         # Next.js + MDX config
│
├── FUMADOCS_SETUP.md                      # Complete setup guide
├── DOCS_QUICKSTART.md                     # Quick start guide
└── DOCUMENTATION_STRUCTURE.md             # This file
```

### 3. Documentation Pages Created

#### Core Pages
- **`/docs`** - Introduction to Blok
  - Features overview
  - Quick start guide
  - Component categories

- **`/docs/installation`** - Installation guide
  - Requirements
  - CLI installation
  - Manual installation
  - Configuration steps

- **`/docs/components`** - Components overview
  - Component categories
  - Component grid with links

#### Example Component Documentation
- **`/docs/components/button`** - Complete Button documentation
  - Installation (CLI & manual)
  - Usage examples
  - 8+ examples (variants, sizes, icons, loading)
  - Full API reference
  - Accessibility guidelines
  - Best practices

- **`/docs/components/card`** - Complete Card documentation
  - Installation (CLI & manual)
  - Usage examples
  - Multiple examples (simple, form, notifications, grid)
  - API reference for all subcomponents
  - Accessibility guidelines
  - Best practices

### 4. Features Implemented

#### Navigation
- ✅ Automatic sidebar generation from meta.json files
- ✅ Hierarchical navigation structure
- ✅ Active page highlighting
- ✅ Mobile-responsive sidebar

#### Content Features
- ✅ MDX support for React components in markdown
- ✅ Syntax highlighting for code blocks
- ✅ Tabs component for CLI vs Manual instructions
- ✅ Callout component for info/warning/error messages
- ✅ Steps component for step-by-step guides
- ✅ Live component previews
- ✅ Code examples with line highlighting

#### Styling
- ✅ Dark mode support
- ✅ Responsive design
- ✅ Tailwind CSS integration
- ✅ Custom theming support

## 🎯 Usage Guide

### View Documentation

```bash
npm run dev
```

Visit:
- http://localhost:3000/docs - Documentation home
- http://localhost:3000/docs/installation - Installation guide
- http://localhost:3000/docs/components - Components overview
- http://localhost:3000/docs/components/button - Button docs
- http://localhost:3000/docs/components/card - Card docs

### Add New Component Documentation

1. **Create MDX file**: `src/content/docs/components/[name].mdx`
2. **Add frontmatter**:
   ```mdx
   ---
   title: Component Name
   description: Brief description
   ---
   ```
3. **Write content**: Use the template in DOCS_QUICKSTART.md
4. **Add to navigation**: Update `src/content/docs/components/meta.json`
5. **View**: Visit `/docs/components/[name]`

### Documentation Sections Template

```mdx
# Component Name

## Installation
- CLI method
- Manual method with dependencies

## Usage
- Basic import and usage example

## Examples
- Multiple use cases with live previews
- Code examples for each

## API Reference
- Props table with types and defaults

## Accessibility
- Keyboard navigation
- ARIA attributes
- Screen reader support

## Best Practices
- Usage guidelines
- Common patterns

## Related Components
- Links to similar components
```

## 📚 Available Components in MDX

### Tabs
Switch between different content sections (e.g., CLI vs Manual installation)

```mdx
<Tabs items={["CLI", "Manual"]}>
<Tab value="CLI">
Content for CLI
</Tab>
<Tab value="Manual">
Content for Manual
</Tab>
</Tabs>
```

### Callout
Highlight important information

```mdx
<Callout type="info">Info message</Callout>
<Callout type="warning">Warning message</Callout>
<Callout type="error">Error message</Callout>
```

### Steps
Create step-by-step guides

```mdx
<Steps>
### Step 1
First step content

### Step 2
Second step content
</Steps>
```

### Code Blocks
Syntax-highlighted code with features

````mdx
```tsx title="filename.tsx" {1,3-5} showLineNumbers
// Highlighted line
const code = "example"
// These lines are highlighted
const more = "code"
const here = "too"
```
````

### Live Component Previews
Import and render actual components

```mdx
import { Button } from "@/components/ui/button"

<div className="my-8">
  <Button>Click me</Button>
</div>
```

## 🎨 Customization

### Theme Customization

Edit `src/app/docs/layout.tsx`:

```typescript
<DocsLayout
  tree={source.pageTree}
  nav={{
    title: "Your Brand",
    url: "/",
  }}
  sidebar={{
    defaultOpenLevel: 0,
    banner: <YourBanner />,
  }}
  links={[
    { text: "Components", url: "/docs/components" },
    { text: "GitHub", url: "https://github.com/..." },
  ]}
>
  {children}
</DocsLayout>
```

### Navigation Structure

Edit `src/content/docs/components/meta.json`:

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

### Add Custom MDX Components

Edit `mdx-components.tsx`:

```typescript
export function useMDXComponents(components: MDXComponents) {
  return {
    ...defaultComponents,
    ...components,
    CustomComponent: YourComponent,
  };
}
```

## 📋 Documentation Standards

### File Naming
- Use kebab-case: `button.mdx`, `dropdown-menu.mdx`
- Match component names: If component is `DropdownMenu`, file is `dropdown-menu.mdx`

### Frontmatter Requirements
```yaml
---
title: Component Name       # Required
description: Brief desc     # Required
icon: IconName              # Optional (Lucide icon)
---
```

### Content Structure
1. **Title & Preview** - H1 heading with live component
2. **Installation** - Tabs with CLI and Manual
3. **Usage** - Basic import and usage
4. **Examples** - 3+ examples with previews and code
5. **API Reference** - Props table
6. **Accessibility** - A11y guidelines
7. **Best Practices** - Usage tips
8. **Related** - Links to related components

### Code Examples
- Always include both preview and code
- Use realistic examples
- Test all code before documenting
- Include TypeScript types

## 🚀 Next Steps

### Immediate Actions
1. ✅ Fumadocs is installed and configured
2. ✅ Example documentation is created
3. 📝 **Next**: Document your remaining components
4. 📝 **Next**: Add more examples
5. 📝 **Next**: Add search functionality

### Expand Documentation
1. **Component Docs**: Create docs for all your components
2. **Examples**: Add example pages showing real-world usage
3. **Guides**: Create guides for common use cases
4. **API Reference**: Add detailed API documentation
5. **Changelog**: Document version changes

### Enhance User Experience
1. **Search**: Install fumadocs-search for full-text search
2. **Playground**: Add interactive code playgrounds
3. **Themes**: Create theme customization guide
4. **Changelog**: Add version history
5. **Contributing**: Add contribution guidelines

## 📖 Documentation Resources

### Files to Reference
- [FUMADOCS_SETUP.md](./FUMADOCS_SETUP.md) - Complete setup and configuration guide
- [DOCS_QUICKSTART.md](./DOCS_QUICKSTART.md) - Quick reference for adding docs
- [src/content/docs/components/button.mdx](./src/content/docs/components/button.mdx) - Example button documentation
- [src/content/docs/components/card.mdx](./src/content/docs/components/card.mdx) - Example card documentation

### External Resources
- [Fumadocs Documentation](https://fumadocs.vercel.app)
- [MDX Documentation](https://mdxjs.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Radix UI](https://www.radix-ui.com)

## 🔍 Troubleshooting

### Common Issues

**Documentation not showing**
- Check file is in `src/content/docs/`
- Verify frontmatter syntax
- Check meta.json includes the page
- Restart dev server

**Imports not working**
- Use full path aliases: `@/components/ui/button`
- Check tsconfig.json paths
- Verify component exports

**Styles not applied**
- Check Fumadocs CSS is imported in globals.css
- Verify Tailwind content includes Fumadocs
- Check className syntax

**Code blocks not highlighting**
- Verify language tag: \`\`\`tsx
- Check rehype-pretty-code is installed
- Verify source.config.ts configuration

## ✅ Ready to Use

Your Fumadocs setup is complete and ready to use! 

Start by:
1. Running `npm run dev`
2. Visiting http://localhost:3000/docs
3. Exploring the example documentation
4. Adding docs for your components using the templates

For questions or issues, refer to:
- [FUMADOCS_SETUP.md](./FUMADOCS_SETUP.md) - Detailed setup guide
- [DOCS_QUICKSTART.md](./DOCS_QUICKSTART.md) - Quick reference
- Example component docs as templates

---

**Happy documenting! 📝**

