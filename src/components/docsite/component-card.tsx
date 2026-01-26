import type { Component } from "@/lib/registry";
import dynamic from "next/dynamic";

interface ComponentCardProps {
  component: Component;
}

const DemoWrapper = dynamic(() => import("@/components/demo-wrapper"), {
  ssr: true,
});

export function ComponentCard({ component }: ComponentCardProps) {
  return (
    <section>
      <div id="starting-kit">
        <div className="w-full overflow-hidden">
          <DemoWrapper name={component.name} />
          {/* <iframe
            id="iframe"
            src={`/demo/${component.name}`}
            className="h-full w-full"
            title="Page Preview"
          /> */}
        </div>
      </div>
    </section>
  );
}
