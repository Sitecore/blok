import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";

export default function FieldInputWithAddonDemo() {
  return (
    <div className="w-80 p-4">
      <FieldSet>
        <FieldLegend>Phone Number</FieldLegend>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="field-input-addon">
              Input with addon
            </FieldLabel>
            <InputGroup>
              <InputGroupAddon>
                <InputGroupText>+234</InputGroupText>
              </InputGroupAddon>
              <InputGroupInput
                id="field-input-addon"
                placeholder="Enter phone number"
              />
            </InputGroup>
            <FieldDescription>Helper text</FieldDescription>
          </Field>
        </FieldGroup>
      </FieldSet>
    </div>
  );
}
