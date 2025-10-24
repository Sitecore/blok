export function convertCssVariablesToObject(
  cssString: string,
  prefix: string
): Record<string, string> {
  const lines = cssString.split("\n").map((line) => line.trim());
  const colorObject: Record<string, string> = {};

  for (const line of lines) {
    if (line.startsWith(prefix)) {
      const parts = line.split(":");
      if (parts.length === 2) {
        const key = parts[0].trim().substring(prefix.length);
        const value = parts[1].trim().replace(";", "");
        colorObject[key] = value;
      }
    } else if (line.startsWith("--") && !line.startsWith("/*")) {
      const parts = line.split(":");
      if (parts.length === 2) {
        const key = parts[0].trim().substring(2);
        const value = parts[1].trim().replace(";", "");
        colorObject[key] = value;
      }
    }
  }

  return colorObject;
}

type ThemeColors = {
  default: Record<string, string>;
  dark: Record<string, string>;
}

export function parseCssVariablesByTheme(
  cssString: string,
  prefix: string = "--color-"
): ThemeColors {
  const lines = cssString.split("\n").map((line) => line.trim());
  
  const defaultColors: Record<string, string> = {};
  const darkColors: Record<string, string> = {};

  let currentTheme: 'default' | 'dark' | null = 'default';

  for (let rawline of lines) {
    const line = rawline.trim();

    // Detect dark mode block
    if (line.startsWith(".dark {") || line.includes("prefers-color-scheme: dark")) {
      currentTheme = 'dark';
      continue;
    }

    // Detect end of block
    if (line === "}" || line === "};") {
      currentTheme = 'default';
      continue;
    }

    // Pass variable lines
    if (line.startsWith(prefix)) {
      const [fullKey, value] = line.split(":").map(part => part.trim().replace(";", ""));
      const key = fullKey.replace(/^--/, "");

      if (currentTheme === 'default') {
        defaultColors[key] = value;
      } else {
        darkColors[key] = value;
      }
    }
  }

  return { default: defaultColors, dark: darkColors };
}

function resolveColorReferences(
  colors: Record<string, string>,
  allColors: Record<string, string>,
): Record<string, string> {
  const resolved: Record<string, string> = {};

  const resolveValues = (value: string, seen = new Set<string>()): string => {
    const varMatch = value.match(/^var\(--([a-zA-Z0-9\-]+)\)$/);

    if (varMatch) {
      const refKey = varMatch[1];

      if (seen.has(refKey)) return value;

      const refValue = allColors[refKey];
      if (!refValue) return value;

      return resolveValues(refValue, new Set([...seen, refKey]));
    }

    return value;
  };

  for (const [key, value] of Object.entries(colors)) {
    resolved[key] = resolveValues(value);
  }

  return resolved;
}

export function formatColorValue(value: string): string {
  const varMatch = value.match(/^var\(--color-([a-zA-Z0-9\-]+)\)$/);
  if (varMatch) {
    return varMatch[1].replace(/-/g, ".");
  }
  return value;
}