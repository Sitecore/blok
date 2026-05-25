import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";

export default function FieldSwitchDemo() {
  return (
    <div className="w-80 p-4">
      <FieldSet>
        <FieldLegend>Settings</FieldLegend>
        <FieldGroup>
          <Field orientation="horizontal">
            <Switch id="field-switch-dark" />
            <FieldLabel htmlFor="field-switch-dark">Dark mode</FieldLabel>
          </Field>
          <Field orientation="horizontal">
            <Switch id="field-switch-notifications" />
            <FieldLabel htmlFor="field-switch-notifications">
              Enable notifications
            </FieldLabel>
          </Field>
        </FieldGroup>
      </FieldSet>
    </div>
  );
}
