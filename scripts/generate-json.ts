import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { resolve, dirname, join } from "path";
import * as ts from "typescript";

interface ComponentImportInfo {
  identifier: string;
  importPath: string;
  filePath: string;
}

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

interface ImportInfo {
  identifiers: Set<string>;
  importStatement: string;
}

function parseImportsFromAST(sourceFile: ts.SourceFile): { importMap: Map<string, string>, demoComponentImports: Map<string, ComponentImportInfo> } {
  const importMap = new Map<string, string>();
  const demoComponentImports = new Map<string, ComponentImportInfo>();
  
  function visit(node: ts.Node) {
    if (ts.isImportDeclaration(node)) {
      // Get the original import statement text to preserve formatting
      const importStatement = node.getFullText(sourceFile).trim();
      const moduleSpecifier = node.moduleSpecifier;
      
      if (ts.isStringLiteral(moduleSpecifier)) {
        const modulePath = moduleSpecifier.text;
        
        // Check if this is an import from /app/demo/[name]/
        const isDemoImport = modulePath.includes('/app/demo/[name]/');
        
        // Handle default import
        if (node.importClause?.name) {
          const identifier = node.importClause.name.text;
          importMap.set(identifier, importStatement);
          
          if (isDemoImport) {
            let filePath = modulePath;
            if (filePath.startsWith('@/')) {
              filePath = filePath.replace('@/', 'src/');
            }
            // Ensure we have .tsx extension
            if (!filePath.endsWith('.tsx') && !filePath.endsWith('.ts')) {
              filePath = filePath + '.tsx';
            }
            const resolvedPath = resolve(process.cwd(), filePath);
            
            demoComponentImports.set(identifier, {
              identifier,
              importPath: modulePath,
              filePath: resolvedPath
            });
          }
        }
        
        // Handle named imports
        if (node.importClause?.namedBindings && ts.isNamedImports(node.importClause.namedBindings)) {
          node.importClause.namedBindings.elements.forEach(element => {
            const name = element.name.text;
            // Map the name to the import statement
            importMap.set(name, importStatement);
            
            if (isDemoImport) {
              // Resolve the file path
              let filePath = modulePath;
              if (filePath.startsWith('@/')) {
                filePath = filePath.replace('@/', 'src/');
              }
              // Ensure we have .tsx extension
              if (!filePath.endsWith('.tsx') && !filePath.endsWith('.ts')) {
                filePath = filePath + '.tsx';
              }
              const resolvedPath = resolve(process.cwd(), filePath);
              
              demoComponentImports.set(name, {
                identifier: name,
                importPath: modulePath,
                filePath: resolvedPath
              });
            }
            
            // If there's a property name (original name before 'as'), map that too
            if (element.propertyName) {
              const originalName = element.propertyName.text;
              importMap.set(originalName, importStatement);
            }
          });
        }
        
        // Handle namespace import
        if (node.importClause?.namedBindings && ts.isNamespaceImport(node.importClause.namedBindings)) {
          const namespaceName = node.importClause.namedBindings.name.text;
          importMap.set(namespaceName, importStatement);
        }
      }
    }
    ts.forEachChild(node, visit);
  }
  
  visit(sourceFile);
  return { importMap, demoComponentImports };
}

