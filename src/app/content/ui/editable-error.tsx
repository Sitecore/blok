import {
  Editable,
  EditableError,
  EditableInput,
  EditablePreview,
} from "@/components/ui/editable";

export default function EditableErrorDemo() {
  const error = "This field is required";

  return (
    <div className="w-96">
      <Editable
        defaultValue="Click to edit this text"
        placeholder="Enter some text..."
        hasError={Boolean(error)}
      >
        <EditablePreview className="w-80" />
        <EditableInput className="w-80" aria-invalid={Boolean(error)} />
        <EditableError>{error}</EditableError>
      </Editable>
    </div>
  );
}
