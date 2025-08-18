import { useState, useEffect } from 'react';

interface UseFileContentOptions {
  filePath: string;
  fallbackGenerator?: () => string;
  dependencies?: any[];
}

export function useFileContent({ 
  filePath, 
  fallbackGenerator, 
  dependencies = [] 
}: UseFileContentOptions) {
  const [fileContent, setFileContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFileContent = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await fetch(`/api/file-content?file=${encodeURIComponent(filePath)}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch file: ${response.statusText}`);
        }
        
        const content = await response.text();
        setFileContent(content);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
        setError(errorMessage);
        
        // Use fallback if provided
        if (fallbackGenerator) {
          setFileContent(fallbackGenerator());
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchFileContent();
  }, [filePath, ...dependencies]);

  return { fileContent, isLoading, error };
}
