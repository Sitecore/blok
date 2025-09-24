<div align="left">
  <img src="https://delivery-sitecore.sitecorecontenthub.cloud/api/public/content/logo-blok-dark" alt="Blok Design System" width="200" />
</div>

  [![GitHub license](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](https://github.com/sitecore/blok/blob/main/LICENSE)
  [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/sitecore/blok/blob/main/CONTRIBUTING.md)
</div>


<br/>

# Build better products faster

Blok is Sitecore's product design system: the UI framework and style guide we use to build great apps. It's publicly available, so that anyone can easily build software in the Sitecore product design language.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Configurations](#configurations)
- [Community & Support](#community--support)
- [Contributing](#contributing)
- [Acknowledgements](#acknowledgements)
- [License](#license)

## Overview

Blok provides a comprehensive design system that includes:

- **Design Tokens**: Colors, typography, icons, logos, illustrations - the raw materials
- **Components**: Ready-to-use React UI components built with accessibility and consistency in mind
- **Patterns**: Recommended patterns and compositions built with our components
- **Best Practices**: Guidelines for writing code and content
- **Tools**: Developer and designer tools for efficient workflow

This design system is built on top of shadcn/ui and Tailwind CSS, providing a solid foundation while maintaining Sitecore's unique design language.

**Document site**: https://blok.sitecore.com/beta

## Features

- **Modern Tech Stack** - Built with Next.js, React, TypeScript, and Tailwind CSS
- **Developer-Friendly** - Easy installation and customization
- **Type-Safe** - Full TypeScript support
- **AI-Native** - Compatible with MCP tools
- **Modular** - Install only the components you need
- **Customizable** - Easy theming and customization options

## Architecture

### Folder Structure

Blok combines a component registry system with a documentation site for examples. The following structure shows how both systems work together:

```
blok/
├── src/
│   ├── app/                   
│   │   ├── (registry)/        # Registry pages and components
│   │   ├── demo/              # Component demos and examples
│   │   ├── globals.css        # Global styles and CSS variables
│   │   ├── colors.css         # Color system
│   │   ├── typography.css     # Typography system
│   │   ├── shadows.css        # Shadow system
│   │   └── borderRadius.css   # Border radius system
│   ├── components/
│   │   ├── ui/                # Core UI components 
│   │   ├── registry/          # Document site specific components
│   │   └── blocks             # Sitecore block components
│   ├── layouts/               # Document site Layout components
│   ├── lib/                   # Utilities
│   └── hooks/                 # Custom React hooks
├── public/r/                  # Generated registry files
├── registries/                # Registry configuration
```

## Getting Started

### Prerequisites

- Node.js 22 or higher
- pnpm (recommended) or npm
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sitecore/blok.git
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Build the registry**
   ```bash
   pnpm run registry:build
   ```

4. **Start the development server**
   ```bash
   pnpm run dev
   ```

### Configuration

#### Environment Variables

Create a `.env.local` file in your project root:

```env
# Vercel Project URL
VERCEL_PROJECT_PRODUCTION_URL=your_vercel_project_url
```

## Usage

### Development Usage

To use Blok in your development workflow:

1. **Install the theme and components**
   ```bash
   npx shadcn@latest add https://blok-shadcn.vercel.app/r/theme.json
   npx shadcn@latest add https://blok-shadcn.vercel.app/r/button.json
   ```

2. **Import and use components in your code**
   ```tsx
   import { Button } from "@/components/ui/button"
   
   export function MyComponent() {
     return <Button>Click me</Button>
   }
   ```

3. **Customize the theme by modifying CSS variables in your globals.css**

### Usage Examples

```tsx
import { Button } from "@/components/ui/button"

export function ButtonExamples() {
  return (
    <div className="space-x-2">
      {/* Default button */}
      <Button>Default</Button>
      
      {/* Primary button */}
      <Button variant="default">Primary</Button>
      
      {/* Secondary button */}
      <Button variant="secondary">Secondary</Button>
      
      {/* Destructive button */}
      <Button variant="destructive">Delete</Button>
      
      {/* Outline button */}
      <Button variant="outline">Outline</Button>
    </div>
  )
}
```

## Community & Support

- **Documentation**: [https://blok.sitecore.com/beta](https://blok.sitecore.com/beta)
- **Support**: [Support Guide](https://github.com/sitecore/blok/blob/main/SUPPORT.md)
- **Issues**: [GitHub Issues](https://github.com/sitecore/blok/issues)
- **Slack**: [Join our community Slack workspace](https://siteco.re/sitecoreslack)

## Contributing

We are very grateful to the community for contributing bug fixes and improvements. We welcome all efforts to evolve and improve the Blok; read below to learn how to participate in those efforts.

### Code of Conduct

Sitecore has adopted a [Code of Conduct](https://github.com/sitecore/blok/blob/main/CODE_OF_CONDUCT.md) that we expect project participants to adhere to. Please read the full text so that you can understand what actions will and will not be tolerated.

### Contributing guide

Read our [contributing guide](https://github.com/sitecore/blok/blob/main/CONTRIBUTING.md) to learn about our development process, how to propose bug fixes and improvements, and how to build and test your changes to React.

## Acknowledgements

We would like to thank the open source community for their contributions and the shadcn/ui team for providing the excellent foundation that Blok is built upon.

## License

Sitecore Blok is using the [Apache 2.0 license](https://github.com/sitecore/blok/blob/main/LICENSE).