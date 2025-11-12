import { BasicDragDrop } from "./draggable-basic";
import { SortableListDemo } from "./draggable-sortable-list";
import { CustomHandleDemo } from "./draggable-custom-handle";

export const draggable = {
  name: "draggable",
  components: {
    "Basic Drag and Drop": <BasicDragDrop />,
    "Sortable List": <SortableListDemo />,
    "Custom Handle": <CustomHandleDemo />
  },
};