import * as React from "react";
import { useDragDropContext } from "@/components/ui/drag-drop-context";

export function useSortable(id: string | number) {
  const { manager } = useDragDropContext();
  const [isDragging, setIsDragging] = React.useState(false);
  const [isDropTarget, setIsDropTarget] = React.useState(false);

  React.useEffect(() => {
    const handleDragStart = (
      event: Parameters<
        NonNullable<
          Parameters<typeof manager.monitor.addEventListener<"dragstart">>[1]
        >
      >[0]
    ) => {
      if (event.operation.source?.id === id) {
        setIsDragging(true);
      }
    };

    const handleDragMove = (
      event: Parameters<
        NonNullable<
          Parameters<typeof manager.monitor.addEventListener<"dragmove">>[1]
        >
      >[0]
    ) => {
      if (event.operation.source?.id === id) {
        setIsDragging(true);
      }
      if (event.operation.target?.id === id) {
        setIsDropTarget(true);
      } else {
        setIsDropTarget(false);
      }
    };

    const handleDragEnd = () => {
      setIsDragging(false);
      setIsDropTarget(false);
    };

    manager.monitor.addEventListener("dragstart", handleDragStart);
    manager.monitor.addEventListener("dragmove", handleDragMove);
    manager.monitor.addEventListener("dragend", handleDragEnd);

    return () => {
      manager.monitor.removeEventListener("dragstart", handleDragStart);
      manager.monitor.removeEventListener("dragmove", handleDragMove);
      manager.monitor.removeEventListener("dragend", handleDragEnd);
    };
  }, [manager, id]);

  return {
    isDragging,
    isDropTarget,
  };
}

