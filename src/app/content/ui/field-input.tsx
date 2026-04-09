import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default function FieldInputDemo() {
  return (
    <div className="w-80 p-4">
      <FieldSet>
        <FieldLegend>Account Information</FieldLegend>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="field-input-username">Username</FieldLabel>
            <Input id="field-input-username" placeholder="Enter username" />
            <FieldDescription>
              Choose a unique username for your account.
            </FieldDescription>
          </Field>
          <Field>
            <FieldLabel htmlFor="field-input-password">Password</FieldLabel>
            <Input
              id="field-input-password"
              type="password"
              placeholder="Enter password"
            />
            <FieldDescription>
              Must be at least 8 characters long.
            </FieldDescription>
          </Field>
        </FieldGroup>
      </FieldSet>
    </div>
  );
}
