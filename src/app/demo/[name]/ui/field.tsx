import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from "@/components/ui/input-group";
import { Icon } from "@/lib/icon";
import { mdiInformationOutline } from "@mdi/js";
import { DatePickerSimple, DatePickerWithRange } from "@/components/ui/date-picker";
import { TimePicker } from "@/components/ui/time-picker";

export const field = {
  name: "field",
  defaultComponent: (
    <div className="w-80 p-4">
      <FieldSet>
        <FieldLegend>Profile</FieldLegend>
        <FieldDescription>This appears on invoices and emails.</FieldDescription>
        <FieldGroup>
          <Field orientation="responsive">
            <FieldLabel htmlFor="field-name">Full name</FieldLabel>
            <Input id="field-name" placeholder="Vijithan Ramalingam" />
            <FieldDescription>This appears on invoices and emails.</FieldDescription>
          </Field>
          <Field>
            <FieldLabel htmlFor="field-username">Username</FieldLabel>
            <Input id="field-username" aria-invalid />
            <FieldError>Choose another username.</FieldError>
          </Field>
          <Field orientation="horizontal">
            <Switch id="field-newsletter" />
            <FieldLabel htmlFor="field-newsletter">Subscribe to the newsletter</FieldLabel>
          </Field>
        </FieldGroup>
      </FieldSet>
    </div>
  ),
  usage: [
    `import {\n  Field,\n  FieldDescription,\n  FieldError,\n  FieldGroup,\n  FieldLabel,\n  FieldLegend,\n  FieldSeparator,\n  FieldSet,\n} from "@/components/ui/field"`,
    `<div className="w-80 p-4">\n  <FieldSet>\n    <FieldLegend>Profile</FieldLegend>\n    <FieldDescription>This appears on invoices and emails.</FieldDescription>\n    <FieldGroup>\n      <Field>\n        <FieldLabel htmlFor="name">Full name</FieldLabel>\n        <Input id="name" placeholder="Vijithan Ramalingam" />\n        <FieldDescription>This appears on invoices and emails.</FieldDescription>\n      </Field>\n    </FieldGroup>\n  </FieldSet>\n</div>`
  ],
  components: {
    "Input": (
      <div className="w-80 p-4">
        <FieldSet>
          <FieldLegend>Account Information</FieldLegend>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="field-input-username">Username</FieldLabel>
              <Input id="field-input-username" placeholder="Enter username" />
              <FieldDescription>Choose a unique username for your account.</FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="field-input-password">Password</FieldLabel>
              <Input id="field-input-password" type="password" placeholder="Enter password" />
              <FieldDescription>Must be at least 8 characters long.</FieldDescription>
            </Field>
          </FieldGroup>
        </FieldSet>
      </div>
    ),
    "Textarea": (
      <div className="w-80 p-4">
        <FieldSet>
          <FieldLegend>Message</FieldLegend>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="field-textarea-message">Your message</FieldLabel>
              <Textarea id="field-textarea-message" placeholder="Enter your message here" />
              <FieldDescription>Please provide details about your inquiry.</FieldDescription>
            </Field>
          </FieldGroup>
        </FieldSet>
      </div>
    ),
    "Select": (
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
              <FieldDescription>Select your country of residence.</FieldDescription>
            </Field>
          </FieldGroup>
        </FieldSet>
      </div>
    ),
    "Checkbox": (
      <div className="w-80 p-4">
        <FieldSet>
          <FieldLegend>Notifications</FieldLegend>
          <FieldDescription>Manage how you receive updates.</FieldDescription>
          <FieldGroup>
            <Field orientation="horizontal">
              <Checkbox id="field-checkbox-email" />
              <FieldLabel htmlFor="field-checkbox-email" className="font-normal">
                Email notifications
              </FieldLabel>
            </Field>
            <Field orientation="horizontal">
              <Checkbox id="field-checkbox-sms" />
              <FieldLabel htmlFor="field-checkbox-sms" className="font-normal">
                SMS notifications
              </FieldLabel>
            </Field>
          </FieldGroup>
        </FieldSet>
      </div>
    ),
    "Radio Group": (
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
                  <FieldLabel htmlFor="field-radio-paypal" className="font-normal">
                    PayPal
                  </FieldLabel>
                </Field>
              </RadioGroup>
              <FieldDescription>Choose your preferred payment method.</FieldDescription>
            </Field>
          </FieldGroup>
        </FieldSet>
      </div>
    ),
    "Switch": (
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
              <FieldLabel htmlFor="field-switch-notifications">Enable notifications</FieldLabel>
            </Field>
          </FieldGroup>
        </FieldSet>
      </div>
    ),
    "With Separator": (
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
                <Input id="field-sep-email" type="email" placeholder="john@example.com" />
              </Field>
            </FieldGroup>
          </FieldSet>
        </FieldGroup>
      </div>
    ),
    "With Error": (
      <div className="w-80 p-4">
        <FieldSet>
          <FieldLegend>Login</FieldLegend>
          <FieldGroup>
            <Field data-invalid>
              <FieldLabel htmlFor="field-error-email">Email</FieldLabel>
              <Input id="field-error-email" type="email" aria-invalid placeholder="Enter email" />
              <FieldError>Please enter a valid email address.</FieldError>
            </Field>
            <Field data-invalid>
              <FieldLabel htmlFor="field-error-password">Password</FieldLabel>
              <Input id="field-error-password" type="password" aria-invalid />
              <FieldError errors={[
                { message: "Password must be at least 8 characters" },
                { message: "Password must contain a number" }
              ]} />
            </Field>
          </FieldGroup>
        </FieldSet>
      </div>
    ),
    "Input with Icon": (
      <div className="w-80 p-4">
        <FieldSet>
          <FieldLegend>Contact</FieldLegend>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="field-input-icon">Input with icon</FieldLabel>
              <InputGroup>
                <InputGroupInput id="field-input-icon" type="tel" placeholder="Enter phone number" />
                <InputGroupAddon>
                  <Icon path={mdiInformationOutline} />
                </InputGroupAddon>
              </InputGroup>
              <FieldDescription>Helper text with a link at the end</FieldDescription>
            </Field>
          </FieldGroup>
        </FieldSet>
      </div>
    ),
    "Input with Addon": (
      <div className="w-80 p-4">
        <FieldSet>
          <FieldLegend>Phone Number</FieldLegend>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="field-input-addon">Input with addon</FieldLabel>
              <InputGroup>
                <InputGroupAddon>
                  <InputGroupText>+234</InputGroupText>
                </InputGroupAddon>
                <InputGroupInput id="field-input-addon" placeholder="Enter phone number" />
              </InputGroup>
              <FieldDescription>Helper text</FieldDescription>
            </Field>
          </FieldGroup>
        </FieldSet>
      </div>
    ),
    "Disabled": (
      <div className="w-80 p-4">
        <FieldSet>
          <FieldLegend>Account Settings</FieldLegend>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="field-disabled">Input disabled</FieldLabel>
              <Input id="field-disabled" value="You can't edit this value" disabled />
              <FieldDescription>Helper text</FieldDescription>
            </Field>
          </FieldGroup>
        </FieldSet>
      </div>
    ),
    "ReadOnly": (
      <div className="w-80 p-4">
        <FieldSet>
          <FieldLegend>Account Settings</FieldLegend>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="field-readonly">Input readOnly</FieldLabel>
              <Input id="field-readonly" value="You can't edit this value" readOnly />
              <FieldDescription>Helper text</FieldDescription>
            </Field>
          </FieldGroup>
        </FieldSet>
      </div>
    ),
    "Small Size": (
      <div className="w-80 p-4">
        <FieldSet>
          <FieldLegend>Small Inputs</FieldLegend>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="field-sm-input" className="text-sm">Input sm</FieldLabel>
              <Input id="field-sm-input" className="h-8 text-sm" placeholder="Small input" />
              <FieldDescription>This Input has the prop size="sm" enabled</FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="field-sm-select" className="text-sm">Select sm</FieldLabel>
              <Select>
                <SelectTrigger id="field-sm-select" size="sm">
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="content">Content</SelectItem>
                  <SelectItem value="engagement">Engagement</SelectItem>
                  <SelectItem value="commerce">Commerce</SelectItem>
                </SelectContent>
              </Select>
              <FieldDescription>This Select has the prop size="sm" enabled</FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="field-sm-addon" className="text-sm">Input sm with addon</FieldLabel>
              <InputGroup>
                <InputGroupAddon>
                  <InputGroupText className="text-sm">+234</InputGroupText>
                </InputGroupAddon>
                <InputGroupInput id="field-sm-addon" className="h-8 text-sm" placeholder="Small input" />
              </InputGroup>
            </Field>
          </FieldGroup>
        </FieldSet>
      </div>
    ),
    "Input Types": (
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
              <FieldDescription>Select a single date using the Blok date picker.</FieldDescription>
            </Field>
            <Field>
              <FieldLabel>Date Range Picker</FieldLabel>
              <DatePickerWithRange />
              <FieldDescription>Select a date range using the Blok date picker.</FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="field-email">Input email</FieldLabel>
              <Input id="field-email" type="email" placeholder="email@example.com" />
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
              <FieldDescription>Select time using dropdown selects for hour, minute, and period.</FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="field-url">Input url</FieldLabel>
              <Input id="field-url" type="url" placeholder="https://example.com" />
            </Field>
          </FieldGroup>
        </FieldSet>
      </div>
    ),
  },
};
