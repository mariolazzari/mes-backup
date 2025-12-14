type OnDateChange = (date?: Date) => void;

export type DatePickerProps = Partial<{
  isOpen: boolean;
  label: string;
  value: Date;
  onChange: OnDateChange;
}>;

export type TimePickerProps = Partial<{
  label: string;
  value: Date;
  onChange: OnDateChange;
}>;

export type DateTimePickerProps = Partial<{
  isOpen: boolean;
  dateLabel: string;
  timeLabel: string;
  value: Date;
  onChange: OnDateChange;
}>;

export * from "./DatePicker";
export * from "./TimePicker";
export * from "./DateTimePicker";
