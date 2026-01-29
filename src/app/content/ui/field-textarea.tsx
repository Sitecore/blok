import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";

export default function FieldTextareaDemo() {
  return (
    <div className="w-80 p-4">
      <FieldSet>
        <FieldLegend>Message</FieldLegend>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="field-textarea-message">
              Your message
            </FieldLabel>
            <Textarea
              id="field-textarea-message"
              placeholder="Enter your message here"
            />
            <FieldDescription>
              Please provide details about your inquiry.
            </FieldDescription>
          </Field>
        </FieldGroup>
      </FieldSet>
    </div>
  );
}
