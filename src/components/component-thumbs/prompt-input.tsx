const PromptInputThumb = ({ className }: { className?: string }) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 400 300"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    preserveAspectRatio="xMidYMid meet"
  >
    {/* Input container */}
    <rect
      x="60"
      y="110"
      width="280"
      height="80"
      rx="12"
      fill="white"
      stroke="#E5E5E5"
      strokeWidth="1.5"
    />

    {/* Placeholder text lines */}
    <rect x="80" y="130" width="140" height="8" rx="4" fill="#D8D8D8" />
    <rect
      x="80"
      y="144"
      width="90"
      height="8"
      rx="4"
      fill="#D8D8D8"
      opacity="0.5"
    />

    {/* Toolbar area — bottom of input */}
    {/* Attach button */}
    <rect x="76" y="164" width="20" height="20" rx="5" fill="#F7F7F7" />
    <path
      d="M83 178l3-3a2 2 0 012.8 0l.4.4a2 2 0 010 2.8l-3 3"
      stroke="#8E8E8E"
      strokeWidth="1.5"
      strokeLinecap="round"
    />

    {/* Submit button */}
    <rect x="306" y="164" width="22" height="20" rx="5" fill="#6E3FFF" />
    <path
      d="M317 178l0-8m0 0l-3 3m3-3l3 3"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default PromptInputThumb;
