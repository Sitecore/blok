"use client";

import * as React from "react";
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio";

const AspectRatio = React.memo(function AspectRatio({
  ...props
}: React.ComponentProps<typeof AspectRatioPrimitive.Root>) {
  return <AspectRatioPrimitive.Root data-slot="aspect-ratio" {...props} />;
});

export { AspectRatio };
