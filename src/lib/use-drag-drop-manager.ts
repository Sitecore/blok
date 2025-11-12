import { useDragDropContext } from "@/components/ui/drag-drop-context";

export function useDragDropManager() {
  const { manager } = useDragDropContext();
  return manager;
}

