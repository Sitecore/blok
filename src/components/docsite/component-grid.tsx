"use client";

import * as React from "react";
import { ComponentGridCard } from "./component-grid-card";
import {
  ComponentThumb,
  hasComponentThumbnail,
} from "./component-thumb-loader";
import type { Component } from "@/lib/registry";

interface ComponentGridProps {
  components: Component[];
  getPreview?: (component: Component) => React.ReactNode;
  getHref?: (component: Component) => string;
  className?: string;
  useThumbnails?: boolean;
}

export function ComponentGrid({
  components,
  getPreview,
  getHref,
  className,
  useThumbnails = true,
}: ComponentGridProps) {
  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(224px,224px))] gap-y-6 gap-x-6 justify-items-start ${
        className || ""
      }`}
    >
      {components.map((component) => {
        const href = getHref?.(component);

        let preview = getPreview?.(component);
        if (
          !preview &&
          useThumbnails &&
          hasComponentThumbnail(component.name)
        ) {
          preview = (
            <div className="w-full h-full flex items-center justify-center p-4">
              <ComponentThumb
                componentName={component.name}
                className="w-full h-auto max-h-full"
              />
            </div>
          );
        }

        return (
          <ComponentGridCard
            key={component.name}
            name={component.name}
            title={component.title}
            href={href}
            preview={preview}
          />
        );
      })}
    </div>
  );
}
