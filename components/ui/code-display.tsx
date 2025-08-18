'use client';

import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useFileContent } from '@/lib/hooks/use-file-content';
import { transformCode, generateFallbackCode, CodeTransformationOptions } from '@/lib/utils/code-transformer';
import { Button } from '@/registry/new-york/ui/button';
import { Icon } from '@mdi/react';
import { mdiCheck, mdiClipboardOutline } from '@mdi/js';

interface CodeDisplayProps {
  filePath: string;
  fileName?: string;
  fallbackTemplate?: string;
  fallbackValues?: Record<string, string>;
  transformationOptions?: CodeTransformationOptions;
  className?: string;
}

export function CodeDisplay({
  filePath,
  fileName,
  fallbackTemplate,
  fallbackValues = {},
  transformationOptions,
  className = ""
}: CodeDisplayProps) {
  const [isCopied, setIsCopied] = useState(false);
  
  const fallbackGenerator = fallbackTemplate 
    ? () => generateFallbackCode(fallbackTemplate, fallbackValues)
    : undefined;

  const { fileContent, isLoading, error } = useFileContent({
    filePath,
    fallbackGenerator,
    dependencies: [fallbackValues]
  });


  const getCodeToDisplay = () => {
    if (isLoading) return 'Loading...';
    
    // If we have a fallback template, use it
    if (fallbackTemplate) {
      if (transformationOptions && fileContent) {
        return transformCode(fileContent, transformationOptions);
      }
      // Use fallback template if file content is not available
      return generateFallbackCode(fallbackTemplate, fallbackValues);
    }
    
    // No fallback template available
    if (error) return `Error: ${error}`;
    if (fileContent) return fileContent;
    
    return 'No code available';
  };

  const codeToDisplay = getCodeToDisplay();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeToDisplay);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const Icons = isCopied ? mdiCheck : mdiClipboardOutline;

  return (
    <div className={className}>
      <div className="bg-neutral/10  border border-t-0 rounded-b-lg">
        {/* Error message */}
        {error && !fallbackTemplate && (
          <div className="px-4 py-2 bg-red-50 border-b border-red-200 text-red-700 text-sm">
            {error}
          </div>
        )}
        
        <div className="w-full flex flex-row">
        {/* Code content */}
        <div className=" w-[95%]">
          <SyntaxHighlighter
            language="tsx"
            style={oneLight}
            showLineNumbers={true}
            wrapLongLines={true}
            lineNumberStyle={{color:"black"}}
            customStyle={{
              margin: 0,
              borderRadius: '0.375rem',
              backgroundColor: "transparent",
              fontSize: '0.875rem',
            }}
          >
            {codeToDisplay}
          </SyntaxHighlighter>
        </div>
         {/* Header with filename and copy button */}
         <div className="flex w-[5%] justify-end px-4 py-3">
          <Button
            onClick={handleCopy}
            size="sm"
            variant="ghost"
            className="h-8 w-8 p-0"
            disabled={isLoading}
          >
            <Icon 
              path={Icons} 
              size={0.8} 
              className={isCopied ? "text-green-600" : "text-gray-500"} 
            />
          </Button>
        </div>
        </div>
      </div>
    </div>
  );
}
