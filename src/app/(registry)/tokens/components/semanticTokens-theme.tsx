'use client'

import { formatColorValue, parseCssVariablesByTheme, resolveVariableValue } from "@/lib/token-utils";
import { useEffect, useState } from "react";

type Props = {
  content: string;
};

const SemanticTokensDemo = ({ content }: Props) => {
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
  // These are tokens that start with --color- and reference other variables
  const extractSemanticTokens = (): Record<string, string> => {
    const lines = content.split("\n");
    const semanticTokens: Record<string, string> = {};
    let inThemeBlock = false;
    
    // Base color patterns to exclude (direct color values, not semantic)
    const baseColorPattern = /^color-(blue|red|green|yellow|purple|pink|orange|cyan|teal|gray|blackAlpha|whiteAlpha|danger|success|warning|info|primary|neutral)-\d+$/;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      // Check if we're entering the @theme inline block
      if (line.includes("@theme inline")) {
        inThemeBlock = true;
        continue;
      }

      // Check if we're leaving a block
      if (line === "}" || line === "};" || line.startsWith("}")) {
        if (inThemeBlock) {
          inThemeBlock = false;
        }
        continue;
      }

      // Only process lines within @theme block that start with --color-
      if (inThemeBlock && line.startsWith("--color-") && !line.startsWith("/*")) {
        const colonIndex = line.indexOf(":");
        if (colonIndex > 0) {
          const key = line.substring(0, colonIndex).trim().replace(/^--/, "");
          const value = line.substring(colonIndex + 1).trim().replace(/;.*$/, "").trim();
          
          // Only include tokens that reference other variables (semantic tokens)
          // Exclude base color tokens (those with direct hex/rgba/oklch values or numbered color tokens)
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
    <div style={{ width: "100%", overflowX: "auto" }}>
      <table
        style={{ width: "100%", borderCollapse: "collapse", marginTop: "1rem" }}
      >
        <thead>
          <tr style={{ borderBottom: "2px solid #ccc" }}>
            <th style={{ padding: "0.8rem", textAlign: "left" }}>Name</th>
            <th style={{ padding: "0.8rem", textAlign: "center" }}>Color</th>
            <th style={{ padding: "0.8rem", textAlign: "left" }}>Value (Default)</th>
            <th style={{ padding: "0.8rem", textAlign: "left" }}>Value (Dark)</th>
          </tr>
        </thead>
        <tbody>
          {allKeys.map((key) => {
            // Get the semantic token value (which references another variable)
            const semanticValue = semanticTokens[key];
            
            // Resolve the referenced variable to get the actual color value
            // Merge defaultColors and defaultVars for resolution, same for dark
            const allDefaultVars = { ...defaultVars, ...defaultColors };
            const allDarkVars = { ...darkVars, ...darkColors };
            const { light, dark } = resolveVariableValue(semanticValue, allDefaultVars, allDarkVars);
            
            // Get the display color based on current theme
            const bgColor = isDarkTheme ? dark : light;

            // Format the value for display
            const formattedLight = formatColorValue(light);
            const formattedDark = formatColorValue(dark);

            return (
              <tr key={key} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "0.8rem" }}>{key}</td>
                <td style={{ padding: "0.8rem", textAlign: "center" }}>
                  <div
                    style={{
                      width: "40px",
                      height: "20px",
                      borderRadius: "4px",
                      border: "1px solid #ddd",
                      margin: "0 auto",
                      backgroundColor: bgColor,
                    }}
                  ></div>
                </td>
                <td style={{ padding: "0.8rem" }}>
                  <span
                    style={{
                      fontFamily: "monospace",
                      fontSize: "0.9rem",
                    }}
                    className="text-muted-foreground"
                  >
                    {formattedLight}
                  </span>
                </td>
                <td style={{ padding: "0.8rem" }}>
                  <span
                    style={{
                      fontFamily: "monospace",
                      fontSize: "0.9rem",
                    }}
                    className="text-muted-foreground"
                  >
                    {formattedDark}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default SemanticTokensDemo;

