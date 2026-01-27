import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default function FieldReadOnlyDemo() {
  return (
    <div className="w-80 p-4">
      <FieldSet>
        <FieldLegend>Account Settings</FieldLegend>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="field-readonly">Input readOnly</FieldLabel>
            <Input
              id="field-readonly"
              value="You can't edit this value"
              readOnly
            />
            <FieldDescription>Helper text</FieldDescription>
          </Field>
        </FieldGroup>
      </FieldSet>
    </div>
  );
}
