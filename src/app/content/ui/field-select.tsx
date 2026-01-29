import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function FieldSelectDemo() {
  return (
    <div className="w-80 p-4">
      <FieldSet>
        <FieldLegend>Preferences</FieldLegend>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="field-select-country">Country</FieldLabel>
            <Select>
              <SelectTrigger id="field-select-country">
                <SelectValue placeholder="Select a country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="us">United States</SelectItem>
                <SelectItem value="uk">United Kingdom</SelectItem>
                <SelectItem value="ca">Canada</SelectItem>
              </SelectContent>
            </Select>
            <FieldDescription>
              Select your country of residence.
            </FieldDescription>
          </Field>
        </FieldGroup>
      </FieldSet>
    </div>
  );
}
