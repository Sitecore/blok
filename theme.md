# Theme Configuration

## Overview

Tailwind v4 uses CSS variables with type prefixes to generate utility classes. Prefixed variables automatically generate corresponding utilities across all Tailwind features.

## Architecture

### `:root` and `.dark`
Define semantic variables that serve as single sources of truth. These can hold raw values or reference other variables.

```css
:root {
  --background: #ffffff;
  --primary: oklch(0.5 0.2 250);
  --muted: var(--gray-100);
  --radius: 0.5rem;
  --font-sans: 'Inter', sans-serif;
}

.dark {
  --background: #000000;
  --primary: oklch(0.7 0.2 250);
  --muted: var(--gray-800);
}
```

**Purpose:** Centralize theme values with automatic dark mode overrides.

### `theme (inline)`
Maps semantic variables to Tailwind's type system using appropriate prefixes.

```css
--color-background: var(--background);
--color-primary: var(--primary);
--color-muted: var(--muted);
--radius-default: var(--radius);
--font-family-sans: var(--font-sans);
```

**Purpose:** Bridge semantic variables to Tailwind utilities (`bg-background`, `rounded-default`, `font-sans`, etc.).

## Type Prefixes

Tailwind recognizes various prefixes to generate utilities:
- `--color-*` → `bg-*`, `text-*`, `border-*`
- `--radius-*` → `rounded-*`
- `--font-family-*` → `font-*`
- `--font-size-*` → `text-*`
- `--spacing-*` → `p-*`, `m-*`, `gap-*`

## Registry Structure

```json
{
  "cssVars": {
    "theme": {
      "--color-background": "var(--background)",
      "--color-primary": "var(--primary)",
      "--radius-default": "var(--radius)"
    }
  },
  "css": {
    ":root": {
      "--background": "#ffffff",
      "--primary": "oklch(0.5 0.2 250)",
      "--radius": "0.5rem"
    },
    ".dark": {
      "--background": "#000000",
      "--primary": "oklch(0.7 0.2 250)"
    }
  }
}
```

### Merge Behavior
- **`css`**: Overrides existing definitions
- **`cssVars`**: Merges without overriding

## Design Philosophy

1. **Single source of truth**: Define design tokens once in `:root`/`.dark`
2. **Semantic naming**: Use descriptive names (`--background`, `--primary`) not implementation details
3. **Automatic theming**: Dark mode switches by toggling `.dark` class
4. **Type safety**: Prefixes ensure Tailwind recognizes variable types and generates appropriate utilities