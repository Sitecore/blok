import { notFound } from "next/navigation";
import { demos } from "@/app/demo/[name]/index";
import { Renderer } from "@/app/demo/[name]/renderer";
import InstallationCodeBlock from "@/components/registry/installation-code-block";
import { Codeblocks } from "@/components/registry/code-block";
import { getRegistryItem } from "@/lib/registry";
import path from "path";
import DemoTab from "@/components/demo-tab";
import { ReactNode } from "react";
import fs from "fs";

export async function generateStaticParams() {
  return Object.keys(demos).map((name) => ({
    name,
  }));
}

const baseUrl = process.env.NEXT_PUBLIC_REGISTRY_URL ?? "";

export default async function DemoPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;

  const component = getRegistryItem(name);

  if (!component) {
    notFound();
  }

  const { defaultComponent, usage, components } = demos[name];

  const filePath = path.join(process.cwd(), `src/app/demo/[name]/ui/${name}.tsx`);
  const demoCodes = extractDemoCode(filePath) as unknown as Record<string, string>;

  const registryUrl = `https://${baseUrl}/r/${name}.json`;

  return (
      <div className="flex min-h-[100vh] w-full flex-col gap-12 bg-body-bg">
        <div className="flex flex-col">
          <DemoTab code={demoCodes.default} component={componentDemo(defaultComponent)} />
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="font-semibold text-3xl tracking-tight">Installation</h2>
          <InstallationCodeBlock registryUrl={registryUrl} />
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="font-semibold text-3xl tracking-tight">Usage</h2>
          {usage.map((code: string) => (
            <Codeblocks code={code} showLineNumbers={false} />
          ))}
        </div>

        <div className="flex flex-col gap-9">
          <div className="flex flex-col gap-6">
            <h2 className="font-semibold text-3xl tracking-tight">Examples</h2>
            <p className="text-sm text-muted-foreground">The following are examples of our {name} classes.</p>
          </div>

          {components &&
            Object.entries(components).map(([key, node]) => {
              return (
                <div className="flex flex-col gap-6">
                  <h3 className="font-semibold text-xl tracking-tight">{key}</h3>
                  <DemoTab 
                    key={key} 
                    code={demoCodes[key]} 
                    component={componentDemo(node)} 
                  />
                </div>
              );
          })}
        </div>
      </div>
  );
}

const componentDemo = (component: ReactNode) => {
  return (
      <div className="relative rounded-lg overflow-hidden">
          <Renderer>{component}</Renderer>
      </div>
  );
}

function extractDemoCode(filePath: string, visited = new Set<string>()) {
  if (visited.has(filePath)) return "";
  visited.add(filePath);

  if (!fs.existsSync(filePath)) return "";

  const fullSource = fs.readFileSync(filePath, "utf-8");
  console.log("fullSource", fullSource);

  // Extract directives
  const directiveMatch = fullSource.match(/^(['"]use client['"];?|['"]use server['"];?)/);
  const directive = directiveMatch ? directiveMatch[1].trim() : "";
  console.log("directive", directive);

  // Extract imports
  const importMatch = fullSource.match(/^(?:['"]use (?:client|server)['"];?\s*)?(import[\s\S]+?)(?=\nexport|\nconst|\nlet|\nvar)/);
  const imports = importMatch ? importMatch[1].trim() : "";
  console.log("imports", imports);

  // Extract components
  const componentsMatch = fullSource.match(/components\s*:\s*{([\s\S]*?)}(?=\s*[},])/);
  console.log("componentsMatch", componentsMatch);
  
  if (componentsMatch) {
      const componentsContent = componentsMatch[1];
      const jsxMatches = [
          ...componentsContent.matchAll(/([a-zA-Z0-9_-]+)\s*:\s*\(\s*((?:<[^()]+>|\([^()]*\)|[^\)])*?)\s*\),?/g)
      ];
      console.log("jsxMatches", jsxMatches);

      const results: Record<string, string> = {};

      for (const [, name, jsx] of jsxMatches) {
          const importedComponentMatch = jsx.match(/<([A-Z][A-Za-z0-9_]*)\b/);
          if (importedComponentMatch) {
              const importedComponentName = importedComponentMatch[1];
              console.log("importedComponentName", importedComponentName);
  
              // Find import path
              const importRegex = new RegExp(
                  `import\\s+\\{?\\s*${importedComponentName}\\s*\\}?\\s+from\\s+["'](.+)["']`
              );
              const importMatch = fullSource.match(importRegex);
              console.log("importMatch", importMatch);
              
              if (importMatch) {
                  let importPath = importMatch[1];
                  console.log("importPath", importPath);
                  
                  if (importPath.startsWith("@/app/demo")) {
                      // Replace alias with actual path
                      importPath = importPath.replace(/^@\/app/, "src/app");
                      console.log("importPath", importPath);
  
                      // Append `.tsx` if not included
                      if (!importPath.endsWith(".tsx")) importPath += ".tsx";
                      console.log("importPath", importPath);
                      
                      const resolvedPath = path.resolve(process.cwd(), importPath);
                      console.log("resolvedPath", resolvedPath);
                      
                      if (resolvedPath.includes("src\\app\\demo\\")) {
                          const childCodes = extractDemoCode(resolvedPath, visited);
                          console.log("childCodes", childCodes);
                          if (Object.keys(childCodes).length) {
                              results[name] = Object.values(childCodes).join("\n\n");
                              console.log("results", results);
                              continue;
                          }
                      }
                  }
              }
          }
  
          results[name] = normalizeIndentation(`
  ${directive ? directive + "\n\n" : ""}${imports}
  
  export default function ${name}Demo() {
    return (
      ${jsx.trim()}
    )
  }
  `);
      }

      return results;
  } else {
      return { default: normalizeIndentation(fullSource) };
  }
}

function normalizeIndentation(code: string): string {
  const lines = code.split("\n")

  while (lines[0]?.trim() === "") lines.shift()
  while (lines[lines.length - 1]?.trim() === "") lines.pop()

  const indents = lines
    .filter((line) => line.trim() !== "")
    .map((line) => line.match(/^(\s*)/)?.[1].length ?? 0)

  const minIndent = indents.length > 0 ? Math.min(...indents) : 0
  
  return lines.map((line) => line.slice(minIndent)).join("\n").trim()
}
