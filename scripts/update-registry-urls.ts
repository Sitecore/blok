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
  
  // Define the default URL pattern with explicit regex escaping for CodeQL compliance
  // CodeQL requires dots in hostnames to be escaped to prevent matching unintended hosts
  // Using regex literal with explicit escaping that CodeQL can analyze statically
  const defaultUrlPattern = /https:\/\/blok\.sitecore\.com/g;
  
  // List of all registry.json files to update
  const registryFiles = [
    "./registries/registry.json",
  ];

  console.log(`🔄 Updating registry URLs from https://blok.sitecore.com to ${baseUrl}...`);

  for (const filePath of registryFiles) {
    try {
      const fullPath = join(process.cwd(), filePath);
      const content = readFileSync(fullPath, "utf-8");
      
      // Replace all instances of the hardcoded URL with the dynamic one
      // Using pre-defined regex pattern with explicit dot escaping for CodeQL safety
      const processedContent = content.replace(defaultUrlPattern, baseUrl);
      
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
