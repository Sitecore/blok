import * as React from "react";

interface AlertDialogThumbProps {
  className?: string;
}

const AlertDialogThumb = ({ className }: AlertDialogThumbProps) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 400 300"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    preserveAspectRatio="xMidYMid meet"
  >
    <rect x="53" y="75" width="294" height="150" rx="13" fill="white" />
    <rect
      x="76"
      y="98"
      width="176"
      height="20"
      rx="10"
      fill="var(--color-gray-400)"
    />
    <rect
      x="76"
      y="140"
      width="216"
      height="12"
      rx="6"
      fill="var(--color-gray-300)"
    />
    <rect
      x="252"
      y="181"
      width="72"
      height="21"
      rx="4"
      fill="var(--color-red-400)"
    />
    <rect
      x="164"
      y="181"
      width="72"
      height="21"
      rx="4"
      fill="var(--color-gray-200)"
    />
  </svg>
);

export default AlertDialogThumb;