function findUsedIdentifiers(jsxContent: string): Set<string> {
  const used = new Set<string>();
  
  // Common HTML elements that should be excluded
  const htmlElements = new Set([
    'div', 'span', 'p', 'a', 'button', 'input', 'label', 'form', 'ul', 'ol', 'li',
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'img', 'svg', 'path', 'g', 'circle', 'rect',
    'table', 'thead', 'tbody', 'tr', 'td', 'th', 'section', 'article', 'header', 'footer',
    'nav', 'main', 'aside', 'br', 'hr', 'strong', 'em', 'b', 'i', 'u', 'code', 'pre'
  ]);
  
  // Remove comments and strings to avoid false matches
  let cleanContent = jsxContent;
  // Remove JSX comments
  cleanContent = cleanContent.replace(/{\/\*[\s\S]*?\*\/}/g, '');
  // Remove string literals in attributes to avoid matching identifiers in strings
  cleanContent = cleanContent.replace(/=["'][^"']*["']/g, '');
  
  // Find JSX component names
  const jsxComponentRegex = /<(\w+)(?:\s|>|\/)/g;
  let match;
  const componentNames = new Set<string>();
  while ((match = jsxComponentRegex.exec(cleanContent)) !== null) {
    const componentName = match[1];
    // Only exclude if it's actually a lowercase HTML element
    const isLowercase = componentName[0] === componentName[0].toLowerCase();
    if (!isLowercase || !htmlElements.has(componentName)) {
      componentNames.add(componentName);
      used.add(componentName);
    }
  }
  
  // Find identifiers used as prop values
  // This catches cases like path={mdiInformationOutline}
  const propValueRegex = /(\w+)\s*=\s*{(\w+)}/g;
  while ((match = propValueRegex.exec(cleanContent)) !== null) {
    const propName = match[1];
    const value = match[2];
    // For path, value, defaultValue props, the value is likely an imported identifier
    if (['path', 'value', 'defaultValue', 'icon', 'src'].includes(propName)) {
      used.add(value);
    }
  }
  
  // Find standalone identifiers in JSX expressions
  // Only includes if they're not part of a component name that is already found
  const standaloneIdentifierRegex = /{(\w+)}/g;
  while ((match = standaloneIdentifierRegex.exec(cleanContent)) !== null) {
    const identifier = match[1];
    // Skip common React/JSX keywords, HTML element names, and component names that are already found
    if (!['true', 'false', 'null', 'undefined'].includes(identifier) && 
        !htmlElements.has(identifier.toLowerCase()) &&
        !componentNames.has(identifier)) {
      used.add(identifier);
    }
  }
  
  return used;
}

function jsxToString(node: ts.Node, sourceFile: ts.SourceFile): string {
  const fullText = sourceFile.getFullText();
  const start = node.getStart(sourceFile);
  const end = node.getEnd();
  
  // Extract the text, preserving all formatting including indentation
  let text = fullText.substring(start, end);
  
  // Normalize line endings to \n
  text = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  
  // Remove leading/trailing whitespace but preserve internal formatting
  text = text.replace(/^\s+/, "").replace(/\s+$/, "");
  
  // If it's wrapped in parentheses, removes the parentheses
  if (text.startsWith("(") && text.endsWith(")")) {
    text = text.slice(1, -1);
    text = text.replace(/^\s+/, "").replace(/\s+$/, "");
  }
  
  return text;
}

