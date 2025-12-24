"use client";

import { type ReactNode, useEffect, useState } from "react";
import { DirectionProvider as RadixDirectionProvider } from "@radix-ui/react-direction";
import {
  getDirectionFromLanguage,
  getBrowserLanguage,
} from "@/lib/direction-utils";

export function Renderer({ children }: { children: ReactNode }) {
  const [dir, setDir] = useState<"ltr" | "rtl">("ltr");

  useEffect(() => {
    const setTheme = (theme: string | null) => {
      if (theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    };

    // Set direction based on browser language
    const browserLang = getBrowserLanguage();
    const direction = getDirectionFromLanguage(browserLang);
    setDir(direction);
    document.documentElement.setAttribute("dir", direction);
    document.documentElement.setAttribute("lang", browserLang);

    // Set initial theme on mount
    setTheme(localStorage.getItem("theme"));

    // Listen for theme messages from parent window
    function handleMessage(e: MessageEvent) {
      if (e.origin !== window.location.origin) return;

      if (e.data?.type === "theme") {
        setTheme(e.data.theme);
        localStorage.setItem("theme", e.data.theme);
      }
    }

    // Listen for theme storage events (for cross-tab sync)
    function onStorage(e: StorageEvent) {
      if (e.key === "theme") {
        setTheme(e.newValue);
      }
    }

    // Watch for visibility changes to update direction based on browser language
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        const browserLang = getBrowserLanguage();
        const direction = getDirectionFromLanguage(browserLang);
        const currentDir = document.documentElement.getAttribute("dir");

        if (currentDir !== direction) {
          setDir(direction);
          document.documentElement.setAttribute("dir", direction);
          document.documentElement.setAttribute("lang", browserLang);
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("message", handleMessage);
    window.addEventListener("storage", onStorage);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("message", handleMessage);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  return (
    <RadixDirectionProvider dir={dir}>{children}</RadixDirectionProvider>
  );
}
