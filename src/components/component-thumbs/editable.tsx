const EditableThumb = ({ className }: { className?: string }) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 400 300"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    preserveAspectRatio="xMidYMid meet"
  >
    {/* Background card */}
    <rect x="53" y="90" width="294" height="120" rx="8" fill="white" />
    
    {/* Preview text state */}
    <rect
      x="71"
      y="110"
      width="200"
      height="14"
      rx="4"
      fill="var(--color-gray-700)"
    />
    
    {/* Input field with border */}
    <rect
      x="71"
      y="140"
      width="220"
      height="36"
      rx="6"
      stroke="var(--color-primary-400)"
      strokeWidth="2"
      fill="white"
    />
    
    {/* Input text cursor */}
    <rect
      x="83"
      y="150"
      width="140"
      height="12"
      rx="4"
      fill="var(--color-gray-600)"
    />
    
    {/* Cursor line */}
    <rect
      x="227"
      y="148"
      width="2"
      height="16"
      fill="var(--color-primary-500)"
    />
    
    {/* Edit icon pencil */}
    <path
      d="M309 115L317 107L321 111L313 119L309 120L309 115Z"
      fill="var(--color-primary-500)"
    />
    <path
      d="M318 106L320 104L324 108L322 110L318 106Z"
      fill="var(--color-primary-400)"
    />
    
    {/* Save button */}
    <rect
      x="297"
      y="145"
      width="38"
      height="26"
      rx="13"
      fill="var(--color-primary-500)"
    />
    
    {/* Check mark icon inside button */}
    <path
      d="M310 158L314 162L322 154"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default EditableThumb;
