import { execSync } from "node:child_process";
import { copyFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";

interface RegistryConfig {
  source: string;
  output: string;
  copyRegistryFile?: boolean;
}

function buildRegistry(config: RegistryConfig): void {
  const { source, output, copyRegistryFile = true } = config;

  console.log(`📦 Building ${source}...`);

  // Build components with shadcn/ui
  execSync(`npx shadcn@latest build ${source} --output ${output}`, {
    stdio: "inherit",
  });

  // Copy registry.json to output directory
  if (copyRegistryFile) {
    const registryOutput = `${output}/registry.json`;
    mkdirSync(dirname(registryOutput), { recursive: true });
    copyFileSync(source, registryOutput);
    console.log(`✅ Copied ${source} → ${registryOutput}`);
  }

  console.log(`✨ ${source} built successfully!`);
}

// gets config file
if (require.main === module) {
  const configFile = process.argv[2];

  if (!configFile) {
    console.error("❌ Usage: npx tsx scripts/build-registry.ts");
    process.exit(1);
  }

  const config = require(`../${configFile}`) as RegistryConfig;
  buildRegistry(config);
}

export { buildRegistry };
export type { RegistryConfig };
