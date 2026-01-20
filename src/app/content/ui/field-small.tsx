import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function FieldSmallDemo() {
  return (
    <div className="w-80 p-4">
      <FieldSet>
        <FieldLegend>Small Inputs</FieldLegend>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="field-sm-input" className="text-sm">
              Input sm
            </FieldLabel>
            <Input
              id="field-sm-input"
              className="h-8 text-sm"
              placeholder="Small input"
            />
            <FieldDescription>
              This Input has the prop size="sm" enabled
            </FieldDescription>
          </Field>
          <Field>
            <FieldLabel htmlFor="field-sm-select" className="text-sm">
              Select sm
            </FieldLabel>
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
            <FieldDescription>
              This Select has the prop size="sm" enabled
            </FieldDescription>
          </Field>
          <Field>
            <FieldLabel htmlFor="field-sm-addon" className="text-sm">
              Input sm with addon
            </FieldLabel>
            <InputGroup>
              <InputGroupAddon>
                <InputGroupText className="text-sm">+234</InputGroupText>
              </InputGroupAddon>
              <InputGroupInput
                id="field-sm-addon"
                className="h-8 text-sm"
                placeholder="Small input"
              />
            </InputGroup>
          </Field>
        </FieldGroup>
      </FieldSet>
    </div>
  );
}
