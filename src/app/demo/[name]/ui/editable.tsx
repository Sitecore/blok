import {
  Editable,
  EditablePreview,
  EditableInput,
  EditableTextarea,
} from "@/components/ui/editable";


export const editable = {
  name: "editable",
  defaultComponent: (
    <div className="">
      <Editable defaultValue="Click to edit this text" placeholder="Enter some text...">
        <EditablePreview className="w-80"/>
        <EditableInput className="w-80"/>
      </Editable>
    </div>
  ),
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
    `<Editable defaultValue="Click to edit">
  <EditablePreview />
  <EditableInput />
</Editable>`,
  ],
  components: {

    "Textarea": (
      <div className="w-96">
        <Editable
          defaultValue="This is a longer piece of text that spans multiple lines. Click to edit it and add more content."
          placeholder="Enter a description..."
        >
          <EditablePreview />
          <EditableTextarea className="w-96" />
        </Editable>
      </div>
    ),
  },
};
