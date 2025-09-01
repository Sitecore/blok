import { DatePickerSimple, DatePickerWithRange } from "./datepicker-options";

const date = new Date();

export const datePicker = {
  name: "date-picker",
  components: {
    DatePickerSimple: <DatePickerSimple />,
    DatePickerWithRange: <DatePickerWithRange />,
  },
};
