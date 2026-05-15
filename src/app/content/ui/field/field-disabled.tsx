import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default function FieldDisabledDemo() {
  return (
    <div className="w-80 p-4">
      <FieldSet>
        <FieldLegend>Account Settings</FieldLegend>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="field-disabled">Input disabled</FieldLabel>
            <Input
              id="field-disabled"
              value="You can't edit this value"
              disabled
            />
            <FieldDescription>Helper text</FieldDescription>
          </Field>
        </FieldGroup>
      </FieldSet>
    </div>
  );
}
