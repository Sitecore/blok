"use client";

import { DirectionProvider as RadixDirectionProvider } from "@radix-ui/react-direction";
import { useEffect, useState } from "react";
import {
  getDirectionFromLanguage,
  getBrowserLanguage,
} from "@/lib/direction-utils";

export function DirectionProvider({
  children,
}: { children: React.ReactNode }) {
  const [dir, setDir] = useState<"ltr" | "rtl">("ltr");

  useEffect(() => {
    // Set initial direction based on browser language
    const browserLang = getBrowserLanguage();
    const direction = getDirectionFromLanguage(browserLang);

    setDir(direction);
    document.documentElement.setAttribute("dir", direction);
    document.documentElement.setAttribute("lang", browserLang);

    // Watch for browser language changes when tab becomes visible
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        const browserLang = getBrowserLanguage();
        const direction = getDirectionFromLanguage(browserLang);
        const currentLang = document.documentElement.getAttribute("lang");
        const currentDir = document.documentElement.getAttribute("dir");

        // Only update if something changed
        if (currentLang !== browserLang || currentDir !== direction) {
          setDir(direction);
          document.documentElement.setAttribute("dir", direction);
          document.documentElement.setAttribute("lang", browserLang);
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <RadixDirectionProvider dir={dir}>{children}</RadixDirectionProvider>
  );
}
