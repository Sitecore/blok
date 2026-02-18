import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Updates all hardcoded URLs in registry.json files with the environment-based URL
 */
function updateRegistryUrls(): void {
  // Get the registry URL from environment variable or use default
  const registryUrl = process.env.NEXT_PUBLIC_REGISTRY_URL || "https://blok.sitecore.com";
  
  // Ensure URL has protocol
  const baseUrl = registryUrl.startsWith("http://") || registryUrl.startsWith("https://")
    ? registryUrl
    : `https://${registryUrl}`;
  
  const defaultUrl = "https://blok.sitecore.com";
  
  // List of all registry.json files to update
  const registryFiles = [
    "./registries/registry.json",
  ];

  console.log(`🔄 Updating registry URLs from ${defaultUrl} to ${baseUrl}...`);

  for (const filePath of registryFiles) {
    try {
      const fullPath = join(process.cwd(), filePath);
      const content = readFileSync(fullPath, "utf-8");
      
      // Replace all instances of the hardcoded URL with the dynamic one
      const processedContent = content.replace(
        new RegExp(defaultUrl.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g"),
        baseUrl
      );
      
      if (content !== processedContent) {
        writeFileSync(fullPath, processedContent, "utf-8");
        console.log(`  ✓ Updated ${filePath}`);
      } else {
        console.log(`  - No changes needed in ${filePath}`);
      }
    } catch (error) {
      console.error(`  ✗ Error updating ${filePath}:`, error);
    }
  }

  console.log(`✅ Registry URLs updated successfully!`);
}

// Run if called directly
if (require.main === module) {
  updateRegistryUrls();
}

export { updateRegistryUrls };
