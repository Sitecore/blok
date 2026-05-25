import {
  Editable,
  EditableInput,
  EditablePreview,
} from "@/components/ui/editable";

export default function EditableDemo() {
  return (
    <div className="">
      <Editable
        defaultValue="Click to edit this text"
        placeholder="Enter some text..."
      >
        <EditablePreview className="w-80" />
        <EditableInput className="w-80" />
      </Editable>
    </div>
  );
}
