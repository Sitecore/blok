import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default function FieldWithErrorDemo() {
  return (
    <div className="w-80 p-4">
      <FieldSet>
        <FieldLegend>Login</FieldLegend>
        <FieldGroup>
          <Field data-invalid>
            <FieldLabel htmlFor="field-error-email">Email</FieldLabel>
            <Input
              id="field-error-email"
              type="email"
              aria-invalid
              placeholder="Enter email"
            />
            <FieldError>Please enter a valid email address.</FieldError>
          </Field>
          <Field data-invalid>
            <FieldLabel htmlFor="field-error-password">Password</FieldLabel>
            <Input id="field-error-password" type="password" aria-invalid />
            <FieldError
              errors={[
                { message: "Password must be at least 8 characters" },
                { message: "Password must contain a number" },
              ]}
            />
          </Field>
        </FieldGroup>
      </FieldSet>
    </div>
  );
}
