import React from 'react';

interface DemoItem {
  type: string;
  title: string;
}

interface RightSidebarProps {
  demos?: DemoItem[];
}

const RightSidebar: React.FC<RightSidebarProps> = ({ demos }) => {
  return (
    <div className="w-[350px] bg-secondary text-sm font-semibold text-muted-foreground">
      <div className="sticky top-0 max-h-screen overflow-y-auto pt-8">
        <ul className="space-y-2.5 text-sm">
          <li>
            <a href="#installation" className="hover:underline scroll-mt-56">Installation</a>
          </li>
          <li>
            <a href="#usage" className="hover:underline">Usage</a>
          </li>
          {Array.isArray(demos) && demos.length > 0 && (
            <li>
              <a href="#examples" className="hover:underline">Examples</a>
              <ul className="ml-4 space-y-2 text-muted-foreground mt-2">
                {demos.map((demo, index) => (
                  <li key={index}>
                    <a href={`#example-${demo.type}`} className="hover:underline">
                      {demo.title}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default RightSidebar;
