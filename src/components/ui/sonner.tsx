"use client";

import {
  mdiAlertCircle,
  mdiCheckCircle,
  mdiClose,
  mdiInformation,
} from "@mdi/js";
import Icon from "@mdi/react";
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
          success: "!bg-success-100",
          error: "!bg-red-100",
          info: "!bg-info-100",
          warning: "!bg-warning-100",
          default: "!bg-info-100",
          title: "text-sm !text-black !font-normal",
          description: "text-sm !text-black",
          closeButton:
            "!absolute !top-3 !right-0 !left-auto !bg-transparent !border-none !text-black scale-120",
        },
      }}
      {...props}
      icons={{
        success: (
          <div className="text-success">
            <Icon path={mdiCheckCircle} size={0.9} />
          </div>
        ),
        error: (
          <div className="text-danger">
            <Icon path={mdiAlertCircle} size={0.9} />
          </div>
        ),
        info: (
          <div className="text-info">
            <Icon path={mdiInformation} size={0.9} />
          </div>
        ),
        warning: (
          <div className="text-warning">
            <Icon path={mdiAlertCircle} size={0.9} />
          </div>
        ),
        close: (
          <div className="text-neutral-fg">
            <Icon path={mdiClose} size={0.7} />
          </div>
        ),
      }}
    />
  );
};

export { Toaster };
