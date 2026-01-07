import path from "path";
import fs from "fs/promises";
import { DocsiteRegistryEntry, docsiteRegistry } from "@/lib/docsite/docsite-registry";

export type RegistryLoadResult = {
  code: string;
  Component: DocsiteRegistryEntry['component'];
};

export async function loadFromRegistry(
  registryKey: keyof typeof docsiteRegistry
): Promise<RegistryLoadResult | null> {
  const entry = docsiteRegistry[registryKey];
  if (!entry) return null;

  const absolutePath = path.join(process.cwd(), entry.path);

  const code = await fs.readFile(absolutePath, "utf-8");

  return {
    code,
    Component: entry.component,
  };
}
