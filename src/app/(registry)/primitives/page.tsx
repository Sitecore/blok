"use client";
import { ComponentGrid } from "@/components/docsite/component-grid";
import { getComponents } from "@/lib/registry";
import type { Component } from "@/lib/registry";

export default function ComponentsPage() {
  const components = getComponents();

  const groupedComponents = components.reduce((acc, component) => {
    const firstLetter = component.title.charAt(0).toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(component);
    return acc;
  }, {} as Record<string, Component[]>);

  const sortedGroups = Object.keys(groupedComponents)
    .sort()
    .map((letter) => ({
      letter,
      components: groupedComponents[letter].sort((a, b) =>
        a.title.localeCompare(b.title)
      ),
    }));

  return (
    <div className="container p-5 md:p-10">
      <div className="mb-8">
        <h1 className="font-bold text-4xl tracking-tight">Primitives </h1>
        <p className="text-muted-foreground max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl my-10">
          Here you can find all the components available in the library. The
          library contains a series of components from Blok v1, and new
          developments we have added from Shadcn, and some new components of our
          own. We strive to continue to update our library.
        </p>
        <div className="space-y-12">
          {sortedGroups.map(({ letter, components }) => (
            <div key={letter} className="space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                {letter}
              </h2>
              <ComponentGrid
                components={components}
                getHref={(component) => `/registry/${component.name}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
