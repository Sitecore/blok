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
} from "@/components/ui/input-group";
import { Icon } from "@/lib/icon";
import { mdiInformationOutline } from "@mdi/js";

export default function FieldInputWithIconDemo() {
  return (
    <div className="w-80 p-4">
      <FieldSet>
        <FieldLegend>Contact</FieldLegend>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="field-input-icon">Input with icon</FieldLabel>
            <InputGroup>
              <InputGroupInput
                id="field-input-icon"
                type="tel"
                placeholder="Enter phone number"
              />
              <InputGroupAddon>
                <Icon path={mdiInformationOutline} />
              </InputGroupAddon>
            </InputGroup>
            <FieldDescription>
              Helper text with a link at the end
            </FieldDescription>
          </Field>
        </FieldGroup>
      </FieldSet>
    </div>
  );
}
