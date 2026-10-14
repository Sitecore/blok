"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Icon } from "@/lib/icon";
import { mdiWeatherNight, mdiWeatherSunny } from "@mdi/js";

export function ModeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);

    const themeStr = newTheme ? "dark" : "light";

    if (newTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }

    // change theme inside iframe
    const iframe = document.getElementById(
      "iframe",
    ) as HTMLIFrameElement | null;

    if (iframe?.contentWindow) {
      iframe.contentWindow.postMessage(
        { type: "theme", theme: themeStr },
        window.location.origin,
      );
    }
  };

  return (
    <Button
      variant="outline"
      size="icon"
      aria-label="Toggle theme"
      onClick={toggleTheme}
    >
      <Icon
        path={mdiWeatherSunny}
        className="dark:-rotate-90 h-4 w-4 rotate-0 scale-100 transition-all dark:scale-0"
      />
      <Icon
        path={mdiWeatherNight}
        className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
