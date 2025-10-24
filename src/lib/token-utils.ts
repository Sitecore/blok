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
  defaultVars: Record<string, string>;
  darkVars: Record<string, string>;
}

// parse the css variables by theme
export function parseCssVariablesByTheme(
  cssString: string,
): ThemeColors {
  const lines = cssString.split("\n").map((line) => line.trim());
  
  // initialize the color objects to display
  const defaultColors: Record<string, string> = {};
  const darkColors: Record<string, string> = {};

  // initialize the color objects to resolve
  const defaultVars: Record<string, string> = {};
  const darkVars: Record<string, string> = {};

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
    if (line.startsWith("--")) {
      const [fullKey, valuePart] = line.split(":");
      if(!valuePart) continue;

      const key = fullKey.trim().replace(/^--/, "");
      const value = valuePart.trim().replace(";", "");

      const isColorVar = fullKey.startsWith("--color-");

      if (currentTheme === 'default') {
        if (isColorVar) defaultColors[key] = value;
        else defaultVars[key] = value;
      } else {
        if (isColorVar) darkColors[key] = value;
        else darkVars[key] = value;
      }
    }
  }

  return { default: defaultColors, dark: darkColors, defaultVars, darkVars };
}

// format the color value to be displayed in dot notation
export function formatColorValue(value: string): string {
  const varMatch = value.match(/^var\(--color-([a-zA-Z0-9\-]+)\)$/);
  if (varMatch) {
    return varMatch[1].replace(/-/g, ".");
  }
  return value;
}

// resolve the variable value to the light and dark values
export function resolveVariableValue(
  value: string,
  defaultColors: Record<string, string>,
  darkColors: Record<string, string>
): { light: string; dark: string } {
  // if the value is not a variable, return the value as it is
  if (!value.startsWith("var(")) {
    return { light: value, dark: value };
  }

  // extract the variable name from the variable declaration
  const match = value.match(/^var\(--([a-zA-Z0-9\-_]+)\)$/);
  if (!match) return { light: value, dark: value };

  const varName = match[1];

  // Find the light and dark values
  const lightValue = defaultColors[varName];
  const darkValue = darkColors[varName] || lightValue;

  // Recursively resolve if those also reference other vars
  const resolvedLight = lightValue?.startsWith("var(")
    ? resolveVariableValue(lightValue, defaultColors, darkColors).light
    : lightValue;

  const resolvedDark = darkValue?.startsWith("var(")
    ? resolveVariableValue(darkValue, defaultColors, darkColors).dark
    : darkValue;

  return {
    light: resolvedLight || value,
    dark: resolvedDark || value,
  };
}