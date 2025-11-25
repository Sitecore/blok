import * as React from "react";

interface TabsThumbProps {
  className?: string;
}

const TabsThumb = ({ className }: TabsThumbProps) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 400 300"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    preserveAspectRatio="xMidYMid meet"
  >
    <g clipPath="url(#prefix__a)">
      <rect
        x="44"
        y="130"
        width="123"
        height="40"
        rx="8"
        fill="var(--color-primary-400)"
      />
      <rect
        x="70.091"
        y="145"
        width="70.818"
        height="10"
        rx="5"
        fill="var(--color-gray-50)"
      />
      <rect
        x="189"
        y="130"
        width="123"
        height="40"
        rx="8"
        fill="var(--color-gray-300)"
      />
      <rect
        x="215.091"
        y="145"
        width="70.818"
        height="10"
        rx="5"
        fill="var(--color-gray-400)"
      />
      <rect
        x="334"
        y="130"
        width="123"
        height="40"
        rx="8"
        fill="var(--color-gray-300)"
      />
      <rect
        x="360.091"
        y="145"
        width="70.818"
        height="10"
        rx="5"
        fill="var(--color-gray-400)"
      />
      <path
        d="M44 193a4 4 0 014-4h352v8H48a4 4 0 01-4-4z"
        fill="var(--color-gray-300)"
      />
      <path
        d="M44 193a4 4 0 014-4h115a4 4 0 010 8H48a4 4 0 01-4-4z"
        fill="var(--color-primary-400)"
      />
    </g>
    <defs>
      <clipPath id="prefix__a">
        <path fill="#fff" d="M0 0h400v300H0z" />
      </clipPath>
    </defs>
  </svg>
);

export default TabsThumb;

