'use client';

import React from 'react';
import { CodeDisplay } from '@/components/ui/code-display';
import { makeTransformationOptionsSerializable } from '@/lib/utils/code-transformer';

interface AlertCodeDisplayProps {
  selectedVariant: {
    title: string;
    description: string;
    type: "success" | "warning" | "primary" | "default" | "danger";
  };
}

export const AlertCodeDisplay: React.FC<AlertCodeDisplayProps> = ({
  selectedVariant,
}) => {
  const fallbackTemplate = `couldn't be able to load the component`;

  const transformationOptions = makeTransformationOptionsSerializable({
    removeInterface: true,
    removeFunctionParams: true,
    replacements: [
      { search: /variant=\{variant\}/g, replace: `variant="${selectedVariant.type}"` },
      { search: /\{title\}/g, replace: `${selectedVariant.title}` },
      { search: /\{description\}/g, replace: `${selectedVariant.description}` },
    ],
  });

  return (
    <CodeDisplay
      filePath="app/components/alert/alert-example.tsx"
      fileName="alert-example.tsx"
      fallbackTemplate={fallbackTemplate}
      fallbackValues={{
        variant: selectedVariant.type,
        title: selectedVariant.title,
        description: selectedVariant.description,
      }}
      transformationOptions={transformationOptions}
    />
  );
};
