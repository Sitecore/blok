import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default function FieldWithSeparatorDemo() {
  return (
    <div className="w-80 p-4">
      <FieldGroup>
        <FieldSet>
          <FieldLegend>Personal Information</FieldLegend>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="field-sep-first">First name</FieldLabel>
              <Input id="field-sep-first" placeholder="John" />
            </Field>
            <Field>
              <FieldLabel htmlFor="field-sep-last">Last name</FieldLabel>
              <Input id="field-sep-last" placeholder="Doe" />
            </Field>
          </FieldGroup>
        </FieldSet>
        <FieldSeparator />
        <FieldSet>
          <FieldLegend>Contact Information</FieldLegend>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="field-sep-email">Email</FieldLabel>
              <Input
                id="field-sep-email"
                type="email"
                placeholder="john@example.com"
              />
            </Field>
          </FieldGroup>
        </FieldSet>
      </FieldGroup>
    </div>
  );
}
