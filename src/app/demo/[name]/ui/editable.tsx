export const editable = {
  name: "editable",
  preview: {
    defaultComponent: "editable",
  },
  usage: {
    usage: [
      `import {
  Editable,
  EditablePreview,
  EditableInput,
  EditableTextarea,
  EditableControl,
  EditableEditTrigger,
  EditableCancelTrigger,
  EditableSubmitTrigger,
} from "@/components/ui/editable";`,
      `<Editable defaultValue="Click to edit this text" placeholder="Enter some text...">
  <EditablePreview className="w-80"/>
  <EditableInput className="w-80"/>
</Editable>`,
    ],
  },
  components: {
    "Textarea": { component: "editable-textarea", },
  },
};
