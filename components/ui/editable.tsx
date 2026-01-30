"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";

type ActivationMode = "click" | "dblclick";

interface EditableContextValue {
  isEditing: boolean;
  value: string;
  placeholder: string;
  isDisabled: boolean;
  isPreviewFocusable: boolean;
  submitOnBlur: boolean;
  selectAllOnFocus: boolean;
  activationMode: ActivationMode;
  startEdit: () => void;
  cancelEdit: () => void;
  submitEdit: () => void;
  handleChange: (value: string) => void;
  inputRef: React.RefObject<HTMLInputElement | HTMLTextAreaElement | null>;
}

const EditableContext = React.createContext<EditableContextValue | null>(null);

function useEditableContext() {
  const context = React.useContext(EditableContext);
  if (!context) {
    throw new Error(
      "Editable compound components must be used within an Editable component",
    );
  }
  return context;
}

// useEditable Hook
interface UseEditableProps {
  /** The initial value (uncontrolled) */
  defaultValue?: string;
  /** The controlled value */
  value?: string;
  /** Placeholder text when empty */
  placeholder?: string;
  /** Whether the component is disabled */
  isDisabled?: boolean;
  /** Whether clicking the preview starts editing */
  isPreviewFocusable?: boolean;
  /** Whether to submit on blur */
  submitOnBlur?: boolean;
  /** Whether to start in edit mode */
  startWithEditView?: boolean;
  /** Whether to select all text on focus */
  selectAllOnFocus?: boolean;
  /** Activation mode: 'click' or 'dblclick' */
  activationMode?: ActivationMode;
  /** Callback when value is submitted */
  onSubmit?: (value: string) => void;
  /** Callback when value changes */
  onChange?: (value: string) => void;
  /** Callback when value changes (alias for onChange) */
  onValueChange?: (value: string) => void;
  /** Callback when editing is cancelled */
  onCancel?: (previousValue: string) => void;
  /** Callback when entering edit mode */
  onEdit?: () => void;
}

interface UseEditableReturn extends EditableContextValue {
  /** Whether the editable is currently in edit mode */
  editing: boolean;
}

function useEditable(props: UseEditableProps = {}): UseEditableReturn {
  const {
    defaultValue = "",
    value: controlledValue,
    placeholder = "Click to edit...",
    isDisabled = false,
    isPreviewFocusable = true,
    submitOnBlur = true,
    startWithEditView = false,
    selectAllOnFocus = true,
    activationMode = "click",
    onSubmit,
    onChange,
    onValueChange,
    onCancel,
    onEdit,
  } = props;

  const [isEditing, setIsEditing] = React.useState(startWithEditView);
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const [previousValue, setPreviousValue] = React.useState(defaultValue);
  const inputRef = React.useRef<HTMLInputElement | HTMLTextAreaElement | null>(
    null,
  );

  // Support both controlled and uncontrolled modes
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const startEdit = React.useCallback(() => {
    if (isDisabled) return;
    setPreviousValue(value);
    setIsEditing(true);
    onEdit?.();
  }, [isDisabled, value, onEdit]);

  const cancelEdit = React.useCallback(() => {
    if (!isControlled) {
      setInternalValue(previousValue);
    }
    setIsEditing(false);
    onCancel?.(previousValue);
  }, [isControlled, previousValue, onCancel]);

  const submitEdit = React.useCallback(() => {
    setIsEditing(false);
    onSubmit?.(value);
  }, [value, onSubmit]);

  const handleChange = React.useCallback(
    (newValue: string) => {
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
      onValueChange?.(newValue);
    },
    [isControlled, onChange, onValueChange],
  );

  // Focus input when entering edit mode
  React.useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      if (selectAllOnFocus && inputRef.current instanceof HTMLInputElement) {
        inputRef.current.select();
      } else if (
        selectAllOnFocus &&
        inputRef.current instanceof HTMLTextAreaElement
      ) {
        inputRef.current.select();
      }
    }
  }, [isEditing, selectAllOnFocus]);

  return {
    isEditing,
    editing: isEditing, // Alias for Chakra compatibility
    value,
    placeholder,
    isDisabled,
    isPreviewFocusable,
    submitOnBlur,
    selectAllOnFocus,
    activationMode,
    startEdit,
    cancelEdit,
    submitEdit,
    handleChange,
    inputRef,
  };
}

