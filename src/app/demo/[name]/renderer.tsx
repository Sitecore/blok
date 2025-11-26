"use client";

import { type ReactNode, useEffect, useState } from "react";
import { DirectionProvider as RadixDirectionProvider } from "@radix-ui/react-direction";
import { getDirectionFromLanguage, getBrowserLanguage } from "@/lib/direction-utils";

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

    // Always use browser language for direction detection
    const browserLang = getBrowserLanguage();
    const direction = getDirectionFromLanguage(browserLang);

    // set initial theme and direction on mount
    setDir(direction);
    document.documentElement.setAttribute("dir", direction);
    document.documentElement.setAttribute("lang", browserLang);
    setTheme(localStorage.getItem("theme"));

    // listen for theme changes from parent via postMessage
    function handleMessage(e: MessageEvent) {
      if (e.origin !== window.location.origin) return;
      
      if (e.data?.type === "theme") {
        setTheme(e.data.theme);
        localStorage.setItem("theme", e.data.theme);
      }
      
      // Direction is now automatic based on language, but we can still listen for lang changes
      if (e.data?.type === "lang" && e.data.lang) {
        const newDirection = getDirectionFromLanguage(e.data.lang);
        setDir(newDirection);
        document.documentElement.setAttribute("dir", newDirection);
        document.documentElement.setAttribute("lang", e.data.lang);
      }
    }

    // listen for theme changes via storage events
    function onStorage(e: StorageEvent) {
      if (e.key === "theme") {
        setTheme(e.newValue);
      }
    }

    // Watch for language changes - simplified to avoid infinite loops
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

    window.addEventListener("message", handleMessage);
    window.addEventListener("storage", onStorage);
    
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("message", handleMessage);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  return (
    <RadixDirectionProvider dir={dir}>
      {children}
    </RadixDirectionProvider>
  );
}
