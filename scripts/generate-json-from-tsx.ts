import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import * as ts from "typescript";

interface ComponentData {
  name: string;
  defaultComponent?: string;
  usage?: string[];
  components: Record<string, string>;
}

function extractImports(sourceFile: ts.SourceFile): string[] {
  const imports: string[] = [];
  
  function visit(node: ts.Node) {
    if (ts.isImportDeclaration(node)) {
      const importText = node.getFullText(sourceFile).trim();
      imports.push(importText);
    }
    ts.forEachChild(node, visit);
  }
  
  visit(sourceFile);
  return imports;
}

function jsxToString(node: ts.Node, sourceFile: ts.SourceFile): string {
  // Use getFullText() with positions to preserve exact formatting including indentation
  const fullText = sourceFile.getFullText();
  const start = node.getStart(sourceFile);
  const end = node.getEnd();
  
  // Extract the text, preserving all formatting
  let text = fullText.substring(start, end);
  
  // Normalize line endings to \n (do this before trimming to preserve structure)
  text = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  
  // Remove leading/trailing whitespace but preserve internal formatting
  // Only trim the very start and end, not per-line
  text = text.replace(/^\s+/, "").replace(/\s+$/, "");
  
  // If it's wrapped in parentheses, remove them
  if (text.startsWith("(") && text.endsWith(")")) {
    text = text.slice(1, -1);
    text = text.replace(/^\s+/, "").replace(/\s+$/, "");
  }
  
  return text;
}

function extractComponentName(key: string): string {
  // Convert "Icon with Text" to "IconWithTextDemo"
  return key
    .split(/\s+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("") + "Demo";
}

function generateComponentCode(
  componentName: string,
  jsxContent: string,
  imports: string[]
): string {
  // Content should already have normalized line endings from jsxToString
  let content = jsxContent;
  
  // Remove wrapping parentheses if present (but preserve internal formatting)
  if (content.startsWith("(") && content.endsWith(")")) {
    // Remove outer parentheses but keep internal content as-is
    content = content.slice(1, -1);
    // Trim only leading/trailing whitespace, not per-line
    content = content.replace(/^\s+/, "").replace(/\s+$/, "");
  }
  
  // Extract unique imports needed for this component
  const neededImports = new Set<string>();
  
  // Check for common imports based on content
  if (content.includes("<Button") || content.includes("Button>")) {
    neededImports.add('import { Button } from "@/components/ui/button";');
  }
  if (content.includes("mdiInformationOutline")) {
    neededImports.add('import { mdiInformationOutline } from "@mdi/js";');
  }
  if (content.includes("<Icon") || content.includes("Icon path")) {
    neededImports.add('import { Icon } from "@/lib/icon";');
  }
  
  const importBlock = Array.from(neededImports).join("\n");
  
  // Format the JSX - preserve original indentation but adjust for function context
  // Ensure content is normalized (no \r\n)
  content = content.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  const lines = content.split("\n");
  if (lines.length === 1) {
    // Single line JSX
    return `${importBlock}

export default function ${componentName}() {
  return (
    ${content.trim()}
  );
}`;
  }
  
  // Multi-line JSX - preserve relative indentation
  // Find the minimum indentation of non-empty lines to normalize
  const nonEmptyLines = lines.filter(line => line.trim().length > 0);
  if (nonEmptyLines.length === 0) {
    return `${importBlock}

export default function ${componentName}() {
  return (
    ${content.trim()}
  );
}`;
  }
  
  const minIndent = nonEmptyLines.reduce((min, line) => {
    const indent = line.match(/^\s*/)?.[0].length || 0;
    return Math.min(min, indent);
  }, Infinity);
  
  // Remove minimum indentation and add 4 spaces for function context (inside return)
  // Track nesting level: opening tags increase depth, closing tags decrease depth
  // Self-contained elements don't change depth
  let indentLevel = 0;
  const formattedLines: string[] = [];
  
  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim();
    if (trimmed.length === 0) {
      formattedLines.push("");
      continue;
    }
    
    // Count tags
    const allTags = trimmed.match(/<[^>]+>/g) || [];
    const closingCount = allTags.filter(t => t.startsWith("</")).length;
    const selfCloseCount = allTags.filter(t => t.endsWith("/>")).length;
    const openingCount = allTags.filter(t => 
      !t.startsWith("</") && 
      !t.startsWith("<!") && 
      !t.endsWith("/>")
    ).length;
    
    // Check if self-contained (has both opening and closing, or is self-closing)
    const isSelfContained = (openingCount > 0 && closingCount > 0) || selfCloseCount > 0;
    const isClosingOnly = trimmed.startsWith("</");
    
    // Handle closing-only lines: decrease depth BEFORE this line
    if (isClosingOnly && closingCount > 0) {
      indentLevel = Math.max(0, indentLevel - closingCount);
    }
    
    // Calculate indent at current level
    const indent = "    " + "  ".repeat(indentLevel);
    formattedLines.push(indent + trimmed);
    
    // Handle opening tags: increase depth AFTER this line (for next line)
    // Only increment if NOT self-contained (pure opening tag creates nesting)
    // Explicit check: must have opening tags, no closing tags, and no self-closing tags
    if (openingCount > 0 && closingCount === 0 && selfCloseCount === 0) {
      indentLevel += openingCount;
    }
  }
  
  const formattedContent = formattedLines.join("\n");
  
  const finalCode = `${importBlock}

export default function ${componentName}() {
  return (
${formattedContent}
  );
}`;
  
  // Ensure no \r characters (normalize to \n only)
  return finalCode.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
}

