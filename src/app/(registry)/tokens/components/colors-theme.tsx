'use client'

import { formatColorValue, parseCssVariablesByTheme, resolveVariableValue } from "@/lib/token-utils";
import { useEffect, useState } from "react";

type Props = {
  content: string;
};

const ColorsDemo = ({ content }: Props) => {
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

  const allKeys = Object.keys(defaultColors)
    .filter((key) => key <= "yellow-900");

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
            // get the default and dark values for the display color
            const defaultValue = defaultColors[key];
            const darkValue = darkColors[key] || defaultValue;

            const bgColor = isDarkTheme ? darkValue : defaultValue;

            // resolve the variable values
            const { light, dark } = resolveVariableValue(defaultValue, defaultVars, darkVars);

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
                    {formatColorValue(light)}
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
                    {formatColorValue(dark)}
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

export default ColorsDemo;
