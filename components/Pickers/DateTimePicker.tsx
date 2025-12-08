"use client";
import { DatePicker, DateTimePickerProps, TimePicker } from ".";

export function DateTimePicker({
  value,
  onChange,
  isOpen = false,
}: DateTimePickerProps) {
  return (
    <div className="flex gap-4">
      <DatePicker value={value} onChange={onChange} isOpen={isOpen} />
      <TimePicker value={value} onChange={onChange} />
    </div>
  );
}
