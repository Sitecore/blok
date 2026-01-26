import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function FieldRadioGroupDemo() {
  return (
    <div className="w-80 p-4">
      <FieldSet>
        <FieldLegend>Payment Method</FieldLegend>
        <FieldGroup>
          <Field>
            <FieldLabel>Select payment method</FieldLabel>
            <RadioGroup defaultValue="card">
              <Field orientation="horizontal">
                <RadioGroupItem value="card" id="field-radio-card" />
                <FieldLabel htmlFor="field-radio-card" className="font-normal">
                  Credit Card
                </FieldLabel>
              </Field>
              <Field orientation="horizontal">
                <RadioGroupItem value="paypal" id="field-radio-paypal" />
                <FieldLabel
                  htmlFor="field-radio-paypal"
                  className="font-normal"
                >
                  PayPal
                </FieldLabel>
              </Field>
            </RadioGroup>
            <FieldDescription>
              Choose your preferred payment method.
            </FieldDescription>
          </Field>
        </FieldGroup>
      </FieldSet>
    </div>
  );
}
