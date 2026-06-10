import {
  Editable,
  EditableError,
  EditableInput,
  EditablePreview,
  EditableTextarea,
} from "@/components/ui/editable";
import { cn } from "@/lib/utils";
import { useState } from "react";

const ERROR_MESSAGE = "This field is required";

export function EditableDemo() {

  const [showError, setShowError] = useState(false);

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

        <div id="editable-with-error">
          <div className="w-96">
            <Editable
              defaultValue=""
              placeholder="Click to edit this text"
              hasError={showError}
              onEdit={() => setShowError(true)}
            >
              <EditablePreview className="w-80" />
              <EditableInput
                className={cn("w-80", showError && "border-destructive")}
                aria-invalid={showError}
              />
              {showError ? <EditableError>{ERROR_MESSAGE}</EditableError> : null}
            </Editable>
          </div>
        </div>

    </div>
  );
}