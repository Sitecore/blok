import { BasicDragDrop } from "./draggable-basic";
import { SortableListDemo } from "./draggable-sortable-list";
import { CustomHandleDemo } from "./draggable-custom-handle";

export const draggable = {
  name: "draggable",
  defaultComponent: (
    <BasicDragDrop />
  ),
  usage: [
    `import { DragDropProvider } from "@/components/ui/drag-drop-context";\nimport { Draggable } from "@/components/ui/draggable";`,
    `<DragDropProvider>\n <Draggable id="draggable-demo">\n  <div>\n   <p className="text-white">Draggable</p>\n  </div>\n </Draggable>\n</DragDropProvider>`,
  ],
  components: {
    "Basic Drag and Drop": <BasicDragDrop />,
    "Sortable List": <SortableListDemo />,
    "Custom Handle": <CustomHandleDemo />
  },
};