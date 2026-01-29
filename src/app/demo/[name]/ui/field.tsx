export const field = {
  name: "field",
  preview: {
    defaultComponent: "field",
  },
  usage: {
    usage: [
      `import {\n  Field,\n  FieldDescription,\n  FieldError,\n  FieldGroup,\n  FieldLabel,\n  FieldLegend,\n  FieldSeparator,\n  FieldSet,\n} from "@/components/ui/field"`,
      `<div className="w-80 p-4">\n  <FieldSet>\n    <FieldLegend>Profile</FieldLegend>\n    <FieldDescription>This appears on invoices and emails.</FieldDescription>\n    <FieldGroup>\n      <Field>\n        <FieldLabel htmlFor="name">Full name</FieldLabel>\n        <Input id="name" placeholder="Vijithan Ramalingam" />\n        <FieldDescription>This appears on invoices and emails.</FieldDescription>\n      </Field>\n    </FieldGroup>\n  </FieldSet>\n</div>`,
    ],
  },
  components: {
    Input: { component: "field-input" },
    Textarea: { component: "field-textarea" },
    Select: { component: "field-select" },
    Checkbox: { component: "field-checkbox" },
    "Radio Group": { component: "field-radio-group" },
    Switch: { component: "field-switch" },
    "With Separator": { component: "field-with-separator" },
    "With Error": { component: "field-with-error" },
    "Input with Icon": { component: "field-input-icon" },
    "Input with Addon": { component: "field-input-addon" },
    Disabled: { component: "field-disabled" },
    ReadOnly: { component: "field-readonly" },
    "Small Size": { component: "field-small" },
    "Input Types": { component: "field-input-types" },
  },
};
