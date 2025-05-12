# BlokCN Shadcn UI

This repository is a port of the **Blok** theme (Chakra UI v2) to [shadcn/ui](https://ui.shadcn.com). It provides a component library styled with Blok tokens and a local component registry.

---

## Project Structure

```text
├── app/
│   ├── colors.css         # Imported Blok color tokens
│   └── globals.css        # CSS variables mapping based on Blok 
│   └── sc/                # Sample pages simulating existing UIs
├── blok-chakra-theme.json # Original Blok theme tokens
├── registry/              # Source components for local registry
│   └── [style]/ui         # e.g. core/ui/button.tsx
├── public/
│   └── r/                 # Generated registry JSON files
├── README.md
└── package.json
```

## Theming & Styles

- **Colors**: All Blok theme colors are imported in `app/colors.css`.
- **CSS Variables**: Mappings in `app/globals.css` override `:root` based on `blok-chakra-theme.json`.

## Running the Project

Install dependencies and start the dev server:

```bash
pnpm install
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) to browse all shadcn components with Blok theming.

## Component Storybook

Visit `/sc` in your browser (e.g. [http://localhost:3000/sc/list-page](http://localhost:3000/sc/list-page)) to see example UIs ported from existing designs.

## Component Registry

This app can act as a shadcn registry server (locally or deployed), or you may install directly from GitHub.

### Installing from Registry

```text
# Local registry
npx shadcn add http://localhost:3000/r/button.json

# Deployed registry
npx shadcn add https://blokcn.vercel.app/r/button.json

# GitHub raw URL
npx shadcn add https://raw.githubusercontent.com/aeroplaniko/blokcn/main/public/r/button.json
```

## Adding & Updating Components

Place new or updated component source files under `registry/[style]/`, for example:

```text
// atomics located under /ui
/registry/new-york/ui/button.tsx

// components located under /blocks
/registry/new-york/blocks/dashboard-01/
```

## Building the Registry

Generate JSON descriptors for each component:

```bash
npx shadcn@canary build
```

Registry output files will be in `public/r/[component].json`.

 