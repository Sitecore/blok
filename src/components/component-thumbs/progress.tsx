interface ProgressThumbProps {
  className?: string;
}

const ProgressThumb = ({ className }: ProgressThumbProps) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 400 300"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    preserveAspectRatio="xMidYMid meet"
  >
    <rect x="53" y="89" width="294" height="11" fill="var(--color-gray-200)" />
    <rect
      x="53"
      y="89"
      width="247"
      height="11"
      fill="var(--color-primary-400)"
    />
    <rect x="53" y="126" width="294" height="11" fill="var(--color-gray-200)" />
    <rect
      x="53"
      y="126"
      width="100"
      height="11"
      fill="var(--color-primary-400)"
    />
    <rect x="53" y="163" width="294" height="11" fill="var(--color-gray-200)" />
    <rect
      x="53"
      y="163"
      width="199"
      height="11"
      fill="var(--color-primary-400)"
    />
    <rect x="53" y="200" width="294" height="11" fill="var(--color-gray-200)" />
    <rect
      x="53"
      y="200"
      width="294"
      height="11"
      fill="var(--color-primary-400)"
    />
  </svg>
);

export default ProgressThumb;
