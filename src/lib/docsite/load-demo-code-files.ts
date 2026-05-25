import fs from "node:fs/promises";
import path from "node:path";
import {
  type DemoCodeFileSource,
  type LoadedDemoCodeFile,
  languageFromDemoPath,
} from "@/lib/docsite/demo-code-files";

export async function loadDemoCodeFiles(
  sources: DemoCodeFileSource[],
): Promise<LoadedDemoCodeFile[]> {
  return Promise.all(
    sources.map(async (source) => {
      const absolutePath = path.join(process.cwd(), source.path);
      const code = await fs.readFile(absolutePath, "utf-8");
      return {
        ...source,
        language: source.language ?? languageFromDemoPath(source.path),
        code,
      };
    }),
  );
}
