const CollaborationThumb = ({ className }: { className?: string }) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 400 300"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    preserveAspectRatio="xMidYMid meet"
  >
    {/* Card background */}
    <rect x="100" y="80" width="200" height="140" rx="12" fill="white" stroke="#E5E5E5" strokeWidth="1"/>
    
    {/* Header - Users label and count */}
    <text x="120" y="110" fill="#333" fontSize="12" fontWeight="600">Users</text>
    <text x="155" y="110" fill="#999" fontSize="12">3</text>
    
    {/* Avatar stack - aligned and overlapping left to right */}
    <g>
      <circle cx="232" cy="105" r="12" fill="#9373FF"/>
      <circle cx="250" cy="105" r="12" fill="#6987F9" stroke="white" strokeWidth="2"/>
      <circle cx="268" cy="105" r="12" fill="#44CBAC" stroke="white" strokeWidth="2"/>
      {/* Add user icon button */}
      <circle cx="286" cy="105" r="10" fill="#9373FF"/>
      <path d="M282 105H290M286 101V109" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
    </g>
    
    {/* User list item 1 */}
    <circle cx="130" cy="140" r="12" fill="#9373FF"/>
    <rect x="150" y="134" width="80" height="12" rx="4" fill="#E5E5E5"/>
    
    {/* User list item 2 */}
    <circle cx="130" cy="170" r="12" fill="#6987F9"/>
    <rect x="150" y="164" width="70" height="12" rx="4" fill="#E5E5E5"/>
    
    {/* Add users button */}
    <g>
      <circle cx="130" cy="202" r="6" fill="none" stroke="#999" strokeWidth="1"/>
      <path d="M128 202H132M130 200V204" stroke="#999" strokeWidth="1" strokeLinecap="round"/>
      <text x="142" y="206" fill="#999" fontSize="10">Add users</text>
    </g>
  </svg>
);

export default CollaborationThumb;

