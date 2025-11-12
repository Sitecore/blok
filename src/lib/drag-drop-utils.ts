import * as React from "react";
import type { DragDropManager } from "@dnd-kit/dom";

export interface SortableTransition {
  duration?: number;
  easing?: string;
  idle?: boolean;
}

export function createSortableTransition(
  transition?: SortableTransition | null
) {
  if (!transition) return null;

  return {
    duration: transition.duration ?? 250,
    easing: transition.easing ?? "cubic-bezier(0.25, 1, 0.5, 1)",
    idle: transition.idle ?? false,
  };
}

export function getElementFromRef(
  ref: React.RefObject<HTMLElement> | HTMLElement | undefined | null
): HTMLElement | null {
  if (!ref) return null;
  if (ref instanceof HTMLElement) return ref;
  return ref.current;
}

