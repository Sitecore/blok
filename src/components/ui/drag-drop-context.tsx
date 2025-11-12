"use client";

import * as React from "react";
import { DragDropManager } from "@dnd-kit/dom";

interface DragDropContextValue {
  manager: DragDropManager;
}

const DragDropContext = React.createContext<DragDropContextValue | null>(null);

export interface DragDropProviderProps {
  children: React.ReactNode;
}

export function DragDropProvider({ children }: DragDropProviderProps) {
  const managerRef = React.useRef<DragDropManager | null>(null);

  if (!managerRef.current) {
    managerRef.current = new DragDropManager();
  }

  const value = React.useMemo(
    () => ({
      manager: managerRef.current!,
    }),
    []
  );

  React.useEffect(() => {
    return () => {
      // Cleanup if needed
      managerRef.current = null;
    };
  }, []);

  return (
    <DragDropContext.Provider value={value}>
      {children}
    </DragDropContext.Provider>
  );
}

export function useDragDropContext() {
  const context = React.useContext(DragDropContext);
  if (!context) {
    throw new Error(
      "useDragDropContext must be used within a DragDropProvider"
    );
  }
  return context;
}

