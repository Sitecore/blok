import * as React from "react";

interface SkeletonThumbProps {
  className?: string;
}

const SkeletonThumb = ({ className }: SkeletonThumbProps) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 400 300"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    preserveAspectRatio="xMidYMid meet"
  >
    <circle cx="76" cy="98" r="23" fill="var(--color-gray-400)" />
    <rect
      x="53"
      y="139"
      width="294"
      height="8"
      fill="var(--color-gray-400)"
    />
    <rect
      x="53"
      y="165"
      width="294"
      height="8"
      fill="var(--color-gray-400)"
    />
    <rect
      x="53"
      y="191"
      width="294"
      height="8"
      fill="var(--color-gray-400)"
    />
    <rect
      x="53"
      y="217"
      width="163"
      height="8"
      fill="var(--color-gray-400)"
    />
  </svg>
);

export default SkeletonThumb;

