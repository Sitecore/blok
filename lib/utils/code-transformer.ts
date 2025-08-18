export interface CodeTransformationOptions {
  removeInterface?: boolean;
  removeFunctionParams?: boolean;
  replacements: Array<{
    search: string | RegExp;
    replace: string;
  }>;
}

export interface SerializableCodeTransformationOptions {
  removeInterface?: boolean;
  removeFunctionParams?: boolean;
  replacements: Array<{
    search: string;
    replace: string;
    isRegex?: boolean;
    flags?: string;
  }>;
}

export function transformCode(
  originalCode: string,
  options: CodeTransformationOptions | SerializableCodeTransformationOptions
): string {
  let transformedCode = originalCode;

  // Remove interface if requested
  if (options.removeInterface) {
    transformedCode = transformedCode.replace(
      /interface\s+\w+\s*\{[\s\S]*?\}/g,
      ''
    );
  }

  // Remove function parameters if requested
  if (options.removeFunctionParams) {
    transformedCode = transformedCode.replace(
      /export\s+function\s+\w+\(\{[^}]*\}:\s*\w+\)/g,
      (match) => match.replace(/\{[^}]*\}:\s*\w+/, '')
    );
  }

  // Apply custom replacements
  options.replacements.forEach((replacement) => {
    let searchPattern: string | RegExp;
    
    if ('isRegex' in replacement && replacement.isRegex) {
      // Handle serializable regex patterns
      const serializableReplacement = replacement as SerializableCodeTransformationOptions['replacements'][0];
      const flags = serializableReplacement.flags || 'g';
      searchPattern = new RegExp(serializableReplacement.search, flags);
    } else if (typeof replacement.search === 'string') {
      // Handle string patterns
      searchPattern = replacement.search;
    } else {
      // Handle RegExp objects (for backward compatibility)
      searchPattern = replacement.search;
    }
    
    transformedCode = transformedCode.replace(searchPattern, replacement.replace);
  });

  // Clean up extra whitespace and empty lines
  transformedCode = transformedCode
    .replace(/\n\s*\n\s*\n/g, '\n\n') // Remove multiple empty lines
    .replace(/^\s+$/gm, '') // Remove lines with only whitespace
    .trim();

  return transformedCode;
}

export function generateFallbackCode(
  template: string,
  dynamicValues: Record<string, string>
): string {
  let fallbackCode = template;

  Object.entries(dynamicValues).forEach(([key, value]) => {
    const regex = new RegExp(`\\$\\{${key}\\}`, 'g');
    fallbackCode = fallbackCode.replace(regex, value);
  });

  return fallbackCode;
}

// Helper function to convert RegExp patterns to serializable format
export function makeTransformationOptionsSerializable(
  options: CodeTransformationOptions
): SerializableCodeTransformationOptions {
  return {
    removeInterface: options.removeInterface,
    removeFunctionParams: options.removeFunctionParams,
    replacements: options.replacements.map(replacement => {
      if (typeof replacement.search === 'string') {
        return {
          search: replacement.search,
          replace: replacement.replace,
          isRegex: false
        };
      } else {
        // Convert RegExp to serializable format
        return {
          search: replacement.search.source,
          replace: replacement.replace,
          isRegex: true,
          flags: replacement.search.flags
        };
      }
    })
  };
}
