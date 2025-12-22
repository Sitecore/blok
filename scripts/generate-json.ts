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
      const importStatement = node.getFullText(sourceFile).trim();
      const moduleSpecifier = node.moduleSpecifier;
      
      if (ts.isStringLiteral(moduleSpecifier)) {
        const modulePath = moduleSpecifier.text;
        const isDemoImport = modulePath.includes('/app/demo/[name]/');
        
        if (node.importClause?.name) {
          const identifier = node.importClause.name.text;
          importMap.set(identifier, importStatement);
          
          if (isDemoImport) {
            let filePath = modulePath;
            if (filePath.startsWith('@/')) {
              filePath = filePath.replace('@/', 'src/');
            }
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
        
        if (node.importClause?.namedBindings && ts.isNamedImports(node.importClause.namedBindings)) {
          node.importClause.namedBindings.elements.forEach(element => {
            const name = element.name.text;
            importMap.set(name, importStatement);
            
            if (isDemoImport) {
              let filePath = modulePath;
              if (filePath.startsWith('@/')) {
                filePath = filePath.replace('@/', 'src/');
              }
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
            
            if (element.propertyName) {
              const originalName = element.propertyName.text;
              importMap.set(originalName, importStatement);
            }
          });
        }
        
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
  const htmlElements = new Set([
    'div', 'span', 'p', 'a', 'button', 'input', 'label', 'form', 'ul', 'ol', 'li',
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'img', 'svg', 'path', 'g', 'circle', 'rect',
    'table', 'thead', 'tbody', 'tr', 'td', 'th', 'section', 'article', 'header', 'footer',
    'nav', 'main', 'aside', 'br', 'hr', 'strong', 'em', 'b', 'i', 'u', 'code', 'pre'
  ]);
  
  let cleanContent = jsxContent.replace(/{\/\*[\s\S]*?\*\/}/g, '');
  cleanContent = cleanContent.replace(/=["'][^"']*["']/g, '');
  
  const jsxComponentRegex = /<(\w+)(?:\s|>|\/)/g;
  let match;
  const componentNames = new Set<string>();
  while ((match = jsxComponentRegex.exec(cleanContent)) !== null) {
    const componentName = match[1];
    const isLowercase = componentName[0] === componentName[0].toLowerCase();
    if (!isLowercase || !htmlElements.has(componentName)) {
      componentNames.add(componentName);
      used.add(componentName);
    }
  }
  
  const propValueRegex = /(\w+)\s*=\s*{(\w+)}/g;
  while ((match = propValueRegex.exec(cleanContent)) !== null) {
    const propName = match[1];
    const value = match[2];
    if (['path', 'value', 'defaultValue', 'icon', 'src'].includes(propName)) {
      used.add(value);
    }
  }
  
  const standaloneIdentifierRegex = /{(\w+)}/g;
  while ((match = standaloneIdentifierRegex.exec(cleanContent)) !== null) {
    const identifier = match[1];
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
  
  let text = fullText.substring(start, end);
  text = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  text = text.replace(/^\s+/, "").replace(/\s+$/, "");
  
  if (text.startsWith("(") && text.endsWith(")")) {
    text = text.slice(1, -1);
    text = text.replace(/^\s+/, "").replace(/\s+$/, "");
  }
  
  return text;
}

function extractComponentName(key: string): string {
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
    
    const imports: string[] = [];
    const importMap = new Map<string, string>();
    
    function visitImports(node: ts.Node) {
      if (ts.isImportDeclaration(node)) {
        const importText = node.getFullText(sourceFile).trim();
        imports.push(importText);
        
        const moduleSpecifier = node.moduleSpecifier;
        if (ts.isStringLiteral(moduleSpecifier)) {
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
    
    let componentCode = "";
    let foundComponent = false;
    
    function visitComponent(node: ts.Node) {
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

function extractVariableDefinitions(
  sourceFile: ts.SourceFile,
  usedIdentifiers: Set<string>,
  importMap: Map<string, string>
): string[] {
  const definitions: string[] = [];
  const definedIdentifiers = new Set<string>();
  
  function visit(node: ts.Node) {
    // Extract const/let/var declarations
    if (ts.isVariableStatement(node)) {
      // Skip exported variables (they're part of the component structure)
      if (node.modifiers?.some(m => m.kind === ts.SyntaxKind.ExportKeyword)) {
        ts.forEachChild(node, visit);
        return;
      }
      
      node.declarationList.declarations.forEach(declaration => {
        if (ts.isIdentifier(declaration.name)) {
          const varName = declaration.name.text;
          
          // Only extract if it's used and not imported
          if (usedIdentifiers.has(varName) && !importMap.has(varName)) {
            // Extract the full variable declaration
            const varText = node.getFullText(sourceFile).trim();
            if (varText && !definedIdentifiers.has(varName)) {
              definitions.push(varText);
              definedIdentifiers.add(varName);
            }
          }
        }
      });
    }
    
    ts.forEachChild(node, visit);
  }
  
  visit(sourceFile);
  return definitions;
}

function generateComponentCode(
  componentName: string,
  jsxContent: string,
  imports: string[],
  importMap: Map<string, string>,
  demoComponentImports?: Map<string, ComponentImportInfo>,
  sourceFile?: ts.SourceFile
): string {
  let content = jsxContent;
  
  if (content.startsWith("(") && content.endsWith(")")) {
    content = content.slice(1, -1);
    content = content.replace(/^\s+/, "").replace(/\s+$/, "");
  }
  
  const verifiedIdentifiers = new Set<string>();
  const demoComponentsToInline = new Map<string, ComponentImportInfo>();
  
  let cleanContent = content.replace(/{\/\*[\s\S]*?\*\/}/g, '');
  
  const componentTagRegex = /<([A-Z][a-zA-Z0-9]*)(?:\s|>|\/)/g;
  let match;
  const foundComponents = new Set<string>();
  while ((match = componentTagRegex.exec(cleanContent)) !== null) {
    const compName = match[1];
    foundComponents.add(compName);
    
    if (demoComponentImports && demoComponentImports.has(compName)) {
      const compInfo = demoComponentImports.get(compName)!;
      demoComponentsToInline.set(compName, compInfo);
    } else {
      verifiedIdentifiers.add(compName);
    }
  }
  
  const propValueRegex = /(\w+)\s*=\s*{([a-zA-Z_$][a-zA-Z0-9_$]*)\s*}/g;
  while ((match = propValueRegex.exec(cleanContent)) !== null) {
    const propName = match[1];
    const value = match[2];
    if (['path', 'value', 'defaultValue', 'icon', 'src'].includes(propName)) {
      verifiedIdentifiers.add(value);
    }
  }
  
  // Find identifiers in spread operators: {...identifier}
  const spreadRegex = /\.\.\.([a-zA-Z_$][a-zA-Z0-9_$]*)/g;
  while ((match = spreadRegex.exec(cleanContent)) !== null) {
    const identifier = match[1];
    verifiedIdentifiers.add(identifier);
  }
  
  // Find identifiers in array access: identifier[0], identifier.property
  const arrayAccessRegex = /([a-zA-Z_$][a-zA-Z0-9_$]*)\[[^\]]+\]/g;
  while ((match = arrayAccessRegex.exec(cleanContent)) !== null) {
    const identifier = match[1];
    if (!['true', 'false', 'null', 'undefined'].includes(identifier)) {
      verifiedIdentifiers.add(identifier);
    }
  }
  
  // Find identifiers in property access: identifier.property or identifier[0].property
  const propertyAccessRegex = /([a-zA-Z_$][a-zA-Z0-9_$]*)\.([a-zA-Z_$][a-zA-Z0-9_$]*)/g;
  while ((match = propertyAccessRegex.exec(cleanContent)) !== null) {
    const identifier = match[1];
    if (!['true', 'false', 'null', 'undefined', 'length', 'map', 'find', 'filter', 'includes'].includes(identifier)) {
      verifiedIdentifiers.add(identifier);
    }
  }
  
  const htmlElements = new Set(['div', 'span', 'p', 'a', 'button', 'input', 'label', 'form', 'ul', 'ol', 'li']);
  const standaloneRegex = /{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*}/g;
  while ((match = standaloneRegex.exec(cleanContent)) !== null) {
    const identifier = match[1];
    if (!['true', 'false', 'null', 'undefined'].includes(identifier) &&
        !htmlElements.has(identifier.toLowerCase()) &&
        !foundComponents.has(identifier)) {
      verifiedIdentifiers.add(identifier);
    }
  }
  
  const finalIdentifiers = new Set<string>();
  verifiedIdentifiers.forEach(identifier => {
    const asTag = new RegExp(`<${identifier}(?:\\s|>|/)`).test(content);
    const asProp = new RegExp(`=\\s*{${identifier}\\s*}`).test(content);
    const asExpr = new RegExp(`{\\s*${identifier}\\s*}`).test(content);
    const asSpread = new RegExp(`\\.\\.\\.${identifier}`).test(content);
    const asArrayAccess = new RegExp(`${identifier}\\[`).test(content);
    const asPropertyAccess = new RegExp(`${identifier}\\.`).test(content);
    
    if (asTag || asProp || asExpr || asSpread || asArrayAccess || asPropertyAccess) {
      finalIdentifiers.add(identifier);
    }
  });
  
  // Step: If any demo component is from a separate file, return the entire file content
  // Since JSX is always just that one component when it's from a separate file
  if (demoComponentsToInline.size > 0) {
    const [compName, compInfo] = Array.from(demoComponentsToInline.entries())[0];
    
    if (existsSync(compInfo.filePath)) {
      const fileContent = readFileSync(compInfo.filePath, "utf-8");
      const normalizedContent = fileContent.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
      console.log(`✅ Using full file content for ${compName} from ${compInfo.filePath}`);
      return normalizedContent;
    }
  }
  
  // Step: Inline demo components by replacing component usage with actual component code
  const demoComponentImportsToInclude = new Set<string>();
  let inlinedContent = content;
  
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
      demoCode.imports.forEach(imp => {
        if (imp && !imp.includes('/app/demo/[name]/')) {
          demoComponentImportsToInclude.add(imp.trim());
        }
      });
      
      try {
        const demoFileContent = readFileSync(compInfo.filePath, "utf-8");
        const demoSourceFile = ts.createSourceFile(
          compInfo.filePath,
          demoFileContent,
          ts.ScriptTarget.Latest,
          true,
          ts.ScriptKind.TSX
        );
        
        let returnJSX = "";
        
        function findComponentAndReturn(node: ts.Node): boolean {
          if (ts.isFunctionDeclaration(node) && node.name && node.name.text === compName) {
            if (node.modifiers?.some(m => m.kind === ts.SyntaxKind.ExportKeyword)) {
              function findReturn(node: ts.Node) {
                if (ts.isReturnStatement(node) && node.expression) {
                  returnJSX = jsxToString(node.expression, demoSourceFile);
                  return;
                }
                ts.forEachChild(node, findReturn);
              }
              findReturn(node);
              return returnJSX.length > 0;
            }
          }
          
          if (ts.isVariableStatement(node)) {
            if (node.modifiers?.some(m => m.kind === ts.SyntaxKind.ExportKeyword)) {
              const declaration = node.declarationList.declarations[0];
              if (declaration && ts.isIdentifier(declaration.name) && declaration.name.text === compName) {
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
          if (returnJSX.startsWith("(") && returnJSX.endsWith(")")) {
            returnJSX = returnJSX.slice(1, -1).trim();
          }
          
          const selfClosingRegex = new RegExp(`<${compName}(?:\\s+[^>]*)?\\s*/?>`, 'g');
          const beforeReplace = inlinedContent;
          inlinedContent = inlinedContent.replace(selfClosingRegex, returnJSX);
          
          const withChildrenRegex = new RegExp(`<${compName}(?:\\s[^>]*)?>([\\s\\S]*?)</${compName}>`, 'g');
          inlinedContent = inlinedContent.replace(withChildrenRegex, (match, children) => {
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
        const returnMatch = demoCode.componentCode.match(/return\s*\(([\s\S]*?)\)\s*;?\s*}/);
        if (returnMatch) {
          let componentJSX = returnMatch[1].trim();
          componentJSX = componentJSX.replace(/^\s+/, "").replace(/\s+$/, "");
          
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
  
  content = inlinedContent;
  
  // Step: Build import statements for used identifiers
  const inlinedComponentNames = new Set(demoComponentsToInline.keys());
  const identifiersToImport = new Set<string>();
  finalIdentifiers.forEach(identifier => {
    if (!inlinedComponentNames.has(identifier)) {
      identifiersToImport.add(identifier);
    }
  });
  
  // Group imports by their original import statement to preserve structure
  const importsByStatement = new Map<string, Set<string>>();
  
  identifiersToImport.forEach(identifier => {
    const importStatement = importMap.get(identifier);
    if (importStatement) {
      const moduleMatch = importStatement.match(/from\s+["']([^"']+)["']/);
      if (moduleMatch) {
        const modulePath = moduleMatch[1];
        if (!modulePath.includes('/app/demo/[name]/')) {
          if (!importsByStatement.has(importStatement)) {
            importsByStatement.set(importStatement, new Set());
          }
          importsByStatement.get(importStatement)!.add(identifier);
        }
      }
    }
  });
  
  // Helper function to parse identifiers from an import statement
  function parseImportIdentifiers(importStatement: string): { type: 'default' | 'named' | 'namespace', identifiers: string[], identifierMap: Map<string, string>, modulePath: string } | null {
    const moduleMatch = importStatement.match(/from\s+["']([^"']+)["']/);
    if (!moduleMatch) return null;
    
    const modulePath = moduleMatch[1];
    
    // Check for default import: import Name from "..."
    const defaultMatch = importStatement.match(/^import\s+(\w+)\s+from/);
    if (defaultMatch) {
      const identifier = defaultMatch[1];
      const identifierMap = new Map<string, string>();
      identifierMap.set(identifier, identifier);
      return { type: 'default', identifiers: [identifier], identifierMap, modulePath };
    }
    
    // Check for namespace import: import * as Name from "..."
    const namespaceMatch = importStatement.match(/import\s+\*\s+as\s+(\w+)\s+from/);
    if (namespaceMatch) {
      const identifier = namespaceMatch[1];
      const identifierMap = new Map<string, string>();
      identifierMap.set(identifier, identifier);
      return { type: 'namespace', identifiers: [identifier], identifierMap, modulePath };
    }
    
    // Check for named imports: import { A, B, C } or import { A as B, C } from "..."
    const namedMatch = importStatement.match(/import\s*\{\s*([^}]+)\s*\}\s+from/);
    if (namedMatch) {
      const identifierMap = new Map<string, string>();
      const identifiers: string[] = [];
      const importParts = namedMatch[1].split(',').map(id => id.trim()).filter(id => id.length > 0);
      
      importParts.forEach(part => {
        // Handle "A as B" syntax
        const asMatch = part.match(/^(\w+)\s+as\s+(\w+)$/);
        if (asMatch) {
          const originalName = asMatch[1];
          const aliasedName = asMatch[2];
          identifierMap.set(aliasedName, part); // Map aliased name to full import part
          identifierMap.set(originalName, part); // Also map original name
          identifiers.push(aliasedName);
        } else {
          identifierMap.set(part, part);
          identifiers.push(part);
        }
      });
      
      return { type: 'named', identifiers, identifierMap, modulePath };
    }
    
    return null;
  }
  
  // Group by module path to combine imports from the same module
  const importsByModule = new Map<string, { type: 'default' | 'named' | 'namespace', identifierMap: Map<string, string>, usedIdentifiers: Set<string>, isMultiLine: boolean }>();
  const neededImportStatements: string[] = [];
  
  importsByStatement.forEach((usedIdentifiers, originalImport) => {
    const parsed = parseImportIdentifiers(originalImport);
    if (!parsed) {
      // Fallback: use original import if we can't parse it
      const moduleMatch = originalImport.match(/from\s+["']([^"']+)["']/);
      if (moduleMatch && !moduleMatch[1].includes('/app/demo/[name]/')) {
        neededImportStatements.push(originalImport);
      }
      return;
    }
    
    const { type, identifierMap, modulePath } = parsed;
    const usedIds = new Set(usedIdentifiers);
    
    if (!modulePath.includes('/app/demo/[name]/')) {
      if (!importsByModule.has(modulePath)) {
        const isMultiLine = originalImport.includes('\n');
        importsByModule.set(modulePath, {
          type,
          identifierMap: new Map(identifierMap),
          usedIdentifiers: new Set(),
          isMultiLine
        });
      }
      
      const moduleData = importsByModule.get(modulePath)!;
      // Combine used identifiers from all import statements for this module
      usedIds.forEach(id => moduleData.usedIdentifiers.add(id));
      // Merge identifier maps (preserve original import structure)
      identifierMap.forEach((value, key) => {
        if (!moduleData.identifierMap.has(key)) {
          moduleData.identifierMap.set(key, value);
        }
      });
    }
  });
  
  importsByModule.forEach((moduleData, modulePath) => {
    const { type, identifierMap, usedIdentifiers, isMultiLine } = moduleData;
    const usedIds = Array.from(usedIdentifiers);
    
    if (type === 'default') {
      if (usedIds.length > 0) {
        neededImportStatements.push(`import ${usedIds[0]} from "${modulePath}";`);
      }
    } else if (type === 'namespace') {
      if (usedIds.length > 0) {
        neededImportStatements.push(`import * as ${usedIds[0]} from "${modulePath}";`);
      }
    } else if (type === 'named') {
      // Get import parts for used identifiers, preserving original structure (including aliases)
      const importParts: string[] = [];
      usedIds.forEach(id => {
        const importPart = identifierMap.get(id);
        if (importPart && !importParts.includes(importPart)) {
          importParts.push(importPart);
        }
      });
      
      if (importParts.length === 0) {
        return;
      } else if (importParts.length === 1) {
        neededImportStatements.push(`import { ${importParts[0]} } from "${modulePath}";`);
      } else {
        // Preserve original formatting style (single line vs multi-line)
        if (isMultiLine) {
          const formatted = importParts
            .map((part, index) => `  ${part}${index < importParts.length - 1 ? ',' : ''}`)
            .join('\n');
          neededImportStatements.push(`import {\n${formatted}\n} from "${modulePath}";`);
        } else {
          neededImportStatements.push(`import { ${importParts.join(', ')} } from "${modulePath}";`);
        }
      }
    }
  });
  
  demoComponentImportsToInclude.forEach(imp => {
    neededImportStatements.push(imp);
  });
  
  const importBlock = neededImportStatements.join("\n");
  
  // Step: Extract variable/constant definitions for identifiers that are not imported
  const localIdentifiers = new Set<string>();
  finalIdentifiers.forEach(identifier => {
    if (!importMap.has(identifier) && 
        !demoComponentsToInline.has(identifier) &&
        !['React', 'useState', 'useEffect', 'useMemo', 'useCallback', 'useRef'].includes(identifier)) {
      localIdentifiers.add(identifier);
    }
  });
  
  const variableDefinitions: string[] = [];
  if (sourceFile && localIdentifiers.size > 0) {
    variableDefinitions.push(...extractVariableDefinitions(sourceFile, localIdentifiers, importMap));
  }
  
  const variableBlock = variableDefinitions.length > 0 
    ? "\n\n" + variableDefinitions.join("\n\n") 
    : "";
  
  // Step: Format JSX with proper indentation
  content = content.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  const lines = content.split("\n");
  if (lines.length === 1) {
    return `${importBlock}${variableBlock}

export default function ${componentName}() {
  return (
    ${content.trim()}
  );
}`;
  }
  
  const nonEmptyLines = lines.filter(line => line.trim().length > 0);
  if (nonEmptyLines.length === 0) {
    return `${importBlock}${variableBlock}

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
  
  let indentLevel = 0;
  const formattedLines: string[] = [];
  
  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim();
    if (trimmed.length === 0) {
      formattedLines.push("");
      continue;
    }
    
    const allTags = trimmed.match(/<[^>]+>/g) || [];
    const closingCount = allTags.filter(t => t.startsWith("</")).length;
    const selfCloseCount = allTags.filter(t => t.endsWith("/>")).length;
    const openingCount = allTags.filter(t => 
      !t.startsWith("</") && 
      !t.startsWith("<!") && 
      !t.endsWith("/>")
    ).length;
    
    const isSelfContained = (openingCount > 0 && closingCount > 0) || selfCloseCount > 0;
    const isClosingOnly = trimmed.startsWith("</");
    
    if (isClosingOnly && closingCount > 0) {
      indentLevel = Math.max(0, indentLevel - closingCount);
    }
    
    const indent = "    " + "  ".repeat(indentLevel);
    formattedLines.push(indent + trimmed);
    
    if (openingCount > 0 && closingCount === 0 && selfCloseCount === 0) {
      indentLevel += openingCount;
    }
  }
  
  const formattedContent = formattedLines.join("\n");
  
  const finalCode = `${importBlock}${variableBlock}

export default function ${componentName}() {
  return (
${formattedContent}
  );
}`;
  
  return finalCode.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
}

function extractDefaultComponentRegex(fileContent: string): string | null {
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

  // Step: Extract imports from file
  const lineImports: string[] = [];
  const lines = fileContent.split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('import ') && trimmed.includes(' from ')) {
      const importLine = trimmed.endsWith(';') ? trimmed : trimmed + ';';
      lineImports.push(importLine);
    }
  }
  const astImports = extractImports(sourceFile);
  const finalImports = lineImports.length > 0 ? lineImports : astImports;
  
  const { importMap, demoComponentImports } = parseImportsFromAST(sourceFile);
  
  const result: ComponentData = {
    name: "",
    components: {},
  };
  
  const defaultComponentRegex = extractDefaultComponentRegex(fileContent);

  // Step: Parse component data from AST
  function visit(node: ts.Node) {
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
                let jsxString = extractDefaultComponentRegex(fileContent);
                if (!jsxString) {
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
                    demoComponentImports,
                    sourceFile
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
                      const jsxString = jsxToString(compProp.initializer, sourceFile);
                      const componentName = extractComponentName(keyName);
                      result.components[keyName] = generateComponentCode(
                        componentName,
                        jsxString,
                        finalImports,
                        importMap,
                        demoComponentImports,
                        sourceFile
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
  
  // Step: Normalize line endings and generate JSON
  const normalizedComponents: Record<string, string> = {};
  for (const [key, value] of Object.entries(componentData.components)) {
    normalizedComponents[key] = value.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  }
  
  const jsonContent = JSON.stringify(normalizedComponents, null, 4);
  
  const outputDir = dirname(outputPath);
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
    console.log(`📁 Created directory: ${outputDir}`);
  }
  
  writeFileSync(outputPath, jsonContent, "utf-8");
  
  console.log(`✨ Generated JSON file: ${outputPath}`);
}

function extractComponentImports(indexFilePath: string): Array<{ name: string; importPath: string; key: string }> {
  const fileContent = readFileSync(indexFilePath, "utf-8");
  const components: Array<{ name: string; importPath: string; key: string }> = [];
  
  // Step: Extract import statements
  const importRegex = /import\s+{\s*([^}]+)\s*}\s+from\s+["'](@\/app\/demo\/\[name\]\/ui\/([\w-]+))["']/g;
  let match;
  const importMap = new Map<string, string>();
  
  while ((match = importRegex.exec(fileContent)) !== null) {
    const importNames = match[1].split(',').map(n => n.trim());
    const fileName = match[3];
    
    importNames.forEach(importName => {
      const cleanName = importName.split(/\s+as\s+/)[0].trim();
      importMap.set(cleanName, fileName);
    });
  }
  
  // Step: Extract demos object to map import names to export keys
  const demosRegex = /export\s+const\s+demos[^=]*=\s*{([\s\S]*?)};?\s*$/m;
  const demosMatch = fileContent.match(demosRegex);
  
  if (demosMatch) {
    const demosContent = demosMatch[1];
    const lines = demosContent.split('\n');
    const keyMap = new Map<string, string>();
    
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('//')) continue;
      
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
    
    importMap.forEach((fileName, importName) => {
      const exportKey = keyMap.get(importName) || importName;
      components.push({
        name: importName,
        importPath: `src/app/demo/[name]/ui/${fileName}`,
        key: exportKey,
      });
    });
  } else {
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
  
  if (!existsSync(outputBaseDir)) {
    mkdirSync(outputBaseDir, { recursive: true });
    console.log(`📁 Created output directory: ${outputBaseDir}\n`);
  }
  
  // Step: Process each component
  let successCount = 0;
  let errorCount = 0;
  
  for (const component of components) {
    const tsxFilePath = resolve(process.cwd(), component.importPath + ".tsx");
    const outputPath = join(outputBaseDir, `${component.key}.json`);
    
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

if (require.main === module) {
  const indexFile = process.argv[2] || "src/app/demo/[name]/index.tsx";
  const outputDir = process.argv[3] || "src/app/content/ui";
  
  const indexPath = resolve(process.cwd(), indexFile);
  
  if (!existsSync(indexPath)) {
    console.error(`❌ Index file not found: ${indexPath}`);
    process.exit(1);
  }
  
  if (process.argv[2] && process.argv[2].endsWith('.tsx') && process.argv[2].includes('/ui/')) {
    const tsxFile = process.argv[2];
    const outputFile = process.argv[3] || tsxFile.replace('/ui/', '/content/ui/').replace('.tsx', '.json');
    
    const tsxPath = resolve(process.cwd(), tsxFile);
    const outputPath = resolve(process.cwd(), outputFile);
    
    generateJSON(tsxPath, outputPath);
  } else {
    generateAllComponents(indexPath, outputDir);
  }
}

export { generateJSON, generateAllComponents };