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

export function SemanticTokensClient({ content }: Props) {
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

  // Extract semantic tokens from the @theme inline block
  const extractSemanticTokens = (): Record<string, string> => {
    const lines = content.split("\n");
    const semanticTokens: Record<string, string> = {};
    let inThemeBlock = false;
    
    const baseColorPattern = /^color-(blue|red|green|yellow|purple|pink|orange|cyan|teal|gray|blackAlpha|whiteAlpha|danger|success|warning|info|primary|neutral)-\d+$/;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      if (line.includes("@theme inline")) {
        inThemeBlock = true;
        continue;
      }

      if (line === "}" || line === "};" || line.startsWith("}")) {
        if (inThemeBlock) {
          inThemeBlock = false;
        }
        continue;
      }

      if (inThemeBlock && line.startsWith("--color-") && !line.startsWith("/*")) {
        const colonIndex = line.indexOf(":");
        if (colonIndex > 0) {
          const key = line.substring(0, colonIndex).trim().replace(/^--/, "");
          const value = line.substring(colonIndex + 1).trim().replace(/;.*$/, "").trim();
          
          if (value.startsWith("var(") && !baseColorPattern.test(key)) {
            semanticTokens[key] = value;
          }
        }
      }
    }

    return semanticTokens;
  };

  const semanticTokens = extractSemanticTokens();
  const allKeys = Object.keys(semanticTokens).sort();

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="px-4 min-w-[200px]">Example</TableHead>
            <TableHead className="px-4">Token</TableHead>
            <TableHead className="px-4">Value (Default)</TableHead>
            <TableHead className="px-4">Value (Dark)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allKeys.map((key) => {
            const semanticValue = semanticTokens[key];
            
            const allDefaultVars = { ...defaultVars, ...defaultColors };
            const allDarkVars = { ...darkVars, ...darkColors };
            const { light, dark } = resolveVariableValue(semanticValue, allDefaultVars, allDarkVars);
            
            const bgColor = isDarkTheme ? dark : light;

            const formattedLight = formatColorValue(light);
            const formattedDark = formatColorValue(dark);

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
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

