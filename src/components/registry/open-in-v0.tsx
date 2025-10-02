import { type MouseEvent, useCallback } from "react";
import type { ComponentProps } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

function buildV0Url(registryUrl: string, title?: string, prompt?: string) {
  const params = new URLSearchParams();
  params.append("url", registryUrl);

  if (title != null) {
    params.append("title", title);
  }

  if (prompt != null) {
    params.append("prompt", prompt);
  }

  return `https://v0.dev/chat/api/open?${params.toString()}`;
}

export function OpenInV0Button({
  registryUrl,
  title,
  prompt,
  className,
  ...props
}: {
  registryUrl: string;
  title?: string;
  prompt?: string;
} & ComponentProps<typeof Button>) {
  const url = buildV0Url(registryUrl, title, prompt);

  const handleClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      if (process.env.NODE_ENV === "development") {
        e.preventDefault();
        toast.warning("You're on localhost", {
          description:
            "Open in v0 does not work in development mode, please deploy first.",
        });
      } else {
        window.open(url, "_blank", "noopener,noreferrer");
      }
    },
    [url],
  );

  return (
    <Button
      aria-label="Open in v0"
      className={`flex items-center gap-2 rounded-md bg-body-text px-4 py-2 text-inverse-text hover:bg-body-text/90 dark:bg-body-bg dark:text-body-text dark:hover:bg-body-bg/90 ${className}`}
      onClick={handleClick}
      {...props}
    >
      <span>Open in</span>
      <svg
        viewBox="0 0 40 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="size-5 text-current"
        role="graphics-symbol"
      >
        <path
          d="M23.3919 0H32.9188C36.7819 0 39.9136 3.13165 39.9136 6.99475V16.0805H36.0006V6.99475C36.0006 6.90167 35.9969 6.80925 35.9898 6.71766L26.4628 16.079C26.4949 16.08 26.5272 16.0805 26.5595 16.0805H36.0006V19.7762H26.5595C22.6964 19.7762 19.4788 16.6139 19.4788 12.7508V3.68923H23.3919V12.7508C23.3919 12.9253 23.4054 13.0977 23.4316 13.2668L33.1682 3.6995C33.0861 3.6927 33.003 3.68923 32.9188 3.68923H23.3919V0Z"
          fill="currentColor"
        />
        <path
          d="M13.7688 19.0956L0 3.68759H5.53933L13.6231 12.7337V3.68759H17.7535V17.5746C17.7535 19.6705 15.1654 20.6584 13.7688 19.0956Z"
          fill="currentColor"
        />
      </svg>
    </Button>
  );
}
