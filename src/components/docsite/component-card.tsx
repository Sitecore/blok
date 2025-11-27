"use client";

import type { Component } from "@/lib/registry";

interface ComponentCardProps {
  component: Component;
  baseUrl: string;
  prompt: string;
}

export function ComponentCard({
  component,
  baseUrl,
  prompt,
}: ComponentCardProps) {

  return (
    <section>
      <div id="starting-kit">
        <div className="h-[800px] w-full overflow-hidden">
          <iframe
            id="iframe"
            src={`/demo/${component.name}`}
            className="h-full w-full"
            title="Page Preview"
          />
        </div>
      </div>
    </section>
  );
}