// Editable Root Component

const editableVariants = cva("inline-flex flex-col gap-1", {
  variants: {
    size: {
      sm: "text-sm",
      md: "text-md",
      lg: "text-lg",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

interface EditableProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "onSubmit">,
    VariantProps<typeof editableVariants> {
  /** The initial value (uncontrolled) */
  defaultValue?: string;
  /** The controlled value */
  value?: string;
  /** Placeholder text when empty */
  placeholder?: string;
  /** Whether the component is disabled */
  isDisabled?: boolean;
  /** Whether clicking the preview starts editing */
  isPreviewFocusable?: boolean;
  /** Whether to submit on blur */
  submitOnBlur?: boolean;
  /** Whether to start in edit mode */
  startWithEditView?: boolean;
  /** Whether to select all text on focus */
  selectAllOnFocus?: boolean;
  /** Activation mode: 'click' or 'dblclick' */
  activationMode?: ActivationMode;
  /** Callback when value is submitted */
  onSubmit?: (value: string) => void;
  /** Callback when value changes */
  onChange?: (value: string) => void;
  /** Callback when value changes (alias for onChange) */
  onValueChange?: (value: string) => void;
  /** Callback when editing is cancelled */
  onCancel?: (previousValue: string) => void;
  /** Callback when entering edit mode */
  onEdit?: () => void;
}

function Editable({
  className,
  size,
  defaultValue = "",
  value: controlledValue,
  placeholder = "Click to edit...",
  isDisabled = false,
  isPreviewFocusable = true,
  submitOnBlur = true,
  startWithEditView = false,
  selectAllOnFocus = true,
  activationMode = "click",
  onSubmit,
  onChange,
  onValueChange,
  onCancel,
  onEdit,
  children,
  ...props
}: EditableProps) {
  const [isEditing, setIsEditing] = React.useState(startWithEditView);
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const [previousValue, setPreviousValue] = React.useState(defaultValue);
  const inputRef = React.useRef<HTMLInputElement | HTMLTextAreaElement | null>(
    null,
  );

  // Support both controlled and uncontrolled modes
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const startEdit = React.useCallback(() => {
    if (isDisabled) return;
    setPreviousValue(value);
    setIsEditing(true);
    onEdit?.();
  }, [isDisabled, value, onEdit]);

  const cancelEdit = React.useCallback(() => {
    if (!isControlled) {
      setInternalValue(previousValue);
    }
    setIsEditing(false);
    onCancel?.(previousValue);
  }, [isControlled, previousValue, onCancel]);

  const submitEdit = React.useCallback(() => {
    setIsEditing(false);
    onSubmit?.(value);
  }, [value, onSubmit]);

  const handleChange = React.useCallback(
    (newValue: string) => {
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
      onValueChange?.(newValue);
    },
    [isControlled, onChange, onValueChange],
  );

  // Focus input when entering edit mode
  React.useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      if (selectAllOnFocus && inputRef.current instanceof HTMLInputElement) {
        inputRef.current.select();
      } else if (
        selectAllOnFocus &&
        inputRef.current instanceof HTMLTextAreaElement
      ) {
        inputRef.current.select();
      }
    }
  }, [isEditing, selectAllOnFocus]);

  const contextValue: EditableContextValue = {
    isEditing,
    value,
    placeholder,
    isDisabled,
    isPreviewFocusable,
    submitOnBlur,
    selectAllOnFocus,
    activationMode,
    startEdit,
    cancelEdit,
    submitEdit,
    handleChange,
    inputRef,
  };

  return (
    <EditableContext.Provider value={contextValue}>
      <div
        data-slot="editable"
        className={cn(editableVariants({ size }), className)}
        {...props}
      >
        {children}
      </div>
    </EditableContext.Provider>
  );
}

// EditableRootProvider Component

interface EditableRootProviderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "onSubmit">,
    VariantProps<typeof editableVariants> {
  value: EditableContextValue;
}

function EditableRootProvider({
  className,
  size,
  value,
  children,
  ...props
}: EditableRootProviderProps) {
  return (
    <EditableContext.Provider value={value}>
      <div
        data-slot="editable"
        className={cn(editableVariants({ size }), className)}
        {...props}
      >
        {children}
      </div>
    </EditableContext.Provider>
  );
}

// EditablePreview Component

const editablePreviewVariants = cva(
  [
    "cursor-text rounded-md px-2 py-1 transition-colors",
    "hover:bg-neutral-bg",
    "min-h-[2rem] flex items-center whitespace-pre-line break-words",
  ].join(" "),
  {
    variants: {
      isEmpty: {
        true: "text-muted-foreground italic",
        false: "text-foreground",
      },
    },
    defaultVariants: {
      isEmpty: false,
    },
  },
);

interface EditablePreviewProps extends React.HTMLAttributes<HTMLSpanElement> {}

function EditablePreview({ className, ...props }: EditablePreviewProps) {
  const {
    isEditing,
    value,
    placeholder,
    isDisabled,
    isPreviewFocusable,
    activationMode,
    startEdit,
  } = useEditableContext();

  if (isEditing) {
    return null;
  }

  const isEmpty = !value || value.trim() === "";
  const displayValue = isEmpty ? placeholder : value;

  const handleClick =
    activationMode === "click" && isPreviewFocusable && !isDisabled
      ? startEdit
      : undefined;
  const handleDoubleClick =
    activationMode === "dblclick" && isPreviewFocusable && !isDisabled
      ? startEdit
      : undefined;

  return (
    <span
      data-slot="editable-preview"
      role={isPreviewFocusable && !isDisabled ? "button" : undefined}
      tabIndex={isPreviewFocusable && !isDisabled ? 0 : undefined}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onKeyDown={(e) => {
        if (
          isPreviewFocusable &&
          !isDisabled &&
          (e.key === "Enter" || e.key === " ")
        ) {
          e.preventDefault();
          startEdit();
        }
      }}
      className={cn(
        editablePreviewVariants({ isEmpty }),
        isDisabled && "cursor-not-allowed opacity-50",
        !isPreviewFocusable && "cursor-default hover:bg-transparent",
        className,
      )}
      {...props}
    >
      {displayValue}
    </span>
  );
}

// EditableInput Component

interface EditableInputProps
  extends Omit<React.ComponentProps<typeof Input>, "value" | "onChange"> {}

function EditableInput({ className, ...props }: EditableInputProps) {
  const {
    isEditing,
    value,
    placeholder,
    isDisabled,
    submitOnBlur,
    handleChange,
    submitEdit,
    cancelEdit,
    inputRef,
  } = useEditableContext();

  if (!isEditing) {
    return null;
  }

  return (
    <Input
      ref={inputRef as React.RefObject<HTMLInputElement>}
      data-slot="editable-input"
      value={value}
      placeholder={placeholder}
      disabled={isDisabled}
      onChange={(e) => handleChange(e.target.value)}
      onBlur={() => {
        if (submitOnBlur) {
          submitEdit();
        }
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          submitEdit();
        } else if (e.key === "Escape") {
          e.preventDefault();
          cancelEdit();
        }
      }}
      className={cn(
        "w-full border-2 bg-transparent dark:bg-transparent focus-visible:ring-0 focus-visible:border-primary transition-colors",
        className,
      )}
      {...props}
    />
  );
}

