import React, { FC } from "react";
import { ComponentDemo } from "@/components/ui/component-demo";
import { AlertExample } from "./alert-example";
import { makeTransformationOptionsSerializable } from "@/lib/utils/code-transformer";

type VariantObject = {
  title: string;
  description: string;
  type: "success" | "warning" | "primary" | "default" | "danger";
};

type AlertDemoProps = {
  selectedVariant: VariantObject;
  alerText: string;
  alertDescription: string;
};

export const AlertDemo: FC<AlertDemoProps> = ({ selectedVariant }) => {
  const fallbackTemplate = `couldn't be able to load the component`;

  const transformationOptions = makeTransformationOptionsSerializable({
    removeInterface: true,
    removeFunctionParams: true,
    replacements: [
      { search: /variant=\{variant\}/g, replace: `variant="${selectedVariant.type}"` },
      { search: /\{title\}/g, replace: `"${selectedVariant.title}"` },
      { search: /\{description\}/g, replace: `"${selectedVariant.description}"` },
    ],
  });

  return (
    <ComponentDemo
      filePath="app/components/alert/alert-example.tsx"
      fileName="alert-example.tsx"
      fallbackTemplate={fallbackTemplate}
      fallbackValues={{
        variant: selectedVariant.type,
        title: selectedVariant.title,
        description: selectedVariant.description,
      }}
      transformationOptions={transformationOptions}
    >
      <AlertExample
        variant={selectedVariant.type}
        title={selectedVariant.title}
        description={selectedVariant.description}
      />
    </ComponentDemo>
  );
};
