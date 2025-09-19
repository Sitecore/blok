import * as zod from "zod";

export const defaultValues: FormDataType = {
  firstName: "John",
  middleName: "",
  lastName: "",
};

export type FieldDataType = {
  id: string;
  label: string;
  helptext?: string;
  required?: boolean;
};

export const data: FieldDataType[] = [
  {
    id: "firstName",
    label: "Firstname",
  },
  {
    id: "middleName",
    label: "Middlename",
  },
  {
    id: "lastName",
    label: "Surname",
    required: true,
    helptext: "This is your family name",
  },
];

export const schema = zod.object({
  firstName: zod.string().max(12),
  middleName: zod.string().max(12).optional(),
  lastName: zod.string().max(12).nonempty({ message: "Last name is required" }),
});

export type FormDataType = zod.infer<typeof schema>;
