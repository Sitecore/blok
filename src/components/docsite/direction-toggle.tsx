"use client";

import { Languages } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

export function DirectionToggle() {
  const [direction, setDirection] = useState<"ltr" | "rtl">("ltr");

  useEffect(() => {
    // Check initial direction
    const savedDirection = localStorage.getItem("direction") as "ltr" | "rtl" | null;
    const currentDir = savedDirection || document.documentElement.getAttribute("dir") || "ltr";
    setDirection(currentDir as "ltr" | "rtl");

    // Watch for direction changes
    const observer = new MutationObserver(() => {
      const dir = document.documentElement.getAttribute("dir") || "ltr";
      setDirection(dir as "ltr" | "rtl");
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["dir"],
    });

    return () => observer.disconnect();
  }, []);

  const toggleDirection = () => {
    const newDirection = direction === "ltr" ? "rtl" : "ltr";
    setDirection(newDirection);

    document.documentElement.setAttribute("dir", newDirection);
    localStorage.setItem("direction", newDirection);

    // Update direction inside iframe
    const iframe = document.getElementById(
      "iframe",
    ) as HTMLIFrameElement | null;

    if (iframe?.contentWindow) {
      iframe.contentWindow.postMessage(
        { type: "direction", direction: newDirection },
        window.location.origin,
      );
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={`Toggle direction (current: ${direction.toUpperCase()})`}
      onClick={toggleDirection}
      className="hover:bg-primary-background hover:text-primary-fg active:bg-primary-background active:text-primary-fg"
    >
      <Languages className="h-4 w-4" />
      <span className="sr-only">Toggle direction</span>
    </Button>
  );
}

