'use client'

import { formatColorValue, parseCssVariablesByTheme, resolveVariableValue } from "@/lib/token-utils";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CopyableToken } from "@/components/docsite/copyable-token";

type Props = {
  content: string;
};

// Calculate contrast ratio between two colors
const getContrastRatio = (color1: string, color2: string = '#FFFFFF'): number | undefined => {
  if (!color1 || color1.includes('rgba(') || color1.includes('rgb(') || !color1.startsWith('#')) {
    return undefined;
  }

  // Helper function to calculate the luminance of a color
  function getLuminance(color: string): number {
    const hex = color.replace(/^#/, '');
    
    // Check if hex is valid
    if (hex.length !== 6) {
      return NaN;
    }
    
    const r = parseInt(hex.slice(0, 2), 16) / 255;
    const g = parseInt(hex.slice(2, 4), 16) / 255;
    const b = parseInt(hex.slice(4, 6), 16) / 255;

    // Check for NaN values
    if (isNaN(r) || isNaN(g) || isNaN(b)) {
      return NaN;
    }

    const gammaCorrectedR = r <= 0.04045 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
    const gammaCorrectedG = g <= 0.04045 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
    const gammaCorrectedB = b <= 0.04045 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);

    return 0.2126 * gammaCorrectedR + 0.7152 * gammaCorrectedG + 0.0722 * gammaCorrectedB;
  }

  const luminance1 = getLuminance(color1);
  const luminance2 = getLuminance(color2);

  // Check if luminance calculations are valid
  if (isNaN(luminance1) || isNaN(luminance2)) {
    return undefined;
  }

  const brighter = Math.max(luminance1, luminance2);
  const darker = Math.min(luminance1, luminance2);

  return (brighter + 0.05) / (darker + 0.05);
};

export function ColorsClient({ content }: Props) {
  const [defaultColors, setDefaultColors] = useState<Record<string, string>>({});
  const [darkColors, setDarkColors] = useState<Record<string, string>>({});

  const [defaultVars, setDefaultVars] = useState<Record<string, string>>({});
  const [darkVars, setDarkVars] = useState<Record<string, string>>({});

  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);

  useEffect(() => {
    const { default: parsedDefault, dark: parsedDark, defaultVars, darkVars } = parseCssVariablesByTheme(content);
    
    setDefaultColors(parsedDefault);
    setDarkColors(parsedDark);
    setDefaultVars(defaultVars);
    setDarkVars(darkVars);

    // Detect theme based on <html class="dark">
    const observer = new MutationObserver(() => {
      setIsDarkTheme(document.documentElement.classList.contains("dark"));
    });

    // Set initial theme
    setIsDarkTheme(document.documentElement.classList.contains("dark"));

    // Observe class changes on <html>
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, [content]);

  // Filter to only show base color tokens
  const allKeys = Object.keys(defaultColors)
    .filter((key) => {
      const value = defaultColors[key];
      const trimmedValue = value.trim();
      const isDirectColor = 
        trimmedValue.startsWith("#") ||
        trimmedValue.startsWith("rgba(") ||
        trimmedValue.startsWith("rgb(") ||
        trimmedValue === "transparent";
      
      return (
        key.startsWith("color-") &&
        isDirectColor &&
        !trimmedValue.startsWith("var(")
      );
    });

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="px-4 min-w-[200px]">Example</TableHead>
            <TableHead className="px-4">Token</TableHead>
            <TableHead className="px-4">Value (Default)</TableHead>
            <TableHead className="px-4">Value (Dark)</TableHead>
            <TableHead className="px-4 text-right">Contrast against bg</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allKeys.map((key) => {
            const defaultValue = defaultColors[key];
            const darkValue = darkColors[key] || defaultValue;
            const bgColor = isDarkTheme ? darkValue : defaultValue;
            const { light, dark } = resolveVariableValue(defaultValue, defaultVars, darkVars);
            
            const formattedLight = formatColorValue(light);
            const formattedDark = formatColorValue(dark);
            const contrastRatio = getContrastRatio(light);
            const bgForContrast = isDarkTheme ? '000000' : 'FFFFFF';

            return (
              <TableRow key={key}>
                <TableCell className="px-4 py-3 min-w-[200px]">
                  <div
                    className="h-8 w-full max-w-[180px] rounded-md border shadow-inner"
                    style={{ backgroundColor: bgColor }}
                  />
                </TableCell>
                <TableCell className="px-4 py-3">
                  <CopyableToken token={key} />
                </TableCell>
                <TableCell className="px-4 py-3">
                  <code className="font-mono text-sm">{formattedLight}</code>
                </TableCell>
                <TableCell className="px-4 py-3">
                  <code className="font-mono text-sm">{formattedDark}</code>
                </TableCell>
                <TableCell className="px-4 py-3 text-right">
                  {contrastRatio && !isNaN(contrastRatio) && (
                    <a
                      href={`https://webaim.org/resources/contrastchecker/?fcolor=${formattedLight.replace('#', '')}&bcolor=${bgForContrast}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`font-mono text-sm underline ${
                        contrastRatio >= 4.5 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                      }`}
                    >
                      {contrastRatio.toFixed(2)}
                    </a>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

