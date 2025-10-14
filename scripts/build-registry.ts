import { copyFileSync, mkdirSync } from "fs";
import { dirname } from "path";
import { execSync } from "child_process";

const registryConfigs = [
  {
    source: "./registries/registry.json",
    output: "./public/r",
  },
  {
    source: "./registries/marketplace/next/registry.json",
    output: "./public/r/marketplace/next",
  },
  {
    source: "./registries/marketplace/react/registry.json",
    output: "./public/r/marketplace/react",
  },
];

const files = [
  ["./registries/registry.json", "public/r/registry.json"],
  [
    "./registries/marketplace/next/registry.json",
    "public/r/marketplace/next/registry.json",
  ],
  [
    "./registries/marketplace/react/registry.json",
    "public/r/marketplace/react/registry.json",
  ],
] as const;

console.log("🚀 Building registries...");

// Build all registries with shadcn
for (const config of registryConfigs) {
  console.log(`📦 Building ${config.source}...`);
  execSync(
    `npx shadcn@latest build ${config.source} --output ${config.output}`,
    { stdio: "inherit" }
  );
}

console.log("📋 Copying registry files...");

// Copy the registry.json files
for (const [source, output] of files) {
  mkdirSync(dirname(output), { recursive: true });
  copyFileSync(source, output);
  console.log(`✅ ${source} → ${output}`);
}

console.log("✨ All registries built successfully!");
