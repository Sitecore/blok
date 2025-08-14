import React, { ReactElement } from "react";
import CommandSnippet from "@/components/ui/commandSnippet";
import CustomCodeBlock from "@/components/code-block"

type CommonTemplateProps<T extends object = {}> = {
  pageTitle: string;
  pageDescription: string;
  installationCommands: Array<{ label: string; code: string }>;
  usageCommands: Array<{ code: string }>;
  config: T & { variants?: any[] };
  children: ReactElement<any>;
};

export const CommonTemplate = <T extends object>({
  pageTitle,
  pageDescription,
  installationCommands,
  usageCommands,
  config,
  children
}: CommonTemplateProps<T>) => {
  return (
    <div className="p-10 pb-20 bg-secondary space-y-10">

      <div className="flex flex-col space-y-5">
        <h1 className="text-3xl md:text-4xl font-semibold">{pageTitle}</h1>
        <p className="text-muted-foreground w-full md:w-140">{pageDescription}</p>
      </div>

      <div>
        {React.cloneElement(children, {
          ...config,
          selectedVariant: config.variants?.[0]
        })}
      </div>

      <div className="space-y-8">
        <h2 className="text-2xl md:text-3xl font-semibold">Installaton</h2>
        <CommandSnippet commands={installationCommands} />
      </div>

      <div className="space-y-8">
        <h2 className="text-2xl md:text-3xl font-semibold">Usage</h2>
        {usageCommands.map((item, idx) => (
          <div key={idx}>
            <CustomCodeBlock
              code={[
                {
                  language: "jsx",
                  filename: "MyComponent.jsx",
                  code: item.code,
                },
              ]}
              defaultValue="jsx"
            />
          </div>

        ))}
      </div>
      <div className="space-y-8">
        <h2 className="text-2xl md:text-3xl font-semibold">Examples</h2>
      
          {config.variants?.map((variant) => (
            <div  className="space-y-7">
              <React.Fragment key={variant.type}>
                {React.cloneElement(children, { ...config, selectedVariant: variant })}
              </React.Fragment>
            </div>
          ))}

  
      </div>


    </div>
  );
};