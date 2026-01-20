import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";

export default function FieldCheckboxDemo() {
  return (
    <div className="w-80 p-4">
      <FieldSet>
        <FieldLegend>Notifications</FieldLegend>
        <FieldDescription>Manage how you receive updates.</FieldDescription>
        <FieldGroup>
          <Field orientation="horizontal">
            <Checkbox id="field-checkbox-email" />
            <FieldLabel htmlFor="field-checkbox-email" className="font-normal">
              Email notifications
            </FieldLabel>
          </Field>
          <Field orientation="horizontal">
            <Checkbox id="field-checkbox-sms" />
            <FieldLabel htmlFor="field-checkbox-sms" className="font-normal">
              SMS notifications
            </FieldLabel>
          </Field>
        </FieldGroup>
      </FieldSet>
    </div>
  );
}