function extractComponentName(key: string): string {
  // Converts "Icon with Text" to "IconWithTextDemo"
  return key
    .split(/\s+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("") + "Demo";
}

function extractDemoComponentCode(filePath: string, componentName: string): { imports: string[], componentCode: string } | null {
  if (!existsSync(filePath)) {
    return null;
  }
  
  try {
    const fileContent = readFileSync(filePath, "utf-8");
    const sourceFile = ts.createSourceFile(
      filePath,
      fileContent,
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.TSX
    );
    
    // Extracts imports
    const imports: string[] = [];
    const importMap = new Map<string, string>();
    
    function visitImports(node: ts.Node) {
      if (ts.isImportDeclaration(node)) {
        const importText = node.getFullText(sourceFile).trim();
        imports.push(importText);
        
        const moduleSpecifier = node.moduleSpecifier;
        if (ts.isStringLiteral(moduleSpecifier)) {
          // Skips imports from /app/demo/[name]/ to avoid circular dependencies
          if (!moduleSpecifier.text.includes('/app/demo/[name]/')) {
            if (node.importClause?.name) {
              importMap.set(node.importClause.name.text, importText);
            }
            if (node.importClause?.namedBindings && ts.isNamedImports(node.importClause.namedBindings)) {
              node.importClause.namedBindings.elements.forEach(element => {
                importMap.set(element.name.text, importText);
                if (element.propertyName) {
                  importMap.set(element.propertyName.text, importText);
                }
              });
            }
          }
        }
      }
      ts.forEachChild(node, visitImports);
    }
    
    visitImports(sourceFile);
    
    // Finds the exported component function
    let componentCode = "";
    let foundComponent = false;
    
    function visitComponent(node: ts.Node) {
      // Looks for: export function ComponentName() or export const ComponentName = ...
      if (ts.isFunctionDeclaration(node) && node.name) {
        if (node.modifiers?.some(m => m.kind === ts.SyntaxKind.ExportKeyword) &&
            node.name.text === componentName) {
          componentCode = node.getFullText(sourceFile);
          foundComponent = true;
          return;
        }
      }
      
      if (ts.isVariableStatement(node)) {
        if (node.modifiers?.some(m => m.kind === ts.SyntaxKind.ExportKeyword)) {
          const declaration = node.declarationList.declarations[0];
          if (declaration && ts.isIdentifier(declaration.name) && 
              declaration.name.text === componentName) {
            componentCode = node.getFullText(sourceFile);
            foundComponent = true;
            return;
          }
        }
      }
      
      ts.forEachChild(node, visitComponent);
    }
    
    visitComponent(sourceFile);
    
    if (!foundComponent) {
      return null;
    }
    
    return { imports, componentCode };
  } catch (error) {
    console.error(`Error extracting component from ${filePath}:`, error);
    return null;
  }
}

function generateComponentCode(
  componentName: string,
  jsxContent: string,
  imports: string[],
  importMap: Map<string, string>,
  demoComponentImports?: Map<string, ComponentImportInfo>
): string {
  // Content should already have normalized line endings from jsxToString
  let content = jsxContent;
  
  // Removes wrapping parentheses if present (but preserves internal formatting)
  if (content.startsWith("(") && content.endsWith(")")) {
    // Removes outer parentheses
    content = content.slice(1, -1);
    // Trims only leading/trailing whitespace
    content = content.replace(/^\s+/, "").replace(/\s+$/, "");
  }
  
  // Directly find identifiers that are actually used in the JSX
  // Only looks for component tags and prop values
  const verifiedIdentifiers = new Set<string>();
  const demoComponentsToInline = new Map<string, ComponentImportInfo>();
  
  // Removes comments first to avoid false matches
  let cleanContent = content.replace(/{\/\*[\s\S]*?\*\/}/g, '');
  
  // Finds component tags: <ComponentName (must be PascalCase)
  const componentTagRegex = /<([A-Z][a-zA-Z0-9]*)(?:\s|>|\/)/g;
  let match;
  const foundComponents = new Set<string>();
  while ((match = componentTagRegex.exec(cleanContent)) !== null) {
    const compName = match[1];
    foundComponents.add(compName);
    
    // Checks if this is a demo component that needs to be inlined
    if (demoComponentImports && demoComponentImports.has(compName)) {
      const compInfo = demoComponentImports.get(compName)!;
      demoComponentsToInline.set(compName, compInfo);
      // Doesn't add to verifiedIdentifiers - we'll inline the component code instead
      // Also doesn't add to finalIdentifiers later
    } else {
      verifiedIdentifiers.add(compName);
    }
  }
  
  // Finds identifiers in prop values: prop={identifier}
  const propValueRegex = /(\w+)\s*=\s*{([a-zA-Z_$][a-zA-Z0-9_$]*)\s*}/g;
  while ((match = propValueRegex.exec(cleanContent)) !== null) {
    const propName = match[1];
    const value = match[2];
    // Only includes for specific prop names that typically use imported identifiers
    if (['path', 'value', 'defaultValue', 'icon', 'src'].includes(propName)) {
      verifiedIdentifiers.add(value);
    }
  }
  
  // Finds standalone identifiers in JSX expressions
  const htmlElements = new Set(['div', 'span', 'p', 'a', 'button', 'input', 'label', 'form', 'ul', 'ol', 'li']);
  const standaloneRegex = /{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*}/g;
  while ((match = standaloneRegex.exec(cleanContent)) !== null) {
    const identifier = match[1];
    // Skips keywords, HTML elements, and components that are already found as tags
    if (!['true', 'false', 'null', 'undefined'].includes(identifier) &&
        !htmlElements.has(identifier.toLowerCase()) &&
        !foundComponents.has(identifier)) {
      if (importMap.has(identifier)) {
        verifiedIdentifiers.add(identifier);
      }
    }
  }
  
  // Final verification: ensure each identifier actually appears in the original content
  // This filters out any false positives
  const finalIdentifiers = new Set<string>();
  verifiedIdentifiers.forEach(identifier => {
    // Double-check: identifier must appear as <Identifier or {identifier} or prop={identifier}
    const asTag = new RegExp(`<${identifier}(?:\\s|>|/)`).test(content);
    const asProp = new RegExp(`=\\s*{${identifier}\\s*}`).test(content);
    const asExpr = new RegExp(`{\\s*${identifier}\\s*}`).test(content);
    
    if (asTag || asProp || asExpr) {
      finalIdentifiers.add(identifier);
    }
  });
  
  // Inline demo components: replace component usage with actual component code
  const demoComponentImportsToInclude = new Set<string>();
  let inlinedContent = content;
  
  // Debug: log demo components found
  if (demoComponentImports && demoComponentImports.size > 0) {
    console.log(`Demo component imports available: ${Array.from(demoComponentImports.keys()).join(', ')}`);
  }
  if (demoComponentsToInline.size > 0) {
    console.log(`Demo components to inline: ${Array.from(demoComponentsToInline.keys()).join(', ')}`);
  }
  
  for (const [compName, compInfo] of demoComponentsToInline) {
    if (!existsSync(compInfo.filePath)) {
      console.error(`Demo component file not found: ${compInfo.filePath}`);
      continue;
    }
    
    const demoCode = extractDemoComponentCode(compInfo.filePath, compName);
    if (demoCode) {
      // Add imports from the demo component file
      demoCode.imports.forEach(imp => {
        if (imp && !imp.includes('/app/demo/[name]/')) {
          demoComponentImportsToInclude.add(imp.trim());
        }
      });
      
      // Extract the component's return JSX
      // The componentCode is the full function, we need to extract just the return statement content
      // Try to find the return statement using AST
      try {
        // Read the actual file content for better AST parsing
        const demoFileContent = readFileSync(compInfo.filePath, "utf-8");
        const demoSourceFile = ts.createSourceFile(
          compInfo.filePath,
          demoFileContent,
          ts.ScriptTarget.Latest,
          true,
          ts.ScriptKind.TSX
        );
        
        let returnJSX = "";
        
        // Find the component function first, then find its return statement
        function findComponentAndReturn(node: ts.Node): boolean {
          // Look for exported function with the component name
          if (ts.isFunctionDeclaration(node) && node.name && node.name.text === compName) {
            if (node.modifiers?.some(m => m.kind === ts.SyntaxKind.ExportKeyword)) {
              // Found the component function, now find its return statement
              function findReturn(node: ts.Node) {
                if (ts.isReturnStatement(node) && node.expression) {
                  // Extract the JSX from the return statement
                  returnJSX = jsxToString(node.expression, demoSourceFile);
                  return;
                }
                ts.forEachChild(node, findReturn);
              }
              findReturn(node);
              return returnJSX.length > 0;
            }
          }
          
          // Also check for exported const ComponentName = ...
          if (ts.isVariableStatement(node)) {
            if (node.modifiers?.some(m => m.kind === ts.SyntaxKind.ExportKeyword)) {
              const declaration = node.declarationList.declarations[0];
              if (declaration && ts.isIdentifier(declaration.name) && declaration.name.text === compName) {
                // Found the component, extract its value (which should be a function or JSX)
                if (declaration.initializer) {
                  if (ts.isArrowFunction(declaration.initializer) || ts.isFunctionExpression(declaration.initializer)) {
                    function findReturn(node: ts.Node) {
                      if (ts.isReturnStatement(node) && node.expression) {
                        returnJSX = jsxToString(node.expression, demoSourceFile);
                        return;
                      }
                      ts.forEachChild(node, findReturn);
                    }
                    findReturn(declaration.initializer);
                    return returnJSX.length > 0;
                  } else {
                    // It might be JSX directly
                    returnJSX = jsxToString(declaration.initializer, demoSourceFile);
                    return returnJSX.length > 0;
                  }
                }
              }
            }
          }
          
          let found = false;
          ts.forEachChild(node, (child) => {
            if (!found) {
              found = findComponentAndReturn(child);
            }
          });
          return found;
        }
        
        const found = findComponentAndReturn(demoSourceFile);
        if (!found || !returnJSX) {
          console.error(`Could not find component ${compName} or its return statement in ${compInfo.filePath}`);
        }
        
        if (returnJSX) {
          // Remove wrapping parentheses if present
          if (returnJSX.startsWith("(") && returnJSX.endsWith(")")) {
            returnJSX = returnJSX.slice(1, -1).trim();
          }
          
          // Replace <ComponentName /> or <ComponentName>...</ComponentName> with the actual JSX
          // Handle self-closing: <ComponentName /> or <ComponentName/> (with or without space)
          // Match: <ComponentName /> or <ComponentName/> or <ComponentName > (opening tag)
          const selfClosingRegex = new RegExp(`<${compName}(?:\\s+[^>]*)?\\s*/?>`, 'g');
          const beforeReplace = inlinedContent;
          inlinedContent = inlinedContent.replace(selfClosingRegex, returnJSX);
          
          // Handle with children: <ComponentName>...</ComponentName>
          const withChildrenRegex = new RegExp(`<${compName}(?:\\s[^>]*)?>([\\s\\S]*?)</${compName}>`, 'g');
          inlinedContent = inlinedContent.replace(withChildrenRegex, (match, children) => {
            // If component has children, we need to merge them - for now, just use the component JSX
            // This is a simplified approach - in reality, we might need to handle props/children merging
            return returnJSX;
          });
          
          if (beforeReplace !== inlinedContent) {
            console.log(`✅ Inlined ${compName} component`);
          } else {
            console.log(`⚠️ Failed to replace ${compName} in content. Before: "${beforeReplace.substring(0, 50)}"`);
          }
        } else {
          console.error(`Could not extract return JSX for ${compName} from ${compInfo.filePath}`);
        }
      } catch (error) {
        console.error(`Error extracting component ${compName}:`, error);
        // Fallback to regex if AST parsing fails
        const returnMatch = demoCode.componentCode.match(/return\s*\(([\s\S]*?)\)\s*;?\s*}/);
        if (returnMatch) {
          let componentJSX = returnMatch[1].trim();
          // Remove leading/trailing whitespace
          componentJSX = componentJSX.replace(/^\s+/, "").replace(/\s+$/, "");
          
          // Replace <ComponentName /> or <ComponentName>...</ComponentName> with the actual JSX
          const selfClosingRegex = new RegExp(`<${compName}\\s*/>`, 'g');
          inlinedContent = inlinedContent.replace(selfClosingRegex, componentJSX);
          
          const withChildrenRegex = new RegExp(`<${compName}(?:\\s[^>]*)?>([\\s\\S]*?)</${compName}>`, 'g');
          inlinedContent = inlinedContent.replace(withChildrenRegex, componentJSX);
        }
      }
    } else {
      console.error(`Could not extract demo component code for ${compName} from ${compInfo.filePath}`);
    }
  }
  
  // Update content to use inlined version
  content = inlinedContent;
  
  // Exclude inlined demo components from final identifiers (they're already inlined, no need to import them)
  const inlinedComponentNames = new Set(demoComponentsToInline.keys());
  const identifiersToImport = new Set<string>();
  finalIdentifiers.forEach(identifier => {
    // Don't include imports for components that were inlined
    if (!inlinedComponentNames.has(identifier)) {
      identifiersToImport.add(identifier);
    }
  });
  
  // Group imports by module path to combine multiple imports from the same module
  const importsByModule = new Map<string, Set<string>>(); // modulePath -> Set of identifiers
  
  identifiersToImport.forEach(identifier => {
    const importStatement = importMap.get(identifier);
    if (importStatement) {
      // Extract module path from import statement
      const moduleMatch = importStatement.match(/from\s+["']([^"']+)["']/);
      if (moduleMatch) {
        const modulePath = moduleMatch[1];
        // Don't include imports from /app/demo/[name]/ since we've inlined those components
        if (!modulePath.includes('/app/demo/[name]/')) {
          if (!importsByModule.has(modulePath)) {
            importsByModule.set(modulePath, new Set());
          }
          importsByModule.get(modulePath)!.add(identifier);
        }
      }
    }
  });
  
  // Build import statements, grouping identifiers from the same module
  const neededImportStatements: string[] = [];
  importsByModule.forEach((identifiers, modulePath) => {
    const identifierArray = Array.from(identifiers).sort();
    if (identifierArray.length === 1) {
      // Single import: use the original import statement format
      const identifier = identifierArray[0];
      const originalImport = importMap.get(identifier);
      if (originalImport) {
        neededImportStatements.push(originalImport);
      }
    } else {
      // Multiple imports from same module: combine them
      const importStatement = `import { ${identifierArray.join(', ')} } from "${modulePath}";`;
      neededImportStatements.push(importStatement);
    }
  });
  
  // Add imports from inlined demo components
  demoComponentImportsToInclude.forEach(imp => {
    neededImportStatements.push(imp);
  });
  
  const importBlock = neededImportStatements.join("\n");
  
  // Debug: if importBlock is still empty but we have imports, something is wrong
  // For now, we'll include all imports regardless
  
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

  // Extract imports using line-by-line parsing (most reliable)
  const lineImports: string[] = [];
  const lines = fileContent.split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('import ') && trimmed.includes(' from ')) {
      // Ensure it ends with semicolon
      const importLine = trimmed.endsWith(';') ? trimmed : trimmed + ';';
      lineImports.push(importLine);
    }
  }
  // Also try AST extraction as fallback
  const astImports = extractImports(sourceFile);
  // Use line imports first (more reliable), fall back to AST if needed
  const finalImports = lineImports.length > 0 ? lineImports : astImports;
  
  const { importMap, demoComponentImports } = parseImportsFromAST(sourceFile);
  
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
                    finalImports,
                    importMap,
                    demoComponentImports
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
                        finalImports,
                        importMap,
                        demoComponentImports
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
    console.error(`❌ Could not find component name in TSX file: ${tsxFilePath}`);
    return;
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
  
  // Ensure output directory exists
  const outputDir = dirname(outputPath);
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
    console.log(`📁 Created directory: ${outputDir}`);
  }
  
  // Write to file
  writeFileSync(outputPath, jsonContent, "utf-8");
  
  console.log(`✨ Generated JSON file: ${outputPath}`);
}

