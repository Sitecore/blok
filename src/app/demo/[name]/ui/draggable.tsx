import BasicDragDrop from "@/app/demo/[name]/ui/draggable-basic";
import CustomHandleDemo from "@/app/demo/[name]/ui/draggable-custom-handle";
import DragDropSortableDemo from "@/app/demo/[name]/ui/draggable-sortable-drop";

export const draggable = {
  name: "draggable",
  defaultComponent: (
    <BasicDragDrop />
  ),
  usage: [
    `import { DndContext, type DragEndEvent } from "@/components/ui/dnd-context";
import { Draggable } from "@/components/ui/draggable";
import { Droppable } from "@/components/ui/droppable";`,
`
function App() {
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
  components: {
    "Basic Drag and Drop": <BasicDragDrop />,
    "Custom Handle": <CustomHandleDemo />,
    "Drag, Drop & Sort": <DragDropSortableDemo />
  },
};