function extractDefaultComponentRegex(fileContent: string): string | null {
  // Simple regex to extract: defaultComponent: (<Button variant="default">Click me</Button>)
  // Match the content between parentheses after defaultComponent:
  const regex = /defaultComponent:\s*\(\s*(<Button[^>]*>.*?<\/Button>)\s*\)/s;
  const match = fileContent.match(regex);
  if (match && match[1]) {
    return match[1].trim();
  }
  return null;
}

function parseTSXFile(filePath: string): ComponentData {
  const fileContent = readFileSync(filePath, "utf-8");
  const sourceFile = ts.createSourceFile(
    filePath,
    fileContent,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX
  );

  const imports = extractImports(sourceFile);
  const result: ComponentData = {
    name: "",
    components: {},
  };
  
  // Try regex extraction for defaultComponent as fallback
  const defaultComponentRegex = extractDefaultComponentRegex(fileContent);

  function visit(node: ts.Node) {
    // Look for export const button = { ... }
    if (
      ts.isVariableStatement(node) &&
      node.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword)
    ) {
      const declaration = node.declarationList.declarations[0];
      if (declaration && ts.isIdentifier(declaration.name)) {
        const varName = declaration.name.text;
        
        if (declaration.initializer && ts.isObjectLiteralExpression(declaration.initializer)) {
          declaration.initializer.properties.forEach((prop) => {
            if (ts.isPropertyAssignment(prop)) {
              let propName = "";
              if (ts.isIdentifier(prop.name)) {
                propName = prop.name.text;
              } else if (ts.isStringLiteral(prop.name)) {
                propName = prop.name.text;
              }
              
              if (propName === "name" && prop.initializer && ts.isStringLiteral(prop.initializer)) {
                result.name = prop.initializer.text;
              } else if (propName === "defaultComponent") {
                // Use regex extraction for defaultComponent as it's more reliable
                let jsxString = extractDefaultComponentRegex(fileContent);
                if (!jsxString) {
                  // Fallback to AST extraction
                  if (prop.initializer) {
                    jsxString = jsxToString(prop.initializer, sourceFile);
                  }
                }
                if (jsxString) {
                  const componentName = "DefaultDemo";
                  result.components["Default"] = generateComponentCode(
                    componentName,
                    jsxString,
                    imports
                  );
                }
              } else if (propName === "components" && ts.isObjectLiteralExpression(prop.initializer)) {
                prop.initializer.properties.forEach((compProp) => {
                  if (ts.isPropertyAssignment(compProp)) {
                    let keyName = "";
                    if (ts.isIdentifier(compProp.name)) {
                      keyName = compProp.name.text;
                    } else if (ts.isStringLiteral(compProp.name)) {
                      keyName = compProp.name.text;
                    }
                    
                    if (keyName && compProp.initializer) {
                      // Extract JSX (handles parentheses in jsxToString)
                      const jsxString = jsxToString(compProp.initializer, sourceFile);
                      const componentName = extractComponentName(keyName);
                      result.components[keyName] = generateComponentCode(
                        componentName,
                        jsxString,
                        imports
                      );
                    }
                  }
                });
              }
            }
          });
        }
      }
    }
    
    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return result;
}

function generateJSON(tsxFilePath: string, outputPath: string): void {
  console.log(`📝 Parsing ${tsxFilePath}...`);
  
  const componentData = parseTSXFile(tsxFilePath);
  
  if (!componentData.name) {
    console.error("❌ Could not find component name in TSX file");
    process.exit(1);
  }
  
  console.log(`✅ Found component: ${componentData.name}`);
  console.log(`✅ Found ${Object.keys(componentData.components).length} components`);
  
  // Normalize all component code strings to use \n only
  const normalizedComponents: Record<string, string> = {};
  for (const [key, value] of Object.entries(componentData.components)) {
    normalizedComponents[key] = value.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  }
  
  // Generate JSON
  const jsonContent = JSON.stringify(normalizedComponents, null, 4);
  
  // Write to file
  writeFileSync(outputPath, jsonContent, "utf-8");
  
  console.log(`✨ Generated JSON file: ${outputPath}`);
}

// Main execution
if (require.main === module) {
  const tsxFile = process.argv[2] || "src/app/demo/[name]/ui/button.tsx";
  const outputFile = process.argv[3] || "src/app/content/ui/button.json";
  
  const tsxPath = resolve(process.cwd(), tsxFile);
  const outputPath = resolve(process.cwd(), outputFile);
  
  generateJSON(tsxPath, outputPath);
}

export { generateJSON };
