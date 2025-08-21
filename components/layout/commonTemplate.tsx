import React, { ReactElement } from "react";
import CommandSnippet from "@/components/ui/commandSnippet";
import CustomCodeBlock from "@/components/code-block"
import RightSidebar from "./rightSidebar";

type CommonTemplateProps<T extends object = {}> = {
  pageTitle: string;
  pageDescription: string;
  installationCommands: Array<{ label: string; code: string }>;
  installationSteps?: ReactElement<any>;
  usageCommands: Array<{ code: string }>;
  config?: T & { demos?: any[], mainDemo?: any; };
  children: ReactElement<any>;
  page?: "blok" | "component";
};

export const CommonTemplate = <T extends object>({
  pageTitle,
  pageDescription,
  installationCommands,
  installationSteps,
  usageCommands,
  config,
  page = "component",
  children
}: CommonTemplateProps<T>) => {
  return (
    <div className="flex flex-row">
      <div className="p-10 pb-20 bg-secondary space-y-10 min-h-screen w-full">

        <div className="flex flex-col space-y-5">
          <h1 className="text-3xl md:text-4xl font-semibold">{pageTitle}</h1>
          <p>{pageDescription}</p>
        </div>

        {page === "component" && (
          <div>
            {React.cloneElement(children, {
              ...config,
              selectedDemo: config?.mainDemo
            })}
          </div>

        )}

        <div className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-semibold scroll-mt-6" id="installation">Installaton</h2>
          <CommandSnippet commands={installationCommands} />
          {installationSteps && (
            <div className="mt-6">
              {installationSteps}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-semibold scroll-mt-6" id="usage">Usage</h2>
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

        <div className="space-y-4">

          {page === "component" && Array.isArray(config?.demos) && config.demos.length > 0 && (
            <>
              <h2 className="text-2xl md:text-3xl font-semibold" id="examples">Examples</h2>
              <p>The following is examples of our {pageTitle} class </p>
              {
                config.demos?.map((demo, index) => (
                  <React.Fragment key={index}>
                    {React.cloneElement(children, { ...config, selectedDemo: demo })}
                  </React.Fragment>
                ))
              }
            </>
          )}
          {page === "blok" && (
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold" id="examples">Examples</h2>
              <p>The following is examples of our {pageTitle} class </p>
              {React.cloneElement(children, {
                ...config,
                selectedDemo: config?.mainDemo
              })}
            </div>

          )}
        </div>



      </div>

      {/* Side bar */}
      <RightSidebar demos={config?.demos} />

    </div>
  );
};