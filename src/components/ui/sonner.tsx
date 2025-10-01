"use client";

import {
  mdiAlertCircle,
  mdiCheckCircle,
  mdiClose,
  mdiInformation,
} from "@mdi/js";
import { Icon } from "@/lib/icon";
import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      position="bottom-left"
      expand={true}
      toastOptions={{
        classNames: {
          toast: "!border-none",
          icon: "!self-start !mt-0.5",
          success: "!bg-success-100",
          error: "!bg-red-100",
          info: "!bg-info-100",
          warning: "!bg-warning-100",
          default: "!bg-info-100",
          title: "text-sm !text-black !font-normal",
          description: "text-sm !text-black",
          closeButton:
            "!absolute !top-3 !right-0 !left-auto !bg-transparent !border-none !text-black",
        },
      }}
      {...props}
      icons={{
        success: (
          <div className="text-success">
            <Icon path={mdiCheckCircle} className="size-5" />
          </div>
        ),
        error: (
          <div className="text-danger">
            <Icon path={mdiAlertCircle} className="size-5" />
          </div>
        ),
        info: (
          <div className="text-info">
            <Icon path={mdiInformation} className="size-5" />
          </div>
        ),
        warning: (
          <div className="text-warning">
            <Icon path={mdiAlertCircle} className="size-5" />
          </div>
        ),
        close: (
          <div className="text-neutral-fg">
            <Icon path={mdiClose} className="size-4" />
          </div>
        ),
      }}
    />
  );
};

export { Toaster };
