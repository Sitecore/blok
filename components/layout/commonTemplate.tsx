import React, { ReactElement } from "react";
import CommandSnippet from "@/components/ui/commandSnippet";
import CustomCodeBlock from "@/components/code-block"

type CommonTemplateProps<T extends object = {}> = {
  pageTitle: string;
  pageDescription: string;
  installationCommands: Array<{ label: string; code: string }>;
  installationSteps?: ReactElement<any>;
  usageCommands: Array<{ code: string }>;
  config?: T & { demos?: any[], mainDemo?: any; };
  children: ReactElement<any>;
};

export const CommonTemplate = <T extends object>({
  pageTitle,
  pageDescription,
  installationCommands,
  installationSteps,
  usageCommands,
  config,
  children
}: CommonTemplateProps<T>) => {
  return (
    <div className="flex flex-row">
      <div className="p-10 pb-20 bg-secondary space-y-10 min-h-screen w-full">

        <div className="flex flex-col space-y-5">
          <h1 className="text-3xl md:text-4xl font-semibold">{pageTitle}</h1>
          <p>{pageDescription}</p>
        </div>

        <div>
          {React.cloneElement(children, {
            ...config,
            selectedDemo: config?.mainDemo
          })}
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-semibold" id="installation">Installaton</h2>
          <CommandSnippet commands={installationCommands} />
          {installationSteps && (
            <div className="mt-6">
              {installationSteps}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-semibold" id="usage">Usage</h2>
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

        {Array.isArray(config?.demos) && config.demos.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-semibold" id="examples">Examples</h2>
            <p>The following is examples of our {pageTitle} class </p>

            {config.demos?.map((demo, index) => (
              <React.Fragment key={index}>
                {React.cloneElement(children, { ...config, selectedDemo: demo })}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>

      {/* Sidebar */}

      <div className="w-[350px] bg-secondary text-sm font-semibold text-muted-foreground">
        <div className="sticky top-0 max-h-screen overflow-y-auto pt-8">
          <ul className="space-y-2.5 text-sm">
            <li>
              <a href="#installation" className="hover:underline">Installation</a>
            </li>
            <li>
              <a href="#usage" className="hover:underline">Usage</a>
            </li>
            {Array.isArray(config?.demos) && config.demos.length > 0 && (
              <li>
                <a href="#examples" className="hover:underline">Examples</a>
                <ul className="ml-4 space-y-2 text-muted-foreground mt-2">
                  {config.demos.map((demo, index) => (
                    <li key={index}>
                      <a
                        href={`#example-${demo.type}`}
                        className="hover:underline"
                      >
                        {demo.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};