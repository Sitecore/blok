import {
  Editable,
  EditablePreview,
  EditableInput,
  EditableTextarea,
  EditableControl,
  EditableEditTrigger,
  EditableCancelTrigger,
  EditableSubmitTrigger,
} from "@/components/ui/editable";
import { Icon } from "@/lib/icon";
import { mdiPencil, mdiCheck, mdiClose } from "@mdi/js";
import { ControlledDemo, StoreDemo } from "@/app/demo/[name]/ui/editable-controlled";

export const editable = {
  name: "editable",
  defaultComponent: (
    <div className="">
      <Editable defaultValue="Click to edit this text" placeholder="Enter some text...">
        <EditablePreview />
        <EditableInput />
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
    // Double Click activation
    "Double Click": (
      <div >
        <Editable 
          defaultValue="Double click to edit this text" 
          placeholder="Enter text..."
          activationMode="dblclick"
        >
          <EditablePreview />
          <EditableInput />
        </Editable>
      </div>
    ),

    // Disabled state
    "Disabled": (
      <div >
        <Editable
          isDisabled
          defaultValue="This field is disabled"
          placeholder="Cannot edit..."
        >
          <EditablePreview />
          <EditableInput />
        </Editable>
      </div>
    ),

    // Textarea for multi-line editing
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

    // With control buttons
    "With Controls": (
      <div>
        <Editable
          defaultValue="Edit me with buttons"
          placeholder="Enter text..."
          isPreviewFocusable={false}
          submitOnBlur={false}
        >
          <div className="flex items-center gap-2">
            <EditablePreview className="flex-1" />
            <EditableInput className="flex-1" />
            <EditableControl>
              <EditableEditTrigger>
                <Icon path={mdiPencil} size="sm" />
              </EditableEditTrigger>
              <EditableSubmitTrigger>
                <Icon path={mdiCheck} size="sm" />
              </EditableSubmitTrigger>
              <EditableCancelTrigger>
                <Icon path={mdiClose} size="sm" />
              </EditableCancelTrigger>
            </EditableControl>
          </div>
        </Editable>
      </div>
    ),

    // Controlled mode
    "Controlled": <ControlledDemo />,

    // Store pattern
    "Store": <StoreDemo />,
  },
};
