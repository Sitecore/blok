import {
  DatePickerSimple,
  DatePickerWithRange,
} from "@/components/ui/date-picker";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { TimePicker } from "@/components/ui/time-picker";

export default function FieldInputTypesDemo() {
  return (
    <div className="w-80 p-4">
      <FieldSet>
        <FieldLegend>Various Input Types</FieldLegend>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="field-color">Input color</FieldLabel>
            <Input id="field-color" type="color" />
          </Field>
          <Field>
            <FieldLabel>Date Picker</FieldLabel>
            <DatePickerSimple />
            <FieldDescription>
              Select a single date using the Blok date picker.
            </FieldDescription>
          </Field>
          <Field>
            <FieldLabel>Date Range Picker</FieldLabel>
            <DatePickerWithRange />
            <FieldDescription>
              Select a date range using the Blok date picker.
            </FieldDescription>
          </Field>
          <Field>
            <FieldLabel htmlFor="field-email">Input email</FieldLabel>
            <Input
              id="field-email"
              type="email"
              placeholder="email@example.com"
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="field-file">Input file</FieldLabel>
            <Input id="field-file" type="file" />
          </Field>
          <Field>
            <FieldLabel htmlFor="field-number">Input number</FieldLabel>
            <Input id="field-number" type="number" placeholder="Enter number" />
          </Field>
          <Field>
            <FieldLabel htmlFor="field-search">Input search</FieldLabel>
            <Input id="field-search" type="search" placeholder="Search..." />
          </Field>
          <Field>
            <FieldLabel htmlFor="field-tel">Input tel</FieldLabel>
            <Input id="field-tel" type="tel" placeholder="Enter phone number" />
          </Field>
          <Field>
            <FieldLabel>Time Picker</FieldLabel>
            <TimePicker placeholder="Pick a time" />
            <FieldDescription>
              Select time using dropdown selects for hour, minute, and period.
            </FieldDescription>
          </Field>
          <Field>
            <FieldLabel htmlFor="field-url">Input url</FieldLabel>
            <Input
              id="field-url"
              type="url"
              placeholder="https://example.com"
            />
          </Field>
        </FieldGroup>
      </FieldSet>
    </div>
  );
}
