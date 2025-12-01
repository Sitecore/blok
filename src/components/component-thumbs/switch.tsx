import * as React from "react";

interface SwitchThumbProps {
  className?: string;
}

const SwitchThumb = ({ className }: SwitchThumbProps) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 400 300"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    preserveAspectRatio="xMidYMid meet"
  >
    <rect
      x="53"
      y="121"
      width="123"
      height="60"
      rx="29.5"
      fill="var(--color-gray-300)"
    />
    <circle cx="83" cy="151" r="24" fill="white" />
    <rect
      x="226"
      y="121"
      width="123"
      height="60"
      rx="29.5"
      fill="var(--color-primary-400)"
    />
    <circle cx="319" cy="151" r="24" fill="white" />
  </svg>
);

export default SwitchThumb;

