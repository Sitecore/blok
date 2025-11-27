"use client";

import { DirectionProvider as RadixDirectionProvider } from "@radix-ui/react-direction";
import { useEffect, useState, useRef } from "react";
import { getDirectionFromLanguage, getBrowserLanguage } from "@/lib/direction-utils";

export function DirectionProvider({ children }: { children: React.ReactNode }) {
  const [dir, setDir] = useState<"ltr" | "rtl">("ltr");
  const isUpdatingRef = useRef(false);

  useEffect(() => {
    // Set initial direction based on browser language
    const browserLang = getBrowserLanguage();
    const direction = getDirectionFromLanguage(browserLang);
    
    setDir(direction);
    document.documentElement.setAttribute("dir", direction);
    document.documentElement.setAttribute("lang", browserLang);

    // Watch for browser language changes (requires page visibility API)
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible" && !isUpdatingRef.current) {
        isUpdatingRef.current = true;
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
        isUpdatingRef.current = false;
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return <RadixDirectionProvider dir={dir}>{children}</RadixDirectionProvider>;
}

