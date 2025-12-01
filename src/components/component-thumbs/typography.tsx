import * as React from "react";

interface typographyThumbProps {
  className?: string;
}

const TypographyThumb = ({ className }: typographyThumbProps) => (
  <svg
    width="38"
    height="37"
    viewBox="0 0 38 37"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M34.81 0L37.6617 10.6938L35.3017 11.3329C34.1954 9.19417 33.0646 7.05542 31.7617 5.97375C30.4588 4.91667 28.9346 4.91667 27.435 4.91667H21.2892V30.7292C21.2892 31.9583 21.2892 33.1875 22.1004 33.8021C22.9363 34.4167 24.5588 34.4167 26.2058 34.4167V36.875H11.4558V34.4167C13.1029 34.4167 14.7254 34.4167 15.5613 33.8021C16.3725 33.1875 16.3725 31.9583 16.3725 30.7292V4.91667H10.2267C8.72708 4.91667 7.20292 4.91667 5.9 5.97375C4.59708 7.05542 3.46625 9.19417 2.36 11.3329L0 10.6938L2.85167 0H34.81Z"
      fill="#6E3FFF"
    />
  </svg>
);

export default TypographyThumb;
