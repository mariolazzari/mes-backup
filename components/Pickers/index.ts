type OnDateChange = (date?: Date) => void;

export type DatePickerProps = Partial<{
  isOpen: boolean;
  value: Date;
  onChange: OnDateChange;
}>;

export type TimePickerProps = Partial<{
  value: Date;
  onChange: OnDateChange;
}>;

export type DateTimePickerProps = Partial<{
  isOpen: boolean;
  value: Date;
  onChange: OnDateChange;
}>;

export * from "./DatePicker";
export * from "./TimePicker";
export * from "./DateTimePicker";
