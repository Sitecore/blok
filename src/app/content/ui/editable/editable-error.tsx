"use client";

import {
  Editable,
  EditableError,
  EditableInput,
  EditablePreview,
} from "@/components/ui/editable";
import { cn } from "@/lib/utils";
import { useState } from "react";

const ERROR_MESSAGE = "This field is required";

export default function EditableErrorDemo() {
  const [showError, setShowError] = useState(false);

  return (
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
  );
}
