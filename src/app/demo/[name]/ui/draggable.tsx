export const draggable = {
  name: "draggable",
  preview: {
    defaultComponent: "draggable-basic",
  },
  usage: {
    usage: [
      `import { DndContext, type DragEndEvent } from "@/components/ui/dnd-context";
import { Draggable } from "@/components/ui/draggable";
import { Droppable } from "@/components/ui/droppable";`,
      `function App() {
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over) {
      console.log(\`Dropped \${active.id} over \${over.id}\`);
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <Draggable id="draggable-1">
        <div>Drag me</div>
      </Draggable>
      <Droppable id="droppable-1">
        <div>Drop here</div>
      </Droppable>
    </DndContext>
  );
}`,
    ],
  },
  components: {
    "Basic Drag and Drop": { component: "draggable-basic" },
    "Custom Handle": { component: "draggable-custom-handle" },
    "Drag, Drop & Sort": { component: "draggable-sortable-drop" },
  },
};