// EditableTextarea Component
interface EditableTextareaProps
  extends Omit<React.ComponentProps<typeof Textarea>, "value" | "onChange"> {}

function EditableTextarea({ className, ...props }: EditableTextareaProps) {
  const {
    isEditing,
    value,
    placeholder,
    isDisabled,
    submitOnBlur,
    handleChange,
    submitEdit,
    cancelEdit,
    inputRef,
  } = useEditableContext();

  if (!isEditing) {
    return null;
  }

  return (
    <Textarea
      ref={inputRef as React.RefObject<HTMLTextAreaElement>}
      data-slot="editable-textarea"
      value={value}
      placeholder={placeholder}
      disabled={isDisabled}
      onChange={(e) => handleChange(e.target.value)}
      onBlur={() => {
        if (submitOnBlur) {
          submitEdit();
        }
      }}
      onKeyDown={(e) => {
        // For textarea, Ctrl/Cmd + Enter submits, Escape cancels
        if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
          e.preventDefault();
          submitEdit();
        } else if (e.key === "Escape") {
          e.preventDefault();
          cancelEdit();
        }
      }}
      className={cn(
        "w-36 border-2 bg-transparent dark:bg-transparent focus-visible:ring-0 focus-visible:border-primary transition-colors",
        className,
      )}
      {...props}
    />
  );
}

