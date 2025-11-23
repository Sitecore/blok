'use client';

import * as React from 'react';
import { RootProvider } from 'fumadocs-ui/provider';

// Polyfill for React 19 compatibility
if (typeof (React as any).useEffectEvent === 'undefined') {
  (React as any).useEffectEvent = function useEffectEvent(fn: Function) {
    const ref = React.useRef(fn);
    
    React.useLayoutEffect(() => {
      ref.current = fn;
    });

    return React.useCallback((...args: any[]) => {
      const func = ref.current;
      return func(...args);
    }, []);
  };
}

export function FumadocsProvider({ children }: { children: React.ReactNode }) {
  return <RootProvider>{children}</RootProvider>;
}




