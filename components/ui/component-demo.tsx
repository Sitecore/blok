'use client';

import React from 'react';
import { CodeDisplay } from './code-display';
import { SerializableCodeTransformationOptions } from '@/lib/utils/code-transformer';

interface ComponentDemoProps {
  children: React.ReactNode;
  filePath: string;
  fileName?: string;
  fallbackTemplate?: string;
  fallbackValues?: Record<string, string>;
  transformationOptions?: SerializableCodeTransformationOptions;
  className?: string;
}

export function ComponentDemo({
  children,
  filePath,
  fileName,
  fallbackTemplate,
  fallbackValues = {},
  transformationOptions,
  className = ""
}: ComponentDemoProps) {
  return (
    <div className={className}>
      {/* Preview Section */}
      <div className="bg-white p-6 rounded-t-lg border">
        <div className="flex justify-center">
          {children}
        </div>
      </div>
      
      {/* Code Section */}
      <div className="w-full">
        <CodeDisplay
          filePath={filePath}
          fileName={fileName}
          fallbackTemplate={fallbackTemplate}
          fallbackValues={fallbackValues}
          transformationOptions={transformationOptions}
        />
      </div>
    </div>
  );
}