// EditableControl Component

interface EditableControlProps extends React.HTMLAttributes<HTMLDivElement> {}

function EditableControl({
  className,
  children,
  ...props
}: EditableControlProps) {
  return (
    <div
      data-slot="editable-control"
      className={cn("inline-flex items-center gap-1", className)}
      {...props}
    >
      {children}
    </div>
  );
}

// EditableEditTrigger Component

interface EditableEditTriggerProps
  extends React.ComponentProps<typeof Button> {}

function EditableEditTrigger({
  className,
  children,
  ...props
}: EditableEditTriggerProps) {
  const { isEditing, isDisabled, startEdit } = useEditableContext();

  if (isEditing) {
    return null;
  }

  return (
    <Button
      data-slot="editable-edit-trigger"
      type="button"
      variant="ghost"
      size="sm"
      disabled={isDisabled}
      onClick={startEdit}
      className={cn(className)}
      {...props}
    >
      {children ?? "Edit"}
    </Button>
  );
}

// EditableCancelTrigger Component

interface EditableCancelTriggerProps
  extends React.ComponentProps<typeof Button> {}

function EditableCancelTrigger({
  className,
  children,
  ...props
}: EditableCancelTriggerProps) {
  const { isEditing, cancelEdit } = useEditableContext();

  if (!isEditing) {
    return null;
  }

  return (
    <Button
      data-slot="editable-cancel-trigger"
      type="button"
      variant="ghost"
      size="sm"
      onClick={cancelEdit}
      className={cn(className)}
      {...props}
    >
      {children ?? "Cancel"}
    </Button>
  );
}

// EditableSubmitTrigger Component

interface EditableSubmitTriggerProps
  extends React.ComponentProps<typeof Button> {}

function EditableSubmitTrigger({
  className,
  children,
  ...props
}: EditableSubmitTriggerProps) {
  const { isEditing, submitEdit } = useEditableContext();

  if (!isEditing) {
    return null;
  }

  return (
    <Button
      data-slot="editable-submit-trigger"
      type="button"
      variant="default"
      size="sm"
      onClick={submitEdit}
      className={cn(className)}
      {...props}
    >
      {children ?? "Save"}
    </Button>
  );
}

export {
  Editable,
  EditableRootProvider,
  EditablePreview,
  EditableInput,
  EditableTextarea,
  EditableControl,
  EditableEditTrigger,
  EditableCancelTrigger,
  EditableSubmitTrigger,
  editableVariants,
  editablePreviewVariants,
  useEditable,
  useEditableContext,
  type EditableProps,
  type EditableRootProviderProps,
  type EditableContextValue,
  type UseEditableProps,
  type UseEditableReturn,
  type ActivationMode,
};
