import {
  Editable,
  EditablePreview,
  EditableInput,
  EditableTextarea,
} from "@/components/ui/editable";

export function EditableDemo() {

  return (
    <div>
      <h2 className="font-semibold text-4xl wrap-break-words">Editable</h2>

        <div id="editable-input">
          <Editable defaultValue="Click to edit this text" placeholder="Enter some text...">
            <EditablePreview className="w-80" />
            <EditableInput className="w-80" />
          </Editable>
        </div>

        <div id="editable-textarea">
          <div className="w-96">
            <Editable
              defaultValue="This is a longer piece of text that spans multiple lines. Click to edit it and add more content."
              placeholder="Enter a description..."
            >
              <EditablePreview className="w-96" />
              <EditableTextarea className="w-96" />
            </Editable>
          </div>
        </div>

        

    </div>
  );
}