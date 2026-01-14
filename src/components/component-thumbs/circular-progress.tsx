import * as React from "react";

interface CircularProgressThumbProps {
  className?: string;
}

const CircularProgressThumb = ({ className }: CircularProgressThumbProps) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 400 300"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    preserveAspectRatio="xMidYMid meet"
  >
    <path
      d="M199.5 92C231.256 92 257 117.744 257 149.5C257 181.256 231.256 207 199.5 207C184.449 207 170.749 201.217 160.5 191.753"
      stroke="var(--color-primary-400)"
      strokeWidth="10"
      strokeLinecap="round"
    />
  </svg>
);

export default CircularProgressThumb;



