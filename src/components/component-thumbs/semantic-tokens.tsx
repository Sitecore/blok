import * as React from "react";

interface SemanticTokensThumbProps {
  className?: string;
}

const SemanticTokensThumb = ({ className }: SemanticTokensThumbProps) => (
  <svg
    width="50"
    height="50"
    viewBox="0 0 50 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M34.4167 17.2083H41.7917L29.5 34.4167L34.4167 17.2083ZM19.6667 17.2083H29.5L24.5833 36.875L19.6667 17.2083ZM7.375 17.2083H14.75L19.6667 34.4167L7.375 17.2083ZM31.9583 4.91667H36.875L41.7917 12.2917H34.4167L31.9583 4.91667ZM22.125 4.91667H27.0417L29.5 12.2917H19.6667L22.125 4.91667ZM12.2917 4.91667H17.2083L14.75 12.2917H7.375L12.2917 4.91667ZM9.83333 0L0 14.75L24.5833 49.1667L49.1667 14.75L39.3333 0H9.83333Z"
      fill="#6E3FFF"
    />
  </svg>
);

export default SemanticTokensThumb;