function extractComponentImports(indexFilePath: string): Array<{ name: string; importPath: string; key: string }> {
  const fileContent = readFileSync(indexFilePath, "utf-8");
  const components: Array<{ name: string; importPath: string; key: string }> = [];
  
  // Extract imports like: import { button } from "@/app/demo/[name]/ui/button";
  const importRegex = /import\s+{\s*([^}]+)\s*}\s+from\s+["'](@\/app\/demo\/\[name\]\/ui\/([\w-]+))["']/g;
  let match;
  const importMap = new Map<string, string>(); // importName -> fileName
  
  while ((match = importRegex.exec(fileContent)) !== null) {
    const importNames = match[1].split(',').map(n => n.trim());
    const fileName = match[3];
    
    // Handle each import name (could be multiple in one import statement)
    importNames.forEach(importName => {
      // Remove any 'as' aliases
      const cleanName = importName.split(/\s+as\s+/)[0].trim();
      importMap.set(cleanName, fileName);
    });
  }
  
  // Extract the demos object to get the actual keys used
  // Pattern: export const demos: { [name: string]: Demo } = { ... }
  const demosRegex = /export\s+const\s+demos[^=]*=\s*{([\s\S]*?)};?\s*$/m;
  const demosMatch = fileContent.match(demosRegex);
  
  if (demosMatch) {
    const demosContent = demosMatch[1];
    // Extract key-value pairs like: "hover-card": hoverCard, or button
    const lines = demosContent.split('\n');
    const keyMap = new Map<string, string>(); // importName -> exportKey
    
    for (const line of lines) {
      const trimmed = line.trim();
      // Skip comments and empty lines
      if (!trimmed || trimmed.startsWith('//')) continue;
      
      // Match different patterns:
      // 1. "key": value, (quoted key)
      // 2. key: value, (unquoted key like switch: switchComponent)
      // 3. value, (shorthand property)
      const quotedKeyMatch = trimmed.match(/["']([\w-]+)["']\s*:\s*(\w+)/);
      const unquotedKeyMatch = trimmed.match(/^(\w+)\s*:\s*(\w+),?$/);
      const shorthandMatch = trimmed.match(/^(\w+),?$/);
      
      if (quotedKeyMatch) {
        const exportKey = quotedKeyMatch[1];
        const importName = quotedKeyMatch[2];
        keyMap.set(importName, exportKey);
      } else if (unquotedKeyMatch) {
        const exportKey = unquotedKeyMatch[1];
        const importName = unquotedKeyMatch[2];
        keyMap.set(importName, exportKey);
      } else if (shorthandMatch) {
        const importName = shorthandMatch[1];
        keyMap.set(importName, importName);
      }
    }
    
    // Build components list
    importMap.forEach((fileName, importName) => {
      const exportKey = keyMap.get(importName) || importName;
      components.push({
        name: importName,
        importPath: `src/app/demo/[name]/ui/${fileName}`,
        key: exportKey,
      });
    });
  } else {
    // Fallback: use import names directly
    importMap.forEach((fileName, importName) => {
      components.push({
        name: importName,
        importPath: `src/app/demo/[name]/ui/${fileName}`,
        key: importName,
      });
    });
  }
  
  return components;
}

function generateAllComponents(indexFilePath: string, outputDir: string): void {
  console.log(`📋 Reading index file: ${indexFilePath}`);
  
  const components = extractComponentImports(indexFilePath);
  console.log(`📦 Found ${components.length} components to process\n`);
  
  const baseDir = dirname(indexFilePath);
  const outputBaseDir = resolve(process.cwd(), outputDir);
  
  // Ensure output directory exists
  if (!existsSync(outputBaseDir)) {
    mkdirSync(outputBaseDir, { recursive: true });
    console.log(`📁 Created output directory: ${outputBaseDir}\n`);
  }
  
  let successCount = 0;
  let errorCount = 0;
  
  for (const component of components) {
    // Resolve the TSX file path
    const tsxFilePath = resolve(process.cwd(), component.importPath + ".tsx");
    const outputPath = join(outputBaseDir, `${component.key}.json`);
    
    // Check if TSX file exists
    if (!existsSync(tsxFilePath)) {
      console.log(`⚠️  Skipping ${component.key}: TSX file not found at ${tsxFilePath}`);
      errorCount++;
      continue;
    }
    
    try {
      generateJSON(tsxFilePath, outputPath);
      successCount++;
      console.log("");
    } catch (error) {
      console.error(`❌ Error processing ${component.key}:`, error);
      errorCount++;
      console.log("");
    }
  }
  
  console.log(`\n📊 Summary:`);
  console.log(`   ✅ Successfully processed: ${successCount}`);
  console.log(`   ❌ Errors/Skipped: ${errorCount}`);
  console.log(`   📁 Output directory: ${outputBaseDir}`);
}

// Main execution
if (require.main === module) {
  const indexFile = process.argv[2] || "src/app/demo/[name]/index.tsx";
  const outputDir = process.argv[3] || "src/app/content/ui";
  
  const indexPath = resolve(process.cwd(), indexFile);
  
  if (!existsSync(indexPath)) {
    console.error(`❌ Index file not found: ${indexPath}`);
    process.exit(1);
  }
  
  // If a specific component file is provided, processes just that one
  if (process.argv[2] && process.argv[2].endsWith('.tsx') && process.argv[2].includes('/ui/')) {
    const tsxFile = process.argv[2];
    const outputFile = process.argv[3] || tsxFile.replace('/ui/', '/content/ui/').replace('.tsx', '.json');
    
    const tsxPath = resolve(process.cwd(), tsxFile);
    const outputPath = resolve(process.cwd(), outputFile);
    
    generateJSON(tsxPath, outputPath);
  } else {
    // Process all components from index.tsx
    generateAllComponents(indexPath, outputDir);
  }
}

export { generateJSON, generateAllComponents };
